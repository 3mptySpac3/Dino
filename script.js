document.addEventListener('DOMContentLoaded', () => {
  const backgroundMusic = document.getElementById('background-music');
  backgroundMusic.volume = 0.5;
  
  // Check if music was playing before and attempt to play
  if (localStorage.getItem('musicPlaying') === 'true') {
    backgroundMusic.play().catch(e => console.error("Autoplay was prevented due to browser policy. Please interact with the document."));
  }

  document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyF') {
      // Toggle music playing state based on current state
      if (backgroundMusic.paused) {
        backgroundMusic.play().then(() => {
          localStorage.setItem('musicPlaying', 'true');
          console.log("Music started");
        }).catch(e => console.error("Failed to play music. User interaction might be required."));
      } else {
        backgroundMusic.pause();
        localStorage.setItem('musicPlaying', 'false');
        console.log("Music paused");
      }
    }
  });
});

function adjustGameScale() {
  const gameWidth = 800; 
  const gameHeight = 400; 
  const scaleWidth = window.innerWidth / gameWidth;
  const scaleHeight = window.innerHeight / gameHeight;
  const scale = Math.min(scaleWidth, scaleHeight);
  
  document.documentElement.style.setProperty('--game-scale', scale);
}

window.addEventListener('resize', adjustGameScale);
adjustGameScale(); 

var backgroundMusic = document.getElementById('background-music');
backgroundMusic.play(); 

document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    jump(); // Call the jump function if the spacebar is pressed

    var jumpSound = document.getElementById('jump-sound');
    jumpSound.currentTime = 0; // Rewind to the start
    jumpSound.play(); // Play the jump sound
  }
});

document.addEventListener('keydown', function(event) {
  if (event.code === 'KeyR') { 
    location.reload(); // Reloads the current page
  }
});

var startBtn = document.getElementById('start-btn');

startBtn.addEventListener('click', function() {
  location.reload(); // This will refresh the page
});


var character = document.getElementById('character'); 
var block = document.getElementById('block');
var score = 0; // Initialize score variable

function jump() {
  if (character.classList != 'animate') {
    character.classList.add('animate');
    setTimeout(function() {
      character.classList.remove('animate');
    }, 500);
  }
}

var checkDead = setInterval(function() {
  var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
  var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));

  if (blockLeft < 20 && blockLeft > 0) { 
    score++; // Increment score
    document.getElementById('scoreSpan').innerText = score; // Update score display
  }

  if (blockLeft < 355 && blockLeft > 300 && characterTop >= 330) {
    block.style.animation = 'none';
    block.style.display = 'none';
    document.getElementById('gameOver').style.display = 'block'; // Show game over screen
    document.getElementById('finalScore').innerText = score; // Display final score

    var gameoverSound = document.getElementById('gameover-sound');
    gameoverSound.play(); // Play the game over sound
    
    document.getElementById('restart-btn').addEventListener('click', function() {
      location.reload(); 
    });
  }
}, 10);

