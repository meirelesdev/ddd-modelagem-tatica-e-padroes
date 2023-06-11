import { Customer } from "../entities/Customer";
import Order from "../entities/Order";
import OrderItem from "../entities/OrderItem";
import { v4 as uuidv4 } from "uuid";

export default class OrderService {
  static getTotalOrders(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.getTotal(), 0);
  }
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    const initProps = {
      id: uuidv4(),
      customer: customer,
      items: items,
    };
    const order = new Order(initProps.id, initProps.customer.id, initProps.items);
    const points = order.getTotal() / 2;
    customer.setPoints(points);
    return order;
  }
}
