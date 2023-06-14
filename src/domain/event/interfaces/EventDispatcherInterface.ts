import EventHandlerInterface from "./EventHandlerInterface";
import EventInterface from "./EventInterface";

export default interface EventDispatcherInterface {
  getEventHandlers(eventName: string): EventHandlerInterface[];
  notify(event: EventInterface): void;
  register(eventName: string, eventHandler: EventHandlerInterface): void;
  unregister(eventName: string, eventHandler: EventHandlerInterface): void;
  unregisterAll(): void;
}
