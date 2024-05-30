let textString = document.querySelector(".name").textContent;
let nameElement = document.querySelector(".name");

let songName;
let audio = new Audio();
let playPause = document.querySelectorAll(".controls");

// Hide controls initially
playPause.forEach(control => control.style.visibility = 'hidden');

let counter = 0;
let indexCurrent;

// Add event listeners to each song
document.querySelectorAll(".song-image").forEach((song, i) => {
  song.addEventListener("click", function () {
    indexCurrent = i;
    songName = document.querySelectorAll(".song")[i].textContent.trim();
    audio.pause();
    audio.src = "songs/" + songName + ".mp3";
    audio.play();
    playPause[1].innerHTML = pauseIconSVG;
    playPause.forEach(control => control.style.visibility = 'visible');
  });
});

// Handle the visibility of edit icon
document.querySelector(".edit").style.visibility = 'hidden';
nameElement.addEventListener('mouseover', function () {
  nameElement.classList.add('lower-opacity');
  document.querySelector(".edit").style.visibility = 'visible';
});

nameElement.addEventListener('mouseout', function () {
  document.querySelector(".edit").style.visibility = 'hidden';
  nameElement.classList.remove('lower-opacity');
});

document.querySelector(".edit").addEventListener("mouseover", function () {
  document.querySelector(".edit").style.visibility = 'visible';
  nameElement.classList.add('lower-opacity');
});

document.querySelector(".edit").addEventListener("click", function () {
  document.querySelector(".edit-div").innerHTML = '<input class="input-field" type="text">';
  nameElement.style.visibility = 'hidden';
});

let newName;
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    newName = document.querySelector(".input-field").value;

    if (newName !== '') {
      nameElement.style.visibility = 'visible';
      document.querySelector(".input-field").style.visibility = 'hidden';
      document.querySelector(".edit-div").innerHTML = '<img class="edit" src="images/edit.png" alt=""/>';
      nameElement.textContent = newName;
    } else {
      nameElement.style.visibility = 'visible';
      document.querySelector(".input-field").style.visibility = 'hidden';
      document.querySelector(".edit-div").innerHTML = '<img class="edit" src="images/edit.png" alt=""/>';
      nameElement.textContent = textString;
    }
  }
});

// Play the previous song
playPause[0].addEventListener("click", function () {
  if (indexCurrent > 0) {
    audio.pause();
    indexCurrent -= 1;
    playSongAtIndex(indexCurrent);
  }
});

// Play/pause toggle
playPause[1].addEventListener("click",togglePlayPause);
    document.addEventListener('keydown',function(e){
      if(e.key == 'k' || e.key == 'Space'){
        e.preventDefault();
        togglePlayPause();
      }
    });

function togglePlayPause(){
  if (audio) {
    counter++;
    let timeLeft = audio.duration - audio.currentTime;
    if (timeLeft > 0 && counter % 2 === 1) {
      audio.pause();
      playPause[1].innerHTML = playIconSVG;
    } else {
      audio.play();
      playPause[1].innerHTML = pauseIconSVG;
    }
  }
}

// Play the next song
playPause[2].addEventListener("click", function () {
  if (indexCurrent < document.querySelectorAll(".song").length - 1) {
    audio.pause();
    indexCurrent += 1;
    playSongAtIndex(indexCurrent);
  }
});

// Function to play the song at a given index
function playSongAtIndex(index) {
  let playSongNow = document.querySelectorAll(".song")[index].textContent.trim();
  audio.src = "songs/" + playSongNow + ".mp3";
  audio.play();
}

// Play the playlist
let songNumber = 0;
let totalSongs = document.querySelectorAll(".song").length;
document.querySelector(".play").addEventListener("click", function () {
  let currentSongIndex;
  let playedSongs = [];
  let indexofPlayedSongs = 0;
  playPause.forEach(control => control.style.visibility = 'visible');
  playNextSong();
});

function playNextSong() {
  if (songNumber < totalSongs) {
    let songElement = document.querySelectorAll(".song")[songNumber];
    let songName = songElement.textContent.trim();
    playedSongs[indexofPlayedSongs] = songName;
    indexofPlayedSongs++;
    audio.src = "songs/" + songName + ".mp3";
    audio.play();
    audio.onended = function () {
      songNumber++;
      playNextSong();
    };
  }

  function playNextSong1(){
    if (songNumber < totalSongs) {
      let songElement = document.querySelectorAll(".song")[songNumber];
      let songName = songElement.textContent.trim();
      playedSongs[indexofPlayedSongs] = songName;
      indexofPlayedSongs++;
      audio.src = "songs/" + songName + ".mp3";
      audio.play();
    }
  }
  playPause[2].addEventListener('click' , function(){
    audio.pause();
    songNumber++;
    playNextSong1();
  })
  let c = 2;
  playPause[0].addEventListener('click', function(){
    audio.pause();
    audio.pause();
    let lastPlayedIndex = (playedSongs.length)-c;
    let lastPlayed = playedSongs[lastPlayedIndex];
    audio.src = "songs/" + lastPlayed +".mp3";
    audio.play();
    c++;
  })

}

// Shuffle play
let currentSongIndex;
let playedSongs = [];
let indexofPlayedSongs = 0;
document.querySelector(".shuffle").addEventListener("click", function () {  
let currentSongIndex;
let playedSongs = [];
let indexofPlayedSongs = 0;
  playPause.forEach(control => control.style.visibility = 'visible');
  let songList = Array.from(document.querySelectorAll(".song")).map(song => song.textContent.trim());

  function playRandomNextSong() {
    if (songList.length !== 0) {
      let randomSelection = Math.floor(Math.random() * songList.length);
      currentSongIndex = randomSelection;
      let songSelected = songList[randomSelection];
      playedSongs[indexofPlayedSongs] = songList[randomSelection];
      indexofPlayedSongs++;
      audio.src = "songs/" + songSelected + ".mp3";
      audio.play();
      audio.onended = function () {
        songList.splice(randomSelection, 1);
        playRandomNextSong();
      };
    }
  }
  playRandomNextSong();

  playPause[2].addEventListener('click',function(){
    if(songList.length == 1){
      for(let i = 0; i < document.querySelectorAll('.song').length; i++){
        songList[i] = document.querySelectorAll('.song')[i].textContent.trim();
      }
    }
    audio.pause();
    songList.splice(currentSongIndex , 1);
    playRandomNextSong();
  })
  let d =2;
  playPause[0].addEventListener('click', function(){
    let lastPlayedIndex = (playedSongs.length)-d;
    audio.pause();
    let lastPlayed = playedSongs[lastPlayedIndex];
    audio.src = "songs/" + lastPlayed +".mp3";
    audio.play();
    d++;
  })


});




// Animate playlist name
nameElement.innerHTML = textString.split("").map(letter => `<span>${letter}</span>`).join("");
let letters = document.querySelectorAll(".name span");

let index = 0;
setInterval(() => {
  letters[index].classList.add("animate");
  setTimeout(() => {
    letters[index].classList.remove("animate");
  }, 500);
  index = (index + 1) % letters.length;
}, 50);

// SVG Icons
const playIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>`;
const pauseIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fcfcfc" d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>`;