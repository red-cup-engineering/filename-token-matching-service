#!/usr/bin/env node
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { matchFilenameToken as match } from "../src/match-filename-token.mjs";

async function readJson(io) {
  let text = "";
  io.stdin.setEncoding("utf8");
  for await (const chunk of io.stdin) text += chunk;
  return JSON.parse(text);
}

export function matchFilenameToken(input) {
  return match(input);
}

export async function runMatchFilenameToken(io = process) {
  const result = matchFilenameToken(await readJson(io));
  io.stdout.write(`${JSON.stringify(result)}\n`);
  return result;
}

if (resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1] ?? "")) {
  runMatchFilenameToken().catch((error) => {
    process.stderr.write(`match-filename-token: ${error.message}\n`);
    process.exitCode = 64;
  });
}
