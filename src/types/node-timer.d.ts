declare global {
  namespace NodeJS {
    type Timer = NodeJS.Timeout;
  }
  function clearInterval(intervalId?: NodeJS.Timer | number): void;
}

export {};
