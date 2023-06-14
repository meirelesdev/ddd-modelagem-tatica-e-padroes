import { Address } from "../value-objects/Address";

export default interface CustomerInterface {
  get id(): string;
  get address(): Address;
  get name(): string;
  get rewardPoints(): number;
  setPoints(points: number): void;
  changeName(name: string): void;
  isActive(): boolean;
  deactivate(): void;
  addAddress(address: Address): void;
}
