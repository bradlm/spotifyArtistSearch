const DEFAULT_DEBOUNCE_TIMER = 600;

export var debounce = (func, wait = DEFAULT_DEBOUNCE_TIMER) => {
  //modified underscore.js debounce
  var timeout, args, context, timestamp, result;
  var later = () => {
    var last = Date.now() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    }
  };
  return function() {
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
};

//querySelectorAll Firefox compatability fix
export var browserCompatibility = that => {
  document.deprecated = {
    querySelectorAll: document.querySelectorAll
  };
  document.querySelectorAll = function(...args) {
    return Array.from(document.deprecated.querySelectorAll.call(that, args));
  };
}