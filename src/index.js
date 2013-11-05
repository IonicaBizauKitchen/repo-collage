window.domready = require('domready');
window.drag = require('drag');

domready(function() {

  console.log('dom is ready');

  NodeList.prototype.forEach = Array.prototype.forEach;
  document.querySelectorAll('.draggables > li').forEach(function(element, index) {

    element.style.top = index * document.querySelector('li').offsetHeight;

    drag(element)
      .end(function(el) { console.log(el); })
      .bind();
  });

})
