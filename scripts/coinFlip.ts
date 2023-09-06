import { log } from "console";
import { ethers } from "hardhat";

async function main() {
  const [account1] = await ethers.getSigners();
  const coinFlip = await ethers.getContractAt(
    "CoinFlip",
    "0xc68007C101138af98419872E8B40101df9122B4f",
    account1
  );

  const test = await ethers.getContractAt(
    "TestCoin",
    "0xedF62F67b58d8A5345e4a324eCE3B28D9970c23c",
    account1
  );

  const FACTOR: bigint = BigInt(
    "57896044618658097711785492504343953926634992332820282019728792003956564819968"
  );

  let consecutiveWins = Number(await coinFlip.consecutiveWins());

  
  const blockValue = async () =>
    await test.getHash(
      ((await ethers.provider.getBlockNumber()) - 1).toString()
    );

  while (consecutiveWins < 10) {
    const currentHash = await blockValue();

    while ((await blockValue()) === currentHash) {
      console.log("waiting for new block");
    }

    const flip = Number((await blockValue()) / FACTOR);
    const side = flip === 1;

    console.log(`Currently at ${consecutiveWins} wins for ${side} at ${flip}`);

    console.log(`at ${await blockValue()}`);

    await coinFlip.flip(side);

    consecutiveWins = Number(await coinFlip.consecutiveWins());

    console.log({ consecutiveWins });
  }

  //   const blockValue = await test.blockValue();
  //   const blockNum = await test.blockNum();

  //   const hash = await coinFlip.getHash(blockValue, account1.address);

  //   const prevBLock = await ethers.provider.getBlockNumber() - 1;
  //   // while (consecutiveWins < 10) {
  //   //     const blockValue = await ethers.provider.getBlockNumber();

  //   // }

  //   console.log({
  //     consecutiveWins,
  //     hash,
  //     blockValue,
  //     blockNum,
  //   });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
