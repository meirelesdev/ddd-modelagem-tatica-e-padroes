import Product from "../entity/Product";
import ProductInterface from "../entity/ProductInterface";

export default class ProductFatory {
  static create(name: string, price: number): ProductInterface {
    return new Product({ name, price });
  }
}
