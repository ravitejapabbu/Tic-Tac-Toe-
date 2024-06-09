let game = document.querySelector(".gameboard");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newgame-btn");
let winnerBoard = document.querySelector('#winnerboard');
let userx = true;
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
        userx = true;
    })
}

let displayWinner = (name) =>{
    document.querySelector("#winnerboard h1").innerText = name;
    winnerBoard.style.top = "0%"
    game.classList.add('disableclk');
    resetBtn.style.display = "none";
}

boxes.forEach((box)=>{
  box.addEventListener("click",(e)=>{
    if(userx){
        box.innerText = "X";
        userx = false;
    }
    else{
        box.innerText = "O";
        userx = true;
    }
    box.disabled = true;
  })
});



resetBtn.onclick =()=>{
    reset();
}

newGameBtn.onclick = () =>{
    reset();
    winnerBoard.style.top = "-100%"
    game.classList.remove('disableclk');
    resetBtn.style.display = "";
}


game.onclick = () =>{
    let count=0;
    winningPatterns.forEach((winningPattern)=>{
        let arr = winningPattern.map((index)=>{
            return boxes[index].innerText; 
        })
      /*  if(arr[0] == arr[1] && arr[1] == arr[2] && arr[0] != 0){
            console.log(arr);
            if(userx){
                displayWinner("player-o");
            }
            else{
                displayWinner("player-x");
            }
        }
      */
        if(arr[0]!=0 && arr[1]!=0 && arr[2]!=0){
            if(arr[0] == arr[1] && arr[1] == arr[2] && arr[2] == "X"){
                displayWinner("congratulations,\n player-x won the game");
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