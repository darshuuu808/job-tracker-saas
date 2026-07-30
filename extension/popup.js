document.addEventListener("DOMContentLoaded", () => {
  const companyElement = document.getElementById("company");
  const roleElement = document.getElementById("role");
  const openButton = document.getElementById("openTracker");

  // Get the latest detected job from the background service worker
  chrome.runtime.sendMessage(
    {
      type: "GET_JOB",
    },
    (response) => {
      if (
        chrome.runtime.lastError ||
        !response ||
        !response.job
      ) {
        companyElement.textContent = "No LinkedIn job detected";
        roleElement.textContent = "-";
        openButton.disabled = true;
        return;
      }

      const { company, role } = response.job;

      companyElement.textContent = company;
      roleElement.textContent = role;

      openButton.disabled = false;
    }
  );

  // Open Job Tracker with pre-filled values
  openButton.addEventListener("click", () => {
    chrome.runtime.sendMessage(
      {
        type: "OPEN_TRACKER",
      },
      (response) => {
        if (chrome.runtime.lastError) {
          alert("Unable to communicate with background script.");
          return;
        }

        if (!response?.success) {
          alert("No LinkedIn job detected.");
        }

        window.close();
      }
    );
  });
});