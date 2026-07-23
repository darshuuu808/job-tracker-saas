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
        (notification) => !notification.is_read
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

        function handleEscape(event) {

            if (event.key === "Escape") {

                setOpen(false);

            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

            document.removeEventListener(
                "keydown",
                handleEscape
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
                type="button"
                aria-label={`Notifications${unread > 0 ? `, ${unread} unread` : ""}`}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls="notification-menu"
                onClick={() => setOpen((prev) => !prev)}
                className="relative rounded-lg p-2 transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
            >

                <Bell
                    size={24}
                    aria-hidden="true"
                />

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
                            text-white
                        "
                    >

                        {unread}

                    </span>

                )}

            </button>

            {open && (

                <div
                    id="notification-menu"
                    role="menu"
                    aria-label="Notifications"
                    className="
                        absolute
                        right-0
                        mt-3
                        w-96
                        rounded-xl
                        border
                        bg-background
                        shadow-xl
                        z-50
                    "
                >

                    <div className="flex items-center justify-between border-b p-4">

                        <h3 className="font-semibold">

                            Notifications

                        </h3>

                        {notifications.length > 0 && (

                            <button
                                type="button"
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

                            notifications.map((notification) => (

                                <button
                                    key={notification.id}
                                    type="button"
                                    role="menuitem"
                                    onClick={() => handleRead(notification.id)}
                                    className={`w-full border-b p-4 text-left transition hover:bg-muted ${
                                        !notification.is_read
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

                                </button>

                            ))

                        )}

                    </div>

                </div>

            )}

        </div>

    );

}

export default memo(NotificationBell);