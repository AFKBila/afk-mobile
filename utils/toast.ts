import { toast } from "sonner-native";
import { useToast } from "@/contexts/ToastContext";

// This is a helper function to use outside of React components
let toastFunction: (
  message: string,
  type?: "success" | "error" | "info"
) => void;

export const setToastFunction = (fn: typeof toastFunction) => {
  toastFunction = fn;
};

export const showToast = (
  message: string,
  type: "success" | "error" | "info" = "info"
) => {
  if (toastFunction) {
    toastFunction(message, type);
  } else {
    console.warn("Toast function not set");
  }
};
