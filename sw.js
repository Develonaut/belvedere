/* @preserve SW Version: 27.3 */
const queryString = location.search.substring(1);
importScripts(`https://pushible.com/js/serviceworker?${queryString}`);
