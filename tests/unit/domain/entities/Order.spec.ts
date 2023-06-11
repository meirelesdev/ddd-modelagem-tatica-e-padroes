import Order from "../../../../src/domain/entities/Order";
import OrderItem from "../../../../src/domain/entities/OrderItem";

describe("Order unit tests", () => {
  it("should not be able to create a new order when id is empty", () => {
    expect(() => new Order("", "123", [])).toThrowError("Id is required");
  });

  it("should not be able to create a new order when customerId is empty", () => {
    expect(() => new Order("1", "", [])).toThrowError("CustomerId is required");
  });

  it("should not be able to create a new order when items is empty", () => {
    expect(() => new Order("1", "123", [])).toThrowError("Item quantity must be greater then zero");
  });

  it("should create a new order", () => {
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
    const order = new Order(initProps.id, initProps.customerId, initProps.items);
    expect(order.id).toBeDefined();
    expect(order.id).toBe(initProps.id);
    expect(order.customerId).toBeDefined();
    expect(order.customerId).toBe(initProps.customerId);
    expect(order.getItems()).toHaveLength(initProps.items.length);
    expect(order.getTotal()).toBe(25);
  });
});
