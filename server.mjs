import express from "express";
import webpush from "web-push";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

let subscriptionData = null;

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_MAILTO}`,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

app.get("/send-notification", async (req, res) => {
  try {
    console.log("send notification");
    console.log({ subscriptionData });

    // Notification payload with action buttons
    // const notificationPayload = {
    //   title: "Hello World",
    //   requireInteraction: true,
    //   image:
    //     "https://dsl810bactgru.cloudfront.net/1718015488/assets/eb315100523646d3955b1df2e42eddef.jpeg",
    //   icon: "https://dsl810bactgru.cloudfront.net/1718015488/assets/7f8421067a494c30ab7f7c74f8c7db5e.jpeg",
    //   body: "Notification sent from backend",
    //   icon: "icon.png", // Optional icon for the notification
    //   actions: [
    //     {
    //       action: "open_url_1",
    //       title: "Visit Page 1",
    //       icon: "button1-icon.png", // Optional icon for the action button
    //       deepLink: "https://a.com",
    //     },
    //     {
    //       action: "open_url_2",
    //       title: "Visit Page 2",
    //       icon: "button2-icon.png", // Optional icon for the action button
    //       deepLink: "https://b.com",
    //     },
    //   ],
    // };

    const notificationPayload = {
      title: "Safari Web Push Test Live",
      deepLink: "https://google.com",
      wzrk_dlt: "https://google.com",
      wzrk_ttl_unit: "d",
      wzrk_ttl: 9,
      c_tt1: "a.com",
      c_dlt1: "https://a.com",
      c_idl1:
        "https://dsl810bactgru.cloudfront.net/1718015488/assets/eb315100523646d3955b1df2e42eddef.jpeg",
      c_tt2: "b.com",
      c_dlt2: "https://b.com",
      c_idl2:
        "https://dsl810bactgru.cloudfront.net/1718015488/assets/7f8421067a494c30ab7f7c74f8c7db5e.jpeg",
      wzrk_acct_id: "884-5ZW-8Z7Z",
      notificationOptions: {
        body: "web push test",
        requireInteraction: true,
        image: "http://localhost:8000/icon.png",
        icon: "http://localhost:8000/icon.png",
        actions: [
          {
            action: "action1",
            title: "a.com",
            deepLink: "https://a.com",
          },
          {
            action: "action2",
            title: "b.com",
            deepLink: "https://b.com",
          },
        ],
        data: {
          wzrk_id: "1731308354_20241115",
        },
      },
      redirectPath:
        "https://sk1-staging-4.clevertap-prod.com/br?e=K2Jqfx8Fa2N6Ygh8DSZqewYGBwwpJCw8KSQse05wcUcyKSEiODQNIlZwcUhmJjc9MjQmN3xfRV0xMzEqIzM9JRJzXV00MTcvKyFwPEhCWms%2BPnBxdWtleAMDAQxkb2YUZWpgfwMBAAF1dnA8LSg5FEJZR1sjeGhpICAgIG1UVFI2Lz4%2FdSc%3D&c=549042240&br=Chrome",
      raiseNotificationViewedPath:
        "https://sk1-staging-4.clevertap-prod.com/r?e=K2Jqfx8Fa2N6Ygh8DSZqewYGBwwpJCw8KSQse05wcUcyKSEiODQNKF1fWl0yGhI3ZiY3PVdeRUgZNSYiMTMxKkZZXlp3DDsuID82N0kSRk4lMQ0iM3hoaQMHAgVkamp4Ym4NeQICBQVma2dpe3glMUBbbkQ%2BLD0%2FdWBwPEhCWmszPzQqIjYmaU8%3D&c=726507072&br=Chrome",
      ct: "pn",
    };

    await webpush.sendNotification(
      subscriptionData,
      JSON.stringify(notificationPayload)
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.post("/save-subscription", async (req, res) => {
  subscriptionData = req.body;
  console.log("saving subscription");
      console.log({ subscriptionData });
      res.sendStatus(200);
});

app.use(express.static("./public"));

app.listen(process.env.PORT || 8000);
