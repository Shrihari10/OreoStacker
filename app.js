
let input = document.getElementById("string");
let slider = document.getElementById("myRange");
let inputString = [];
let modifiedString = [];
let j=0;
let baseX = 25, baseY = 70;
let count = 0;
let stacks = [];
let sizeFactor = 1;

let o = document.getElementById("o");
let odown = document.getElementById("o-down");
let re = document.getElementById("re");

let dragStartX, dragStartY;
let dragCanvas;

document.getElementById("enter").addEventListener("click", getString);

function getString(){
    inputString = input.value;
    for(var i = 0; i<inputString.length; i++){
        if(inputString[i]!= 'o' && inputString[i]!= 'r' && inputString[i]!= 'e' && inputString[i]!= '&')
        {
            alert("Enter valid string");
            return;
        }
    }
    stacks[count] = inputString;
    count++;
    modifiedString = [];
    modifiedString = modifyString(inputString);
    createNewCanvas();
}

function modifyString(str){
    j=0;
    tempString = [];
    for(let i=0;i < str.length ; i++){
        if(str[i] === 'o' || str[i] === 'r' || str[i] === "&")
        {
            tempString[j] = str[i];
            j++;
        }
    }
    return tempString;
}

function createNewCanvas(){
    let canvas = document.createElement("canvas");
    canvas.style.border = "2px solid black";
    let ctx = canvas.getContext("2d");
    ctx.canvas.width = 150;
    ctx.canvas.height = 300;
    ctx.canvas.draggable=true;
    ctx.canvas.ondragstart="event.dataTransfer.setData('text/plain',null)";
    document.body.appendChild(canvas);

    draw(modifiedString, ctx);

    canvas.addEventListener("dragstart", (event) => {
        dragCanvas = event.target;
        dragStartX = event.clientX;
        dragStartY = event.clientY;
    });
    
    canvas.addEventListener("dragover", (event) => {
        event.preventDefault();
    });
    
    canvas.addEventListener("dragend", (event) => {
        event.preventDefault();
        dragEndX = event.clientX - dragStartX + dragCanvas.offsetLeft;
        dragEndY = event.clientY - dragStartY + dragCanvas.offsetTop;
        dragCanvas.style.position = "absolute";
        dragCanvas.style.left = dragEndX.toString() + "px";
        dragCanvas.style.top = dragEndY.toString() + "px";
    });
}

slider.oninput = function() {
    sizeFactor = this.value;
    reDraw();
}

function reDraw(){
    for(var i=0; i<count; i++){
        modifiedString = modifyString(stacks[i]);
        let newCanvas = document.getElementsByTagName("canvas")[i];
        let newCtx = newCanvas.getContext("2d");
        newCtx.clearRect(0, 0, newCanvas.width, newCanvas.height);
        draw(modifiedString,newCtx);
    }
}

function draw(str, ctx){
    console.log(str);
    baseX = 25;
    baseY = 215;
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    for(let i = str.length - 1;i>=0;i--){
     if(str[i]== "o"){
         if(str[i] == "o" &&  str[i-1] =="&")
            {
                ctx.drawImage(odown,baseX - 2, baseY, 100*sizeFactor, 100*sizeFactor);
                baseY -= 10;
            }
        else{
            ctx.drawImage(o, baseX, baseY, 100*sizeFactor, 100*sizeFactor);
            baseY -= 10;
        }
     }
     else if(str[i]== "r"){
        ctx.drawImage(re, baseX, baseY, 100*sizeFactor, 100*sizeFactor);
        baseY -= 10;
    }
    else if(str[i]== "&"){
        baseY -= 50;
    }
    else
        alert(enter)
    }
}


