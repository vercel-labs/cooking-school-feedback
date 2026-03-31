import fs from "fs/promises";
import path from "path";
import type { Feedback } from "./types";

const DATA_PATH = path.join(process.cwd(), "data", "feedback.json");

export async function getAllFeedback(): Promise<Feedback[]> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

export async function getFeedbackById(
  id: string
): Promise<Feedback | undefined> {
  const all = await getAllFeedback();
  return all.find((fb) => fb.id === id);
}

export async function addFeedback(
  entry: Omit<Feedback, "id" | "createdAt">
): Promise<Feedback> {
  const all = await getAllFeedback();
  const newEntry: Feedback = {
    ...entry,
    id: `fb-${String(all.length + 1).padStart(3, "0")}`,
    createdAt: new Date().toISOString(),
  };
  all.push(newEntry);
  await fs.writeFile(DATA_PATH, JSON.stringify(all, null, 2));
  return newEntry;
}
