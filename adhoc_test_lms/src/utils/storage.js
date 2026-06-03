/**
 * Base localStorage utilities
 */

const memoryStore = {};

export const getStorage = (key, fallback = null) => {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    try {
      return JSON.parse(item);
    } catch {
      return item; // Return as string if not JSON
    }
  } catch (error) {
    console.warn(`localStorage read failed for key "${key}", using memory backup:`, error);
    return memoryStore[key] !== undefined ? memoryStore[key] : fallback;
  }
};

export const setStorage = (key, value) => {
  if (typeof window !== "undefined") {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (error) {
      console.warn(`localStorage write failed for key "${key}", using memory backup:`, error);
    }
    memoryStore[key] = value;
    // Dispatch custom event for cross-component reactivity
    window.dispatchEvent(new CustomEvent(`storage-update-${key}`, { detail: value }));
  }
};

export const removeStorage = (key) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`localStorage delete failed for key "${key}", using memory backup:`, error);
    }
    delete memoryStore[key];
    window.dispatchEvent(new CustomEvent(`storage-update-${key}`, { detail: null }));
  }
};
