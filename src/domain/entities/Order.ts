import OrderItem from "./OrderItem";

export default class Order {
  #id: any;
  #customerId: string;
  #orderItems: OrderItem[];
  constructor(id: string, customerId: string, items: any[]) {
    this.#id = id;
    this.#customerId = customerId
    this.#orderItems = items;
  }

  getTotal(): number {
    return this.#orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }
}