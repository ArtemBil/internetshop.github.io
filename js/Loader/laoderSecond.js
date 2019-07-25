let line = document.querySelector('.preloader-line');
let width = 0;
let opac = 9.9;
var renderLine;
document.body.onload = preloaderLine;

function preloaderLine() {
  renderLine = setInterval(addLine, 5);
  function addLine() {
    width++;
    opac -= 0.1;
    line.style.transition = 'opacity .5s'
    line.style.width = width + '%';
    line.style.opacity = opac;


    if (width == 100) {
      clearInterval(renderLine);
    }
  }
}