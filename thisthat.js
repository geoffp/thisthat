'use strict';

var ThisThat = (function () {
  
  var _ThisThat = function (optionsGiven) {
    var defaults = {
      containerSelector: 'body',
      elementSelectors: [
        [/*'.foo', '.bar'*/]
      ],
      time: '300ms'
    };
    var options = this.options = deepExtend(defaults, optionsGiven);

    // turn selectors into real stuff
    var container = this.container = document.querySelector(this.options.containerSelector);
    
    // get a real array of elements
    this.elementPairs = options.elementSelectors.map(function(selectorPair) {
      return [
        container.querySelector(selectorPair[0]),
        container.querySelector(selectorPair[1])
      ];
    });
  };

  // private

  _ThisThat.prototype = {
    go: function () {
      var that = this;
      
      var clone = new AbsoluteClone(this.elementPairs[0][0]);
      var endEl = this.elementPairs[0][1];
      clone.hideOriginal();
      this.enableTransition(clone.el);
      this.move(clone.el, endEl);
      
      var onMoveEnd = function () {
        endEl.classList.remove('h-hidden');
        clone.remove();
        clone.el.removeEventListener("transitionend", onMoveEnd, false);
      };
      clone.el.addEventListener("transitionend", onMoveEnd, false);
    },
    move: function (el, endEl) {
      el.style.height = endEl.offsetHeight + 'px';
      el.style.width = endEl.offsetWidth + 'px';
      el.style.top = endEl.offsetTop + 'px';
      el.style.left = endEl.offsetLeft + 'px';
    },
    enableTransition: function (el) {
      el.style.transitionProperty = 'height, width, top, left';
      el.style.transitionDuration = this.options.time;
      el.style.transitionEasing = 'ease';
    }
  };

  return _ThisThat;
})();




var AbsoluteClone = function (originalEl) {
  this.originalEl = originalEl;
  
  var el = this.el = this.freeze();
  this.hide().append().show();
};

AbsoluteClone.prototype = {
  freeze: function () {
    var el = this.originalEl.cloneNode(true);
    this.originalEl.absoluteClone = this;
    
    // freeze dimensions
    el.style.position = 'absolute';
    el.style.height = this.originalEl.offsetHeight + 'px';
    el.style.width = this.originalEl.offsetWidth + 'px';
    el.style.top = this.originalEl.offsetTop + 'px';
    el.style.left = this.originalEl.offsetLeft + 'px';

    return el;
  },
  hide: function () {
    this.el.style.opacity = 0;
    return this;
  },
  show: function () {
    this.el.style.opacity = 1;
    return this;
  },
  hideOriginal: function () {
    this.originalEl.style.opacity = 0;
    return this;
  },
  showOriginal: function () {
    this.originalEl.style.opacity = 1;
    return this;
  },
  append: function () {
    this.originalEl.parentElement.appendChild(this.el);
    return this;
  },
  remove: function () {
    this.originalEl.parentElement.removeChild(this.el);
    return this;
  }
};

// deepExtend({}, objA, objB);
var deepExtend = function(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj)
      continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object')
          out[key] = deepExtend(out[key], obj[key]);
        else
          out[key] = obj[key];
      }
    }
  }

  return out;
};



