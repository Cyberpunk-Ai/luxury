// Re-export database storage
export * from "./database-storage";
import { DatabaseStorage } from "./database-storage";

export const storage = new DatabaseStorage();
