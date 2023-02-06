const gridContainer = document.querySelector("#grid");
const rangeInput = document.querySelector("#range-grid");
let pencilMODE = true;

/*
    sk-func TODO:
        
        2 - Permitir que o usuário mude a cor (necessário mexer em sk-UI);
        3 - Restart grid (todo branco) (necessário mexer em sk-UI);
*/

let changeValueRangeText = (value) =>{
    const rangeText = document.querySelector("#range-text");
    rangeText.textContent = value.toString() + "X" + value.toString();
}



let fillContainer = (dimension = 16) => {
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
}



let draw = () =>{
    gridMap = document.querySelectorAll(".cell");
    let clicked = false;
    gridMap.forEach(tile => {
        tile.addEventListener('mousedown', (e) => {
            if (pencilMODE){
                tile.style.backgroundColor = "black";
                clicked = true;
            } 
        });
        tile.addEventListener('mouseover', (e) => {
            if (pencilMODE && clicked==true) tile.style.backgroundColor = "black";
        })
        tile.addEventListener('mouseup', (e) => {clicked=false});
        tile.ondragstart = () => false;
    });
}

fillContainer();
changeValueRangeText(rangeInput.step);
draw();