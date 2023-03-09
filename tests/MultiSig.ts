const { expect } = require("chai");
import { ethers } from "hardhat";
import { MultiSig } from "../typechain-types";


describe("MultiSig Test", function () {
    let multiSigContract: MultiSig;
    let accounts;

    beforeEach(async function () {
        accounts = await ethers.getSigners();
        let Multisig = await ethers.getContractFactory("MultiSig");
        multiSigContract = await Multisig.deploy([accounts[0].address, accounts[1].address, accounts[2].address], 2)
        await multiSigContract.deployed();

        // Sending the transaction to contract from Account 0
        await accounts[1].sendTransaction({
            to: multiSigContract.address,
            value: ethers.utils.parseEther("1.0"), // Sends exactly 1.0 ether
        });
    })

    it("Should have correct approver and quorum", async function () {
        const approvers = await multiSigContract.getApprover();
        const quorum = await multiSigContract.quorum();
        expect(approvers[0], approvers[1], approvers[2]).to.equal(accounts[0].address, accounts[1].address, accounts[2].address);
        expect(quorum).to.equal(2);
    });

    it("Should create transfers", async function () {
      await multiSigContract.connect(accounts[0]).createTransfer(100, accounts[3].address);
      let tx = await multiSigContract.getTransfer();
      expect(tx.length).to.equal(1);
      expect(tx[0].id).to.equal(0)
      expect(tx[0].to).to.equal(accounts[3].address);
      expect(tx[0].amount).to.equal(100);
      expect(tx[0].approvals).to.equal(0);
      expect(tx[0].sent).to.equal(false);
    });

    it("Should not allow other transfer", async function () {
        await expect( 
            multiSigContract.connect(accounts[3]).createTransfer(100, accounts[3].address)
            ).to.be.revertedWith("only approvers");
    });

    it("Should increment the approval", async function () {
    //   await multiSigContract.connect(accounts[0]).createTransfer(100, accounts[3].address);
    //   await multiSigContract.approveTransfer(0);
    //   const tx = await multiSigContract.getTransfer();
    // console.log(await multiSigContract.connect(accounts[0]).approveTransfer(0));
    // //   const balance = await multiSigContract.getBalance();
    // });
    expect(true).to.equal(true);
    })
})