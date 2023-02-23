const { expect } = require("chai");
import { ethers } from "hardhat";
import { Counter } from "../typechain/Counter";

describe("Deployment", function () {
    let counter: Counter;
    it("It should get iniual value", async function () {
        const Counter = await ethers.getContractFactory("Counter");
        counter = await Counter.deploy();
        const initialCount =  await counter.get();
        expect(initialCount).to.equal(0);
    });
    
    it("It should increase", async function () {
        await counter.inc();
        expect(await counter.get()).to.equal(1);
    });
    it("It should increase", async function () {
       
        await counter.dec();
        expect(await counter.get()).to.equal(0);
    });
})