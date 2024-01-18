export function Log(message?: any, ...optionalParams: any[]) {
  console.log("[Electron]", message, ...optionalParams);
}