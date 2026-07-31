import { useEffect, useState } from "react";

export default function useInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [canInstall, setCanInstall] = useState(false);

    useEffect(() => {
        const handler = (event) => {
            event.preventDefault();
            setDeferredPrompt(event);
            setCanInstall(true);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
        };
    }, []);

    const install = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();

        await deferredPrompt.userChoice;

        setDeferredPrompt(null);
        setCanInstall(false);
    };

    return {
        canInstall,
        install
    };
}