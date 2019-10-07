import { EvenConsumer } from "./even-consumer";
import { OddConsumer } from "./odd-consumer";
import { Producer } from "./producer";

const producer = new Producer();
new EvenConsumer(producer);
new OddConsumer(producer);
