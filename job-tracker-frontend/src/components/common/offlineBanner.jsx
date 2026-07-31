import { WifiOff } from "lucide-react";
import useOnlineStatus from "../../hooks/useOnlineStatus";

export default function OfflineBanner() {
    const isOnline = useOnlineStatus();

    if (isOnline) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-center gap-2 bg-red-600 px-4 py-3 text-sm font-medium text-white shadow-lg">
            <WifiOff size={18} />

            <span>
                You're offline. Showing cached data.
            </span>
        </div>
    );
}