import {Workbox} from 'workbox-window';

const registerServiceWorker = function () {
    // Check if the serviceWorker Object exists in the navigator object ( means if browser supports SW )
    if ('serviceWorker' in navigator) {
        const wb = new Workbox('service-worker.js');

        wb.addEventListener('activated', event => {
            // `event.isUpdate` will be true if another version of the service
            // worker was controlling the page when this version was registered.
            if (!event.isUpdate) {
                console.log('Service worker activated for the first time!');

                // If your service worker is configured to precache assets, those
                // assets should all be available now.
            }
        });

        wb.addEventListener('waiting', () => {
            console.log('waiting');
            wb.messageSkipWaiting();
        });

        wb.addEventListener('controlling', () => {
            console.log('controlling');
            window.location.reload();
        });

        wb.addEventListener('installed', () => {
            console.log('SW installed');
        });

        wb.addEventListener('message', event => {
            if (event.data.type === 'CACHE_UPDATED') {
                const {updatedURL} = event.data.payload;

                console.log(`A newer version of ${updatedURL} is available!`);
            }
        });

        wb.register()
            .then(registration => {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, err => {
                // registration failed
                console.log('ServiceWorker registration failed: ', err);
            });
    }
};

export default registerServiceWorker;
