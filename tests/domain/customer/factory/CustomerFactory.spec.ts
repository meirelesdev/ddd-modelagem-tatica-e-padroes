import CustomerFactory from "../../../../src/domain/customer/factory/CustomerFactory";

describe("Customer factory tests", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create({ id: "123", name: "Customer 01" });
    expect(customer.id).toBe("123");
    expect(customer.name).toBe("Customer 01");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with address", () => {
    const customer = CustomerFactory.create({
      id: "123456",
      name: "Customer 02",
      address: {
        street: "Street 02",
        city: "City 02",
        number: "Number 02",
        state: "State 02",
        zipcode: "88000-080",
      },
    });
    expect(customer.id).toBe("123456");
    expect(customer.name).toBe("Customer 02");
    expect(customer.address).toBeDefined();
  });
});
