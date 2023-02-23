const { expect } = require("chai");
import { ethers } from "hardhat";
import { EtherWallet } from "../typechain-types";

describe("Deployment", function () {
    let etherwalletContract: EtherWallet;
    
    beforeEach(async function () {
        const EtherWallet = await ethers.getContractFactory("EtherWallet");
        etherwalletContract = await EtherWallet.deploy();
        await EtherWallet.deploy();
    })

    it("Should set owner to deployer account", async function () {
        const accounts = await ethers.getSigners();
        const contractOwner = await etherwalletContract.owner();
        expect(contractOwner).to.equal(accounts[0].address);
    });

    it("Should allow anyone deposit", async function () {
        const accounts = await ethers.getSigners();
        // const preBalance = await etherwalletContract.getBalance();
        await accounts[1].sendTransaction({
            to: etherwalletContract.address,
            value: ethers.utils.parseEther("1.0"), // Sends exactly 1.0 ether
          });
        // const postBalance =  await etherwalletContract.getBalance();
        await expect(ethers.utils.formatEther(await etherwalletContract.getBalance())).to.equal("1.0");
    });

    it("Should not allow anyone other than owner to call withdrawal", async function () {
        const accounts = await ethers.getSigners();
        await expect(
            etherwalletContract.connect(accounts[1]).withdraw(ethers.utils.parseEther("100"))
            ).to.be.revertedWith("caller is not owner");
    });

    it("Should allow owner to call withdrawal", async function () {
        const accounts = await ethers.getSigners();
        // Deposit first 
        await accounts[1].sendTransaction({
            to: etherwalletContract.address,
            value: ethers.utils.parseEther("1.0"), // Sends exactly 1.0 ether
          });

        const beforeWithdraw = ethers.utils.formatEther(await etherwalletContract.getBalance());
        // start withdrawal
        await etherwalletContract.connect(accounts[0]).withdraw(ethers.utils.parseEther("1.0")); 
        const afterWithdraw = ethers.utils.formatEther(await etherwalletContract.getBalance());
        await expect(true).to.equal(beforeWithdraw > afterWithdraw);
    });

})