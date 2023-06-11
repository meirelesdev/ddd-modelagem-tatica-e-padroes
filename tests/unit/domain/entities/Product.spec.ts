import Product from "../../../../src/domain/entities/Products";

describe("Product unit tests", () => {
  it("should not be able to create a product when id is empty", () => {
    expect(() => new Product("", "Product 01", 10)).toThrowError("Id is required");
  });
  it("should not be able to create a product when name is empty", () => {
    expect(() => new Product("1", "", 10)).toThrowError("Name is required");
  });
  it("should not be able to create a product when price is invalid", () => {
    expect(() => new Product("1", "Product 01", 0)).toThrowError("Price must be greater than zero");
  });

  it("should change name of a product", () => {
    const product = new Product("1", "Product 01", 10);
    expect(product.name).toBe("Product 01");
    product.name = "Product 02";
    expect(product.name).toBe("Product 02");
  });

  it("should change name of a product", () => {
    const product = new Product("1", "Product 01", 10);
    expect(product.price).toBe(10);
    product.price = 20;
    expect(product.price).toBe(20);
  });

  it("should not be able to change name when new name is empty ", () => {
    const product = new Product("1", "Product 01", 10);
    expect(product.name).toBe("Product 01");
    product.name = "";
    expect(product.name).toBe("Product 01");
  });

  it("should not be able to change price when new price is invalid ", () => {
    const product = new Product("1", "Product 01", 10);
    expect(product.price).toBe(10);
    product.price = 0;
    expect(product.price).toBe(10);
  });
});
