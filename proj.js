var portalUser = "Juan Dela Cruz";
var studentID = "SN123456";
var currentPassword = "portal123";

var quotes = [
  { text: "The beautiful thing about learning is nobody can take it away from you.", author: "– B.B. King" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "– Nelson Mandela" },
  { text: "Enjoy life.", author: "– Dr. En Zo Esee-Dru, PhD" },
  { text: "The end justifies the means.", author: "– Eita N. Tovilah" },
  { text: "Carpe Diem!", author: "– Neil Perry" },
  { text: "Strive for progress, not perfection.", author: "– Unknown" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "– Confucius" }
];

function getGreeting() {
  var hour = new Date().getHours();
  if (hour < 12) {
    return "Good morning";
  } else if (hour < 17) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

function showGreeting(id) {
  var el = document.getElementById(id);
  if (el) {
    el.innerHTML = getGreeting() + ", " + portalUser + "!";
  }
}

function getTodayString() {
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var d = new Date();
  return days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

function showQuote(textId, authorId) {
  var idx = new Date().getDay();
  var q = quotes[idx];
  var t = document.getElementById(textId);
  var a = document.getElementById(authorId);
  if (t) t.innerHTML = "\u201C" + q.text + "\u201D";
  if (a) a.innerHTML = q.author;
}

function buildCalendar(containerId) {
  var el = document.getElementById(containerId);
  if (!el) return;

  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var today = now.getDate();

  var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var dayNames = ["Su","Mo","Tu","We","Th","Fr","Sa"];

  var label = document.getElementById('cal-label');
  if (label) label.innerHTML = monthNames[month] + " " + year;

  var firstDay = new Date(year, month, 1).getDay();
  var daysInMonth = new Date(year, month + 1, 0).getDate();

  var html = '<div class="cal-grid">';
  for (var i = 0; i < 7; i++) {
    html += '<div class="cal-hd">' + dayNames[i] + '</div>';
  }
  for (var j = 0; j < firstDay; j++) {
    html += '<div class="cal-d empty"></div>';
  }
  for (var d = 1; d <= daysInMonth; d++) {
    var cls = d === today ? 'cal-d today' : 'cal-d';
    html += '<div class="' + cls + '">' + d + '</div>';
  }
  html += '</div>';
  el.innerHTML = html;
}

function logout() {
  if (confirm("Log out?")) {
    window.location.href = "index.html";
  }
}

var secretNumber = Math.floor(Math.random() * 20) + 1;
var guessCount = 0;

function checkGuess() {
  var input = document.getElementById('guessInput');
  var feedback = document.getElementById('guess-feedback');
  if (!input || !feedback) return;

  var guess = parseInt(input.value);
  guessCount++;

  if (isNaN(guess) || guess < 1 || guess > 20) {
    feedback.innerHTML = "<span style='color:#ef4444'>Enter a number between 1 and 20.</span>";
    return;
  }

  if (guess < secretNumber) {
    feedback.innerHTML = "<span style='color:var(--blue)'>Too low! Try higher. (Attempt " + guessCount + ")</span>";
  } else if (guess > secretNumber) {
    feedback.innerHTML = "<span style='color:#f59e0b'>Too high! Try lower. (Attempt " + guessCount + ")</span>";
  } else {
    feedback.innerHTML = "<span style='color:#22c55e'>Correct! You got it in " + guessCount + " attempt(s)!</span>";
    secretNumber = Math.floor(Math.random() * 20) + 1;
    guessCount = 0;
  }
  input.value = "";
  input.focus();
}

function resetGame() {
  secretNumber = Math.floor(Math.random() * 20) + 1;
  guessCount = 0;
  var fb = document.getElementById('guess-feedback');
  var inp = document.getElementById('guessInput');
  if (fb) fb.innerHTML = '';
  if (inp) inp.value = '';
}
