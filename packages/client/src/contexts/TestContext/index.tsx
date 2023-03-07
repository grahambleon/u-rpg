import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoadingSpinner, ServerError } from "../../components";

export type TestContextType = {
  connectionMessage?: string;
};

export type TestProviderProps = {
  children?: ReactNode;
};

export const TestContext = createContext<TestContextType>({});

export function TestProvider({ children }: TestProviderProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [connectionMessage, setConnectionMessage] = useState<string>("");

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        if (!connectionMessage) {
          const response = await fetch(`/api/test`);
          if (!response.ok) {
            throw new Error(`${response.status} (${response.statusText})`);
          }
          const json = await response.json();
          setConnectionMessage(json.message);
        }
      } catch (error) {
        console.log(`Sorry, unable to fetch from API because ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, []);

  return (
    <>
      {!loading ? (
        connectionMessage ? (
          <TestContext.Provider value={{ connectionMessage }}>
            {children}
          </TestContext.Provider>
        ) : (
          <ServerError />
        )
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export function useTest() {
  if (!TestContext) {
    throw new Error("TestContext must be defined!");
  }
  return useContext<TestContextType>(TestContext);
}
