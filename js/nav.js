let currentMarker = 'marker3';
let menuOpened = false;


/**
 * 
 * setting the current marker and showing it
 * @param {number} i 
 */
function setCurrentLink(i) {
    document.getElementById(currentMarker).classList.add('d-none');
    currentMarker = 'marker' + i;
    document.getElementById(currentMarker).classList.remove('d-none');
}


function toggleMenu() {
    if (!menuOpened) {
        document.getElementById('nav').classList.add('display');
        menuOpened = !menuOpened;
    } else {
        document.getElementById('nav').classList.remove('display');
        menuOpened = !menuOpened;
    }
}