import Product from "../../../../src/domain/product/entity/Product";

describe("Product unit tests", () => {
  it("should not be able to create a product when name is empty", () => {
    const props = {
      id: "1",
      name: "",
      price: 10,
    };
    expect(() => new Product(props)).toThrowError("Name is required");
  });
  it("should not be able to create a product when price is invalid", () => {
    const props = {
      id: "1",
      name: "Product 01",
      price: 0,
    };
    expect(() => new Product(props)).toThrowError("Price must be greater than zero");
  });

  it("should change name of a product", () => {
    const props = {
      id: "1",
      name: "Product 01",
      price: 10,
    };
    const product = new Product(props);
    expect(product.name).toBe("Product 01");
    product.name = "Product 02";
    expect(product.name).toBe("Product 02");
  });

  it("should change price of a product", () => {
    const props = {
      id: "1",
      name: "Product 01",
      price: 10,
    };
    const product = new Product(props);
    expect(product.price).toBe(10);
    product.price = 20;
    expect(product.price).toBe(20);
  });

  it("should not be able to change name when new name is empty ", () => {
    const props = {
      id: "1",
      name: "Product 01",
      price: 10,
    };
    const product = new Product(props);

    expect(product.name).toBe("Product 01");
    product.name = "";
    expect(product.name).toBe("Product 01");
  });

  it("should not be able to change price when new price is invalid ", () => {
    const props = {
      id: "1",
      name: "Product 01",
      price: 10,
    };
    const product = new Product(props);
    expect(product.price).toBe(10);
    product.price = 0;
    expect(product.price).toBe(10);
  });
});
