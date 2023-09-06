import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
require("dotenv").config();
const config: HardhatUserConfig = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    // polygon: {
    //   url: process.env.POLYGON_RPC_URL,
    //   //@ts-ignore
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      //@ts-ignore
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.SEPOLIA_ETHERSCAN_API_KEY,
  },
  solidity: "0.8.12",
};

export default config;
