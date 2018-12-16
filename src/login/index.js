import  './index.scss'

function component() {
  var element = document.createElement('div');
  element.innerHTML = 'node + webpack'
  return element;
}

document.body.appendChild(component());
