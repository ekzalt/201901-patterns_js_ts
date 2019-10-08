import { EventEmitter } from "events";

export interface IData {
  readonly data: number;
}

export class Producer {
  private readonly name = "producer";

  private intervalId: NodeJS.Timeout;
  private subscribers: EventEmitter[] = [];

  constructor() {
    this.intervalId = setInterval(() => {
      const data: IData = { data: Math.round(Math.random() * 100) };
      console.log(this.name, data);

      this.notify(data);
    }, 1000);

    setTimeout(() => {
      console.log("--- stop ---", this.name);
      clearInterval(this.intervalId);
    }, 20 * 1000);
  }

  public notify(data: IData): void {
    this.subscribers.forEach((e) => e.emit(data.data % 2 === 0 ? "even" : "odd", data));
  }

  public subscribe(emitter: EventEmitter): number {
    return this.subscribers.push(emitter);
  }

  public unsubscribe(emitter: EventEmitter): EventEmitter {
    this.subscribers = this.subscribers.filter((e) => e !== emitter);

    return emitter;
  }

  public clear(): void {
    this.subscribers = [];
  }
}
