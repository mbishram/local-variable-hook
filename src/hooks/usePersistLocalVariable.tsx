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
  // ** Vars
  const restoreData = () => {
    set(returnData() || "");
    removeData();
  };

  // If client side, run the script.
  if (typeof window !== "undefined")
    // useLayoutEffect used to prevent XSS attacks.
    useLayoutEffect(() => {
      restoreData();

      // Handle saving data on close/reload
      const handleBeforeUnload = () => {
        persist();
      };
      window.addEventListener("beforeunload", handleBeforeUnload);

      // Handle saving data on opening new tab
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          // On tab return, restore data
          restoreData();
        } else {
          // When opening a new tab, save data
          persist();
        }
      };
      window.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        // Handle event listener cleanup
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("visibilitychange", handleVisibilityChange);

        // Save data on when hook unload
        handleBeforeUnload();
      };
    }, []);
};
