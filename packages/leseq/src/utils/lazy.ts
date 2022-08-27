export function lazy<T extends Required<unknown>>(factory: () => T) {
  let value: T | undefined;
  return {
    get value(): T {
      if (value == null) value = factory();
      return value;
    },
  };
}
