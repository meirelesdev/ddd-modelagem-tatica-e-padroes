import { Address } from "../../../../src/domain/customer/value-objects/Address";

describe("Address unit tests", () => {
  it("should not be able to create a new Addres without street", () => {
    expect(() => new Address("", "02", "city 01", "state 01", "880000-880")).toThrowError(
      "Street is required"
    );
  });

  it("should not be able to create a new Addres without number", () => {
    expect(() => new Address("Street", "", "city 01", "state 01", "880000-880")).toThrowError(
      "Number is required"
    );
  });
  it("should not be able to create a new Addres without City", () => {
    expect(() => new Address("Street", "01", "", "state 01", "880000-880")).toThrowError(
      "City is required"
    );
  });
  it("should not be able to create a new Addres without state", () => {
    expect(() => new Address("Street", "01", "City 01", "", "880000-880")).toThrowError(
      "State is required"
    );
  });

  it("should not be able to create a new Addres without zipcode", () => {
    expect(() => new Address("Street", "01", "City 01", "State 01", "")).toThrowError(
      "Zipcode is required"
    );
  });

  it("should create a valid Address", () => {
    const initProps = {
      street: "Street",
      number: "01",
      city: "City 01",
      state: "State 01",
      zipcode: "88000-008",
    };
    const address = new Address(
      initProps.street,
      initProps.number,
      initProps.city,
      initProps.state,
      initProps.zipcode
    );
    expect(address.street).toBe(initProps.street);
    expect(address.number).toBe(initProps.number);
    expect(address.city).toBe(initProps.city);
    expect(address.state).toBe(initProps.state);
    expect(address.zipcode).toBe(initProps.zipcode);
  });
});
