import BaseEntity from "./BaseEntity";

export default class Product extends BaseEntity {
  #name: string;
  #price: number;
  constructor(id: string, name: string, price: number) {
    super(id);
    this.#name = name;
    this.#price = price;
    this.validate();
  }
  validate() {
    if (!this.id) throw new Error("Id is required");
    if (!this.name) throw new Error("Name is required");
    if (this.price <= 0) throw new Error("Price must be greater than zero");
  }
  get name() {
    return this.#name;
  }
  set name(value: string) {
    this.#name = value || this.name;
  }
  get price() {
    return this.#price;
  }

  set price(value: number) {
    this.#price = value || this.price;
  }
}
