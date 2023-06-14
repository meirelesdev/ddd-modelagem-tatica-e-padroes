import BaseEntity from "../../@shared/BaseEntity";
import { Address } from "../value-objects/Address";
import CustomerInterface from "./CustomerInterface";

export class Customer extends BaseEntity implements CustomerInterface {
  #name: string;
  #active: boolean;
  #address?: Address;
  #points: number;
  constructor(id: string, name: string, address?: Address) {
    super(id);
    this.#name = name;
    this.#active = false;
    this.#address = address;
    this.#points = 0;
    this.validate();
  }
  validate() {
    if (this.#name.length === 0) throw new Error("Name is required");
  }

  get address(): Address {
    return this.#address;
  }

  get name() {
    return this.#name;
  }

  get rewardPoints() {
    return this.#points;
  }

  setPoints(value: number) {
    this.#points += value;
  }

  changeName(name: string) {
    this.#name = name;
    this.validate();
  }

  isActive() {
    return this.#active;
  }

  activate() {
    if (!this.#address) throw new Error("Address is mandatory to activate a customer.");
    this.#active = true;
  }

  deactivate(): void {
    this.#active = false;
  }

  addAddress(address: Address): void {
    this.#address = address;
  }
}
