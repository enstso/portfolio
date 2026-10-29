import { spawnSync } from "node:child_process";

const prisma = "./node_modules/.bin/prisma";
const baseline = "0_init";

function runPrisma(args, { echo = true } = {}) {
  const result = spawnSync(prisma, args, {
    encoding: "utf8",
    env: process.env,
  });

  if (echo) {
    if (result.stdout) process.stdout.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
  }

  if (result.error) throw result.error;
  return result;
}

function exitWith(result, message) {
  console.error(message);
  process.exit(result.status ?? 1);
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required before the application can start.");
  process.exit(1);
}

const deployment = runPrisma(["migrate", "deploy"]);
if (deployment.status === 0) process.exit(0);

const deploymentOutput = `${deployment.stdout ?? ""}\n${deployment.stderr ?? ""}`;
if (!deploymentOutput.includes("P3005")) {
  exitWith(deployment, "Prisma migration failed; automatic baselining was not attempted.");
}

console.log("Existing database detected without Prisma migration history.");
console.log("Verifying it against the reviewed legacy portfolio schemas...");

const legacySchemas = [
  "prisma/legacy-schema.prisma",
  "prisma/legacy-schema-with-extras.prisma",
];

let schemaMatches = false;
let lastSchemaCheck;
for (const schema of legacySchemas) {
  const schemaCheck = runPrisma(
    [
      "migrate",
      "diff",
      "--from-schema-datasource",
      schema,
      "--to-schema-datamodel",
      schema,
      "--exit-code",
    ],
    { echo: false },
  );
  lastSchemaCheck = schemaCheck;
  if (schemaCheck.status === 0) {
    console.log(`Matched reviewed legacy schema: ${schema}`);
    schemaMatches = true;
    break;
  }
}

if (!schemaMatches) {
  if (lastSchemaCheck?.stdout) process.stdout.write(lastSchemaCheck.stdout);
  if (lastSchemaCheck?.stderr) process.stderr.write(lastSchemaCheck.stderr);
  exitWith(
    lastSchemaCheck ?? { status: 1 },
    "The existing database does not match a reviewed legacy schema. Refusing to baseline automatically.",
  );
}

const resolved = runPrisma(["migrate", "resolve", "--applied", baseline]);
if (resolved.status !== 0) {
  exitWith(resolved, "Could not record the reviewed legacy baseline.");
}

const retry = runPrisma(["migrate", "deploy"]);
if (retry.status !== 0) {
  exitWith(retry, "Migration failed after the legacy baseline was recorded.");
}
