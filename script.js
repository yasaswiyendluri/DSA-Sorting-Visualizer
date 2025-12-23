const arrayContainer = document.getElementById("array-container");
const generateBtn = document.getElementById("generate");
const bubbleBtn = document.getElementById("bubble");
const mergeBtn = document.getElementById("merge");
const speedSlider = document.getElementById("speed");

let array = [];
const SIZE = 30;
const MAX_HEIGHT = 280;
let delay = speedSlider.value;
let isSorting = false;

// Utility
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function disableControls(disabled) {
    generateBtn.disabled = disabled;
    bubbleBtn.disabled = disabled;
    mergeBtn.disabled = disabled;
    speedSlider.disabled = disabled;
}

// Generate array
function generateArray() {
    if (isSorting) return;

    array = [];
    arrayContainer.innerHTML = "";

    for (let i = 0; i < SIZE; i++) {
        const value = Math.floor(Math.random() * MAX_HEIGHT) + 20;
        array.push(value);

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value}px`;
        arrayContainer.appendChild(bar);
    }
}

generateBtn.addEventListener("click", generateArray);

// Speed control
speedSlider.addEventListener("input", () => {
    delay = speedSlider.value;
});

// -------------------- BUBBLE SORT --------------------
async function bubbleSort() {
    if (isSorting) return;
    isSorting = true;
    disableControls(true);

    const bars = document.querySelectorAll(".bar");

    for (let i = 0; i < bars.length; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";

            await sleep(delay);

            const h1 = parseInt(bars[j].style.height);
            const h2 = parseInt(bars[j + 1].style.height);

            if (h1 > h2) {
                bars[j].style.height = `${h2}px`;
                bars[j + 1].style.height = `${h1}px`;
            }

            bars[j].style.backgroundColor = "steelblue";
            bars[j + 1].style.backgroundColor = "steelblue";
        }
        bars[bars.length - i - 1].style.backgroundColor = "green";
    }

    isSorting = false;
    disableControls(false);
}

bubbleBtn.addEventListener("click", bubbleSort);

// -------------------- MERGE SORT --------------------
async function mergeSort(start, end) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    const bars = document.querySelectorAll(".bar");
    let left = [];
    let right = [];

    for (let i = start; i <= mid; i++)
        left.push(parseInt(bars[i].style.height));
    for (let i = mid + 1; i <= end; i++)
        right.push(parseInt(bars[i].style.height));

    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
        bars[k].style.backgroundColor = "red";
        await sleep(delay);

        if (left[i] <= right[j]) {
            bars[k].style.height = `${left[i]}px`;
            i++;
        } else {
            bars[k].style.height = `${right[j]}px`;
            j++;
        }
        bars[k].style.backgroundColor = "steelblue";
        k++;
    }

    while (i < left.length) {
        bars[k].style.height = `${left[i]}px`;
        i++; k++;
        await sleep(delay);
    }

    while (j < right.length) {
        bars[k].style.height = `${right[j]}px`;
        j++; k++;
        await sleep(delay);
    }
}

mergeBtn.addEventListener("click", async () => {
    if (isSorting) return;
    isSorting = true;
    disableControls(true);

    await mergeSort(0, SIZE - 1);

    document.querySelectorAll(".bar").forEach(bar => {
        bar.style.backgroundColor = "green";
    });

    isSorting = false;
    disableControls(false);
});

// Initial load
generateArray();
