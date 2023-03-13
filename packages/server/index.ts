import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import rootRouter from "./routes/rootRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(
    __dirname,
    process.env.NODE_ENV === "development" ? "../../.env.dev" : "../../.env"
  ),
});

const port = process.env.PORT || 8000;
const app = express();

// express middlewares
app.use(cors());
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(rootRouter);

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => { 
  console.log(`User Connected: ${socket.id}`);
  socket.on("chat message", (message) => {
    const shortId = socket.id.slice(0,4);
    io.emit("message broadcast", {text: message, id: shortId})
  })
});
io.on("connect_error", (socket) => { console.log(`Connection Error: ${socket.id}`) });

server.listen(port, () => console.log(`Server listening on port ${port}`));
