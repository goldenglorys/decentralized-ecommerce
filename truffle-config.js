const HDWalletProvider = require('@truffle/hdwallet-provider');
const { alchemyApiKey, mnemonic, projectId } = require('./secrets.json');

// const projectId = "065f4f5fa92b4949895f7ca0aa47afd8";
// const mnemonic = "above usual ordinary slender blur quiz infant renew review wedding comic menu";

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${projectId}`),
      network_id: 3,
      gas: 5500000,      // Ropsten has a lower block limit than mainnet
      networkCheckTimeout: 1000000,
      timeoutBlocks: 200,
    }
    // ropsten: {
    //   url: `https://eth-ropsten.alchemyapi.io/v2/${alchemyApiKey}`,
    //   accounts: { mnemonic: mnemonic },
    //   network_id: 3,
    //   from: 0x7A4614CE012527cDB2e391eB1F9De79883F32814,
    // }
  },
  compilers: {
    solc: {
      version: "^0.4.17",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};

