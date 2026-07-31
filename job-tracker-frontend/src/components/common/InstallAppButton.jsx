import { Download } from "lucide-react";
import useInstallPrompt from "../../hooks/useInstallPrompt";

export default function InstallAppButton() {
    const { canInstall, install } = useInstallPrompt();

    if (!canInstall) {
        return null;
    }

    return (
        <button
            onClick={install}
            className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-white shadow-xl transition hover:bg-blue-700"
        >
            <Download size={18} />
            Install App
        </button>
    );
}