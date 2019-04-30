/************************************************************************************************************************
    *** Algoritmo para o jogo ROCK-PAPER-SCISSORS ***
 ************************************************************************************************************************/

/**********************************************************************************
    Valores de entrada dos jogadores e suas jogadas no campeonato
 **********************************************************************************/
let tournamentPlayers = [
    [
        [["Armando", "P"], ["Dave", "S"]],
        [["Richard", "R"], ["Michael", "S"]],
    ],
    [
        [["Allen", "S"], ["Omer", "P"]],
        [["David E.", "R"], ["Richard X.", "P"]]
    ]
];

/*************************************************************
    Declaração das classes de Exceções
 *************************************************************/
function WrongNumberOfPlayersError(message) {
    this.message = message;
    this.name = "WrongNumberOfPlayersError";
}

function NoSuchStrategyError(message) {
    this.message = message;
    this.name = "NoSuchStrategyError";
}

/**********************************************************************************
    Retornando e logando o jogador vencedor do campeonato
 **********************************************************************************/
let winnerGamer = rps_tournament_winner(tournamentPlayers);
console.log(winnerGamer[0]);


/**********************************************************************************
    Método responsável em encontrar o jogador vencedor do campeonato
 **********************************************************************************/
function rps_tournament_winner(tournamentPlayers) {
    let winningPlayers = [];

    tournamentPlayers.map(round => {
        let winner = playMove(round)[0];
        winningPlayers.push(winner);
    });

    if (winningPlayers.length == 1) {
        return winningPlayers;
    }

    return rps_tournament_winner([[winningPlayers]]);
}

/************************************************************************************************************
    Método responsável em encontrar o jogador vencedor pela lista do conjuto de jogadores em cada jogada
 ************************************************************************************************************/
function playMove(round) {
    let winningPlayers = [];

    round.map(players => {
        let winnerGamer = rps_game_winner(players);
        winningPlayers.push(winnerGamer);
    });

    if (winningPlayers.length == 1) {
        return winningPlayers;
    }

    return playMove([winningPlayers]);
}

/***************************************************************************
    Método responsável em encontrar o jogador vencedor do duelo da partida
****************************************************************************/
function rps_game_winner(players) {
    validateNumberOfPlayers(players);

    let firstMove = players[0][1].toUpperCase();
    let secodMove = players[1][1].toUpperCase();

    validateStrategyOfPlay(firstMove, secodMove);

    let winningMovement = playWinner(firstMove, secodMove);
    let winningName = players.find(x => x[1].toUpperCase() === winningMovement).shift();

    return [winningName, winningMovement];
}

/***********************************************************************************
    Método responsável validar a quantidade de jogadores, que deve ser 2 por jogada
************************************************************************************/
function validateNumberOfPlayers(players) {
    if (players.length != 2)
        throw new WrongNumberOfPlayersError("Required 2 players!");
}

/*****************************************************************************************************************************
    Método responsável validar o movimento de cada jogador. Não permitindo jogar movimentos  diferentes de 'R', 'P' ou 'S'.
******************************************************************************************************************************/
function validateStrategyOfPlay(firstMove, secodMove) {
    let originalMovements = ['R', 'P', 'S'];

    if (!originalMovements.some(x => x === firstMove) || !originalMovements.some(x => x === secodMove))
        throw new NoSuchStrategyError("Invalid strategy!");
}

/***********************************************************************************************
     Método responsável na lógica para encontrar o movimento vencedor conforme a regra do jogo
 ***********************************************************************************************/
function playWinner(firstMove, secodMove) {
    if (firstMove === 'R' && secodMove === 'S')
        return firstMove;

    if (firstMove === 'S' && secodMove === 'P')
        return firstMove;

    if (firstMove === 'P' && secodMove === 'R')
        return firstMove;

    return secodMove;
}