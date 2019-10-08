import { EventEmitter } from "events";

import { IData, Producer } from "./producer";

export class OddConsumer extends EventEmitter {
  private readonly name = "odd";

  constructor(private readonly producer: Producer) {
    super();

    this.on("odd", this.process);
    this.producer.subscribe(this);

    setTimeout(() => {
      console.log("--- unsubscribe ---", this.name);
      this.producer.unsubscribe(this);
    }, 10 * 1000);
  }

  public async process(data: IData): Promise<void> {
    console.log(this.name, data);
  }
}
