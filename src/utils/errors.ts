
export class NotImplementError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotImplementError";
  }
}