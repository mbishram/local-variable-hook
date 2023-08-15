// ** React Imports
import { useLayoutEffect } from "react";

// ** Util Imports
import { get, set } from "../utils/storage.utils";

// ** Local storage handler
export const STORAGE_KEY = "SAVED_LOCAL_VARIABLE_DATA";

function saveData(value: string) {
  localStorage.setItem(STORAGE_KEY, value);
}

function returnData() {
  return localStorage.getItem(STORAGE_KEY);
}

function removeData() {
  localStorage.removeItem(STORAGE_KEY);
}

export function persist() {
  saveData(get() || "");
}

/**
 * Hook used to initialize persist local variable
 * Called this hook only in one place
 */
export const usePersistLocalVariable = () => {
  // If client side, run the script.
  if (typeof window !== "undefined")
    // useLayoutEffect used to prevent XSS attacks.
    useLayoutEffect(() => {
      // Restoring data
      set(returnData() || "");
      removeData();

      // Handle saving data on close/reload
      const handleBeforeUnload = () => {
        persist();
      };
      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        // Handle event listener cleanup
        window.removeEventListener("beforeunload", handleBeforeUnload);

        // Save data on when hook unload
        handleBeforeUnload();
      };
    }, []);
};
