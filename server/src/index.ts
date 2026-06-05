import "dotenv/config";
import { app } from "./app";

const PORT = process.env.PORT;

function bootstrap() {
  try {
    app.listen(PORT);
  } catch (err) {
    console.log(err); // here we can log to our service
  }
}

bootstrap();
