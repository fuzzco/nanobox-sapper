export const $ = selector => Array(...document.querySelectorAll(selector))

export const isEven = n => n === 0 || !!(n && !(n%2));

export const isInViewport = (el)=> {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
  }

export const closest = (className, context) => {
  var current;
  for (current = context; current; current = current.parentNode) {
    if (current.nodeType === 1 && current.classList.contains(className)) {
      break;
    }
  }
  return current;
}

export default closest