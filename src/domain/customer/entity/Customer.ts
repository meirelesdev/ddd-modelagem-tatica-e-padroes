import BaseEntity from "../../@shared/BaseEntity";
import { Address } from "../value-objects/Address";

export class Customer extends BaseEntity {
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

  get address() {
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

  validate() {
    if (this.#name.length === 0) throw new Error("Name is required");
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

  deactivate() {
    this.#active = false;
  }

  addAddress(address: Address) {
    this.#address = address;
  }
}
