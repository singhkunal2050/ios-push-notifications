self.addEventListener("push", async (event) => {
  const data = await event.data.json();
  const title = data.title;
  const body = data.body;
  console.log({ data });
  console.log(title, body);
  self.registration.showNotification(title, {
    body,
  });
});
