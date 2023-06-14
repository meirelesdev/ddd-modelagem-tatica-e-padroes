export default interface ProductInterface {
  get id(): string;
  get name(): string;
  set name(value: string);
  get price(): number;
  set price(value: number);
}
