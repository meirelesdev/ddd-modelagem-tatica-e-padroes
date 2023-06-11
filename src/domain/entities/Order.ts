import BaseEntity from "./BaseEntity";
import OrderItem from "./OrderItem";

export default class Order extends BaseEntity {
  #customerId: string;
  #orderItems: OrderItem[];
  constructor(id: string, customerId: string, items: OrderItem[]) {
    super(id);
    this.#customerId = customerId;
    this.#orderItems = items;
    this.validate();
  }

  get customerId() {
    return this.#customerId;
  }

  validate(): void {
    if (!this.id) throw new Error("Id is required");
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
