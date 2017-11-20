/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls two dice as many times as he/she wishes. Each result get added to their ROUND score
- BUT, if the player rolls a 1 on either die, all his ROUND score gets lost. After that, it's the next player's turn/
- Also, if the player rolls a 6 on both die, his/her total score is lost.
- The player can choose to 'Hold', which means that his ROUND score gets added to his total score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game, the score limit can be adjusted in the SCORE LIMIT input box. 

*/

var scores, roundScore, activePlayer, activeGame, firstRoll, secondRoll;

reset();

//dice rolled
document.querySelector('.btn-roll').addEventListener('click', function (){
    if(activeGame) {
        firstRoll = Math.floor(Math.random()*6) + 1;
        secondRoll = Math.floor(Math.random()*6) + 1;

        //display dice rolls
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-' + firstRoll + '.png'; 
        document.querySelector('.second-dice').style.display = 'block';
        document.querySelector('.second-dice').src = 'dice-' + secondRoll + '.png'; 
        
        if(firstRoll == 6 && secondRoll == 6){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } else if(firstRoll !== 1 && secondRoll !== 1){
            roundScore += (firstRoll + secondRoll);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else{ //swap activePlayer
            nextPlayer();
        }
    }
});

//Player held score
document.querySelector('.btn-hold').addEventListener('click', function (){
    if (activeGame){
        //store score & update UI
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        //Store score limit input and check if player won game
        var setLimit = 100;
        if(document.querySelector('.set-limit').value.length !== 0){
                setLimit = document.querySelector('.set-limit').value;
        }
        if (scores[activePlayer] >= setLimit){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.second-dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); 
            activeGame = false;
        } else {
            nextPlayer(); //Swap activePlayer
        }
    }
});

function nextPlayer(){
    //swap activePlayer
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0; //reset scores
    prevRoll = 0;
    currRoll = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //Toggle active player display
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.second-dice').style.display = 'none';
}

function reset(){ //Used on game init and new game
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    activeGame = true;
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.second-dice').style.display = 'none';
    //Set scores to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //Reset names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    //Reset panel classes
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
}

document.querySelector('.btn-new').addEventListener('click', reset);

