// FIXME 不确定是否起作用？
export function simulateKeyPress(keyCode: string) {
  const eventObj = new KeyboardEvent("keydown", {
    code: keyCode,
  });

  document.dispatchEvent(eventObj);
}