const { assert } = require("chai");

const BasicCounter = artifacts.require("BasicCounter");

contract("BasicCounter", (accts) => {
    let bc;
    beforeEach(async () => {
        bc = await BasicCounter.deployed();
    })

    describe("#get()", () => {
        it("should equal 0", async () => {
            let value = await bc.get({from : accts[0]})
            assert.equal(value.toNumber(), 0);
        })
    })

    describe("#increase()", () => {
        it("should increase counter by 1", async () => {
            let prevValue = await bc.get({from : accts[0]})

            await bc.increase({from :  accts[0]});

            let currentValue = await bc.get({from : accts[0]})

            assert.equal(currentValue.toNumber() - prevValue.toNumber(), 1);
        })
    })

    describe("#reset()", () => {
        it("should reset and equal zero", async () => {
            await bc.reset({from : accts[0]});

            let value = await bc.get({from : accts[0]});

            assert.equal(value.toNumber(), 0);
        })
    })
})