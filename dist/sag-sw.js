importScripts('workbox-sw.prod.v2.1.1.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "index.html",
    "revision": "f8205568ea1badba50485aa5893f2603"
  },
  {
    "url": "inline.633897462beea53f5c60.bundle.js",
    "revision": "e52412c5e06e3eacb1936ec99f8443a8"
  },
  {
    "url": "main.a5fa9d7332a538c51c63.bundle.js",
    "revision": "cd102e45b18b6e8568cc953dd2033e7c"
  },
  {
    "url": "polyfills.900aaf0d520c2ec873a7.bundle.js",
    "revision": "a1a42d9eb5149e7037b56e5b0ac3d08e"
  },
  {
    "url": "vendor.f68f83bb532e7cde64ed.bundle.js",
    "revision": "7242f70b01bf3d09cbf6a0997ce48481"
  },
  {
    "url": "styles.312796540429a36d8112.bundle.css",
    "revision": "312796540429a36d8112d46e55a7dee5"
  },
  {
    "url": "favicon.ico",
    "revision": "b9aa7c338693424aae99599bec875b5f"
  }
];

const workboxSW = new self.WorkboxSW({
  "cacheId": "sag"
});
workboxSW.precache(fileManifest);
workboxSW.router.registerNavigationRoute("/index.html");
