import EventDispatcher from "../../../src/domain/event/implementations/EventDispatcher";
import SendEmailWhenProductIsCreatedHandler from "../../../src/domain/event/Product/handler/SendEmailWhenProductIsCreatedHandler";
import ProductCreatedEvent from "../../../src/domain/event/Product/ProductCreatedEvent";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
    expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toHaveLength(1);
    expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
    expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toHaveLength(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product description",
      price: 10,
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should test notify when no has handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product description",
      price: 10,
    });
    eventDispatcher.notify(productCreatedEvent);
    expect(spyEventHandler).toHaveBeenCalledTimes(0);

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    eventDispatcher.notify(productCreatedEvent);
    expect(spyEventHandler).toHaveBeenCalledTimes(0);
  });
});
