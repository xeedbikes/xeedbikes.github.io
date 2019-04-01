if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

var carousel = {
  arrowButtons: true,
  carouselID: '',

  init: function (id) {
    carousel.carouselID = id;
    carousel.activateCarousels();
  },

  activateCarousels: function () {
    var car = document.querySelector('#' + carousel.carouselID),
      list = car.querySelector('ul.carousel-list'),
      items = list.querySelectorAll('.carousel-list-item'),
      itemsCount = items.length,
      i = 0;
    
    list.style.width = itemsCount * 100 + 'vw'

    var htmlCarouselDotsList = '<ul id="dots" class="carousel-dots"></ul>';
    
    if (itemsCount && carousel.arrowButtons) {
      if (itemsCount > 1) {
        car.innerHTML += htmlCarouselDotsList;
        carousel.activateNextAndPrev();
      }

      var dotsList = document.querySelector('#' + carousel.carouselID + ' #dots');

      for (i = 0; i < itemsCount; i++) {
        dotsList.innerHTML += '<li><input type="radio" name="carousel" class="carousel-dot carousel-nav" data-value="' + i + '" id="i' + i + '"' + (i === 0 ? ' checked' : '') + '><label for="i' + i + '"></label></li>'
      }

      document.addEventListener('click', function (e) {
        if (e.target.matches('.carousel-dot')) {
          carousel.carouselChange(e.target.dataset.value);
        }

        if (e.target.matches('.carousel-nav')) {
          car.classList.add('slide');
          setTimeout(function () {
            car.classList.remove('slide');
          }, 300);
        }
      }, false);
    }
  },

  activateNextAndPrev: function () {
    var arrowButtons = document.querySelectorAll('#' + carousel.carouselID +' [data-move]'),
      items = arrowButtons.length;

    for (var i = 0; i < items; i++) {
      arrowButtons[i].removeAttribute('hidden');
      arrowButtons[i].addEventListener('click', function(e) {
        carousel.moveNextOrPrev(e);
      });
      arrowButtons[i].addEventListener('keyup', function(e) {
        if(e.keyCode == 13) {
          carousel.moveNextOrPrev(e);
        }
      });
    }
  },

  moveNextOrPrev: function (e) {
    var name = e.target.dataset.carousel,
      buttons = document.querySelectorAll('input[name=' + name + ']'),
      move = (e.target.dataset.move === 'next') ? 1 : -1,
      selectedButton = Number(document.querySelector('input[name=' + name + ']:checked').dataset.value),
      newValue = (buttons.length + selectedButton + move) % buttons.length;

    buttons[newValue].checked = true;
    carousel.carouselChange(newValue);
  },

  carouselChange: function (value) {
    document.querySelector('.carousel-list').setAttribute('class', 'carousel-list carousel-slide-' + value);
  }
}