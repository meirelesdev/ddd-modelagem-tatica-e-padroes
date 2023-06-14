import EventDispatcherInterface from "../interfaces/EventDispatcherInterface";
import EventHandlerInterface from "../interfaces/EventHandlerInterface";
import EventInterface from "../interfaces/EventInterface";

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [key: string]: EventHandlerInterface[] } = {};
  getEventHandlers(eventName: string): EventHandlerInterface[] {
    if (this.eventHandlers[eventName]) {
      return this.eventHandlers[eventName];
    }
  }

  register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name;
    if (this.eventHandlers[eventName]) {
      for (const eventHandler of this.eventHandlers[eventName]) {
        eventHandler.handle(event);
      }
    }
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler);
      if (index > -1) {
        this.eventHandlers[eventName].splice(index, 1);
      }
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
