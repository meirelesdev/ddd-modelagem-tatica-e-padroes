import Order from "../entity/Order";
import OrderItem from "../entity/OrderItem";

type OrderFactoryProps = {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    productId: string;
    quantity: number;
    price: number;
  }[];
};

export default class OrderFactory {
  static create(orderProps: OrderFactoryProps): Order {
    const input = {
      id: orderProps.id,
      customerId: orderProps.customerId,
      items: orderProps.items.map(
        (item) =>
          new OrderItem({
            id: item.id,
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })
      ),
    };
    return new Order(input.id, input.customerId, input.items);
  }
}
