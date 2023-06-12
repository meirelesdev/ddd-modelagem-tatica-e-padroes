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

  it("should update a new order", async () => {
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
  });

  afterEach(async () => {
    await sequelize.close();
  });
});
