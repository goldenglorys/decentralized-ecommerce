const HDWalletProvider = require('@truffle/hdwallet-provider');

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

