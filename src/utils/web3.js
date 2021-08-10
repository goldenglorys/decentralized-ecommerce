import Web3 from 'web3';

let web3;

export const initWeb3 = () =>
  new Promise(resolve => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            window.ethereum.enable();// Request account access if needed
            console.log('Connected to metamask');
          } catch (error) {
           console.log('Please give access to perform transactions.');// User denied account access...
        }
        web3 = window.web3;
        console.log(web3);
        resolve(web3);
      } else if (window.web3) {
        web3 = window.web3;
        console.log(web3);
        resolve(web3);
        console.log('Connected to metamask');
      }
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        web3 = window.web3;
        console.log(web3);
        resolve(web3);
      }
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      // if (typeof window.web3 !== 'undefined') {
      //   // Use Mist/MetaMask's provider.
      //   web3 = new Web3(window.web3.currentProvider);

      //   console.log('Injected web3 detected.'); // eslint-disable-line

      //   resolve(web3);
      // } else {
      //   // Fallback to localhost if no web3 injection. We've configured this to
      //   // use the development console's port by default.
      //   const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      //   web3 = new Web3(provider);

      //   console.log('No web3 instance injected, using Local web3.'); // eslint-disable-line

      //   resolve(web3);
      // }
      // web3.eth.defaultAccount = '0x7A4614CE012527cDB2e391eB1F9De79883F32814'
      // // web3.eth.defaultAccount = web3.eth.accounts[0];
      // // web3.personal.unlockAccount(web3.eth.defaultAccount)
      // // web3.personal.unlockAccount(web3.eth.defaultAccount)
    });
  });

export const getWeb3 = () => web3;

export const fromWei = (wei, unit) => web3.fromWei(wei, unit);
