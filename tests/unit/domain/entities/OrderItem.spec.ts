import Order from "../../../../src/domain/entities/Order";
import OrderItem from "../../../../src/domain/entities/OrderItem";

describe("OrderItem unit tests", () => {
  it("should create a new order item", () => {
    const orderItemProps = {
      id: "1",
      productId: "1",
      name: "Item 1",
      price: 10,
      quantity: 2,
    };
    const orderItem = new OrderItem(orderItemProps);
    expect(orderItem.id).toBe(orderItemProps.id);
    expect(orderItem.productId).toBe(orderItemProps.productId);
    expect(orderItem.name).toBe(orderItemProps.name);
    expect(orderItem.price).toBe(orderItemProps.price);
    expect(orderItem.quantity).toBe(orderItemProps.quantity);
    const total = orderItem.getTotal();
    expect(total).toBe(20);
  });

  it("should throw error if the item quantity is leass or equal zero", () => {
    const orderItemProps = {
      id: "1",
      productId: "1",
      name: "Item 1",
      price: 10,
      quantity: 0,
    };
    expect(() => new OrderItem(orderItemProps)).toThrowError("Quantity must be greater then zero");
  });
});
