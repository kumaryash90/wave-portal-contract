const { hexStripZeros } = require("@ethersproject/bytes")

const main = async() => {
    // compile
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

    // deploy
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1")
    });
    await waveContract.deployed();

    console.log("Contract deployed to: ", waveContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("initial contract balance: ", hre.ethers.utils.formatEther(contractBalance));

    // let waveCount = await waveContract.waveCount();
    // console.log("wave count: ", waveCount.toNumber());

    let waveTxn = await waveContract.wave("Hello..!!");
    await waveTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("contract balance: ", hre.ethers.utils.formatEther(contractBalance));

    await new Promise(resolve => setTimeout(resolve,6000));

    waveTxn = await waveContract.wave("Hello again..!!");
    await waveTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("contract balance: ", hre.ethers.utils.formatEther(contractBalance));

    // const [_, randomPerson] = await hre.ethers.getSigners();
    // waveTxn = await waveContract.connect(randomPerson).wave("Hello, by random person..!!");
    // await waveTxn.wait();

    let allWaves = await waveContract.getAllWaves();
    console.log("waves array: ", allWaves);
};

const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
