let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//01 Função com parametro
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector (tag);
    campo.innerHTML = texto;
    //Importando voz da biblioteca nativa Speech API 
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

//02 Função para separar de forma certa exibir texto na tela e poder puxa-lo para função 05
//E poder puxa-lo para função
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um numero entre 1 e 10');
}

//03 Função sem parametro
function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}`;
            exibirTextoNaTela('p', mensagemTentativas);
            //Reativa botãos desativados no HTML.
            document.getElementById('reiniciar').removeAttribute('disabled');
    } else { 
        if (chute > numeroSecreto) {
            exibirTextoNaTela('h1', 'Numero é menor.');  
        } else {
            exibirTextoNaTela('h1', 'Numero é maior.');
        }
    }
    tentativas++;
    limparTentativas();
}

//03 Função com retorno
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeNumerosNaLista = listaDeNumerosSorteados.length;
    
    if (quantidadeDeNumerosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

//04 Função para deixar o campo vazio após um chute.
function limparTentativas() {
    chute = document.querySelector('input');
    chute.value = '';
}

//05 Função chamando todas as funções para habilitar e desabilitar botão novo jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparTentativas();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}