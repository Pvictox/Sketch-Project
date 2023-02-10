const gridContainer = document.querySelector("#grid");
const rangeInput = document.querySelector("#range-grid");
const colorInput = document.querySelector("#color-input");
const clearButton = document.querySelector("#clear-button");
const rangeText = document.querySelector("#range-text");
const randomButton = document.querySelector("#random-button");
const dropperButton = document.querySelector("#dropper-button");

let pencilMODE = true;
let pickColorMode = false;
let currentColor = "black";
let currentSize = 0 ;
let out=true;
let randomMode = false;



function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let changeValueRangeText = (value) =>{
    rangeText.textContent = "Size: "+ value.toString() + " X " + value.toString();
    currentSize = value;
    clearContainer(value);
}

let clearContainer = (value) => {
    if (gridContainer.hasChildNodes){
        while(gridContainer.firstChild){
            gridContainer.removeChild(gridContainer.lastChild);
        }
    }
    fillContainer(value);
}



let fillContainer = (dimension) => {
    //clearContainer();
    //100% / quant de blocos por linha
    let flexBasis_Value = 100/dimension;
    let gridWidth = gridContainer.offsetWidth;
    let gridHeight = gridContainer.offsetHeight;
    for(let i =0; i<Math.pow(dimension,2); i++){
        let newDiv = document.createElement("div");
        newDiv.id = i;
        newDiv.classList.add("cell");
        newDiv.style.width = (gridWidth/dimension).toString()+"px";
        newDiv.style.height = (gridHeight/dimension).toString()+"px";
        newDiv.style.flexGrow = 1;
        newDiv.style.flexShrink = 0;
        newDiv.style.flexBasis = flexBasis_Value.toString()+"%";
        gridContainer.appendChild(newDiv);
    }
    draw();
}

colorInput.addEventListener('input', ()=>{
    currentColor = colorInput.value;
    randomMode = false;
})

clearButton.addEventListener('click', (e)=>{
    clearContainer(currentSize);
})

let clicked = false;

gridContainer.addEventListener('mouseleave', (e)=>{
    out = true;
    clicked=false;
})

gridContainer.addEventListener('mouseenter', (e)=>{
    out = false;
})

randomButton.addEventListener('click', ()=>{
    randomMode = !randomMode;
    if (randomButton.classList.contains("active-button")){
        randomButton.classList.remove("active-button");
    }else{
        randomButton.classList.add("active-button");
    }
})

dropperButton.addEventListener('click', ()=>{
    pickColorMode = !pickColorMode;
    pencilMODE = !pencilMODE;
    if (dropperButton.classList.contains("active-button")){
        dropperButton.classList.remove("active-button");
    }else{
        dropperButton.classList.add("active-button");
    }
})

let draw = () =>{
    gridMap = document.querySelectorAll(".cell");
    gridMap.forEach(tile => {
        tile.addEventListener('mousedown', (e) => {
            if (pencilMODE){
                if (randomMode == false){
                    tile.style.backgroundColor = currentColor;
                }else{
                    tile.style.backgroundColor = getRandomColor();
                }
                clicked = true;
            }else if (pickColorMode) {
                currentColor = tile.style.backgroundColor;
                pickColorMode = false;
                pencilMODE = true;
                dropperButton.classList.remove("active-button");
            }
        });
        tile.addEventListener('mouseover', (e) => {
            if (pencilMODE && clicked===true && out==false){
                if (randomMode==false){
                    tile.style.backgroundColor = currentColor;
                }else{
                    tile.style.backgroundColor = getRandomColor();
                }
            } 
        })
        tile.addEventListener('mouseup', (e) => {
            clicked=false;
        });
        tile.ondragstart = () => false;
    });
}

rangeInput.value = 16;
changeValueRangeText(rangeInput.value);
