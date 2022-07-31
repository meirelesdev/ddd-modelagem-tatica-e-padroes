
export class Address {
    id: string;
    street: string;
    number: string;
    city: string;
    zipcode: string;
    constructor(id: string, street: string, number: string, city: string, state: string, zipcode: string) {
        this.id = id;
        this.street = street;
        this.number = number;
        this.city = city;
        this.zipcode = zipcode;
    }
    
}
