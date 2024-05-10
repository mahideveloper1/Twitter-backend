import { initServer } from "./app";

async function init() {
  const app = await initServer();
  const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 6000;
  app.listen(PORT, () => {
    console.log("start");
  });
}

init();

// "dev": "npx prisma migrate deploy && tsc-watch --onSuccess \"npm start\""
