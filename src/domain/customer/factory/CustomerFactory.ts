import { Customer } from "../entity/Customer";
import CustomerInterface from "../entity/CustomerInterface";
import { Address } from "../value-objects/Address";

export default class CustomerFactory {
  static create(data: {
    id?: string;
    name: string;
    address?: { street: string; number: string; city: string; state: string; zipcode: string };
  }): CustomerInterface {
    const customer = new Customer(data.id, data.name);
    if (data.address) {
      const { street, number, city, state, zipcode } = data.address;
      const address = new Address(street, number, city, state, zipcode);
      customer.addAddress(address);
    }
    return customer;
  }
}
