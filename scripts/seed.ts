import fs from "fs";

import { connectToDb } from "@/server/db";
import { reseed } from "@/server/seed";

if (!process.env.MONGO_URI && fs.existsSync(".env")) {
  process.loadEnvFile();
}

async function main() {
  const mongoose = await connectToDb();
  const result = await reseed();

  console.log(`seed → connected to ${result.dbName} @ ${result.host}`);
  console.log("\nseed → collection counts:");
  for (const [name, count] of Object.entries(result.counts)) {
    console.log(`  ${String(name).padEnd(17)} ${String(count).padStart(4)}`);
  }

  await mongoose.disconnect();
  console.log("\nseed → done");
}

main().catch((err) => {
  console.error("seed → failed", err);
  process.exitCode = 1;
});