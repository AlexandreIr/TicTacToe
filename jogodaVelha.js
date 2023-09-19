let gameBoard=document.querySelectorAll('#gameBoard span');
let vBoard=[];
let turnPlayer='';
let placarPlayer1=0;
let placarPlayer2=0;   

//função de atualização de turno
function updateTurn(){
    const playerInput=document.getElementById(turnPlayer);
    document.getElementById('turnPlayer').innerText=playerInput.value;
}
//função iniciadora do jogo
function startGame(){
    const player1=document.getElementById('player1Name').value;
    const player2=document.getElementById('player2Name').value;
    if(!player1 || !player2){
        alert('Digite o nome de ambos os jogadores!!');
    }else{
    vBoard=[['','',''],['','',''],['','','']];
    turnPlayer='player1Name';
    document.querySelector('h2').innerHTML='Vez de: <span id="turnPlayer"></span>';
    updateTurn();
    gameBoard.forEach(function (element){   
        element.classList.remove('win');    //remove os win
        element.innerText='';
        element.addEventListener('click', handleEventBoard);    //torna as células do tabuleiro clicaveis
    })
    document.getElementsByTagName('input')[0].disabled=true;
    document.getElementsByTagName('input')[1].disabled=true;
    }
    if(!sessionStorage.getItem('player1')){     //armazena o placar no session storage
        sessionStorage.setItem('player1', `${player1}:${placarPlayer1}`);
        sessionStorage.setItem('player2', `${player2}:${placarPlayer2}`);
    }
    sesionStorageSet();
}
//tratamento do placar
function sesionStorageSet(winPlayer){
    const player1=document.getElementById('player1Name').value;
    const player2=document.getElementById('player2Name').value;
    if(player1==sessionStorage.getItem('player1').split(':')[0]
    && player2==sessionStorage.getItem('player2').split(':')[0]){
        if(winPlayer==player1){
            placarPlayer1++;
        }else if(winPlayer==player2){
            placarPlayer2++;
        }
        sessionStorage.setItem('player1', `${player1}:${placarPlayer1}`);
        sessionStorage.setItem('player2', `${player2}:${placarPlayer2}`);
    }else{
        placarPlayer1=0;
        placarPlayer2=0;
        sessionStorage.removeItem('player1');
        sessionStorage.removeItem('player2');
        sessionStorage.setItem('player1', `${player1}:${placarPlayer1}`);
        sessionStorage.setItem('player2', `${player2}:${placarPlayer2}`);
    }
}
//verifica se houve vitória
function isWin(){
    const winReg=[];
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
        winReg.push("0.0", "0.1", "0.2")
    if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
        winReg.push("1.0", "1.1", "1.2")
    if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
        winReg.push("2.0", "2.1", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
        winReg.push("0.0", "1.0", "2.0")
    if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
        winReg.push("0.1", "1.1", "2.1")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
        winReg.push("0.2", "1.2", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
        winReg.push("0.0", "1.1", "2.2")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
        winReg.push("0.2", "1.1", "2.0")
    return winReg;
}
//tratamento da vitória no jogo
function handleWin(regions){
    regions.forEach(function (region){
            document.querySelector('[data-region="' +region+ '"]').classList.add('win')
        }
    )
    const playerName=document.getElementById(turnPlayer).value;
    document.querySelector('h2').innerHTML=playerName+' venceu!!';
    sesionStorageSet(playerName);

    let string='';
    string+=sessionStorage.getItem('player1').split(':')[0]+' : '+sessionStorage.getItem('player1').split(':')[1]+'\n';
    string+=sessionStorage.getItem('player2').split(':')[0]+' : '+sessionStorage.getItem('player2').split(':')[1]+'\n';
    alert(string);
}
//tratamento dos eventos no tabuleiro
function handleEventBoard(e){
    const region=e.currentTarget.dataset.region;
    const rowCollumnPair=region.split('.');
    const row=rowCollumnPair[0];
    const collumn=rowCollumnPair[1];
    if(e.currentTarget.innerText===''){
        if(turnPlayer==='player1Name'){
            e.currentTarget.innerText='X';
            vBoard[row][collumn]='X';
        }else {
            e.currentTarget.innerText='O';
            vBoard[row][collumn]='O';
        }
        console.clear();
        console.table(vBoard)
        const winRegions=isWin();
        if(winRegions.length>0){
            handleWin(winRegions);
            document.getElementById('player1Name').value=''
            document.getElementById('player2Name').value=''
            document.getElementsByTagName('input')[0].disabled=false;
            document.getElementsByTagName('input')[1].disabled=false;
            gameBoard.forEach(element=>{
                element.removeEventListener('click', handleEventBoard);
            })
        }else if(vBoard.flat().includes('')){
            turnPlayer = turnPlayer === 'player1Name' ? 'player2Name' : 'player1Name'
            updateTurn();
        }else{
            document.querySelector('h2').innerHTML='EMPATE!'
            document.getElementsByTagName('input')[0].disabled=false;
            document.getElementsByTagName('input')[1].disabled=false; 
            document.getElementById('player1Name').value=''
            document.getElementById('player2Name').value=''
            gameBoard.forEach(element=>{
                element.removeEventListener('click', handleEventBoard);
            })
        }
    }
}
//adiciona iniciador do jogo ao botão
document.getElementById('startGame').addEventListener('click', startGame);




