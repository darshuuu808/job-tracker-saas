chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type === "JOB_DETECTED") {

        const job = {
            company: message.company,
            role: message.role,
            url: message.url
        };

        chrome.storage.local.set({ latestJob: job }, () => {
            console.log("Stored:", job);
            sendResponse({ success: true });
        });

        return true;
    }

    if (message.type === "GET_JOB") {

        chrome.storage.local.get("latestJob", (data) => {
            console.log("Returning:", data.latestJob);
            sendResponse({
                job: data.latestJob || null
            });
        });

        return true;
    }

    if (message.type === "OPEN_TRACKER") {

        chrome.storage.local.get("latestJob", (data) => {

            const job = data.latestJob;

            if (!job) {
                sendResponse({ success: false });
                return;
            }

            chrome.tabs.create({
                url:
                    `http://localhost:5173/` +
                    `?company=${encodeURIComponent(job.company)}` +
                    `&role=${encodeURIComponent(job.role)}`
            });

            sendResponse({ success: true });
        });

        return true;
    }

});