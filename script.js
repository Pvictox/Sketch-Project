const gridContainer = document.querySelector("#grid");


let fillContainer = (dimension = 2) => {
    //100% / quant de blocos por linha
    let flexBasis_Value = 100/dimension;
    for(let i =0; i<Math.pow(dimension,2); i++){
        let newDiv = document.createElement("div");
        newDiv.id = i;
        newDiv.classList.add("cell");
        newDiv.style.flexGrow = 1;
        newDiv.style.flexShrink = 0;
        newDiv.style.flexBasis = flexBasis_Value.toString()+"%";
        gridContainer.appendChild(newDiv);
    }
}

fillContainer();