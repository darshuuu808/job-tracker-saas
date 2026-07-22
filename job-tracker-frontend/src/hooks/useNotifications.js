import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
    getNotifications,
    notificationStream
} from "../services/notificationService";

export default function useNotifications() {

    const [notifications, setNotifications] = useState([]);

    const loadNotifications = async () => {

        try {

            const data = await getNotifications();

            setNotifications(data);

        } catch (err) {

            console.error("Failed to load notifications:", err);

        }

    };

    useEffect(() => {

        loadNotifications();

        const eventSource = notificationStream();

        eventSource.onmessage = (event) => {

            const notification = JSON.parse(event.data);

            setNotifications(prev => {

                const exists = prev.some(
                    n => n.id === notification.id
                );

                if (exists) {
                    return prev;
                }

                return [
                    notification,
                    ...prev
                ];

            });

            toast.success(notification.title, {
                description: notification.message,
            });

        };

        eventSource.onerror = (err) => {

            console.error("Notification stream disconnected", err);

            eventSource.close();

        };

        return () => {

            eventSource.close();

        };

    }, []);

    return {

        notifications,
        reload: loadNotifications

    };

}