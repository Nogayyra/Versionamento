// Variaveís: Armazenam o estado do "caixa eletrônico".
// 'let' é usado para valores que mudam (saldo, total sacado), 'const' para o limite que não pode ser alterado.
let saldo = 0;
const LIMITE_DIARIO = 1500;
let totalSacadoHoje = 0;
let logado = false;

// Login: Acessa o campo de senha no HTML (document.getElementById).
function entrar() {
    // document.getElementById() acessa o elemento HTML pelo ID para ler o valor.
    const senha = document.getElementById("jessicalinda123").value; 
    const mensagemLogin = document.getElementById("mensagemLogin");

    // Estrutura IF/ELSE para checagem da senha.
    if (senha === "jessicalinda123") {
        logado = true; 
        mensagemLogin.textContent = "✅ Login feito com sucesso! Você pode usar o caixa.";
    } else {
        logado = false; 
        mensagemLogin.textContent = "❌ Senha incorreta. Tente novamente.";
    }
}

// Consultar saldo: Exibe o valor do saldo atual do cliente.
function consultarSaldo() {
    const mensagem = document.getElementById("mensagem");

    if (!logado) {
        mensagem.textContent = "Faça o login antes de consultar o saldo.";
        return;
    }
    
    mensagem.textContent = "Seu saldo atual é R$ " + saldo.toFixed(2);
}

// Deposito: Adiciona um valor ao saldo e realiza validações básicas.
function depositar() {
    // Obtém o valor do campo e o converte para número decimal (float).
    const campoValor = document.getElementById("valor");
    const mensagem = document.getElementById("mensagem");
    const valor = parseFloat(campoValor.value);

// Checagem de segurança.
    if (!logado) {
        mensagem.textContent = "Você precisa fazer login antes de depositar.";
        return;
    }

// Validação de entrada: verifica se o valor é um número válido e positivo.
    if (isNaN(valor) || valor <= 0) {
        mensagem.textContent = "Digite um valor válido para depósito.";
    } else {
        saldo += valor; 
        mensagem.textContent = "Depósito de R$ " + valor.toFixed(2) + " realizado com sucesso!";
    }

// Limpa o campo de valor no HTML.
    campoValor.value = ""; 
}
.
// Saque: A função 
function sacar() {
    // Obtém o valor do campo e o converte para número decimal (float).
    const campoValor = document.getElementById("valor");
    const mensagem = document.getElementById("mensagem");
    const valor = parseFloat(campoValor.value);

    // Checagem de segurança (login).
    if (!logado) {
        mensagem.textContent = "Você precisa fazer login antes de sacar.";
        return;
    }

    //Validação de entrada (valor deve ser válido e positivo).
    if (isNaN(valor) || valor <= 0) {
        mensagem.textContent = "Digite um valor válido para saque.";
    } 
    //Verificar se o saldo é suficiente.
    else if (valor > saldo) {
        mensagem.textContent = "Saldo insuficiente para sacar R$ " + valor.toFixed(2) + ".";
    } 
    //Verifica o Limite Diário (ponto crucial do projeto).
    // Checa se a soma do novo saque com o total sacado hoje ultrapassa o LIMITE_DIARIO.
    else if (totalSacadoHoje + valor > LIMITE_DIARIO) {
        mensagem.textContent = "Você atingiu o limite diário de R$ " + LIMITE_DIARIO + ".";
    } 
    //Transação Aprovada!
    else {
        // Subtrai (-) o valor do saldo e atualiza o total sacado no dia.
        saldo -= valor;             
        totalSacadoHoje += valor;   
        mensagem.textContent = "Saque de R$ " + valor.toFixed(2) + " realizado com sucesso!";
    }

    // Limpa o campo de valor no HTML.
    campoValor.value = ""; 
}