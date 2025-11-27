function add(a,b){ return a+b }
function subtract(a,b){ return a-b }
function multiply(a,b){ return a*b }
function divide(a,b){
    if(b===0) return "ERROR"
    return a/b
}

function operate(op,a,b){
    switch(op){
        case "+": return add(a,b)
        case "-": return subtract(a,b)
        case "*": return multiply(a,b)
        case "/": return divide(a,b)
    }
}

let first = null
let operator = null
let shouldReset = false

const display = document.querySelector("#display")

function updateDisplay(num){
    if(display.textContent === "0" || shouldReset){
        display.textContent = num
        shouldReset = false
    } else {
        display.textContent += num
    }
}

document.querySelectorAll("[data-number]").forEach(btn => {
    btn.addEventListener("click", () => updateDisplay(btn.dataset.number))
})

document.querySelectorAll("[data-operator]").forEach(btn => {
    btn.addEventListener("click", () => setOperator(btn.dataset.operator))
})

function setOperator(op){
    if(operator !== null){
        evaluate()
    }
    first = Number(display.textContent)
    operator = op
    shouldReset = true
}

document.querySelector("#equals").addEventListener("click", evaluate)

function evaluate(){
    if(operator === null) return
    const second = Number(display.textContent)
    if(operator === "/" && second === 0){
        display.textContent = "Nope."
        reset()
        return
    }

    const result = operate(operator, first, second)
    display.textContent = round(result)
    first = result
    operator = null
    shouldReset = true
}

function round(n){
    return Math.round(n * 1000) / 1000
}

document.querySelector("#clear").addEventListener("click", () => {
    display.textContent = "0"
    reset()
})

function reset(){
    first = null
    operator = null
    shouldReset = false
}

document.querySelector("#decimal").addEventListener("click", () => {
    if(shouldReset){
        display.textContent = "0"
        shouldReset = false
    }
    if(!display.textContent.includes(".")){
        display.textContent += "."
    }
})

document.querySelector("#backspace").addEventListener("click", () => {
    if(shouldReset){
        display.textContent = "0"
        shouldReset = false
    }
    else {
        display.textContent = display.textContent.slice(0,-1) || "0"
    }
})

window.addEventListener("keydown", handleKeyboard)

function handleKeyboard(e){
    if(e.key >= 0 && e.key <= 9) updateDisplay(e.key)
    if(e.key === ".") document.querySelector("#decimal").click()
    if(["+", "-", "*", "/"].includes(e.key)) setOperator(e.key)
    if(e.key === "Enter") evaluate()
    if(e.key === "Backspace") document.querySelector("#backspace").click()
    if(e.key === "Delete") document.querySelector("#clear").click()
}