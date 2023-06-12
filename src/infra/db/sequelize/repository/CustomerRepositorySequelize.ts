import { Customer } from "../../../../domain/entities/Customer";
import CustomerRepositoryInterface from "../../../../domain/repository/CustomerRepositoryInterface";
import { Address } from "../../../../domain/value-objects/Address";
import CustomerModel from "../model/CustomerModel";

export default class CustomerRepositorySequelize implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    const dataCustomer = {
      id: entity.id,
      name: entity.name,
      active: entity.isActive(),
      points: entity.rewardPoints,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      city: entity.address ? entity.address.city : null,
      number: entity.address ? entity.address.number : null,
      street: entity.address ? entity.address.street : null,
      zipcode: entity.address ? entity.address.zipcode : null,
      state: entity.address ? entity.address.state : null,
    };
    await CustomerModel.create(dataCustomer);
  }
  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        active: entity.isActive(),
        points: entity.rewardPoints,
        street: entity.address ? entity.address.street : null,
        number: entity.address ? entity.address.number : null,
        city: entity.address ? entity.address.city : null,
        zipcode: entity.address ? entity.address.zipcode : null,
        state: entity.address ? entity.address.state : null,
      },
      { where: { id: entity.id } }
    );
  }
  async find(id: string): Promise<Customer> {
    const customerModel = await CustomerModel.findOne({ where: { id: id } });
    const customer = new Customer(customerModel.id, customerModel.name);
    if (customerModel.street) {
      const address = new Address(
        customerModel.dataValues.street,
        customerModel.dataValues.number,
        customerModel.dataValues.city,
        customerModel.dataValues.state,
        customerModel.dataValues.zipcode
      );
      customer.addAddress(address);
    }
    return customer;
  }
  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();
    const customers = customerModels.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);
      if (customerModel.street) {
        const address = new Address(
          customerModel.street,
          customerModel.number,
          customerModel.city,
          customerModel.state,
          customerModel.zipcode
        );
        customer.addAddress(address);
      }
      return customer;
    });
    return customers;
  }
}
