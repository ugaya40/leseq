export const abortableSleep = (ms: number, signal?: AbortSignal) => new Promise<void>(resolve => {
  if(signal != null) {
    if(signal.aborted) resolve();
    const listener = () => {
      signal.removeEventListener('abort',listener);
      resolve();
    }
    signal.addEventListener('abort',listener);
  }
  setTimeout(resolve,ms)
});

export const performanceAsync = async <T>(func: () => Promise<T>) => {
  const startTime = performance.now();
  const result = await func(); 
  const endTime = performance.now();

  return [
    result,
    endTime - startTime,
  ]
}