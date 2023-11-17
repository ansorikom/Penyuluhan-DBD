function welcomeMessage() {
    var header = document.querySelector("header");
    var div = document.createElement("div");
    div.className = "welcome";
    div.style.padding = "10px";
    div.style.backgroundColor = "var(--tertiary-color)";
    div.style.color = "var(--light-color)";
    div.style.textAlign = "center";
    var p = document.createElement("p");
    // Menambahkan teks ke p
    p.textContent = "Selamat datang di website penyuluhan DBD untuk anak-anak. Semoga website ini bermanfaat untuk Anda.";
    // Menambahkan p ke div
    div.appendChild(p);
    header.appendChild(div);
}

function showQuiz() {
    var container = document.querySelectorAll(".container")[1];
    // Membuat elemen div
    var div = document.createElement("div");
    div.className = "section";

    var h2 = document.createElement("h2");
    h2.textContent = "Quiz: Seberapa paham Anda tentang DBD?";
    div.appendChild(h2);

    // Membuat array pertanyaan
    var questions = [
        {
            question: "Apa yang menyebabkan DBD?",
            choices: ["Virus dengue", "Bakteri salmonella", "Jamur candida", "Parasit malaria"],
            answer: 0
        },
        {
            question: "Nyamuk apa yang dapat menularkan virus dengue?",
            choices: ["Aedes aegypti", "Anopheles gambiae", "Culex pipiens", "Mansonia uniformis"],
            answer: 0
        },
        {
            question: "Apa gejala utama DBD?",
            choices: ["Demam tinggi", "Batuk kering", "Sesak napas", "Diare berdarah"],
            answer: 0
        },
        {
            question: "Apa yang harus Anda lakukan jika mengalami gejala DBD?",
            choices: ["Minum obat penurun panas", "Minum air kelapa", "Periksakan diri ke dokter", "Tidur yang cukup"],
            answer: 2
        },
        {
            question: "Apa yang dapat Anda lakukan untuk mencegah DBD?",
            choices: ["Menghindari gigitan nyamuk", "Mengonsumsi makanan bergizi", "Menggunakan masker", "Mencuci tangan"],
            answer: 0
        }
    ];

    questions = questions.sort(() => Math.random() - 0.5);


    var score = 0;
    var index = 0;

    function showQuestion() {
        var p = document.createElement("p");
        p.textContent = questions[index].question;
        // Menambahkan p ke div
        div.appendChild(p);
        var ul = document.createElement("ul");

        ul.style.listStyleType = "none";
        ul.style.paddingLeft = "0";
        for (var i = 0; i < questions[index].choices.length; i++) {
            var li = document.createElement("li");
            li.className = "choice";
            li.style.marginBottom = "10px";
            li.style.padding = "10px";
            li.style.borderRadius = "10px";
            li.style.backgroundColor = "var(--secondary-color)";
            li.style.color = "var(--light-color)";
            li.style.cursor = "pointer";

            li.setAttribute("data-index", i);
            li.textContent = questions[index].choices[i];

            // Menambahkan event listener ke li
            li.addEventListener("click", function() {
                var choice = this.getAttribute("data-index");
                if (choice == questions[index].answer) {
                    score++;
                    alert("Benar!");
                } else {
                    alert("Salah!");
                }

                index++;
                div.removeChild(p);
                div.removeChild(ul);
                if (index == questions.length) {
                    showResult();
                } else {
                    showQuestion();
                }
            });
            ul.appendChild(li);
        }
        div.appendChild(ul);
    }

    function showResult() {
        var p = document.createElement("p");
        p.textContent = "Skor Anda: " + score + " / " + questions.length + " atau " + (score / questions.length * 100) + "%";
        div.appendChild(p);
        var button = document.createElement("button");
        button.textContent = "Ulangi";

        button.addEventListener("click", function() {
            div.removeChild(p);
            div.removeChild(button);
            score = 0;
            index = 0;
            showQuestion();
        });
        // Menambahkan button ke div
        div.appendChild(button);
    }

    showQuestion();
    container.appendChild(div);
}


welcomeMessage();
showQuiz();

// Get the canvas element and its context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Define some constants
var MOSQUITO_RADIUS = 10; // The radius of the mosquito circle
var MOSQUITO_SPEED = 2; // The speed of the mosquito movement
var GAME_TIME = 30; // The game time in seconds
var MAX_MOSQUITOES = 10; // The maximum number of mosquitoes on the screen

// Define some variables
var score = 0; // The current score
var time = GAME_TIME; // The remaining time
var mosquitoes = []; // The array of mosquitoes
var timer; // The timer for the game loop
var countdown; // The timer for the countdown
var scale = 1; // The canvas scale

// Define a mosquito object
function Mosquito(x, y, dx, dy) {
  this.x = x; // The x coordinate
  this.y = y; // The y coordinate
  this.dx = dx; // The x velocity
  this.dy = dy; // The y velocity
}

// Draw a mosquito on the canvas
Mosquito.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, MOSQUITO_RADIUS, 0, Math.PI * 2); // Draw a circle
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
};

// Move a mosquito according to its velocity and bounce off the walls
Mosquito.prototype.move = function() {
  this.x += this.dx; // Update the x coordinate
  this.y += this.dy; // Update the y coordinate
  // Check if the mosquito hits the left or right wall
  if (this.x < MOSQUITO_RADIUS || this.x > canvas.width - MOSQUITO_RADIUS) {
    this.dx = -this.dx; // Reverse the x velocity
  }
  // Check if the mosquito hits the top or bottom wall
  if (this.y < MOSQUITO_RADIUS || this.y > canvas.height - MOSQUITO_RADIUS) {
    this.dy = -this.dy; // Reverse the y velocity
  }
};

// Check if a mosquito is clicked by the mouse
Mosquito.prototype.isClicked = function(mouseX, mouseY) {
  // Calculate the distance between the mosquito and the mouse
  var distance = Math.sqrt(Math.pow(this.x - mouseX, 2) + Math.pow(this.y - mouseY, 2));
  // Return true if the distance is less than the mosquito radius
  return distance < MOSQUITO_RADIUS;
};

// Generate a random number between min and max
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random mosquito
function generateMosquito() {
  // Generate a random position on the canvas
  var x = random(MOSQUITO_RADIUS, canvas.width - MOSQUITO_RADIUS);
  var y = random(MOSQUITO_RADIUS, canvas.height - MOSQUITO_RADIUS);
  // Generate a random direction (either -1 or 1)
  var dx = random(0, 1) * 2 - 1;
  var dy = random(0, 1) * 2 - 1;
  // Create a new mosquito object
  var mosquito = new Mosquito(x, y, dx * MOSQUITO_SPEED, dy * MOSQUITO_SPEED);
  // Add the mosquito to the array
  mosquitoes.push(mosquito);
}

// Handle the mouse click event
function handleClick(event) {
  // Get the mouse position relative to the canvas
  var mouseX = event.clientX - canvas.offsetLeft;
  var mouseY = event.clientY - canvas.offsetTop;
  // Loop through the mosquitoes array
  for (var i = 0; i < mosquitoes.length; i++) {
    // Check if the mosquito is clicked
    if (mosquitoes[i].isClicked(mouseX, mouseY)) {
      // Remove the mosquito from the array
      mosquitoes.splice(i, 1);
      // Increase the score by one
      score++;
      // Update the score display
      document.getElementById("score").innerHTML = "Score: " + score;
      // Break the loop
      break;
    }
  }
}

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Draw the mosquitoes on the canvas
function drawMosquitoes() {
  // Loop through the mosquitoes array
  for (var i = 0; i < mosquitoes.length; i++) {
    // Draw the mosquito
    mosquitoes[i].draw();
  }
}

// Move the mosquitoes on the canvas
function moveMosquitoes() {
  // Loop through the mosquitoes array
  for (var i = 0; i < mosquitoes.length; i++) {
    // Move the mosquito
    mosquitoes[i].move();
  }
}

// Update the game logic
function updateGame() {
  // Clear the canvas
  clearCanvas();
  // Draw the mosquitoes
  drawMosquitoes();
  // Move the mosquitoes
  moveMosquitoes();
  // Generate a new mosquito if the array is not full
  if (mosquitoes.length < MAX_MOSQUITOES) {
    generateMosquito();
  }
}

// Update the countdown
function updateCountdown() {
  // Decrease the time by one second
  time--;
  // Check if the time is up
  if (time == 0) {
    // Stop the game loop
    clearInterval(timer);
    // Stop the countdown
    clearInterval(countdown);
    // Show an alert with the final score
    alert("Time's up! Your score is " + score);
  }
}

// Resize the canvas
function resizeCanvas() {
  // Get the canvas width and height
  var width = canvas.width;
  var height = canvas.height;
  // Get the canvas display width and height
  var displayWidth = canvas.clientWidth;
  var displayHeight = canvas.clientHeight;
  // Calculate the canvas scale
  scale = displayWidth / width;
  // Check if the canvas display size is different from the canvas size
  if (width != displayWidth || height != displayHeight) {
    // Set the canvas size to match the display size
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
}

// Scale the mosquito coordinates
function scaleMosquitoes() {
  // Loop through the mosquitoes array
  for (var i = 0; i < mosquitoes.length; i++) {
    // Scale the mosquito position and velocity by the canvas scale
    mosquitoes[i].x *= scale;
    mosquitoes[i].y *= scale;
    mosquitoes[i].dx *= scale;
    mosquitoes[i].dy *= scale;
  }
}

// Scale the mouse coordinates
function scaleMouse(event) {
  // Scale the mouse position by the canvas scale
  event.clientX *= scale;
  event.clientY *= scale;
}

// Reset the game variables
function resetGame() {
  // Reset the score
  score = 0;
  // Reset the time
  time = GAME_TIME;
  // Reset the mosquitoes array
  mosquitoes = [];
  // Update the score display
  document.getElementById("score").innerHTML = "Score: " + score;
}

// Restart the game
function restartGame() {
  // Stop the game loop
  clearInterval(timer);
  // Stop the countdown
  clearInterval(countdown);
  // Reset the game
  resetGame();
  // Start the game
  startGame();
}

// Start the game
function startGame() {
  // Add the click event listener to the canvas
  canvas.addEventListener("click", function(event) {
    scaleMouse(event);
    handleClick(event);
  });
  // Set the game loop to run every 20 milliseconds
  timer = setInterval(updateGame, 20);
  // Set the countdown to run every second
  countdown = setInterval(updateCountdown, 1000);
}

// Call the resizeCanvas function when the window loads
window.onload = resizeCanvas;
// Call the resizeCanvas function when the window resizes
window.onresize = resizeCanvas;
// Call the scaleMosquitoes function after the resizeCanvas function
window.onresize = function() {
  resizeCanvas();
  scaleMosquitoes();
};
// Run the startGame function when the window loads
window.onload = startGame;
