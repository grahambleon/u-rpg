import path from "path";
import { fileURLToPath } from "url";

const clientIndexPath = () => {
  const currentPath = path.dirname(fileURLToPath(import.meta.url));
  return process.env.NODE_ENV !== "development"
    ? path.join(currentPath, "../public/dist/index.html")
    : path.join(currentPath, "../../client/public/index.html");
};

export default clientIndexPath;
