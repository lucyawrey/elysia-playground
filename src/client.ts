import { treaty } from "@elysiajs/eden";
import type { App } from "./server";

const app = treaty<App>("http://localhost:3001");

const response = await app.api.content.get();
console.log(response.data);
