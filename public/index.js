async function run() {
  // A service worker must be registered in order to send notifications on iOS
  const registration = await navigator.serviceWorker.register(
    "serviceworker.js",
    {
      scope: "./",
    }
  );

  const button = document.getElementById("subscribe");

  const areNotificationsGranted = window.Notification.permission === "granted";
  if (areNotificationsGranted) {
    button.innerText = "Send Notification";

    button.addEventListener("click", async () => {
      await fetch("/send-notification");
    });
  } else {
    button.addEventListener("click", async () => {
      // Triggers popup to request access to send notifications
      const result = await window.Notification.requestPermission();

      // If the user rejects the permission result will be "denied"
      if (result === "granted") {
        const subscription = await registration.pushManager.subscribe({
          // TODO: Replace with your public vapid key
          // applicationServerKey:
          //   "BNjCpEWm_Oh2kx8fgpRN1C7hM7whS8r3_bTabCI27k0VTwm_GSnXaA5MZF-lZg1Hr3lAfTKkd4XUnqCsumEKo8Y",
          applicationServerKey:
            "BFygpPBmFuCSAXq1UDxA-LNBM2gzYHbp6Xld16N0xXp962u7oVu4BMG0qoafzHXFR43aAJi51JpmboG5v8idtbQ",
          userVisibleOnly: true,
        });

        await fetch("/save-subscription", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subscription),
        });

        window.location.reload();
      }
    });
  }
}

run();
