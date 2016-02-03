// demo UI setup

var button1 = document.querySelector('.btn-tryit-test1');
var thisthat1 = new ThisThat({
  elementSelectors: [
    ['.image1', '.image2']
  ]
});
button1.addEventListener('click', function () {
  thisthat1.go();
});
