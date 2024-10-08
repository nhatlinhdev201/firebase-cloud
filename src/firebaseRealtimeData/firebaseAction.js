import { get, onValue, ref, remove, set, update } from "firebase/database";
import database from "./config";

/**
 * Gửi dữ liệu lên Firebase Realtime Database vào một node.
 *
 * @param {string || number} id - ID của user hoặc nhóm user.
 * @param {string || number} key - Tên key con dưới user/group ID muốn lưu dữ liệu.
 * @param {object} data - Đối tượng dữ liệu cần gửi.
 */

export const FBRT_SendRealtimeData = async (id, key, data) => {
  if (!id || !key || typeof newData !== "object") {
    console.error("Missing required parameters");
    return;
  }

  try {
    const dataRef = ref(database, `realtime_data/${id}/${key}`);
    await set(dataRef, data);
    console.log("Data sent successfully");
  } catch (error) {
    console.error("Error sending data:", error);
  }
};

/**
 * Lắng nghe dữ liệu realtime từ Firebase Realtime Database với xử lý ngoại lệ.
 *
 * @param {string || number} id - ID của user hoặc nhóm user.
 * @param {string || number} key - Tên key con dưới user/group ID muốn lắng nghe.
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
 * @param {string || number} id - ID của user hoặc nhóm user.
 * @param {string || number} key - Tên key con dưới user/group ID muốn cập nhật.
 * @param {object} newData - Dữ liệu mới cần cập nhật cho key.
 */

export const FBRT_UpdateDataRealtime = async (id, key, newData) => {
  if (!id || !key || typeof newData !== "object") {
    console.error("Missing required parameters");
    return;
  }

  try {
    const dataRef = ref(database, `realtime_data/${id}/${key}`);
    await update(dataRef, newData);
    console.log("Data updated successfully");
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

/**
 * Xóa dữ liệu từ Firebase Realtime Database ở cấp key.
 *
 * @param {string || number} id - ID của user hoặc nhóm user.
 * @param {string || number} key - Tên key con dưới user/group ID muốn xóa dữ liệu.
 */
export const FBRT_DeleteDataRealtime = async (id, key) => {
  // Kiểm tra tham số đầu vào
  if (!id || !key) {
    console.error("Missing required parameters: groupId, id, and key must be provided");
    return;
  }

  try {
    const dataRef = ref(database, `realtime_data/${id}/${key}`);
    await remove(dataRef);
    console.log("Data deleted successfully");
  } catch (error) {
    console.error("Error deleting data:", error.message);
  }
};

/**
 * Hàm gửi dữ liệu tới tất cả các user online trong một group.
 *
 * @param {string} key - Key cho dữ liệu.
 * @param {object} data - Dữ liệu cần gửi.
 * @param {string} channel - Kênh (channel) để xác định nhóm người dùng online.
 */
export const FBRT_SendDataToGroup = async (key, data, channel) => {
  if (!key || typeof data !== "object") {
      console.error("Missing required parameters");
      return;
  }

  try {
      const channelRef = ref(database, `realtime_channel/${channel}`);
      const channelSnapshot = await get(channelRef);
      const onlineUsers = channelSnapshot.val() || {};

      const updates = Object.keys(onlineUsers).map(id => {
          return set(ref(database, `realtime_data/${id}/${key}`), data);
      });

      await Promise.all(updates);
      console.log("Data sent successfully to all online users");
  } catch (error) {
      console.error("Error sending data to group:", error);
  }
};