import OrderFactory from "../../../../src/domain/checkout/factory/OrderFactory";

describe("Order factory tests", () => {
  it("should create an order", () => {
    const orderProps = {
      id: "12345",
      customerId: "123",
      items: [
        {
          id: "1234",
          name: "Product 01",
          productId: "123",
          quantity: 20,
          price: 20,
        },
      ],
    };
    const order = OrderFactory.create(orderProps);
    expect(order.id).toBe(orderProps.id);
    expect(order.customerId).toBe(orderProps.customerId);
    expect(order.getItems()).toHaveLength(orderProps.items.length);
  });
});
