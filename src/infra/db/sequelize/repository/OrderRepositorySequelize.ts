import Order from "../../../../domain/entities/Order";
import OrderRepositoryInterface from "../../../../domain/repository/OrderRepositoryInterface";
import OrderModel from "../model/OrderModel";
import OrderItemModel from "../model/OrderItemModel";
import OrderItem from "../../../../domain/entities/OrderItem";

export default class OrderRepositorySequelize implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    const items = entity.getItems();
    await OrderModel.create({
      id: entity.id,
      customerId: entity.customerId,
      total: entity.getTotal(),
    });
    for (const item of items) {
      await this.createOrderItem(entity.id, item);
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
    const itemsModel = await this.getOrderItems(entity.id);
    const itemsToRemove = itemsModel.filter((itemModel) =>
      items.every((item) => item.id !== itemModel.id)
    );
    for (const itemToRemove of itemsToRemove) {
      await this.deleteOrderItem(itemToRemove.id);
    }
    const itemsModelUpdated = await this.getOrderItems(entity.id);
    const itemsToAdd = items.filter((item) =>
      itemsModelUpdated.some((itemModel) => itemModel.id !== item.id)
    );
    for (const itemToAdd of itemsToAdd) {
      await this.createOrderItem(entity.id, itemToAdd);
    }
    for (const item of items) {
      await this.updateOrderItem(item);
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

  private async updateOrderItem(item: OrderItem): Promise<void> {
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

  private async createOrderItem(orderId: string, orderItem: OrderItem): Promise<void> {
    await OrderItemModel.create({
      id: orderItem.id,
      productId: orderItem.productId,
      orderId,
      name: orderItem.name,
      price: orderItem.price,
      quantity: orderItem.quantity,
    });
  }

  private async getOrderItems(orderId: string): Promise<OrderItemModel[]> {
    return OrderItemModel.findAll({ where: { orderId } });
  }

  private async deleteOrderItem(orderItemId: string): Promise<void> {
    await OrderItemModel.destroy({ where: { id: orderItemId } });
  }
}
