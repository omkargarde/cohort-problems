import { serve } from "bun";
import index from "./index.html";
import c6 from "./src/c6.html";
import calculator from "./src/calculator/index.html";
import todo from "./src/todo/index.html";

const server = serve({
  routes: {
    "/": index,
    "/c6": c6,
    "/calculator": calculator,
    "/todo": todo,
  },
  development: true,
});

console.log(`Listening on ${server.url}`);
