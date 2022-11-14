const video = document.querySelector('video');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(error => console.error('You denied a webcam!!', error));
};

function paintToCanvas() {
  const { videoWidth: width, videoHeight: height } = video;
  [canvas.width, canvas.height] = [width, height];
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    pixels = greenScreen(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] += 100;
    pixels.data[i + 1] -= 50;
    pixels.data[i + 2] *= 0.5;
  }
  
  return pixels;
}

function greenScreen(pixels) {
  const inputs = [...document.querySelectorAll('.rgb input')].reduce((levels, input) => ({
    ...levels,
    [input.name]: input.value,
  }), {});

  for (i = 0; i < pixels.data.length; i += 4) {
    const [red, green, blue] = [pixels.data[i], pixels.data[i + 1], pixels.data[i + 2]];

    if (
      red >= inputs.rmin && green >= inputs.gmin && blue >= inputs.bmin && 
      red <= inputs.rmax && green <= inputs.gmax && blue <= inputs.bmax
    ) pixels.data[i + 3] = 0;
  }

  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i];
    pixels.data[i + 100] = pixels.data[i + 1];
    pixels.data[i - 150] = pixels.data[i + 2];
  }

  return pixels;
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', 'Handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firstChild);
}

document.addEventListener('DOMContentLoaded', getVideo);
video.addEventListener('canplay', paintToCanvas);