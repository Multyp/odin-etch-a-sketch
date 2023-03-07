const container = document.querySelector('.container');
const onclick = document.getElementById('eraser');
let gridSize = 16;
let currentColor = 'black';
let backgroundColor = 'white';
let eraserColor = backgroundColor;

function createGrid(size) {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.addEventListener('mousemove', changeColor);
        container.appendChild(gridElement);
    }
}

function changeColor(e) {
    if (e.buttons === 1)
        e.target.style.backgroundColor = currentColor;
}

function destroyGrid() {
    const gridArray = Array.from(container.childNodes);
    gridArray.forEach((element) => {
        container.removeChild(container.firstChild);
    });
}

function clearGrid() {
    const gridArray = Array.from(container.childNodes);
    gridArray.forEach((element) => {
        element.style.backgroundColor = backgroundColor;
    });
}

function newGrid() {
    let newSize = prompt('Enter a grid size between 1 and 100');
    if (newSize !== null) {
        newSize = parseInt(newSize);
        if (isNaN(newSize) || newSize < 1 || newSize > 100) {
            alert('Please enter a valid number!');
            newGrid();
        } else {
            gridSize = newSize;
            destroyGrid();
            createGrid(gridSize);
        }
    }
    clearGrid();
}

function changeCurrentColor() {
    const colorPicker = document.createElement('input');
    onclick.style.backgroundColor = '#1F2837';
    onclick.style.color = '#3882F6';
    colorPicker.type = 'color';
    colorPicker.addEventListener('input', () => {
        currentColor = colorPicker.value;
    });
    colorPicker.click();
}

function changeBackgroundColor() {
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.addEventListener('input', () => {
        backgroundColor = colorPicker.value;
        eraserColor = backgroundColor;
        clearGrid();
        changeToEraser();
    });
    colorPicker.click();
}

function changeToEraser() {
    currentColor = backgroundColor;
    onclick.style.backgroundColor = '#3882F6';
    onclick.style.color = '#1F2837';
}

createGrid(gridSize);
const style = document.createElement('style');
style.textContent = `
	.container {
		display: grid;
		grid-gap: 0px;
		margin: 0 auto;
		max-width: 960px;
	}
	.container > div {
		background-color: white;
		border-color: transparent;
		transition: background-color 0.3s ease-in-out;
	}
	.container > div:hover {
		background-color: #ddd;
	}
    `;
document.head.appendChild(style);