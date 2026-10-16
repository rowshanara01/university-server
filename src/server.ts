// ekhane database connection hocche
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import seedSuperAdmin from "./app/DB";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    // super admin ekhane create hocche
    seedSuperAdmin();

    server = app.listen(config.port, () => {
      console.log(` app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

// *** globalHandleError shudhu express er error handle kore. ***
// asynchronus code e error hole unhandledRejection error hoy.eta handle korte hoy
process.on("unhandledRejection", (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// synchronus code e error hole uncaughtException error hoy. eta handle korte hoy
process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
