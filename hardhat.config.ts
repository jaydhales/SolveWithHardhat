import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import 'dotenv/config'
require('dotenv').config()
const config: HardhatUserConfig = {
  defaultNetwork: 'polygon',
  networks: {
    hardhat: {},
    polygon: {
      url: process.env.POLYGON_RPC_URL,
      //@ts-ignore
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  solidity: '0.8.19',
}

export default config
