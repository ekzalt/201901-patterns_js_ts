import { EventEmitter } from "events";

import { IData, Producer } from "./producer";

export class EvenConsumer extends EventEmitter {
  private readonly name = "even";

  constructor(private readonly producer: Producer) {
    super();

    this.on("even", this.process);
    this.producer.subscribe(this);

    setTimeout(() => {
      console.log("--- unsubscribe ---", this.name);
      this.producer.unsubscribe(this);
    }, 15 * 1000);
  }

  public async process(data: IData): Promise<void> {
    console.log(this.name, data);
  }
}
