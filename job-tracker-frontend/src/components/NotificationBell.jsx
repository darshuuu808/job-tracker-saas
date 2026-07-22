import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { memo } from "react";
import useNotifications from "../hooks/useNotifications";
import {
    markAsRead,
    markAllRead
} from "../services/notificationService";

function NotificationBell() {

    const {
        notifications,
        reload
    } = useNotifications();

    const [open, setOpen] = useState(false);

    const bellRef = useRef(null);

    const unread = notifications.filter(
        notification => !notification.is_read
    ).length;

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                bellRef.current &&
                !bellRef.current.contains(event.target)
            ) {

                setOpen(false);

            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);

    async function handleRead(id) {

        await markAsRead(id);

        reload();

    }

    async function handleReadAll() {

        await markAllRead();

        reload();

    }

    return (

        <div
            ref={bellRef}
            className="relative"
        >

            <button
                onClick={() => setOpen(prev => !prev)}
                className="relative rounded-lg p-2 hover:bg-muted transition"
            >

                <Bell size={24} />

                {unread > 0 && (

                    <span
                        className="
                        absolute
                        -top-1
                        -right-1
                        flex
                        h-5
                        w-5
                        items-center
                        justify-center
                        rounded-full
                        bg-red-600
                        text-xs
                        text-white"
                    >

                        {unread}

                    </span>

                )}

            </button>

            {open && (

                <div
                    className="
                    absolute
                    right-0
                    mt-3
                    w-96
                    rounded-xl
                    border
                    bg-background
                    shadow-xl
                    z-50"
                >

                    <div className="flex items-center justify-between border-b p-4">

                        <h3 className="font-semibold">

                            Notifications

                        </h3>

                        {notifications.length > 0 && (

                            <button
                                onClick={handleReadAll}
                                className="text-sm text-blue-600 hover:underline"
                            >

                                Mark all read

                            </button>

                        )}

                    </div>

                    <div className="max-h-96 overflow-y-auto">

                        {notifications.length === 0 ? (

                            <div className="p-6 text-center text-muted-foreground">

                                No notifications

                            </div>

                        ) : (

                            notifications.map(notification => (

                                <div
                                    key={notification.id}
                                    onClick={() => handleRead(notification.id)}
                                    className={`cursor-pointer border-b p-4 transition hover:bg-muted ${!notification.is_read
                                            ? "bg-blue-50 dark:bg-blue-950"
                                            : ""
                                        }`}
                                >

                                    <h4 className="font-semibold">

                                        {notification.title}

                                    </h4>

                                    <p className="mt-1 text-sm text-muted-foreground">

                                        {notification.message}

                                    </p>

                                    <p className="mt-2 text-xs text-gray-500">

                                        {new Date(
                                            notification.created_at
                                        ).toLocaleString()}

                                    </p>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            )}

        </div>

    );

}

export default memo(NotificationBell);