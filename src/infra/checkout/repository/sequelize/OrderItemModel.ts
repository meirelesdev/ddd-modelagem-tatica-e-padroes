import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./OrderModel";
import ProductModel from "../../../product/repository/sequelize/ProductModel";

@Table({
  tableName: "order_items",
  timestamps: false,
})
export default class OrderItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false, field: "product_id" })
  declare productId: string;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false, field: "order_id" })
  declare orderId: string;

  @Column({ allowNull: false })
  declare quantity: number;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;
}
