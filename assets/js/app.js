// Disable focus outlining for mouse users
var bodyElem = document.querySelector('body');
window.onmousedown = function () {
  bodyElem.classList.add('mouse-user');
};
window.onkeyup = function (e) {
  e = e || window.event;
  if (e.keyCode === 9)
    bodyElem.classList.remove('mouse-user');
};

// Main menu
var btnMenu = document.getElementById('btn_menu');
var menu = document.getElementById('menu');
var menuIsOpen = false;
btnMenu.onclick = function() {
  if (!menuIsOpen) {
    menu.classList.add('open');
    btnMenu.classList.add('active');
    menuIsOpen = true;
  } else {
    menu.classList.remove('open');
    btnMenu.classList.remove('active');
    menuIsOpen = false;
  }
};

// Hovering link block
// var blocks = document.querySelectorAll('a.block');
// // for (i = 0; i < blocks; i++) {
// //   var el = blocks[i];
// blocks.forEach(el => {
//   el.onmouseenter = function(e) {
//     console.log(e.currentTarget);
//     if (this != e.currentTarget) { return false; }
//     el.classList.add('hover');
//   }
//   el.onmouseleave = function(e) {
//     if (this != e.currentTarget) { return false; }
//     el.classList.remove('hover');
//   }
// }

// Video Youtube
function videoPlay(videoElementButton, videoId) {
  var youtubeUrl = 'https://www.youtube-nocookie.com/embed/'+videoId+'?autoplay=1&modestbranding=1&rel=0';
  var iframe = videoElementButton.parentNode.parentNode.querySelector('iframe');
  iframe.src = youtubeUrl;
  iframe.style = 'z-index: 999';
  if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
    iframe.style.setAttribute('z-index', '999');
  }
}