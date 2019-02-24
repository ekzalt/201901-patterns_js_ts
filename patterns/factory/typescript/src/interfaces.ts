export interface IPizza {
  getType(): string;
  prepare(): void;
  bake(): void;
  cut(): void;
  box(): void;
}
