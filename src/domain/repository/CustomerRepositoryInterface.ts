import { Customer } from "../entities/Customer";
import RepositoryInterface from "./RepositoryInterface";

export default interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {}
