let currentMarker = 'marker3';


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