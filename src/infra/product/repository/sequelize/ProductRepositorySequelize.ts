import Product from "../../../../domain/product/entity/Product";
import ProductRepositoryInterface from "../../../../domain/product/repository/ProductRepositoryInterface";
import ProductModel from "./ProductModel";

export default class ProductRepositorySequelize implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      { where: { id: entity.id } }
    );
  }
  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id: id } });
    const product = new Product(productModel.dataValues);
    return product;
  }
  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();
    const products = productModels.map((productModel) => new Product(productModel.dataValues));
    return products;
  }
}
