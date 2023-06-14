import Product from "../../../../src/domain/product/entity/Product";
import ProductService from "../../../../src/domain/product/service/ProductService";

describe("Product service unit tests", () => {
  it("should change the prices of all products", () => {
    const productProps1 = {
      id: "1",
      name: "Product 1",
      price: 10,
    };
    const productProps2 = {
      id: "2",
      name: "Product 2",
      price: 20,
    };
    const product1 = new Product(productProps1);
    const product2 = new Product(productProps2);

    const products = [product1, product2];
    ProductService.increasePrice(products, 100);
    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
  });
});
