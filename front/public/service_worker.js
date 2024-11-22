self.addEventListener('push', event => {
    data = event.data.json()
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: 'logo.png'
    });
});
