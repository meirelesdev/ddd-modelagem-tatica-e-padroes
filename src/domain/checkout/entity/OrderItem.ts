import BaseEntity from "../../@shared/BaseEntity";

export default class OrderItem extends BaseEntity {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  constructor({
    id,
    productId,
    name,
    price,
    quantity,
  }: {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }) {
    super(id);
    this.productId = productId;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    if (this.quantity <= 0) throw new Error("Quantity must be greater then zero");
  }

  getTotal(): number {
    return this.price * this.quantity;
  }
}
