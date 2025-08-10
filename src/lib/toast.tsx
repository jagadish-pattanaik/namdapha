// Simple glassToast implementation using sonner's toast
import { toast } from "sonner";

export function glassToast(message: string, type: "success" | "error" | "info" = "info") {
  toast[type](message);
}