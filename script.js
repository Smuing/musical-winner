// background
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const frameCount = 152;
const currentFrame = index =>
  `./images/sample/sample_${index.toString().padStart(3, "0")}.jpg`;

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

canvas.width = 990;
canvas.height = 2092;

const img = new Image();
img.src = currentFrame(1);
img.onload = function () {
  context.drawImage(img, 0, 0);
};

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
};

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(frameCount - 1, Math.ceil(scrollFraction * frameCount));

  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

preloadImages();

// text
let texts = document.querySelectorAll("#text div");

function slope(x1, x2, v1, v2) {
  let a = (v1 - v2) / (x1 - x2);
  let b = -(x1 * a) + v1;

  let h = document.documentElement.scrollTop;

  return a * h + b;
}

let sh = screen.height;
let term = 2000;
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;

  for (let i = 0; i < texts.length; i++) {
    let num = term + term * 2 * i;
    if (scrollTop <= num) {
      texts[i].style.opacity = slope(num - term, num, 0, 1);
    } else {
      texts[i].style.opacity = slope(num, num + term, 1, 0);
    }
  }
});
