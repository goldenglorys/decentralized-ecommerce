module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
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

