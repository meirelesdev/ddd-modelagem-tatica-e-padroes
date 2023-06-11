import OrderItem from "./OrderItem";

export default class Order {
  #id: string;
  #customerId: string;
  #orderItems: OrderItem[];
  constructor(id: string, customerId: string, items: OrderItem[]) {
    this.#id = id;
    this.#customerId = customerId;
    this.#orderItems = items;
    this.validate();
  }

  get id() {
    return this.#id;
  }

  get customerId() {
    return this.#customerId;
  }

  validate(): void {
    if (!this.#id) throw new Error("Id is required");
    if (!this.#customerId) throw new Error("CustomerId is required");
    if (!this.getItems().length) throw new Error("Item quantity must be greater then zero");
  }

  getItems() {
    return this.#orderItems;
  }

  getTotal(): number {
    return this.getItems().reduce((sum, item) => sum + item.getTotal(), 0);
  }
}
