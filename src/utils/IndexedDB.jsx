export function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("UserProfileDB", 1);
    request.onerror = () => reject("Database failed to open");
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      db.createObjectStore("profile", { keyPath: "id" });
    };
  });
}

export function saveImageToIndexedDB(blob) {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction("profile", "readwrite");
      const store = tx.objectStore("profile");
      store.put({ id: "profileImage", image: blob });
      tx.oncomplete = resolve;
      tx.onerror = reject;
    });
  });
}

export function getImageFromIndexedDB() {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction("profile", "readonly");
      const store = tx.objectStore("profile");
      const request = store.get("profileImage");
      request.onsuccess = () => resolve(request.result?.image || null);
      request.onerror = reject;
    });
  });
}

export function deleteImageFromIndexedDB() {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction("profile", "readwrite");
      const store = tx.objectStore("profile");
      const request = store.delete("profileImage"); // ← این متد حذف کلید خاصه
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject("Failed to delete image from IndexedDB");
    });
  });
}
