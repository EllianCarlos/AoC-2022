import { readFileSync } from "fs";

export function readFile(day: number): string[] {
  return readFileSync(`./inputs/${day}`).toString().split("\n");
}

