import { onDisconnect, onValue, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import database from "./config";

/**
 * Hook lắng nghe dữ liệu realtime từ Firebase Realtime Database và xử lý dữ liệu.
 *
 * @param {string} id - ID của user hoặc nhóm user.
 * @param {string} key - Tên key con dưới user/group ID mà bạn muốn lắng nghe.
 * @param {function} callback - Hàm callback sẽ được gọi khi dữ liệu thay đổi.
 */
export const useListenNotifiOnNode = (id, key, callback) => {
    console.log("------mounted listen data realtime---------")
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!id || !key) {
            console.error("Missing required parameters");
            return;
        }

        const dataRef = ref(database, `realtime_data/${id}/${key}`);

        const handleDataChange = (snapshot) => {
            const newData = snapshot.val();
            if (newData) {
                // Update state with new data and remove from Firebase
                setData((prevData) => {
                    const updatedData = [...prevData, newData];
                    callback(updatedData);
                    return updatedData;
                });

                // Remove the data from Firebase
                remove(dataRef).catch((error) => console.error("Error deleting data:", error));
            }
        };

        // Start listening for data changes
        const unsubscribe = onValue(dataRef, handleDataChange, (error) => {
            console.error("Error listening for data:", error);
        });

        // Cleanup function to remove the listener
        return () => {
            unsubscribe();
            console.log("------unmount listen data realtime---------")
        };
    }, [id, key, callback]);

    return data;
};



/**
 * Hook để đăng ký người dùng vào kênh và duy trì trạng thái online.
 *
 * @param {string || number} id - ID của người dùng.
 * @param {string || number} channel - Kênh mà người dùng đăng ký vào.
 */
export const useRegisterNotifiChannel = (id, channel) => {
    useEffect(() => {
        console.log("------mounted online channel---------");

        if (!id || !channel) {
            console.error("Missing required parameters");
            return;
        }

        const userRef = ref(database, `realtime_channel/${channel}/${id}`);

        // Đánh dấu người dùng là online
        set(userRef, { online: true }).catch((error) => console.error("Error setting user online:", error));

        // Xử lý khi ngắt kết nối
        const disconnectRef = onDisconnect(userRef);
        disconnectRef.remove().catch((error) => console.error("Error removing user on disconnect:", error));

        // Cleanup function
        return () => {
            console.log("------unmount online channel---------");

            // Xoá người dùng khỏi kênh khi component unmount
            remove(userRef).catch((error) => console.error("Error removing user from channel:", error));

            // Hủy bỏ xử lý ngắt kết nối
            disconnectRef.cancel().catch((error) => console.error("Error canceling disconnection:", error));
        };
    }, [id, channel]);
};



/**
 * Hook để lắng nghe thay đổi dữ liệu realtime trên một node Firebase Realtime Database.
 
 * @param {string} id - ID của user hoặc nhóm user.
 * @param {string} key - Tên key con dưới user/group ID mà bạn muốn lắng nghe.
 * @param {function} callback - Hàm callback sẽ được gọi khi dữ liệu thay đổi.
 */
export const useListenRealtimeData = (id, key, callback) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!id || !key) {
            console.error("Missing required parameters");
            return;
        }

        const dataRef = ref(database, `realtime_data/${id}/${key}`);

        const handleDataChange = (snapshot) => {
            const newData = snapshot.val();
            setData(newData);
            if (callback) {
                callback(newData);
            }
        };

        // Bắt đầu lắng nghe dữ liệu thay đổi
        const unsubscribe = onValue(dataRef, handleDataChange, (error) => {
            console.error("Error listening for data:", error);
        });

        // Cleanup function để gỡ bỏ listener khi component unmount
        return () => {
            unsubscribe();
        };
    }, [id, key, callback]);

    return data;
};