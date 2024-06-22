let game = document.querySelector(".gameboard");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let modeBtn = document.querySelector("#mode-btn");
let newGameBtn = document.querySelector("#newgame-btn");
let winnerBoard = document.querySelector('#winnerboard');
let userx = true;
let botMode = false;
let cont = true;
let count = 0;
let winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];


let reset = () =>{
        boxes.forEach((box)=>{
        box.innerText = "";
        box.disabled = false;
    })
    userx = true;
    cont= true;
}
let displayWinner = (name) =>{
    document.querySelector("#winnerboard h1").innerText = name;
    winnerBoard.style.top = "0%"
    game.classList.add('disableclk');
}


// buttons
resetBtn.onclick =()=>{
    reset();
}
newGameBtn.onclick = () =>{
    reset();
    winnerBoard.style.top = "-100%"
    game.classList.remove('disableclk');
}
modeBtn.onclick =()=>{
    reset();
    if(botMode){
        botMode = false;
        modeBtn.innerText ="2-player mode";
    }else{
        botMode = true;
        modeBtn.innerText ="bot mode";
    }
}



// bot player
function botPlay(){
    game.classList.remove('disableclk');
    for(index=0;index<winningPatterns.length;index++){
        let arr = winningPatterns[index].map(index=> {return boxes[index].innerText||false});
        if(arr[0]==="O"&arr[1]==="O"||arr[1]==="O"&arr[2]==="O"||arr[0]==="O"&arr[2]==="O"){
            winningPatterns[index].forEach((value)=>{
                if(!boxes[value].disabled){
                    boxes[value].innerText ="O";
                    boxes[value].disabled =true;
                    userx = true;
                    displayWinner("You Lost the Game,\n Better Luck Next Time");
                }
            })
            if(userx){
                return;
            }
        }
    }
    for(index=0;index<winningPatterns.length;index++){
        let arr = winningPatterns[index].map(index=> {return boxes[index].innerText||false});
        if(arr[0]==="X"&arr[1]==="X"||arr[1]==="X"&arr[2]==="X"||arr[0]==="X"&arr[2]==="X"){
            winningPatterns[index].forEach((value)=>{
                if(!boxes[value].disabled){
                    boxes[value].innerText ="O";
                    boxes[value].disabled =true;
                    userx = true;
                    return;
                }
            })
            if(userx){
                return;
            }
        }
    }
    for(index=0;index<winningPatterns.length;index++){
        let arr = winningPatterns[index].map(index=> {return boxes[index].innerText||false});
        if(arr[0]==="O"||arr[1]==="O"||arr[2]==="O"){
            for(i=0;i<3;i++){
                let val = winningPatterns[index][i];
                if(!boxes[val].disabled){
                    boxes[val].innerText ="O";
                    boxes[val].disabled =true;
                    userx = true;
                    return;
                }
            }
        }
    }
    for(index=0;index<winningPatterns.length;index++){
        let arr = winningPatterns[index].map(index=> {return boxes[index].innerText||false});
        let val = winningPatterns[index][1];
        if(!arr[0] && !arr[1] && !arr[2]){
            boxes[val].innerText ="O";
            boxes[val].disabled =true;
            userx = true;
            return;
        }
    }
}


// gameboard event listening
boxes.forEach((box)=>{
  box.addEventListener("click",(e)=>{
    if(!botMode){
        if(userx){
            box.innerText = "X";
            userx = false;
        }
        else{
            box.innerText = "O";
            userx = true;
        }
        box.disabled = true;
    }
    else{
        box.innerText ="X";
        box.disabled =true;
        game.click();
        game.classList.add('disableclk');
        if(cont) {
           userx = false;
           setTimeout(botPlay,300);
        }
    }
  })
});

// checking wheather anyone won
game.onclick = () =>{
    let count=0;
    winningPatterns.forEach((winningPattern)=>{
        let arr = winningPattern.map((index)=>{
            return boxes[index].innerText; 
        })
        if(arr[0]!=0 && arr[1]!=0 && arr[2]!=0){
            if(arr[0] == arr[1] && arr[1] == arr[2] && arr[2] == "X"){
                if(!botMode) displayWinner("congratulations,\n player-x won the game");
                else {
                    cont =false;
                    displayWinner("congratulations,\n you won the game");
                }
            }else if(arr[0] == arr[1] && arr[1] == arr[2] && arr[2] == "O"){
                displayWinner("congratulations,\n player-o won the game");
            }else{
              count++;
            }
        }
    })
    if(count == 8){
        displayWinner("oops!!! it's a draw,\n  please try again")
    }
}

