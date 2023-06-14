import EventHandlerInterface from "../../interfaces/EventHandlerInterface";
import ProductCreatedEvent from "../ProductCreatedEvent";

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    const name = event.constructor.name;
    console.log(`Enviando email .... ${name}`);
  }
}
