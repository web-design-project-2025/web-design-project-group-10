const images = document.querySelectorAll("#carousel img");
let current = 0;

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

function next() {
  current = (current + 1) % images.length;
  showImage(current);
}

function prev() {
  current = (current - 1 + images.length) % images.length;
  showImage(current);
}
setInterval(() => {
  next();
}, 3000);
