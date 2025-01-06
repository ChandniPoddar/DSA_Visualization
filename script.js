

let selectedAlgorithm = "";
let speed = 500;

// Handle Speed Control
document.getElementById("speedControl").addEventListener("input", function () {
    speed = parseInt(this.value);
    document.getElementById("speedValue").textContent = speed+ ms;
});



function displayBars(array, selectedIndexes = []) {
    var barsDiv = document.getElementById("bars");
    barsDiv.innerHTML = "";

    for (var i = 0; i < array.length; i++) {
        var barHeight = array[i] * 5; // Adjust scale factor for better visualization
        var bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = barHeight + "px";

        if (selectedIndexes.includes(i)) {
            bar.style.backgroundColor = "red";
        } else {
            bar.style.backgroundColor = "green";
            bar.style.borderRadius = "";
        }

        var valueSpan = document.createElement("span");
        valueSpan.textContent = array[i];
        valueSpan.className = "value";

        bar.appendChild(valueSpan);
        barsDiv.appendChild(bar);
    }
}
// Start Visualization
async function startVisualization() {
    const arraySize = parseInt(document.getElementById("arraySizeInput").value);
    const arrayInput = document.getElementById("arrayInput").value.trim();
    const searchElement = parseInt(document.getElementById("searchElement").value.trim());

    if (isNaN(arraySize) || arraySize <= 0) {
        alert("Please enter a valid array size!");
        return;
    }

    const array = arrayInput.split(" ").map(Number);

    if (array.length !== arraySize) {
         alert("Please enter exactly" +arraySize+ "elements in the array.");
        return;
    }

    if (selectedAlgorithm === "") {
        alert("Please select an algorithm from the left side!");
        return;
    }

    switch (selectedAlgorithm) {
        case "linearSearch":
            await linearSearch(array, searchElement);
            break;
        case "binarySearch":
            await binarySearch(array, searchElement);
            break;
        case "bubbleSort":
            await bubbleSort(array);
            break;
        case "quickSort":
            await quickSort(array, 0, array.length - 1);
            break;
        case "mergeSort":
            await mergeSort(array);
            break;
        case "insertionSort":
            await insertionSort(array);
            break;
        case "selectionSort":
            await selectionSort(array);
            break;
        case "heapSort":
            await heapSort(array);
            break;
        // Add other algorithms here
        default:
            alert("Algorithm not implemented yet!");
    }
}

// Set selected algorithm and display info
function selectAlgorithm(algorithm) {
    selectedAlgorithm = algorithm;
    document.getElementById("codeContent").textContent = "Code for " + algorithm + " will appear here.";
    document.getElementById("complexityContent").textContent = "Time and Space Complexity for " + algorithm + " will appear here.";
    document.getElementById("theoryContent").textContent = "Theory for " + algorithm + " will appear here.";
}

// Example Algorithm: Linear Search
async function linearSearch(array, element) {
    for (let i = 0; i < array.length; i++) {
        displayBars(array, [i]);
        await sleep(speed);
        if (array[i] === element) {
            alert("Element found at index " + i);
            return;
        }
    }
    alert("Element not found!");
}

// Sleep function for delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

    // Example Algorithm: Bubble Sort
    async function bubbleSort(array) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    displayBars(array, [j, j + 1]);
                    await sleep(speed);
                }
            }
        }
        alert("Array is sorted!");
    }

    // Example Algorithm: Binary Search
    async function binarySearch(array, element) {
        array.sort((a, b) => a - b); // Ensure array is sorted
        let left = 0, right = array.length - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            displayBars(array, [mid]);
            await sleep(speed);
            if (array[mid] === element) {
                alert("Element found at index " + mid);
                return;
            } else if (array[mid] < element) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        alert("Element not found!");
    }

    // Sleep function for delay
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    




async function quickSort(array, low, high) {
    if (low < high) {
        const pivotIndex = await partition(array, low, high);
        await quickSort(array, low, pivotIndex - 1); // Recursive call on left side
        await quickSort(array, pivotIndex + 1, high); // Recursive call on right side
    }

    // Final display after complete sorting
    if (low === 0 && high === array.length - 1) {
        displayBars(array);
        alert("Array is sorted!");
    }
}

async function partition(array, low, high) {
    const pivot = array[high]; // Choose last element as pivot
    let i = low - 1; // Pointer for the smaller element

    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]]; // Swap smaller element
            displayBars(array, [i, j]); // Highlight swapped bars
            await sleep(speed); // Add delay for visualization
        }
    }

    // Swap the pivot element to its correct position
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    displayBars(array, [i + 1, high]); // Highlight pivot swap
    await sleep(speed);

    return i + 1; // Return pivot index
}

















    async function mergeSort(array) {
        if (array.length < 2) return array;
    
        const mid = Math.floor(array.length / 2);
        const left = array.slice(0, mid);
        const right = array.slice(mid);
    
        await mergeSort(left);
        await mergeSort(right);
    
        await merge(array, left, right);
        displayBars(array);
        return array;
    }
    
    async function merge(array, left, right) {
        let i = 0, j = 0, k = 0;
    
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                array[k++] = left[i++];
            } else {
                array[k++] = right[j++];
            }
            displayBars(array, [k - 1]);
            await sleep(speed);
        }
    
        while (i < left.length) {
            array[k++] = left[i++];
            displayBars(array, [k - 1]);
            await sleep(speed);
        }
    
        while (j < right.length) {
            array[k++] = right[j++];
            displayBars(array, [k - 1]);
            await sleep(speed);
        }
    }
    async function insertionSort(array) {
        for (let i = 1; i < array.length; i++) {
            const key = array[i];
            let j = i - 1;
    
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j--;
                displayBars(array, [j + 1, j]);
                await sleep(speed);
            }
    
            array[j + 1] = key;
            displayBars(array, [j + 1]);
            await sleep(speed);
        }
        alert("Array is sorted!");
    }
    async function selectionSort(array) {
        for (let i = 0; i < array.length - 1; i++) {
            let minIndex = i;
    
            for (let j = i + 1; j < array.length; j++) {
                if (array[j] < array[minIndex]) {
                    minIndex = j;
                }
                displayBars(array, [j, minIndex]);
                await sleep(speed);
            }
    
            if (minIndex !== i) {
                [array[i], array[minIndex]] = [array[minIndex], array[i]];
                displayBars(array, [i, minIndex]);
                await sleep(speed);
            }
        }
        alert("Array is sorted!");
    }
    async function heapSort(array) {
        const n = array.length;
    
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await heapify(array, n, i);
        }
    
        for (let i = n - 1; i > 0; i--) {
            [array[0], array[i]] = [array[i], array[0]];
            displayBars(array, [0, i]);
            await sleep(speed);
            await heapify(array, i, 0);
        }
        alert("Array is sorted!");
    }
    
    async function heapify(array, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
    
        if (left < n && array[left] > array[largest]) largest = left;
        if (right < n && array[right] > array[largest]) largest = right;
    
        if (largest !== i) {
            [array[i], array[largest]] = [array[largest], array[i]];
            displayBars(array, [i, largest]);
            await sleep(speed);
            await heapify(array, n, largest);
        }
    }



























