import React from 'react';

const About = () => (
  <div>
    <h2>About</h2>
    <p>Utilising Ethereum's Smart Contract for an E-commerce</p>
    <div>
      <h4>Abstract</h4>
      <p>
      New ways in which people obtain services and how business operate were brought into play
      by the rise of the Internet. Internet connections and associated services that they provide for
      the majority of people are crucial in the present day. E-commerce is one such service or
      industry. E Commerce facilitates the transferring and manga of a vast volume of sensitive data,
      including information from private customers or financial information. As a result of this, a lot
      of cybercriminals who commit cybercrimes are prepared to break the system and steal
      people's data. The frequency at which cybercrime increases is directly proportional to the
      development of e-commerce, which is why it causes worry regarding the security of ecommerce databases.
      As a result of this security breach, e-commerce website owners, organisations, developers,
      programmers should protect the security of data since it comprises customer, employees' and
      transaction records' private information. The data violation not only harms the earnings of the
      firm tremendously but also sabotages the customers' confidence in the platform. A blockchain
      (cryptocurrency) payment system, using Ethereum as means of exchange is proposed. 
      </p>
    </div>
    <hr/>
    <div>
     <h4>Overview: </h4>
      <p>
        We're building a simple ecommerce DApp(Decentralized Application) store where everyone can sell/buy products. <br/> 
        We'll be using <a href="https://www.trufflesuite.com/" target="_blank" rel="noopener noreferrer" title="Sweet tools for smart contracts">Truffle</a> to build the entire app end-to-end. <br/>
        We'll be utilizing 
        <a href="https://ipfs.io/" target="_blank" rel="noopener noreferrer" title="The InterPlanetary File System"> IPFS</a> 
        <b> (a distributed system for storing and accessing files, websites, applications, and data.)
        </b> to host our site to make it truly decentralized. <br/>
        <a href="https://docs.ipfs.io/concepts/what-is-ipfs/#decentralization" target="_blank" rel="noopener noreferrer" title="IPFS powers the Distributed Web">What is IPFS?</a> |
        <a href="https://hackernoon.com/a-beginners-guide-to-ipfs-20673fedd3f" target="_blank" rel="noopener noreferrer" title="Guide to what is IPFS"> Guide to what is IPFS?</a> <br/>
        The contract will also feature an escrow system, which involves a 3-person approval to release funds. 
        Means that instead of the buyer sending money to the sender directly, a third person holds the funds
        until the others have agreed funds should be released | or refunded.
      </p>
    </div>
    <hr/>
    <h4>Feats: </h4>
    <ul>
      <li>Users can see listed products for sale, and choose to buy on the web interface.</li>
      <li>Users can add/list products for sale using the web interface.</li>
      <li>Product images and frontend assets are hosted on IPFS.</li>
      <li>A functioning escrow system:</li>
      <ul> 
        <li>Instead of transferring money directly to the buyer, money is sent to an "escrow" holder.</li>
        <li>This person will release funds or refund funds based on consensus from 2 out of the 3 parties.</li>
        <li>The escrow contract will deduct a 1% fee for these services.</li>
        <li>The application interface is updated as the user makes transactions, by listening to Solidity Events.</li>
      </ul>
    </ul>
    <hr/>
    <h4>Technologies Used: </h4>
    <ul>
      <li>
        <a href="https://www.trufflesuite.com/" target="_blank" rel="noopener noreferrer">Truffle</a>
      </li>
      <li>
        <a href="https://ipfs.io/" target="_blank" rel="noopener noreferrer">IPFS</a>
      </li>
      <li>
        <a href="https://soliditylang.org/" target="_blank" rel="noopener noreferrer">Solidity</a>
      </li>
      <li>
        <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">ReactJS</a>
      </li>
      <li>
        <a href="https://webpack.js.org/" target="_blank" rel="noopener noreferrer">webpack</a>
      </li>
      <li>
        <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">Metamask</a>
      </li>
      <li>
        <a href="https://infura.io/" target="_blank" rel="noopener noreferrer">Infura</a>
      </li>
      <li>
        <b>JavaScript</b> | <b>HTML</b> | <b>CSS</b> 
      </li>
    </ul>
  </div>
);

export default About;
