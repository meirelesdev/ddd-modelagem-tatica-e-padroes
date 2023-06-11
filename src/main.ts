import { Customer } from "./domain/entities/Customer";
import Order from "./domain/entities/Order";
import OrderItem from "./domain/entities/OrderItem";
import { Address } from "./domain/value-objects/Address";

const address = new Address("Street", "02", "city 01", "state 01", "880000-880");
const customer = new Customer("123", "Daniel Meireles", address);

customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, 2);
const item2 = new OrderItem("2", "Item 2", 5, 1);

const order = new Order("1", "123", [item1, item2]);
