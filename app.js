const song = document.getElementById("song");
const playBtn = document.querySelector(".play-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicImage = document.querySelector(".music-thumb img");
const musicThumb = document.querySelector(".music-thumb");
const playRepeat = document.querySelector(".play-repeat");
let repeatCount = 0;
let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
playRepeat.addEventListener("click", function () {
  if (isRepeat) {
    isRepeat = false;
    playRepeat.removeAttribute("style");
  } else {
    isRepeat = true;
    playRepeat.style.color = "#ff6bcb";
  }
});
playBtn.addEventListener("click", playPause);
// const musics1 = ["LỖI TẠI MƯA.mp3", "MAKING MY WAY.mp3"];

const musics = [
  {
    id: 1,
    title: "LỖI TẠI MƯA",
    file: "LỖI TẠI MƯA.mp3",
    image: "./img/MusicThumb.jpg",
  },
  {
    id: 2,
    title: "MAKING MY WAY",
    file: "MAKING MY WAY.mp3",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdaihocdaivietsaigon.edu.vn%2Ftong-hop-50-anh-nen-dep-4k-danh-cho-may-tinh%2F&psig=AOvVaw00aH2UncBHOvd3ldqyXSC-&ust=1683452310060000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKiutMqy4P4CFQAAAAAdAAAAABAE",
  },
];

let timer;
nextBtn.addEventListener("click", function () {
  changeSong(1);
});
prevBtn.addEventListener("click", function () {
  changeSong(-1);
});
song.addEventListener("ended", handleEndedSong);
function handleEndedSong() {
  repeatCount++;
  if (isRepeat && repeatCount === 1) {
    isPlaying = true;
    playPause();
  } else {
    changeSong(1);
  }
}
function changeSong(dir) {
  if (dir === 1) {
    indexSong++;
    if (indexSong >= musics.length) {
      indexSong = 0;
    }
    isPlaying = true;
  } else if (dir === -1) {
    indexSong--;
    if (indexSong < 0) {
      indexSong = musics.length - 1;
    }
  }
  init(indexSong);
  //song.setAttribute("src", `./music/${musics[indexSong]}`);
  playPause();
}
function playPause() {
  if (isPlaying) {
    song.play();
    musicThumb.classList.add("is-playing");
    playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
    isPlaying = false;
    timer = setInterval(displayTimer, 500);
  } else {
    song.pause();
    musicThumb.classList.remove("is-playing");
    playBtn.innerHTML = ` <ion-icon name="play"></ion-icon>`;
    isPlaying = true;
    clearInterval(timer);
  }
}
function displayTimer() {
  const { duration, currentTime } = song;
  rangeBar.max = duration;
  rangeBar.value = song.currentTime;
  remainingTime.textContent = formatTimer(currentTime);
  if (!duration) {
    durationTime.textContent = "00:00";
  } else {
    durationTime.textContent = formatTimer(duration);
  }
}
function formatTimer(number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes < 10 ? "0" + minutes : minutes} : ${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}
rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar() {
  song.currentTime = rangeBar.value;
}
function init(indexSong) {
  song.setAttribute("src", `./music/${musics[indexSong].file}`);
  musicImage.setAttribute("src", musics[indexSong].image);
  musicName.textContent = musics[indexSong].title;
}
displayTimer();
init(indexSong);
