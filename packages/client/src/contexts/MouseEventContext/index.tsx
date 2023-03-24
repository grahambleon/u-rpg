import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { PopMenu } from "../../components";

type MouseEventContextType = {
  contextMenu: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    context: ContextMenu
  ) => void;
};

type MouseEventContextProps = {
  children?: ReactNode;
};

type PopMenuEntry = {
  text: string;
  action: () => void;
};

type PopMenuState = {
  top: number;
  left: number;
  show: boolean;
  title?: string;
  entries?: PopMenuEntry[];
};

const initialMenuState = {
  top: 0,
  left: 0,
  show: false,
};

export const MouseEventContext = createContext<MouseEventContextType>({
  contextMenu: (event, context) => {},
});

const contextEntriesMap: Record<ContextType, PopMenuEntry[]> = {
  actor: [
    {
      text: "attack",
      action: () => {
        console.log("attacked actor");
      },
    },
    {
      text: "examine",
      action: () => {
        console.log("examined actor");
      },
    },
  ],
  tile: [
    {
      text: "move",
      action: () => {
        console.log("moved to tile");
      },
    },
    {
      text: "examine",
      action: () => {
        console.log("examined tile");
      },
    },
  ],
};

export function MouseEventProvider({ children }: MouseEventContextProps) {
  const [lastLClick, setLastLClick] = useState<MouseEvent | null>();
  const [lastRClick, setLastRClick] = useState<MouseEvent | null>();
  const [menuState, setMenuState] = useState<PopMenuState>(initialMenuState);

  const leftDefault = useCallback((event: MouseEvent) => {
    event.preventDefault();
    setLastLClick(event);
    setMenuState(initialMenuState);
  }, []);

  const rightDefault = useCallback((event: MouseEvent) => {
    event.preventDefault();
    setLastRClick(event);
  }, []);

  const contextMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>, context: ContextMenu) => {
      setMenuState({
        top: event.clientY,
        left: event.clientX,
        show: true,
        entries: contextEntriesMap[context.type],
        title: `tile ${context.values.id}: (${context.values.x}, ${context.values.y})`,
      });
      console.log(
        `${context.values.id}: ${context.values.x}, ${context.values.y}`
      );
    },
    []
  );

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
      <MouseEventContext.Provider value={{ contextMenu }}>
        {children}
      </MouseEventContext.Provider>
      {menuState.show && (
        <PopMenu {...menuState}>
          {menuState?.title && <h2>{menuState.title}</h2>}
          {menuState.entries.map((entry) => (
            <p onClick={entry.action}>{entry.text}</p>
          ))}
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
