export function isAsyncIterable(source: any): source is AsyncIterable<unknown> {
  return Symbol.asyncIterator in source;
}
