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
var menuTogglers = document.querySelectorAll('[data-menu-toggler]');
var menuAnimDuration = 200;

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

var fnMenuToggle = function fnMenuToggle(i) {
  var item = menuTogglers[i];
  item.setAttribute('role', 'button');
  item.setAttribute('aria-expanded', false);
  item.onclick = function (e) {
    e.preventDefault();
    var target = item.getAttribute('data-menu-toggler');
    var selector = menu.querySelector(target);
    var isOpen = selector.classList.contains('shown') ? true : false;
    if (!isOpen) {
      var openItem = document.querySelector('[data-menu-toggler].active');
      if (openItem) {
        openItem.click();
      }
      item.classList.add('active');
      item.setAttribute('aria-expanded', true);
      selector.classList.add('shown');
      // selector.setAttribute('tabindex', '-1');
    } else {
      item.classList.remove('active');
      item.setAttribute('aria-expanded', false);
      selector.classList.remove('shown');
      // selector.removeAttribute('tabindex');
    }
    if (document.querySelector('[data-menu-toggler].active')) {
      menu.classList.add('has-open-item');
    } else {
      menu.classList.remove('has-open-item');
    }
  };
};

for (var i = 0; i < menuTogglers.length; i++) {
  fnMenuToggle(i);
}

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