import EventInterface from "../interfaces/EventInterface";

export default class AddressChangedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;
  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
