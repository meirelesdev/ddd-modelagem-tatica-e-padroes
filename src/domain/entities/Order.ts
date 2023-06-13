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
    if (!this.#customerId) throw new Error("CustomerId is required");
    if (!this.getItems().length) throw new Error("Item quantity must be greater then zero");
  }

  getItems() {
    return this.#orderItems;
  }

  getTotal(): number {
    return this.getItems().reduce((sum, item) => sum + item.getTotal(), 0);
  }

  updateOrderItem(orderItemId: string, dataOrderItemValues: Partial<OrderItem>): void {
    const item = this.getItem(orderItemId);
    if (item) {
      this.removeItem(item.id);
      item.name = dataOrderItemValues.name || item.name;
      item.price = dataOrderItemValues.price || item.price;
      item.quantity = dataOrderItemValues.quantity || item.quantity;
      this.addItem(item);
    }
  }

  addItem(item: OrderItem): void {
    this.#orderItems.push(item);
  }

  removeItem(orderItemId: string): void {
    const items = this.getItems().filter((item) => item.id !== orderItemId);
    this.#orderItems = items;
  }

  getItem(orderItemId: string): OrderItem {
    return this.#orderItems.find((order) => order.id === orderItemId);
  }
}
