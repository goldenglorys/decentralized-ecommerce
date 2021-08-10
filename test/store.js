const {promisify} = require('util');
const Store = artifacts.require('./Store.sol');
const Escrow = artifacts.require('./Escrow.sol');

contract('Store', async accounts => {
  let store;

  beforeEach(async () => {
    store = await Store.new(); // Create new instance for every test case
  });

  it('can get product count', async () => {
    await store.addProduct(
      'Product 1',
      'Test Product',
      'image_link',
      'desc_link',
      web3.toWei(1, 'ether'),
    );

    await store.addProduct(
      'Product 2',
      'Test Product',
      'image_link',
      'desc_link',
      web3.toWei(1, 'ether'),
    );

    const productCount = await store.getProductCount.call();

    assert.equal(productCount.toNumber(), 2);
  });

  it('can get product id at index', async () => {
    let expectedId;
    let index;
    const productCreatedEvent = store.ProductCreated();
    productCreatedEvent.watch((error, event) => {
      expectedId = event.args.id;
      index = event.args.index;
    });

    await store.addProduct(
      'Product 1',
      'Test Product',
      'image_link',
      'desc_link',
      web3.toWei(1, 'ether'),
    );

    const id = await store.getProductIdAt.call(index);

    assert.equal(expectedId, id);
  });

  it('can get product by id', async () => {
    let id;
    const productCreatedEvent = store.ProductCreated();
    productCreatedEvent.watch((error, event) => {
      id = event.args.id;
    });

    const productData = [
      'Product 1',
      'Test Product',
      'image_link',
      'desc_link',
      web3.toWei(1, 'ether'),
    ];

    await store.addProduct(...productData);

    const [
      name,
      category,
      imageLink,
      descLink,
      price,
    ] = await store.getProduct.call(id);

    assert.equal(name, productData[0]);
    assert.equal(category, productData[1]);
    assert.equal(imageLink, productData[2]);
    assert.equal(descLink, productData[3]);
    assert.equal(price, productData[4]);
  });

  it('can add new product and retrive it again', async () => {
    let productCount = await store.getProductCount.call();
    assert.equal(productCount.toNumber(), 0);

    const expectedName = 'Product 1';
    let index;
    const productCreatedEvent = store.ProductCreated();
    productCreatedEvent.watch((error, event) => {
      index = event.args.index;
    });
    await store.addProduct(
      expectedName,
      'Test Product',
      'image_link',
      'desc_link',
      web3.toWei(1, 'ether'),
    );

    productCount = await store.getProductCount.call();
    assert.equal(productCount.toNumber(), 1);

    const productId = await store.getProductIdAt.call(index);
    const [name] = await store.getProduct.call(productId);

    assert.equal(name, expectedName);
  });

  it('only owner can add new product', async () => {
    try {
      await store.addProduct(
        'Product',
        'Test Product',
        'image_link',
        'desc_link',
        web3.toWei(1, 'ether'),
        {
          from: accounts[1],
        },
      );
    } catch (ex) {
      assert.isOk(/revert/.test(ex), `${ex} should contain revert`);
    }
  });

  it('can place an order', async () => {
    let productId;
    const amount = web3.toWei(1.5, 'ether');
    const buyer = accounts[1];

    store.ProductCreated().watch((error, event) => {
      productId = event.args.id;
    });

    await store.addProduct(
      'Product',
      'Test Product',
      'image_link',
      'desc_link',
      amount,
    );
    await store.placeOrder(productId, {
      from: buyer,
      value: amount,
    });

    const orderCreatedEvent = store.OrderCreated(
      {},
      {fromBlock: 0, toBlock: 'lasted'},
    );
    let ordersCreated = await promisify(
      orderCreatedEvent.get.bind(orderCreatedEvent),
    )();
    let [{args: {escrow}}] = ordersCreated;

    const escrowBalance = await web3.eth.getBalance(escrow);

    assert.equal(ordersCreated.length, 1);
    assert.equal(escrowBalance.toNumber(), amount);
  });
});
