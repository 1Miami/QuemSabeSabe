let playerLives = 3;
let enemyLives = 3;

// Função para atualizar as imagens de vidas
function updateLives() {
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`playerLife${i}`).src = i <= playerLives ? 'img/heart.png' : 'img/heart2.png';
        document.getElementById(`enemyLife${i}`).src = i <= enemyLives ? 'img/heart.png' : 'img/heart2.png';
    }
}

// Função de login
document.getElementById('loginButton').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const token = localStorage.getItem('token');

    if (email && password && token) {
        document.getElementById('authForm').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'block';
        document.getElementById('userName').textContent = email.split('@')[0];
        document.getElementById('playerIcon').src = localStorage.getItem('profileImage') || 'img/player/Player1Fase.jpg';
        updateLives();
    } else {
        document.getElementById('errorMessage').textContent = 'Credenciais inválidas!';
    }
});

// Função de registro
document.getElementById('registerButton').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const profileImageInput = document.getElementById('profileImageInput');

    if (email && password) {
        localStorage.setItem('token', 'dummyToken');  // Simula autenticação
        localStorage.setItem('profileImage', profileImageInput.files[0] ? URL.createObjectURL(profileImageInput.files[0]) : '');
        document.getElementById('errorMessage').textContent = 'Registrado com sucesso! Faça login.';
    } else {
        document.getElementById('errorMessage').textContent = 'Por favor, preencha todos os campos!';
    }
});

// Função para iniciar uma rodada de Pedra-Papel-Tesoura
function playRound(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const enemyChoice = choices[Math.floor(Math.random() * choices.length)];

    // Mostra a escolha do oponente
    document.getElementById('enemyChoice').src = `img/${capitalizeFirstLetter(enemyChoice)}2.png`;

    // Determina o vencedor
    let resultMessage;
    if (playerChoice === enemyChoice) {
        resultMessage = "Empate!";
    } else if (
        (playerChoice === 'rock' && enemyChoice === 'scissors') ||
        (playerChoice === 'paper' && enemyChoice === 'rock') ||
        (playerChoice === 'scissors' && enemyChoice === 'paper')
    ) {
        resultMessage = "Você venceu esta rodada!";
        enemyLives--;
    } else {
        resultMessage = "Você perdeu esta rodada!";
        playerLives--;
    }

    // Atualiza as vidas e exibe o resultado
    updateLives();
    displayResult(resultMessage);
}

// Função para exibir o resultado
function displayResult(message) {
    const resultElement = document.getElementById('resultMessage');
    resultElement.textContent = message;
    resultElement.style.display = 'block';
}

// Funções para capturar cliques nas escolhas do jogador
document.getElementById('rock').addEventListener('click', () => playRound('rock'));
document.getElementById('paper').addEventListener('click', () => playRound('paper'));
document.getElementById('scissors').addEventListener('click', () => playRound('scissors'));

// Função para capitalizar a primeira letra (para usar nas imagens)
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Função para resetar o jogo
function resetGame() {
    playerLives = 3;
    enemyLives = 3;
    updateLives();
}

// Função para reiniciar o jogo quando o inimigo perde todas as vidas
if (enemyLives === 0) {
    alert('Você venceu!');
    resetGame();
}
