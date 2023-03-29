import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { PopMenu, FocusedInfo } from "../../components";

type MouseEventContextType = {
  focus: FocusTarget;
  popMenu: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    pop: PopMenu
  ) => void;
  selectFocus: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    focusInfo: FocusInfo
  ) => void;
};

type MouseEventContextProps = {
  children?: ReactNode;
};

type PopMenuEntry = {
  text: string;
  action: (e: React.MouseEvent) => void;
};

type PopMenuState = {
  top: number;
  left: number;
  show: boolean;
  title?: string;
  entries?: PopMenuEntry[];
};

type FocusTarget = {
  info?: FocusInfo;
  node?: HTMLElement;
};

const initialMenuState = {
  top: 0,
  left: 0,
  show: false,
};

export const MouseEventContext = createContext<MouseEventContextType>({
  focus: null,
  popMenu: (event, pop) => {},
  selectFocus: (event) => {},
});

const popEntriesMap: Record<PopType, PopMenuEntry[]> = {
  actor: [
    {
      text: "attack",
      action: (e: React.MouseEvent) => {
        console.log("attacked actor");
      },
    },
    {
      text: "examine",
      action: (e: React.MouseEvent) => {
        console.log("examined actor");
      },
    },
  ],
  chat: [
    {
      text: "message",
      action: (e: React.MouseEvent) => {
        console.log("messaged user");
      },
    },
    {
      text: "report",
      action: (e: React.MouseEvent) => {
        console.log("reprettedem");
      },
    },
  ],
  tile: [
    {
      text: "move",
      action: (e: React.MouseEvent) => {
        console.log("moved to tile");
      },
    },
    {
      text: "examine",
      action: (e: React.MouseEvent) => {
        console.log("examined tile");
      },
    },
  ],
};

export function MouseEventProvider({ children }: MouseEventContextProps) {
  const [focus, setFocus] = useState<FocusTarget>();
  const [menuState, setMenuState] = useState<PopMenuState>(initialMenuState);

  const leftDefault = useCallback((event: MouseEvent) => {
    event.preventDefault();
    setFocus(null);
    setMenuState(initialMenuState);
  }, []);

  const rightDefault = useCallback((event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setFocus(null);
    setMenuState(initialMenuState);
  }, []);

  const selectFocus = useCallback(
    (event: React.MouseEvent<HTMLElement>, info: FocusInfo) => {
      event.preventDefault();
      event.stopPropagation();
      setMenuState(initialMenuState);
      setFocus({
        info,
        node: event.currentTarget,
      });
    },
    []
  );

  const popMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>, pop: PopMenu) => {
      event.preventDefault();
      event.stopPropagation();

      setMenuState({
        top: event.clientY,
        left: event.clientX,
        show: true,
        entries: popEntriesMap[pop.type],
        title: `${pop.type} ${pop.values.id}: ${
          pop.type === "tile" ? `(${pop.values.x}, ${pop.values.y})` : ""
        }`,
      });
    },
    []
  );

  const popMenuAction = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setMenuState(initialMenuState);
  }, []);

  useEffect(() => {
    document.addEventListener("click", leftDefault);
    document.addEventListener("contextmenu", rightDefault);

    return () => {
      document.removeEventListener("click", leftDefault);
      document.removeEventListener("contextmenu", rightDefault);
    };
  }, []);

  return (
    <>
      <MouseEventContext.Provider value={{ focus, popMenu, selectFocus }}>
        {children}
      </MouseEventContext.Provider>
      {focus && (
        <FocusedInfo>
          <div>
            <h3>{focus?.info?.name || ""}</h3>
          </div>
          <div>
            <p>HP: {focus?.info?.hitpoints || ""}</p>
            <p>{focus?.info?.description || ""}</p>
          </div>
        </FocusedInfo>
      )}
      {menuState.show && (
        <PopMenu {...menuState}>
          {menuState?.title && <h2>{menuState.title}</h2>}
          {menuState.entries.map((entry) =>
            focus ? (
              <p
                onClick={(e: React.MouseEvent) => {
                  popMenuAction(e);
                  entry.action(e);
                }}
              >
                {entry.text}
              </p>
            ) : (
              <></>
            )
          )}
        </PopMenu>
      )}
    </>
  );
}

export function useMouse() {
  if (!MouseEventContext) {
    throw new Error("MouseEventContext must be defined!");
  }
  return useContext<MouseEventContextType>(MouseEventContext);
}
