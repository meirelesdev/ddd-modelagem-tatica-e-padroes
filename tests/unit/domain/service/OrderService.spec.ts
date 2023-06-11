import { Customer } from "../../../../src/domain/entities/Customer";
import Order from "../../../../src/domain/entities/Order";
import OrderItem from "../../../../src/domain/entities/OrderItem";
import OrderService from "../../../../src/domain/service/OrderService";

let order1: Order;
let order2: Order;
describe("Order service unit tests", () => {
  beforeEach(() => {
    const orderItemProps1 = {
      id: "1",
      productId: "1",
      name: "Item 1",
      price: 10,
      quantity: 2,
    };
    const orderItemProps2 = {
      id: "2",
      productId: "2",
      name: "Item 2",
      price: 5,
      quantity: 1,
    };
    const initProps = {
      id: "1",
      customerId: "123",
      items: [new OrderItem(orderItemProps1), new OrderItem(orderItemProps2)],
    };
    const orderItemProps3 = {
      id: "1",
      productId: "1",
      name: "Item 1",
      price: 10,
      quantity: 2,
    };
    const orderItemProps4 = {
      id: "2",
      productId: "2",
      name: "Item 2",
      price: 50,
      quantity: 2,
    };
    const initProps2 = {
      id: "1",
      customerId: "123",
      items: [new OrderItem(orderItemProps3), new OrderItem(orderItemProps4)],
    };
    order1 = new Order(initProps.id, initProps.customerId, initProps.items);
    order2 = new Order(initProps2.id, initProps2.customerId, initProps2.items);
  });
  it("should get total of all orders", () => {
    const orders = [order1, order2];
    const total = OrderService.getTotalOrders(orders);
    expect(total).toBe(145);
  });

  it("should plance an order and set point to customer", () => {
    const customer = new Customer("1", "Customer 1");
    const orderItemProps1 = {
      id: "1",
      productId: "1",
      name: "Item 1",
      price: 10,
      quantity: 2,
    };
    const orderItemProps2 = {
      id: "2",
      productId: "2",
      name: "Item 2",
      price: 10,
      quantity: 1,
    };
    const initProps = {
      id: "1",
      customer: customer,
      items: [new OrderItem(orderItemProps1), new OrderItem(orderItemProps2)],
    };
    OrderService.placeOrder(initProps.customer, initProps.items);
    expect(customer.rewardPoints).toBe(15);
  });
});
