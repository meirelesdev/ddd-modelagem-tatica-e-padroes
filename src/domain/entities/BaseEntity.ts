import { v4 as uuidv4 } from "uuid";

export default abstract class BaseEntity {
  #id: string;
  #createdAt: Date;
  #updatedAt: Date;
  constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
    this.#id = id || uuidv4();
    this.#createdAt = createdAt || new Date();
    this.#updatedAt = updatedAt || new Date();
  }

  get id() {
    return this.#id;
  }
  get createdAt() {
    return this.#createdAt;
  }
  get updatedAt() {
    return this.#updatedAt;
  }
}
