type Coordinates = {
  x: number;
  y: number;
};

type OccupantType = "actor" | "object" | "terrain";

type TileData = Coordinates & { isOccupied: boolean; occupantId?: number; occupantType?: OccupantType };

type TileLookup = { [xKey: number]: { [yKey: number]: TileData } };
// { x: { y: TileData }} so you can say getTile[x][y]
