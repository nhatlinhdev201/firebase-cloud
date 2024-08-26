/**
 * Gửi dữ liệu lên Firebase Realtime Database.
 *
 * @param {string} id - ID của user hoặc nhóm user.
 * @param {string} key - Tên key con dưới user/group ID mà bạn muốn lưu dữ liệu.
 * @param {object} data - Đối tượng dữ liệu cần gửi.
 */

import { onValue, ref, set, update } from "firebase/database";
import database from "./config";

export const FBRT_SendRealtimeData = (id, key, data) => {
  try {
    if (!id || !key || typeof data !== "object") {
      throw new Error("Missing required parameters");
    }
    const dataRef = ref(database, `realtime_data/${id}/${key}`);
    set(dataRef, data)
      .then(() => {
        console.log("Data sent successfully");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Lắng nghe dữ liệu realtime từ Firebase Realtime Database với xử lý ngoại lệ.
 *
 * @param {string} id - ID của user hoặc nhóm user.
 * @param {string} key - Tên key con dưới user/group ID mà bạn muốn lắng nghe.
 * @param {function} callback - Hàm callback sẽ được gọi khi dữ liệu thay đổi.
 */

export const FBRT_ListenDataRealtime = (id, key, callback) => {
  try {
    if (!id || !key || typeof callback !== "function") {
      throw new Error("Missing required parameters");
    }
    const dataRef = ref(database, `realtime_data/${id}/${key}`);
    onValue(
      dataRef,
      (snapshot) => {
        const data = snapshot.val();
        callback(data);
      },
      (error) => {
        console.error(error);
      }
    );
  } catch (error) {
    console.error(error);
  }
};

/**
 * Cập nhật một key cụ thể cho một user hoặc nhóm user trong Firebase Realtime Database.
 *
 * @param {string} id - ID của user hoặc nhóm user.
 * @param {string} key - Tên key con dưới user/group ID mà bạn muốn cập nhật.
 * @param {object} newData - Dữ liệu mới cần cập nhật cho key.
 */

export const FBRT_UpdateDataRealtime = (id, key, newData) => {
  try {
    if (!id || !key || typeof newData !== "object") {
      throw new Error("Missing required parameters");
    }

    const dataRef = ref(database, `realtime_data/${id}/${key}`);
    update(dataRef, newData)
      .then(() => {
        console.log("Data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  } catch (error) {
    console.error(error);
  }
};
