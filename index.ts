import { serve } from "bun";
import index from "./index.html";
import calculator from "./src/calculator/index.html";
import clock from "./src/clock.html";
import kanban from "./src/kanban/kanban.html";
import todo from "./src/todo/index.html";
const server = serve({
  routes: {
    "/": index,
    "/clock": clock,
    "/calculator": calculator,
    "/todo": todo,
    "/kanban": kanban,
  },
});

console.log(`Listening on ${server.url}`);
