type ContextType = "actor" | "tile";

type ContextMenu = ActorContextMenu | TileContextMenu;

type ActorContextMenu = {
  type: "actor";
  values: ActorContextValues;
};

type TileContextMenu = {
  type: "tile";
  values: TileContextValues;
};

interface contextValues extends Coordinates {
  id: number;
}

type ActorContextValues = contextValues & {
  name: string;
};

type TileContextValues = contextValues;
