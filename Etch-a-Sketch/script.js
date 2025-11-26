let mode = "draw";

function createGrid(size) {
  const container = document.getElementById("container");
  container.innerHTML = "";
  const squareSize = 960 / size;
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.addEventListener("mouseover", () => {
      if (mode === "draw") {
        square.style.backgroundColor = "black";
      }
      else if (mode === "erase") {
        square.style.backgroundColor = "white";
      }
    });
    container.appendChild(square);
  }
}
document.getElementById("resizeBtn").addEventListener("click", () => {
  let newSize = prompt("Enter grid size (1–100):");
  if (newSize !== null) {
    newSize = parseInt(newSize);
    if (newSize > 0 && newSize <= 100) {
      createGrid(newSize);
    }
    else {
      alert("Please enter a number between 1 and 100.");
    }
  }
});

function setActiveButton(activeId) {
  document.querySelectorAll(".controls button").forEach(btn => {
    btn.classList.remove("active");
  });
  document.getElementById(activeId).classList.add("active");
}

document.getElementById("drawBtn").addEventListener("click", () => {
  mode = "draw";
  setActiveButton("drawBtn");
});

document.getElementById("eraserBtn").addEventListener("click", () => {
  mode = "erase";
  setActiveButton("eraserBtn");
});

setActiveButton("drawBtn");
createGrid(16);