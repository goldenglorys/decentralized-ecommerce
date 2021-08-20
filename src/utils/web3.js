import Web3 from 'web3';

let web3;

export const initWeb3 = () =>
  new Promise(resolve => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            window.ethereum.enable(); // Request account access if needed
            web3 = window.web3;
            web3.eth.defaultAccount = web3.eth.accounts[0];
            console.log(web3);
            if (web3.version.network == "3") {
              console.log("Connected to ropsten test network", web3.eth.defaultAccount);
              resolve(web3);
            } else {
              alert("The metamask ethereum browser is not connected to ropsten test network, connect to ropsten to interact with the smart contracts. Connect and reload the page");
              resolve(web3);
            }
          } catch (error) {
            alert('Please give metamask permission to this site');
           console.log('Please give access to perform transactions.', error);// User denied account access...
        }
      } else if (window.web3) {
        web3 = window.web3;
        web3.eth.defaultAccount = web3.eth.accounts[0];
        console.log(web3);
        if (web3.version.network == "3") {
          console.log("Connected to ropsten test network", web3.eth.defaultAccount);
          resolve(web3);
        } else {
          alert("The metamask ethereum browser is not connected to ropsten test network, connect to ropsten to interact with the smart contracts. Connect and reload the page");
          resolve(web3);
        }
      }
      else {
        if (window.confirm('Non-Ethereum browser detected. You should consider trying MetaMask and reload the page. Click ok to continue to install')) {
          window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn/", "_blank");
        }
        web3 = window.web3;
        console.log(web3);
        resolve(web3);
      }
    });
  });

export const getWeb3 = () => web3;

export const fromWei = (wei, unit) => web3.fromWei(wei, unit);
