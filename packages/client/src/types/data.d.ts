interface hasKeyMap<T> {
  map: {
    [key: number]: T;
  };
}

type OrderedMap<T> = hasKeyMap<T> & {
  set: (key: number, value: T) => void;
  get: (key: number) => T;
  remove: (key: number) => void;
  forEach: (fn: (item: T, key: number) => void) => void;
};
