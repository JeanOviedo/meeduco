document.addEventListener('DOMContentLoaded', function () {
  var imgWs = document.querySelectorAll('.img-w');
  var zoomContainer = document.querySelector('.zoom-container');
  var zoomedImage = zoomContainer.querySelector('.zoomed-image');
  var closeButton = zoomContainer.querySelector('.close-button');

  imgWs.forEach(function (imgW) {
    imgW.addEventListener('click', function () {
      var img = imgW.querySelector('img');
      var imgSrc = img.getAttribute('src');

      zoomedImage.setAttribute('src', imgSrc);
      zoomContainer.classList.add('active');
    });
  });

  closeButton.addEventListener('click', function () {
    zoomedImage.setAttribute('src', '');
    zoomContainer.classList.remove('active');
  });
});