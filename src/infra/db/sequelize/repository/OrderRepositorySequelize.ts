import Order from "../../../../domain/entities/Order";
import OrderRepositoryInterface from "../../../../domain/repository/OrderRepositoryInterface";
import OrderModel from "../model/OrderModel";
import OrderItemModel from "../model/OrderItemModel";
import OrderItem from "../../../../domain/entities/OrderItem";

export default class OrderRepositorySequelize implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    const items = entity.getItems().map((item) => {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        orderId: entity.id,
        quantity: item.quantity,
        productId: item.productId,
      };
    });

    await OrderModel.create({
      id: entity.id,
      customerId: entity.customerId,
      total: entity.getTotal(),
    });
    for (const item of items) {
      await OrderItemModel.create(item);
    }
  }
  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customerId: entity.customerId,
        total: entity.getTotal(),
      },
      { where: { id: entity.id } }
    );
    const items = entity.getItems();
    for (const item of items) {
      await OrderItemModel.update(
        {
          productId: item.productId,
          total: item.getTotal(),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        },
        {
          where: {
            id: item.id,
          },
        }
      );
    }
  }
  async find(id: string): Promise<Order> {
    const { dataValues } = await OrderModel.findOne({
      where: { id },
    });
    const itemsModel = await OrderItemModel.findAll({ where: { orderId: id } });
    const items: OrderItem[] = [];
    itemsModel.forEach(({ dataValues }) => {
      items.push(
        new OrderItem({
          id: dataValues.id,
          name: dataValues.name,
          productId: dataValues.productId,
          price: dataValues.price,
          quantity: dataValues.quantity,
        })
      );
    });
    return new Order(dataValues.id, dataValues.customerId, items);
  }
  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll();
    const result = [];
    for (const orderModel of ordersModel) {
      const { dataValues } = await OrderModel.findOne({
        where: { id: orderModel.id },
      });
      const itemsModel = await OrderItemModel.findAll({ where: { orderId: orderModel.id } });
      const items: OrderItem[] = [];
      itemsModel.forEach(({ dataValues }) => {
        items.push(
          new OrderItem({
            id: dataValues.id,
            name: dataValues.name,
            productId: dataValues.productId,
            price: dataValues.price,
            quantity: dataValues.quantity,
          })
        );
      });
      result.push(new Order(dataValues.id, dataValues.customerId, items));
    }
    return result;
  }
}
