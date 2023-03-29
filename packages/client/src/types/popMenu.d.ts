type PopType = "actor" | "chat" | "tile";

type PopMenu = ActorPopMenu | ChatPopMenu | TilePopMenu;

type ActorPopMenu = {
  type: "actor";
  values: ActorPopValues;
};

type ChatPopMenu = {
  type: "chat";
  values: ChatPopValues;
};

type TilePopMenu = {
  type: "tile";
  values: TilePopValues;
};

interface popValues {
  id: number | string;
}

type ActorPopValues = Coordinates &
  popValues & {
    name: string;
  };

type ChatPopValues = popValues & {
  socketId: string;
};

type TilePopValues = Coordinates & popValues;
