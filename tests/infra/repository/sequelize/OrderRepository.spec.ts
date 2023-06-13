import { Sequelize } from "sequelize-typescript";
import { Customer } from "../../../../src/domain/entities/Customer";
import Order from "../../../../src/domain/entities/Order";
import OrderItem from "../../../../src/domain/entities/OrderItem";
import Product from "../../../../src/domain/entities/Product";
import { Address } from "../../../../src/domain/value-objects/Address";
import CustomerModel from "../../../../src/infra/db/sequelize/model/CustomerModel";
import OrderModel from "../../../../src/infra/db/sequelize/model/OrderModel";
import OrderItemModel from "../../../../src/infra/db/sequelize/model/OrderItemModel";
import ProductModel from "../../../../src/infra/db/sequelize/model/ProductModel";
import CustomerRepositorySequelize from "../../../../src/infra/db/sequelize/repository/CustomerRepositorySequelize";
import OrderRepositorySequelize from "../../../../src/infra/db/sequelize/repository/OrderRepositorySequelize";
import ProductRepositorySequelize from "../../../../src/infra/db/sequelize/repository/ProductRepositorySequelize";
describe("Order repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepositorySequelize();
    const initCustomerProps = {
      id: "123",
      name: "Customer 1",
    };
    const customer = new Customer(initCustomerProps.id, initCustomerProps.name);
    const initAddressProps = {
      street: "Street 1",
      number: "01",
      city: "City 1",
      state: "State 1",
      zipcode: "88800-0088",
    };

    const address = new Address(
      initAddressProps.street,
      initAddressProps.number,
      initAddressProps.city,
      initAddressProps.state,
      initAddressProps.zipcode
    );
    customer.addAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepositorySequelize();
    const initProductProps = {
      id: "123",
      name: "Product 1",
      price: 10,
    };
    const product = new Product(initProductProps);
    await productRepository.create(product);

    const initOrderItemProps = {
      id: "1",
      name: product.name,
      price: product.price,
      productId: product.id,
      quantity: 2,
    };
    const orderItem = new OrderItem(initOrderItemProps);

    const initOrderProps = {
      id: "123",
      customerId: customer.id,
      items: [orderItem],
    };
    const order = new Order(initOrderProps.id, initOrderProps.customerId, initOrderProps.items);

    const orderRepository = new OrderRepositorySequelize();
    await orderRepository.create(order);

    const { dataValues } = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(dataValues.id).toBe(initOrderProps.id);
    expect(dataValues.customerId).toBe(customer.id);
    expect(dataValues.total).toBe(order.getTotal());
  });

  it("should update a order item", async () => {
    const customerRepository = new CustomerRepositorySequelize();
    const initCustomerProps = {
      id: "123",
      name: "Customer 1",
    };
    const customer = new Customer(initCustomerProps.id, initCustomerProps.name);
    const initAddressProps = {
      street: "Street 1",
      number: "01",
      city: "City 1",
      state: "State 1",
      zipcode: "88800-0088",
    };

    const address = new Address(
      initAddressProps.street,
      initAddressProps.number,
      initAddressProps.city,
      initAddressProps.state,
      initAddressProps.zipcode
    );
    customer.addAddress(address);
    await customerRepository.create(customer);
    const productRepository = new ProductRepositorySequelize();
    const initProductProps = {
      id: "123",
      name: "Product 1",
      price: 10,
    };
    const product = new Product(initProductProps);
    await productRepository.create(product);
    const initOrderItemProps = {
      id: "1",
      name: product.name,
      price: product.price,
      productId: product.id,
      quantity: 2,
    };
    const orderItem = new OrderItem(initOrderItemProps);
    const initOrderProps = {
      id: "123",
      customerId: customer.id,
      items: [orderItem],
    };
    const order = new Order(initOrderProps.id, initOrderProps.customerId, initOrderProps.items);
    const orderRepository = new OrderRepositorySequelize();
    await orderRepository.create(order);

    order.updateOrderItem(orderItem.id, { name: "New name" });
    await orderRepository.update(order);

    const orderUpdated = await orderRepository.find(order.id);
    const updatedItem = orderUpdated.getItem(orderItem.id);
    expect(updatedItem.name).toBe("New name");
  });

  it("should remove a order item", async () => {
    const customerRepository = new CustomerRepositorySequelize();
    const initCustomerProps = {
      id: "123",
      name: "Customer 1",
    };
    const customer = new Customer(initCustomerProps.id, initCustomerProps.name);
    const initAddressProps = {
      street: "Street 1",
      number: "01",
      city: "City 1",
      state: "State 1",
      zipcode: "88800-0088",
    };

    const address = new Address(
      initAddressProps.street,
      initAddressProps.number,
      initAddressProps.city,
      initAddressProps.state,
      initAddressProps.zipcode
    );
    customer.addAddress(address);
    await customerRepository.create(customer);
    const productRepository = new ProductRepositorySequelize();
    const initProductProps = {
      id: "123",
      name: "Product 1",
      price: 10,
    };
    const product = new Product(initProductProps);
    await productRepository.create(product);
    const initOrderItemProps = {
      id: "1",
      name: product.name,
      price: product.price,
      productId: product.id,
      quantity: 2,
    };
    const orderItem = new OrderItem(initOrderItemProps);
    const initOrderItemProps2 = {
      id: "2",
      name: "Product 2",
      price: 10,
      productId: "123456",
      quantity: 2,
    };
    const orderItem2 = new OrderItem(initOrderItemProps2);
    const initOrderProps = {
      id: "123",
      customerId: customer.id,
      items: [orderItem, orderItem2],
    };
    const order = new Order(initOrderProps.id, initOrderProps.customerId, initOrderProps.items);
    const orderRepository = new OrderRepositorySequelize();
    await orderRepository.create(order);

    order.removeItem(orderItem.id);
    await orderRepository.update(order);

    const orderUpdated = await orderRepository.find(order.id);
    expect(orderUpdated.getItems()).toHaveLength(1);
    expect(orderUpdated.getTotal()).toBe(order.getTotal());
  });

  it("should add a new order item on order", async () => {
    const initOrderItemProps = {
      id: "1",
      name: "Product 01",
      price: 10,
      productId: "1",
      quantity: 2,
    };
    const orderItem = new OrderItem(initOrderItemProps);
    const initOrderProps = {
      id: "123",
      customerId: "123",
      items: [orderItem],
    };
    const order = new Order(initOrderProps.id, initOrderProps.customerId, initOrderProps.items);
    const orderRepository = new OrderRepositorySequelize();
    await orderRepository.create(order);

    expect(order.getItems()).toHaveLength(1);
    const initOrderItemProps2 = {
      id: "2",
      name: "Product 2",
      price: 5,
      productId: "2",
      quantity: 2,
    };

    const orderItem2 = new OrderItem(initOrderItemProps2);
    order.addItem(orderItem2);
    await orderRepository.update(order);

    const orderUpdated = await orderRepository.find(order.id);
    expect(orderUpdated.getItems()).toHaveLength(2);
    expect(orderUpdated.getTotal()).toBe(order.getTotal());
  });

  it("should find all orders", async () => {
    const initOrderItemProps1 = {
      id: "1",
      name: "Product 01",
      price: 10,
      productId: "123",
      quantity: 2,
    };
    const orderItem1 = new OrderItem(initOrderItemProps1);

    const initOrderProps1 = {
      id: "123",
      customerId: "123",
      items: [orderItem1],
    };
    const order1 = new Order(initOrderProps1.id, initOrderProps1.customerId, initOrderProps1.items);

    const initOrderItemProps2 = {
      id: "2",
      name: "Product 02",
      price: 10,
      productId: "1234",
      quantity: 3,
    };
    const orderItem2 = new OrderItem(initOrderItemProps2);
    const initOrderProps2 = {
      id: "123456",
      customerId: "123",
      items: [orderItem2],
    };
    const order2 = new Order(initOrderProps2.id, initOrderProps2.customerId, initOrderProps2.items);
    const orderRepository = new OrderRepositorySequelize();
    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();
    expect(orders).toHaveLength(2);
  });

  afterEach(async () => {
    await sequelize.close();
  });
});
