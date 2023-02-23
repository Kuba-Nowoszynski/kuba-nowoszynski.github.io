let userScore=0
let computerScore=0
const userScore_span=document.getElementById('user-score')
const computerScore_span=document.getElementById('computer-score')
const scoreBoard_div=document.querySelector('.score-board')
const result_p=document.querySelector('.result>p')
const rock_div=document.getElementById('rock')
const paper_div=document.getElementById('paper')
const scissors_div=document.getElementById('scissors')

rock_div.addEventListener("click",function(){game('rock')})
paper_div.addEventListener("click",function(){game('paper')})
scissors_div.addEventListener("click",function(){game('scissors')})

function game(userChoice){
 scoreBoard_div.classList.remove('lose','win') //reset border color
 const hands={rock:'paper', paper:'scissors', scissors:'rock'}//val win with prop
 const computerChoice=['rock','paper','scissors'][Math.floor(Math.random()*3)]

 if(userChoice==computerChoice)return draw(computerChoice)
 if(hands[userChoice]==computerChoice)return lose(userChoice,computerChoice)
 return win(userChoice,computerChoice)
}

function draw(rps){
 result_p.innerText=`Computer picks ${rps}. Draw`
}
function lose(chosen,rps){computerScore++;computerScore_span.innerText=computerScore
 result_p.innerText=`Computer picks ${rps}. You lose!`
 const changeColor=document.getElementById(chosen).classList
 changeColor.add('lose');scoreBoard_div.classList.add('lose')//border color to red
 setTimeout(()=>changeColor.remove('lose'),450)//red fades away
}
 function win(chosen,rps){userScore++;userScore_span.innerText=userScore
  result_p.innerText=`Computer picks ${rps}. You win :)`
  const changeColor=document.getElementById(chosen).classList
  changeColor.add('win');scoreBoard_div.classList.add('win')//border color to green
  setTimeout(()=>changeColor.remove('win'),450)//green fades away
}


