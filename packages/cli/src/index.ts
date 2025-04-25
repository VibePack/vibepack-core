#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

import { join } from "path";
import pc from "picocolors";
import { z } from "zod";

const vibeSchema = z.object({
  meta: z.object({ name: z.string(), version: z.string() }),
  tokens: z.record(z.any()),
});

// ─── validate ──────────────────────────────────────────────────────────────
function validate(file = "vibe.json") {
  if (!existsSync(file)) {
    console.error(pc.red(`❌  File not found: ${file}`));
    process.exit(1);
  }

  const data = JSON.parse(readFileSync(file, "utf8"));
  const res = vibeSchema.safeParse(data);

  if (!res.success) {
    console.error(pc.red(`❌  Invalid ${file}`));
    console.error(res.error.format());
    process.exit(1);
  }

  console.log(pc.green(`✅  ${file} is valid`));
  return res.data;
}

// ─── build ────────────────────────────────────────────────────────────────
function build(dir: string) {
  if (!existsSync(dir)) {
    console.error(pc.red(`❌  Directory not found: ${dir}`));
    process.exit(1);
  }

  const vibeFile = join(dir, "vibe.json");
  const json = validate(vibeFile); // re-uses validation

  const cssLines: string[] = [];
  Object.entries(json.tokens).forEach(([group, values]) => {
    if (typeof values !== "object") return;

    Object.entries(values as Record<string, any>).forEach(([name, shades]) => {
      if (typeof shades === "object") {
        Object.entries(shades).forEach(([k, v]) =>
          cssLines.push(`  --${group}-${name}-${k}: ${v};`)
        );
      } else {
        cssLines.push(`  --${group}-${name}: ${shades};`);
      }
    });
  });

  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "vibe.css"), `:root {\n${cssLines.join("\n")}\n}`);

  writeFileSync(
    join(dir, "tailwind.js"),
    `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: { extend: { colors: require('./vibe.json').tokens.color } }
};`
  );

  console.log(pc.green(`✨  Wrote ${dir}/vibe.css & tailwind.js`));
}

// ─── CLI entry ────────────────────────────────────────────────────────────
const [, , cmd = "validate", arg] = process.argv;

if (cmd === "validate") {
  validate(arg);
} else if (cmd === "build") {
  build(arg ?? ".");
} else {
  console.log("Usage: vibepack [validate|build] <file|dir>");
  process.exit(1);
}
