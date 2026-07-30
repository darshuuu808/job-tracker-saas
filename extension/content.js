let sent = false;

function getText(selectors) {
    for (const selector of selectors) {
        const el = document.querySelector(selector);
        if (el && el.textContent.trim()) {
            return el.textContent.trim();
        }
    }
    return "";
}

function detectJob() {

    if (sent) return;

    const role = getText([
        "h1",
        ".job-details-jobs-unified-top-card__job-title",
        "[data-test-job-title]"
    ]);

    const company = getText([
        ".job-details-jobs-unified-top-card__company-name",
        ".job-details-jobs-unified-top-card__primary-description a",
        ".job-details-jobs-unified-top-card__primary-description"
    ]);

    if (!role || !company) {
        console.log("Waiting...", { role, company });
        return;
    }

    sent = true;

    console.log("Detected:", role, company);

    chrome.runtime.sendMessage({
        type: "JOB_DETECTED",
        role,
        company,
        url: location.href
    });
}

const observer = new MutationObserver(detectJob);

observer.observe(document.body, {
    childList: true,
    subtree: true
});

setInterval(detectJob, 1000);