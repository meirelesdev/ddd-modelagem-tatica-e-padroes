import AddressChangedEvent from "../../../../src/domain/event/Customer/AddressChangedEvent";
import CustomerCreatedEvent from "../../../../src/domain/event/Customer/CustomerCreatedEvent";
import LogWhenAddressChangedHandler from "../../../../src/domain/event/Customer/handler/LogWhenAddressChangedHandler";
import LogWhenCustomerIsCreatedHandler from "../../../../src/domain/event/Customer/handler/LogWhenCustomerIsCreatedHandler";
import EventDispatcher from "../../../../src/domain/event/implementations/EventDispatcher";

describe("Domain events customer tests", () => {
  it("should handle event when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new LogWhenCustomerIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")).toBeDefined();
    expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")).toHaveLength(1);
    expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")[0]).toMatchObject(eventHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      customer: "Customer 1",
    });
    eventDispatcher.notify(customerCreatedEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should handle event when address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new LogWhenAddressChangedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("AddressChangedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers("AddressChangedEvent")).toBeDefined();
    expect(eventDispatcher.getEventHandlers("AddressChangedEvent")).toHaveLength(1);
    expect(eventDispatcher.getEventHandlers("AddressChangedEvent")[0]).toMatchObject(eventHandler);

    const customerCreatedEvent = new AddressChangedEvent({
      id: "123",
      name: "Customer 1",
      address: {
        street: "Street 01",
        number: "123",
        city: "San Francisco",
        zipcode: "88000-888",
      },
    });
    eventDispatcher.notify(customerCreatedEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  });

  // it("should unregister an event handler", () => {
  //   const eventDispatcher = new EventDispatcher();
  //   const eventHandler = new SendEmailWhenProductIsCreatedHandler();
  //   eventDispatcher.register("ProductCreatedEvent", eventHandler);
  //   expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);

  //   eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
  //   expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
  //   expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toHaveLength(0);
  // });

  // it("should unregister all event handlers", () => {
  //   const eventDispatcher = new EventDispatcher();
  //   const eventHandler = new SendEmailWhenProductIsCreatedHandler();
  //   eventDispatcher.register("ProductCreatedEvent", eventHandler);
  //   expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);

  //   eventDispatcher.unregisterAll();
  //   expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeUndefined();
  // });

  // it("should notify all event handlers", () => {
  //   const eventDispatcher = new EventDispatcher();
  //   const eventHandler = new SendEmailWhenProductIsCreatedHandler();
  //   const spyEventHandler = jest.spyOn(eventHandler, "handle");
  //   eventDispatcher.register("ProductCreatedEvent", eventHandler);
  //   expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);

  //   const productCreatedEvent = new ProductCreatedEvent({
  //     name: "Product 1",
  //     description: "Product description",
  //     price: 10,
  //   });

  //   eventDispatcher.notify(productCreatedEvent);

  //   expect(spyEventHandler).toHaveBeenCalled();
  // });

  // it("should test notify when no has handlers", () => {
  //   const eventDispatcher = new EventDispatcher();
  //   const eventHandler = new SendEmailWhenProductIsCreatedHandler();
  //   const spyEventHandler = jest.spyOn(eventHandler, "handle");

  //   eventDispatcher.register("ProductCreatedEvent", eventHandler);
  //   expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);

  //   eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
  //   const productCreatedEvent = new ProductCreatedEvent({
  //     name: "Product 1",
  //     description: "Product description",
  //     price: 10,
  //   });
  //   eventDispatcher.notify(productCreatedEvent);
  //   expect(spyEventHandler).toHaveBeenCalledTimes(0);

  //   eventDispatcher.register("ProductCreatedEvent", eventHandler);
  //   expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);

  //   eventDispatcher.unregisterAll();

  //   eventDispatcher.notify(productCreatedEvent);
  //   expect(spyEventHandler).toHaveBeenCalledTimes(0);
  // });
});
