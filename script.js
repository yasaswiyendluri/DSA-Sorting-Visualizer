const arrayContainer = document.getElementById("array-container");
const generateBtn = document.querySelector("#controls button");

let array = [];
const ARRAY_SIZE = 30;
const MAX_HEIGHT = 250;

// Generate random array
function generateArray() {
    array = [];
    arrayContainer.innerHTML = "";

    for (let i = 0; i < ARRAY_SIZE; i++) {
        const value = Math.floor(Math.random() * MAX_HEIGHT) + 10;
        array.push(value);

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value}px`;

        arrayContainer.appendChild(bar);
    }
}

// Button click
generateBtn.addEventListener("click", generateArray);

// Initial load
generateArray();

const bubbleBtn = document.querySelectorAll("#controls button")[1];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    const bars = document.querySelectorAll(".bar");

    for (let i = 0; i < bars.length; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {

            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";

            await sleep(100);

            const height1 = parseInt(bars[j].style.height);
            const height2 = parseInt(bars[j + 1].style.height);

            if (height1 > height2) {
                bars[j].style.height = `${height2}px`;
                bars[j + 1].style.height = `${height1}px`;
            }

            bars[j].style.backgroundColor = "steelblue";
            bars[j + 1].style.backgroundColor = "steelblue";
        }

        bars[bars.length - i - 1].style.backgroundColor = "green";
    }
}

bubbleBtn.addEventListener("click", bubbleSort);
