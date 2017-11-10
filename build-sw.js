/**
 * Automatically builds the app service-worker (sw). The sw pre-caches all app static
 * assets and drastically improves site performance.
 * To run this script, first build the app (make sure the app is in the dist/ folder),
 * then run 'node build-sw'.
 */
const swBuild = require('workbox-build');

swBuild.generateSW({
    globDirectory: './dist/',
    globPatterns: [
        'index.html',
        '*.js',
        '*.css',
        '*.ico'
    ],
    globIgnores: [
        'sag-sw.js',
        'workbox-sw.prod.v2.1.1.js'
    ],
    swDest: './dist/sag-sw.js',
    cacheId: 'sag',
    navigateFallback: '/index.html',
}).then(
    () => console.log('Service worker generated.'),
    err => console.log('ERROR: could not generate service-worker', err));
