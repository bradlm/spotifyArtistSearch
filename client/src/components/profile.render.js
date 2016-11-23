export var removeListeners = node => {
  var clone = node.cloneNode(true);
  node.parentNode.replaceChild(clone, node);
  return clone;
};

//profile elements renderer
export var renderProfileElement = (node, className, content) => {
  node.innerHTML = node.innerHTML.replace(/^\+/, '-');
  var next = node.nextSibling;
  if(content) {
    var parent = node.parentNode;
    var newNode = document.createElement('DIV');
    newNode.className = className;
    newNode.innerHTML = content;

    parent.lastChild === node ?
      parent.appendChild(newNode)
      : parent.insertBefore(newNode, next);
  } else {
    next.style.removeProperty('display');
  }
};

export var removeProfileElement = function(e, cb) {
  e.preventDefault();
  var node = e.target;
  node.innerHTML = node.innerHTML.replace(/^\-/, '+');
  node.nextSibling.style.display='none';
  node = removeListeners(node);
  node.addEventListener('click', cb);
};