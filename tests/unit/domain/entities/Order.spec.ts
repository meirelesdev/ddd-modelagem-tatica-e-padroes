import { Customer } from "../../../../src/domain/entities/Customer";
import Order from "../../../../src/domain/entities/Order";
import OrderItem from "../../../../src/domain/entities/OrderItem";
import { Address } from "../../../../src/domain/value-objects/Address";

describe("Order unit tests", () => {
  it("should not be able to create a new order when id is empty", () => {
    expect(() => new Order("", '123', [])).toThrowError("Id is required");
  });

  it("should not be able to create a new order when customerId is empty", () => {
    expect(() => new Order("1", '', [])).toThrowError("CustomerId is required");
  });

  it("should not be able to create a new order when items is empty", () => {
    expect(() => new Order("1", '123', [])).toThrowError("Item quantity must be greater then zero");
  });

  it("should create a new order", () => {
    const initProps = {
      id: "1",
      customerId: "123",
      items: [new OrderItem("1", "Item 1", 10, 2), new OrderItem("2", "Item 2", 5, 1)]
    }
    const order = new Order(initProps.id, initProps.customerId, initProps.items)
    expect(order.id).toBeDefined()
    expect(order.id).toBe(initProps.id)
    expect(order.customerId).toBeDefined()
    expect(order.customerId).toBe(initProps.customerId)
    expect(order.getItems()).toHaveLength(initProps.items.length)
    expect(order.getTotal()).toBe(25)
  });

  it("should create a new customer and change our name", () => {
    const initProps = {
      id: "123",
      name: "Name 01"
    }
    const customer = new Customer(initProps.id, initProps.name);
    expect(customer.id).toBe(initProps.id);
    expect(customer.name).toBe(initProps.name);
    customer.changeName("Name 02")
    expect(customer.id).toBe(initProps.id);
    expect(customer.name).toBe("Name 02");
  });

  it("should create a new customer and activate", () => {
    const initProps = {
      id: "123",
      name: "Name 01"
    }
    const customer = new Customer(initProps.id, initProps.name);
    const address = new Address("Street", "02", "city 01", "state 01", "880000-880");
    customer.addAddress(address)
    expect(customer.isActive()).toBeFalsy();
    customer.activate();
    expect(customer.isActive()).toBeTruthy();
  });

  it("should create a new customer and try active without address", () => {
    const initProps = {
      id: "123",
      name: "Name 01"
    }
    const customer = new Customer(initProps.id, initProps.name);
    expect(customer.isActive()).toBeFalsy();
    expect(() => customer.activate()).toThrowError("Address is mandatory to activate a customer");
  });

  it("should create a new customer and activate and deactivate", () => {
    const initProps = {
      id: "123",
      name: "Name 01"
    }
    const customer = new Customer(initProps.id, initProps.name);
    const address = new Address("Street", "02", "city 01", "state 01", "880000-880");
    customer.addAddress(address)
    expect(customer.isActive()).toBeFalsy();
    customer.activate();
    expect(customer.isActive()).toBeTruthy();
    customer.deactivate();
    expect(customer.isActive()).toBeFalsy();
  });

  it("should create a new customer", () => {
    const customer = new Customer("123", "Daniel Meireles");
    expect(customer.address).toBeUndefined();
    const address = new Address("Street", "02", "city 01", "state 01", "880000-880");
    customer.addAddress(address)
    expect(customer.address).toBeDefined();
  });
  it("should create a new customer with addres", () => {
    const address = new Address("Street", "02", "city 01", "state 01", "880000-880");
    const customer = new Customer("123", "Daniel Meireles", address);
    expect(customer.address).toBeDefined();
  });
})