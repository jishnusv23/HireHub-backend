import server from "./presentation/server";
import database from "./_boot/database";
import { socket } from "./_boot/socket";

(async () => {
  try {
    const httpServer = await server.start();
    // server.start();
    await database();
    socket(httpServer)
  } catch (error: any) {
    console.error(error?.message || "An error occurred");
    process.exit(1);
  }
})();
