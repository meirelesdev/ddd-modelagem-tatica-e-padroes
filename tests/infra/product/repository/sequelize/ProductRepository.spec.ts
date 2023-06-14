import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import Product from "../../../../../src/domain/product/entity/Product";
import ProductModel from "../../../../../src/infra/product/repository/sequelize/ProductModel";
import ProductRepositorySequelize from "../../../../../src/infra/product/repository/sequelize/ProductRepositorySequelize";

describe("Product repository tests", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    const configSequelize: SequelizeOptions = {
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    };
    sequelize = new Sequelize(configSequelize);
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepositorySequelize();
    const productProps = {
      id: "123",
      name: "Product 1",
      price: 10,
    };
    const product = new Product(productProps);
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: product.id } });
    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepositorySequelize();
    const productProps = {
      name: "Product 1",
      price: 10,
    };
    const product = new Product(productProps);
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: product.id } });

    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });

    product.name = "Product 02";
    product.price = 20;

    await productRepository.update(product);

    const productModel2 = await ProductModel.findOne({ where: { id: product.id } });
    expect(productModel2.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepositorySequelize();
    const productProps = {
      name: "Product 1",
      price: 10,
    };
    const product = new Product(productProps);

    await productRepository.create(product);

    const productFound = await productRepository.find(product.id);

    expect(productFound.id).toBe(product.id);
    expect(productFound.name).toBe(product.name);
    expect(productFound.price).toBe(product.price);
  });

  it("should findAll products", async () => {
    const productRepository = new ProductRepositorySequelize();
    const productProps1 = {
      name: "Product 1",
      price: 10,
    };
    const product1 = new Product(productProps1);

    const productProps2 = {
      name: "Product 2",
      price: 20,
    };
    const product2 = new Product(productProps2);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const products = await productRepository.findAll();

    expect(products).toHaveLength(2);
    expect(products[0].id).toBe(product1.id);
    expect(products[0].name).toBe(product1.name);
    expect(products[0].price).toBe(product1.price);

    expect(products[1].id).toBe(product2.id);
    expect(products[1].name).toBe(product2.name);
    expect(products[1].price).toBe(product2.price);
  });

  afterEach(async () => {
    await sequelize.close();
  });
});
