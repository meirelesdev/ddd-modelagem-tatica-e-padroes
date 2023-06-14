import { Customer } from "../../../../src/domain/customer/entity/Customer";
import { Address } from "../../../../src/domain/customer/value-objects/Address";

describe("Customer unit tests", () => {
  it("should not be able to create a new customer without name", () => {
    expect(() => new Customer("123", "")).toThrowError("Name is required");
  });

  it("should create a new customer and change our name", () => {
    const initProps = {
      id: "123",
      name: "Name 01",
    };
    const customer = new Customer(initProps.id, initProps.name);
    expect(customer.id).toBe(initProps.id);
    expect(customer.name).toBe(initProps.name);
    customer.changeName("Name 02");
    expect(customer.id).toBe(initProps.id);
    expect(customer.name).toBe("Name 02");
  });

  it("should create a new customer and activate", () => {
    const initProps = {
      id: "123",
      name: "Name 01",
    };
    const customer = new Customer(initProps.id, initProps.name);
    const address = new Address("Street", "02", "city 01", "state 01", "880000-880");
    customer.addAddress(address);
    expect(customer.isActive()).toBeFalsy();
    customer.activate();
    expect(customer.isActive()).toBeTruthy();
  });

  it("should create a new customer and try active without address", () => {
    const initProps = {
      id: "123",
      name: "Name 01",
    };
    const customer = new Customer(initProps.id, initProps.name);
    expect(customer.isActive()).toBeFalsy();
    expect(() => customer.activate()).toThrowError("Address is mandatory to activate a customer");
  });

  it("should create a new customer and activate and deactivate", () => {
    const initProps = {
      id: "123",
      name: "Name 01",
    };
    const customer = new Customer(initProps.id, initProps.name);
    const address = new Address("Street", "02", "city 01", "state 01", "880000-880");
    customer.addAddress(address);
    expect(customer.isActive()).toBeFalsy();
    customer.activate();
    expect(customer.isActive()).toBeTruthy();
    customer.deactivate();
    expect(customer.isActive()).toBeFalsy();
    expect(customer.rewardPoints).toBe(0);
  });

  it("should create a new customer", () => {
    const customer = new Customer("123", "Daniel Meireles");
    expect(customer.address).toBeUndefined();
    const address = new Address("Street", "02", "city 01", "state 01", "880000-880");
    customer.addAddress(address);
    expect(customer.address).toBeDefined();
  });
  it("should create a new customer with addres", () => {
    const address = new Address("Street", "02", "city 01", "state 01", "880000-880");
    const customer = new Customer("123", "Daniel Meireles", address);
    expect(customer.address).toBeDefined();
  });
});
