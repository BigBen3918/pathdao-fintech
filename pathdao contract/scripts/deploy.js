// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// const hre = require("hardhat");
require("dotenv").config();
const fs = require("fs");
const { ethers } = require("hardhat");

const saveFiles = async (fileName, data) => {
    const fs = require("fs");
    const contractsDir = "./build/";

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(contractsDir + fileName, data);
    console.log("export file", fileName);
};

const saveAbis = async () => {
    const PresaleABI = artifacts.readArtifactSync("Presale").abi;
    await saveFiles(
        "abis.json",
        JSON.stringify(
            {
                Presale: PresaleABI,
            },
            undefined,
            4
        )
    );
};

async function main() {
    var [owner] = await ethers.getSigners();
    let network = await owner.provider._networkPromise;
    console.log("ChainId: ", network.chainId);

    const USDCAddress = process.env.USDCADDRESS;

    // $SBC token deployment
    const PresaleTokenContract = await ethers.getContractFactory("ERC20");
    const SBCToken = await PresaleTokenContract.deploy("Spinblade Coin", "SBC");
    await SBCToken.deployed();

    console.log("Token deployed to:", SBCToken.address);

    // presale Contract deployment
    const PresaleContract = await ethers.getContractFactory("Presale");
    const deployedPresaleContract = await PresaleContract.deploy(
        SBCToken.address,
        USDCAddress
    );

    await deployedPresaleContract.deployed();

    console.log(
        "Presale Contract deployed to:",
        deployedPresaleContract.address
    );

    const addresses = {
        Presale: deployedPresaleContract.address,
    };
    await saveFiles("addresses.json", JSON.stringify(addresses, undefined, 4));
    saveAbis();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
