import { Address } from "../value-objects/address.value-object";

export class Customer {
    _address: Address | null;
    _id: string;
    _name: string;
    _active: boolean;
    constructor(id:string, name: string, address?: Address){
        this._id = id;
        this._name = name;
        this._address = address || null;
        this._active = false;
        this.validate()

    }
    validate() {
        if(this._name.length === 0 ) {
            throw new Error('Name is required')
        }
        if(this._id.length === 0) {
            throw new Error('Id is required')
        }
    }
    changeName(name: string) {
        this._name= name
        this.validate()
    }
    isActive() {
        return this._active;
    }
    activate() {
        if(!this._address){
            throw new Error("Address is mandatory to activate a customer.")
        }
        this._active = true;
    }
    deactivate() {
        this._active = false;
    }
    addAddress(address: Address) {
        this._address = address;
    }

}