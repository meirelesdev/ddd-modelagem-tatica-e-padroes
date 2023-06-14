import EventHandlerInterface from "../../../@shared/event/interfaces/EventHandlerInterface";
import AddressChangedEvent from "../AddressChangedEvent";

export default class LogWhenAddressChangedHandler
  implements EventHandlerInterface<AddressChangedEvent>
{
  handle(event: AddressChangedEvent): void {
    const eventName = event.constructor.name;
    console.log(`Este é o segundo console.log do evento: ${eventName}`);
    const { id, name, address } = event.eventData;
    const { street, number, city, state, zipcode } = address;
    console.log(
      `Endereço do cliente: ${id}, ${name} alterado para: ${street}, ${number}, ${city} ${state} ${zipcode}`
    );
  }
}
