

const video = document.querySelector('video');
const toggle = document.querySelector('.toggle');
const volume = document.querySelector('[name="volume"]');
const playbackRate = document.querySelector('[name="playbackRate"]');
const skip10 = document.querySelector('[data-skip="-10"]');
const skip25 = document.querySelector('[data-skip="25"]');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

function toggleVideo() {
  if (video.paused) {
    video.play();
    toggle.textContent = '||';
  } else {
    video.pause();
    toggle.textContent = '►';
  };
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function changeVolume({ target }) {
  video.volume = target.value;
}

function skip(value) {
  video.currentTime += value;
}

function playback({ target }) {
  video.playbackRate = target.value;
}

function scrub({ offsetX }) {
  video.currentTime = (offsetX / progress.offsetWidth) * video.duration;
}

video.addEventListener('timeupdate', handleProgress);
video.addEventListener('click', toggleVideo);
toggle.addEventListener('click', toggleVideo);
volume.addEventListener('change', changeVolume);
playbackRate.addEventListener('change', playback);
skip10.addEventListener('click', () => skip(+skip10.dataset.skip));
skip25.addEventListener('click', () => skip(+skip25.dataset.skip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
