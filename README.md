# Week 2 Project: Ecommerce Store

**Due**: Sunday, March 25th at 10pm

**Overview**: Build a simple ecommerce DApp store where everyone can sell/buy products. You'll be using Truffle to build the entire app end-to-end.

We'll be utilizing IPFS to host our site to make it truly decentralized. The contract will also feature an escrow system, which involves a 3-person approval to release funds. This means that instead of the buyer sending money to the sender directly, a third person holds the funds until the others have agreed funds should be released (or refunded).

## User Stories
The following user stories must be completed:

- [x] Users can see products for sale, and buy them through a web interface.
- [x] Users can add products for sale using a web interface.
- [x] Product images and frontend assets are hosted on IPFS.
- [x] A functioning escrow system:
  * Instead of transferring money directly to the buyer, money is sent to an "escrow" holder.
  * This person will release funds or refund funds based on consensus from 2 out of the 3 parties.
  * The escrow contract will deduct a 1% fee for these services.
- [x] The WebUI is updated as the user makes transactions, by listening to Solidity Events.
- [ ] User is able to filter products based on category and sold/unsold status. To do this, you'll have to implement an off-blockchain store.

## Tips

* Define a struct for Product information. I recommend using an enum for ProductStatus to represent whether it's available, buying, or sold.
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
* If you want to update the page in real time as different transactions occur, you'll want to use Events in Solidity. You can [read more about them here](http://solidity.readthedocs.io/en/v0.4.21/contracts.html#events).

## Advanced

The following advanced user stories are optional. You're not required to do these, but you will learn more from doing them:

- [x] Write unit tests for your contract functionality. Examples are verifying that money is debited correctly, product availability is updated correctly, products are added correctly.
- [ ] Allow quantity for products in the store.
- [ ] Whatever else you can think of!

## Walkthrough GIF

![week2-assignment-walkthrough](https://user-images.githubusercontent.com/1773032/37879986-a0502d30-30ab-11e8-865e-4b9175a82ab8.gif)

## Development

> *Prerequisites*
> - [truffle](http://truffleframework.com/)
> - [ipfs](https://ipfs.io/docs/install/)

### Build and Deploy the contract

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
