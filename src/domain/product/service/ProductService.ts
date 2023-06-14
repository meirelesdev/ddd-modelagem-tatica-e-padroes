import Product from "../entity/Product";

export default class ProductService {
  static increasePrice(products: Product[], percentage: number): void {
    products.forEach((product) => {
      const newPrice = (product.price * percentage) / 100 + product.price;
      product.price = newPrice;
    });
  }
}
