import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Customer } from "../../../../src/domain/entities/Customer";
import { Address } from "../../../../src/domain/value-objects/Address";
import CustomerModel from "../../../../src/infra/db/sequelize/model/CustomerModel";
import CustomerRepositorySequelize from "../../../../src/infra/db/sequelize/repository/CustomerRepositorySequelize";

describe("Customer repository tests", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    const configSequelize: SequelizeOptions = {
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    };
    sequelize = new Sequelize(configSequelize);
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepositorySequelize();
    const initProps = {
      id: "123",
      name: "Name 01",
    };
    const customer = new Customer(initProps.id, initProps.name);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });
    expect(customerModel.id).toBe(customer.id);
    expect(customerModel.name).toBe(customer.name);
  });

  it("should create a customer with address", async () => {
    const customerRepository = new CustomerRepositorySequelize();
    const initProps = {
      id: "123",
      name: "Name 01",
    };
    const customer = new Customer(initProps.id, initProps.name);
    const address = new Address("rua 01", "01", "city 01", "state", "88000-008");
    customer.addAddress(address);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });
    expect(customerModel.id).toBe(customer.id);
    expect(customerModel.name).toBe(customer.name);
    expect(customerModel.street).toBe(customer.address.street);
    expect(customerModel.number).toBe(customer.address.number);
    expect(customerModel.state).toBe(customer.address.state);
    expect(customerModel.city).toBe(customer.address.city);
    expect(customerModel.zipcode).toBe(customer.address.zipcode);
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepositorySequelize();
    const initProps = {
      id: "123",
      name: "Name 01",
    };
    const customer = new Customer(initProps.id, initProps.name);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });

    expect(customerModel.id).toBe(customer.id);
    expect(customerModel.name).toBe(customer.name);

    customer.changeName("Name 02");

    await customerRepository.update(customer);

    const customerModel2 = await CustomerModel.findOne({ where: { id: customer.id } });
    expect(customerModel2.id).toBe(customer.id);
    expect(customerModel2.name).toBe(customer.name);
  });

  it("should update a customer with address", async () => {
    const customerRepository = new CustomerRepositorySequelize();
    const initProps = {
      id: "123",
      name: "Name 01",
    };
    const customer = new Customer(initProps.id, initProps.name);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });

    expect(customerModel.id).toBe(customer.id);
    expect(customerModel.name).toBe(customer.name);
    const address = new Address("rua 01", "01", "city 01", "state", "88000-008");
    customer.addAddress(address);

    await customerRepository.update(customer);

    const customerModel2 = await CustomerModel.findOne({ where: { id: customer.id } });
    expect(customerModel2.id).toBe(customer.id);
    expect(customerModel2.name).toBe(customer.name);
    expect(customerModel2.street).toBe(customer.address.street);
    expect(customerModel2.number).toBe(customer.address.number);
    expect(customerModel2.state).toBe(customer.address.state);
    expect(customerModel2.city).toBe(customer.address.city);
    expect(customerModel2.zipcode).toBe(customer.address.zipcode);
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepositorySequelize();
    const initProps = {
      id: "123",
      name: "Name 01",
    };
    const customer = new Customer(initProps.id, initProps.name);
    const address = new Address("rua 01", "01", "city 01", "state", "88000-008");
    customer.addAddress(address);
    await customerRepository.create(customer);

    const customerFound = await customerRepository.find(customer.id);

    expect(customerFound.id).toBe(customer.id);
    expect(customerFound.name).toBe(customer.name);
    expect(customerFound.address).toBeDefined();
    expect(customerFound.address.street).toBe(customer.address.street);
    expect(customerFound.address.number).toBe(customer.address.number);
    expect(customerFound.address.city).toBe(customer.address.city);
    expect(customerFound.address.state).toBe(customer.address.state);
    expect(customerFound.address.zipcode).toBe(customer.address.zipcode);
  });

  it("should find a customer with address", async () => {
    const customerRepository = new CustomerRepositorySequelize();
    const initProps = {
      id: "123",
      name: "Name 01",
    };
    const customer = new Customer(initProps.id, initProps.name);
    await customerRepository.create(customer);

    const customerFound = await customerRepository.find(customer.id);

    expect(customerFound.id).toBe(customer.id);
    expect(customerFound.name).toBe(customer.name);
  });

  it("should findAll customers", async () => {
    const customerRepository = new CustomerRepositorySequelize();
    const initProps1 = {
      id: "123",
      name: "Name 01",
    };
    const customer1 = new Customer(initProps1.id, initProps1.name);
    await customerRepository.create(customer1);
    const initProps2 = {
      id: "12345",
      name: "Name 02",
    };
    const customer2 = new Customer(initProps2.id, initProps2.name);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers[0].id).toBe(customer1.id);
    expect(customers[0].name).toBe(customer1.name);

    expect(customers[1].id).toBe(customer2.id);
    expect(customers[1].name).toBe(customer2.name);
  });

  it("should findAll customers with address", async () => {
    const customerRepository = new CustomerRepositorySequelize();
    const initProps1 = {
      id: "123",
      name: "Name 01",
    };
    const customer1 = new Customer(initProps1.id, initProps1.name);
    const address1 = new Address("rua 01", "01", "city 01", "state", "88000-008");
    customer1.addAddress(address1);
    await customerRepository.create(customer1);
    const initProps2 = {
      id: "12345",
      name: "Name 02",
    };
    const customer2 = new Customer(initProps2.id, initProps2.name);
    const address2 = new Address("rua 02", "02", "city 02", "state 02", "88000-008");
    customer2.addAddress(address2);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers[0].id).toBe(customer1.id);
    expect(customers[0].name).toBe(customer1.name);
    expect(customers[0].address).toBeDefined();
    expect(customers[0].address.street).toBe(customer1.address.street);
    expect(customers[0].address.number).toBe(customer1.address.number);
    expect(customers[0].address.state).toBe(customer1.address.state);
    expect(customers[0].address.city).toBe(customer1.address.city);
    expect(customers[0].address.zipcode).toBe(customer1.address.zipcode);

    expect(customers[1].id).toBe(customer2.id);
    expect(customers[1].name).toBe(customer2.name);
    expect(customers[1].address).toBeDefined();
    expect(customers[1].address.street).toBe(customer2.address.street);
    expect(customers[1].address.number).toBe(customer2.address.number);
    expect(customers[1].address.state).toBe(customer2.address.state);
    expect(customers[1].address.city).toBe(customer2.address.city);
    expect(customers[1].address.zipcode).toBe(customer2.address.zipcode);
  });

  afterEach(async () => {
    await sequelize.close();
  });
});
