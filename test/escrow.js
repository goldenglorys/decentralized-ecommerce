const {promisify} = require('util');
const Store = artifacts.require('./Store.sol');
const Escrow = artifacts.require('./Escrow.sol');

contract('Escrow', async accounts => {
  let store;
  let productId;
  let escrow;
  let seller = accounts[0];
  let buyer = accounts[1];
  let middleMan = accounts[2];

  beforeEach(async () => {
    store = await Store.new();

    await store.addProduct(
      'Product 1',
      'Test Product',
      'image_link',
      'desc_link',
      web3.toWei(1, 'ether'),
    );

    const productCreatedEvent = store.ProductCreated();
    [{args: {id: productId}}] = await promisify(
      productCreatedEvent.get.bind(productCreatedEvent),
    )();

    await store.placeOrder(productId, {
      from: buyer,
      value: web3.toWei(1, 'ether'),
    });

    const orderCreatedEvent = store.OrderCreated();
    [{args: {escrow}}] = await promisify(
      orderCreatedEvent.get.bind(orderCreatedEvent),
    )();
    escrow = Escrow.at(escrow);
  });

  it('middle man cannot accept', async () => {
    try {
      await escrow.accept({from: middleMan});
    } catch (ex) {
      assert.isOk(/revert/.test(ex), `${ex} should contain revert`);
    }
  });

  it('seller can accept', async () => {
    let sellerOk = await escrow.sellerOk.call();
    assert.equal(sellerOk.toNumber(), 0);
    await escrow.accept({from: seller});
    sellerOk = await escrow.sellerOk.call();
    assert.notEqual(sellerOk.toNumber(), 0);
  });

  it('buyer can accept', async () => {
    let buyerOk = await escrow.buyerOk.call();
    assert.equal(buyerOk.toNumber(), 0);
    await escrow.accept({from: buyer});
    buyerOk = await escrow.buyerOk.call();
    assert.notEqual(buyerOk.toNumber(), 0);
  });

  it('seller can reject and refund to buyer', async () => {
    const buyerBalance = await web3.eth.getBalance(buyer);
    const escrowBalance = await web3.eth.getBalance(escrow.address);

    await escrow.reject({from: seller});

    const newBuyerBalance = await web3.eth.getBalance(buyer);

    assert.equal(
      newBuyerBalance.toNumber(),
      buyerBalance.toNumber() + escrowBalance.toNumber(),
    );
  });

  it('buyer can reject and refund to buyer', async () => {
    const buyerBalance = await web3.eth.getBalance(buyer);

    await escrow.reject({from: buyer});

    const newBuyerBalance = await web3.eth.getBalance(buyer);
    const escrowBalance = await web3.eth.getBalance(escrow.address);

    assert.equal(escrowBalance.toNumber(), 0);

    assert.isAbove(newBuyerBalance.toNumber(), buyerBalance.toNumber());
  });

  it('both seller and buyer accept and fund tranfer to seller', async () => {
    const sellerBalance = await web3.eth.getBalance(seller);

    await escrow.accept({from: buyer});
    await escrow.accept({from: seller});

    const newSellerBalance = await web3.eth.getBalance(seller);
    const escrowBalance = await web3.eth.getBalance(escrow.address);

    assert.equal(escrowBalance.toNumber(), 0);
    assert.isAbove(newSellerBalance.toNumber(), sellerBalance.toNumber());
  });
});
