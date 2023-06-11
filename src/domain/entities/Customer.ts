import { Address } from "../value-objects/Address";

export class Customer {
    #id: string;
    #name: string;
    #active: boolean;
    #address?: Address;
    constructor(id: string, name: string, address?: Address) {
        this.#id = id;
        this.#name = name;
        this.#active = false;
        this.#address = address;
        this.validate()

    }
    get id() {
        return this.#id;
    }

    get address() {
        return this.#address
    }

    get name() {
        return this.#name;
    }

    validate() {
        if (this.#id.length === 0) throw new Error('Id is required');
        if (this.#name.length === 0) throw new Error("Name is required");
    }
    changeName(name: string) {
        this.#name = name
        this.validate()
    }
    isActive() {
        return this.#active;
    }
    activate() {
        if (!this.#address) {
            throw new Error("Address is mandatory to activate a customer.")
        }
        this.#active = true;
    }
    deactivate() {
        this.#active = false;
    }
    addAddress(address: Address) {
        this.#address = address;
    }
}