let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return `It's a tie! You both chose ${humanChoice}.`;
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    humanScore++;
    return `You win this round! ${humanChoice} beats ${computerChoice}.`;
  } else {
    computerScore++;
    return `You lose this round! ${computerChoice} beats ${humanChoice}.`;
  }
}

function updateDisplay(message) {
  document.getElementById("roundResult").textContent = message;
  document.getElementById("score").textContent = `You: ${humanScore} | Computer: ${computerScore}`;

  if (humanScore === 5 || computerScore === 5) {
    const finalMessage =
      humanScore > computerScore
        ? "🏆 You win the game!"
        : "💻 Computer wins the game!";
    document.getElementById("finalResult").textContent = finalMessage;
    disableButtons();
    document.getElementById("replay").style.display = "inline-block";
  }
}

function disableButtons() {
  document.querySelectorAll(".choices button").forEach(btn => (btn.disabled = true));
}

function enableButtons() {
  document.querySelectorAll(".choices button").forEach(btn => (btn.disabled = false));
}

function handleChoice(choice) {
  const computerChoice = getComputerChoice();
  const resultMessage = playRound(choice, computerChoice);
  updateDisplay(resultMessage);
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  document.getElementById("roundResult").textContent = "";
  document.getElementById("score").textContent = "You: 0 | Computer: 0";
  document.getElementById("finalResult").textContent = "";
  document.getElementById("replay").style.display = "none";
  enableButtons();
}

document.getElementById("rock").addEventListener("click", () => handleChoice("rock"));
document.getElementById("paper").addEventListener("click", () => handleChoice("paper"));
document.getElementById("scissors").addEventListener("click", () => handleChoice("scissors"));
document.getElementById("replay").addEventListener("click", resetGame);