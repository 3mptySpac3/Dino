
document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    jump(); // Call the jump function if the spacebar is pressed

    var jumpSound = document.getElementById('jump-sound');
    jumpSound.currentTime = 0; // Rewind to the start
    jumpSound.play(); // Play the jump sound
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

  if (blockLeft < 20 && blockLeft > 0) { // Adjusted condition to increment score
    score++; // Increment score
    document.getElementById('scoreSpan').innerText = score; // Update score display
  }

  if (blockLeft < 420 && blockLeft > 400 && characterTop >= 430) {
    block.style.animation = 'none';
    block.style.display = 'none';
    document.getElementById('gameOver').style.display = 'block'; // Show game over screen
    document.getElementById('finalScore').innerText = score; // Display final score
    
    document.getElementById('restart-btn').addEventListener('click', function() {
      location.reload(); 
    });
  }
}, 10);

