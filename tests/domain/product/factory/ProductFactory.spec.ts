import ProductFatory from "../../../../src/domain/product/factory/ProductFatoryInterface";

describe("Product factory unit tests", () => {
  it("should create a product", () => {
    const product = ProductFatory.create("Product A", 10);
    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(10);
    expect(product.constructor.name).toBe("Product");
  });
});
