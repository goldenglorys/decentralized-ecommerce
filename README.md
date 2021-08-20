# Decentralize: Ecommerce Store

**Overview**: This is a simple ecommerce DApp store where everyone can sell/buy products. Truffle framework is being used to build the entire app end-to-end.

By utilizing IPFS to host the site(image files first, site fully with other assests would be shift to IPFS later in the future) to make it truly decentralized. 
- The contract will also feature an escrow system, which involves a 3-person approval to release funds. This means that instead of the buyer sending money to the sender directly, a third person holds the funds until the others have agreed funds should be released (or refunded). **To be added**

## User Stories
The following user stories must be completed:

- [x] Users can see products for sale, and buy them through a web interface.
- [x] Users can add products for sale using a web interface.
- [x] Product images are being hosted on IPFS.
- [x] The WebUI is updated as the user makes transactions, by listening to Solidity Events.
- [ ] Frontend/site assets are being hosted on IPFS.
- [ ] A functioning escrow system:
  * Instead of transferring money directly to the buyer, money is sent to an "escrow" holder.
  * This person will release funds or refund funds based on consensus from 2 out of the 3 parties.
  * The escrow contract will deduct a 1% fee for these services.
- [ ] User is able to filter products based on category and sold/unsold status. To do this, an off-blockchain store would be implemented so as to aid the search of listed product but actual transactions won't be done on the off-blockchain store, just the items list would be there.

## Tips

* Define a struct for Product information.ProductStatus to represent whether it's available, buying, or sold may be enum.
```
struct Product {
  string name;
  string category;
  string imageLink;
  string descLink;
  uint price;
  ProductStatus status;
}
```
* Updating the page in real time as different transactions occur will use Events in Solidity. [Solidity Events](http://solidity.readthedocs.io/en/v0.4.21/contracts.html#events).

## Advanced

The following advanced user stories are optional, and more knowledge are gain from doing them:

- [x] Writing unit tests for the contract functionality. Examples are verifying that money is debited correctly, product availability is updated correctly, products are added correctly.
- [ ] Allow quantity for products in the store.
- [ ] Whatever else that could be think of!

## Development

> *Prerequisites*
> - [truffle](http://truffleframework.com/)
> - [ipfs](https://ipfs.io/docs/install/)

### Building and Deploying the contract

```
$ truffle compile
$ truffle migrate
```

### Start IPFS deamon

```
$ ipfs daemon
```

> If you have problem with CORS access, run below command and restart your deamon:
>```
>ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
>ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'
>ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
>```

### Start the Web App

```
$ npm install
$ npm run dev
```

#### Live deploy link of MVP
> [Decentralize Ecommerce](https://dapp-ecom.netlify.app/)
