import EventHandlerInterface from "../../interfaces/EventHandlerInterface";
import CustomerCreatedEvent from "../CustomerCreatedEvent";

export default class LogWhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    const eventName = event.constructor.name;
    console.log(`Este é o primeiro console.log do evento: ${eventName}`);
  }
}
