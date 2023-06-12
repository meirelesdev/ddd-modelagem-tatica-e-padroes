import BaseEntity from "./BaseEntity";

type ProductProps = {
  id?: string;
  name: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
};
export default class Product extends BaseEntity {
  #name: string;
  #price: number;
  constructor(props: ProductProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this.name = props.name;
    this.price = props.price;
    this.validate();
  }
  validate() {
    if (!super.id) throw new Error("Id is required");
    if (!this.name) throw new Error("Name is required");
    if (!this.price || this.price <= 0) throw new Error("Price must be greater than zero");
  }
  get name() {
    return this.#name;
  }

  get price() {
    return this.#price;
  }

  set name(value: string) {
    this.#name = value || this.name;
  }

  set price(value: number) {
    this.#price = value || this.price;
  }
}
