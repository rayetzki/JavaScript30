let countdown;
const buttons = document.querySelectorAll('.timer__button');
const input = document.querySelector('#custom');
const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

function formatEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function tick(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const time = `${minutes < 10 ? `0${minutes}` : minutes}:${secs < 10 ? `0${secs}` : secs}`;
  if (seconds <= 0) return clearTimer(countdown);
  timeLeft.textContent = time;
  document.title = time;
  countdown = setTimeout(() => tick(seconds - 1), 1000);
}

function runTimer(seconds) {
  const now = Date.now();
  if (countdown) return;
  formatEndTime(now + seconds * 1000);
  tick(seconds);
}

function resetTimer() {
  if (countdown) clearTimeout(countdown);
  countdown = undefined;
}

function clearTimer() {
  const timeIsUp = '0:00';
  document.title = timeIsUp;
  timeLeft.textContent = timeIsUp;
  resetTimer();
}

function updateTimer() {
  resetTimer();
  const seconds = +this.dataset.time;
  runTimer(seconds);
}

function setTimer(e) {
  e.preventDefault();
  resetTimer();
  const minutes = +this.elements[0].value;
  if (Number.isNaN(minutes)) return;
  runTimer(minutes * 60);
}

input.addEventListener('submit', setTimer);
buttons.forEach(button => button.addEventListener('click', updateTimer))