export const wait = (callback: () => void, timeMs: number = 1) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, timeMs);
  });
}
