import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type BoardMovementContextType = {
  getTile: ({ x, y }: Coordinates) => TileData;
  clearOccupant: ({ x, y }: Coordinates) => void;
  setOccupant: ({ x, y }: Coordinates, occupantId: number) => boolean;
  tiles: TileLookup;
};

export type BoardMovementProviderProps = {
  children?: ReactNode;
  height: number;
  width: number;
};

export const BoardMovementContext = createContext<BoardMovementContextType>({
  getTile: ({ x, y }) => ({ x, y, isOccupied: false }),
  clearOccupant: ({ x, y }) => {},
  setOccupant: ({ x, y }, occupantId) => false,
  tiles: {},
});

function generateArray(width: number, height: number): Coordinates[] {
  return [...Array(width * height)].map((empt, i) => ({
    x: i % width,
    y: Math.floor(i / width),
  }));
}

function generateMap(width: number, height: number): TileLookup {
  const array = generateArray(width, height);
  return array.reduce((obj: TileLookup, item) => {
    return {
      ...obj,
      [item.x]: {
        ...obj[item.x],
        [item.y]: {
          x: item.x,
          y: item.y,
          isOccupied: false,
        },
      },
    };
  }, {});
}

export function BoardMovementProvider({
  children,
  height,
  width,
}: BoardMovementProviderProps) {
  const [array, setArray] = useState<Coordinates[]>(
    generateArray(width, height)
  );
  const [map, setMap] = useState<TileLookup>(generateMap(width, height));
  const set = useCallback(
    ({ x, y }: Coordinates, value: TileData) => {
      if (x in map && y in map[x]) {
        setMap({ ...map, [x]: { ...map[x], [y]: value } });
      } else {
        setArray([...array, { x, y }]);
        setMap({ ...map, [x]: { ...map[x], [y]: value } });
      }
    },
    [array, map]
  );
  const getTile = useCallback(({ x, y }: Coordinates) => map[x][y], [map]);
  // const remove = useCallback(
  //   ({ x, y }: Coordinates) => {
  //     const index = array.indexOf({ x, y });
  //     if (index === -1) throw new Error("key does not exist)");
  //     setArray(array.splice(index, 1));
  //     let state = map;
  //     delete state[x][y];
  //     setMap(state);
  //   },
  //   [array, map]
  const clearOccupant = useCallback(
    ({ x, y }: Coordinates) => {
      if (map[x][y].isOccupied) {
        set(
          { x, y },
          {
            ...map[x][y],
            isOccupied: false,
            occupantType: undefined,
            occupantId: undefined,
          }
        );
      }
    },
    [map]
  );
  const setOccupant = useCallback(
    ({ x, y }: Coordinates, occupantId: number) => {
      if (map[x][y].isOccupied) return false;
      set(
        { x, y },
        { ...map[x][y], isOccupied: true, occupantType: "actor", occupantId }
      );
      return true;
    },
    [map]
  );

  useEffect(() => {
    setOccupant({ x: 0, y: 0 }, 0);
  }, []);

  return (
    <BoardMovementContext.Provider
      value={{ getTile, clearOccupant, setOccupant, tiles: map }}
    >
      {children}
    </BoardMovementContext.Provider>
  );
}

export function useBoard() {
  if (!BoardMovementContext) {
    throw new Error("BoardMovementContext must be defined!");
  }
  return useContext<BoardMovementContextType>(BoardMovementContext);
}
