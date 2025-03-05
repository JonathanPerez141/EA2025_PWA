//Evento fetch actualiza la aplicacion
self.addEventListener('fetch', e => {
    e.responseWith(
        caches.match(e.request).then((res) => {
            if (res) {
                //Devuelve datos desde cache
                return res;
            }
            return fetch(e.request);
        })
    );
});

//constante

const CACHE_NAME = "v1_cache_PWA";

var urlsToCache= [
    './',
    './css/styles.css',
    './img/favicon16.png',
    './img/favicon32.png',
    './img/favicon64.png',
    './img/favicon96.png',
    './img/favicon128.png',
    './img/favicon144.png',
    './img/favicon192.png',
    './img/favicon240.png',
    './img/favicon256.png',
    './img/favicon384.png',
    './img/favicon512.png',
    './img/favicon1024.png',
    './img/genesis_manufacturing_services_cover.jpg',
    './img/portafolio.png',
    './img/SmartTank.jpg',
    './img/Soul_Quest.jpg',
    './js/app.js',
    './js/main.js'
];

//Eventos que tiene un SW

//Instalacion del sw y guardar los recursos estaticos de la app.
//Evento Install

self.addEventListener('install', e=> {
    e.waitUnitil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                            .then(() => {
                                self.skipWaiting();
                            });
            })
            .catch(err=> {
                console.log('No se ha cargado la cache',err)
            })
    );
});

self.addEventListener('activate', e=> {
    //añadimos todos los elementos en la cache
    const cacheWhiteList = [CACHE_NAME];
    e.waitUnitil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheNames=> {
                        if (cacheWhiteList.indexOf(cacheNames)=== -1) {
                            //borrar los elementos que ya no esten en 
                            //la cache o no se necesiten
                            return caches.delete(cacheNames);
                        }
                    })
                );
            })
            .then(() =>{
                //Activar cache en el dispositivo
                self.clients.claim();
            })
    );
});