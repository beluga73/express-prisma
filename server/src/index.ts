import "dotenv/config";
import { app } from "./app";

const PORT = process.env.PORT;

function bootstrap() {
  const server = app.listen(PORT);

  server.on("error", (err) => {
    // log to service here
    console.error("Server error:", err);
  });
}

bootstrap();
