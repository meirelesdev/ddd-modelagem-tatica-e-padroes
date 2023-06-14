
export class Address {
    #street: string;
    #number: string;
    #city: string;
    #zipcode: string;
    #state: string;
    constructor(street: string, number: string, city: string, state: string, zipcode: string) {
        this.#street = street;
        this.#number = number;
        this.#city = city;
        this.#state = state;
        this.#zipcode = zipcode;
        this.validate()
    }
    validate() {
        if (!this.#street) throw new Error("Street is required");
        if (!this.#number) throw new Error("Number is required");
        if (!this.#city) throw new Error("City is required");
        if (!this.#state) throw new Error("State is required");
        if (!this.#zipcode) throw new Error("Zipcode is required");
    }

    get street() {
        return this.#street;
    }

    get number() {
        return this.#number;
    }
    get city() {
        return this.#city;
    }
    get zipcode() {
        return this.#zipcode;
    }
    get state() {
        return this.#state;
    }
}
