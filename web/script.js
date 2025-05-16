const login = document.getElementById("login");

const sezioneQuiz = document.getElementById("sezioneQuiz");
sezioneQuiz.style.display = "none";

const sezionePunteggi = document.getElementById("sezionePunteggi");
sezionePunteggi.style.display = "none";

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const verificaRobot = document.getElementById("verificaRobot");

// PARTE 1 //

// LOGIN
document.getElementById("accedi").addEventListener("click", accedi);

function accedi() {
  if (validazioneDati() == true) {
    sezioneQuiz.style.display = "block";
    login.style.display = "none";
  }
}

let numeroVerificaRobot
generaVerificaRobot(); // Genera i numeri di verifica appena carica la pagina

function generaVerificaRobot() {
  let numero1 = Math.floor(Math.random() * 8) + 2; // Random tra 2 e 9
  let numero2 = Math.floor(Math.random() * 8) + 2; // Random tra 2 e 9
  numeroVerificaRobot = numero1 + numero2;
  document.getElementById("domandaVerificaRobot").innerHTML = "Quanto fa " + numero1 + " + " + numero2 + "?";

}

function validazioneDati() {
  if (nome.value == "") {
    alert("Inserisci il nome.");
    nome.focus();
    return false;
  }

  if (email.value == "") {
    alert("Inserisci il email.");
    email.focus();
    return false;
  }

  if (verificaRobot.value == "" || verificaRobot.value != numeroVerificaRobot) {
    alert("Inserisci la verifca o riprova la verifica!");
    generaVerificaRobot(); // Se la verifica viene sbagliata, genera un altro numero
    verificaRobot.focus();
    return false;
  }

  return true;
}

document.getElementById("cancella").addEventListener("click", cancella);

function cancella() {
  nome.value = "";
  email.value = "";
  verificaRobot.value = "";
}
// LOGIN


// PARTE 2 //

// QUIZ
document.getElementById("confermaQuiz").addEventListener("click", confermaQuiz);

let punteggio = 0;

function confermaQuiz() {
  punteggio = 0;

  rispondidom1(); // DOMANDA 1
  rispondidom2(); // DOMANDA 2
  rispondidom3(); // DOMANDA 3

  // per evitare che quando il punteggio viene mostrato all'utente, gli venga mostrato un punteggio negativo nel caso avesse che la somma dei punteggi di tutte le domande sia negativo
  if(punteggio < 0) {
    punteggio = 0;
  }

  mostraParte3(); // PARE 3 (PUNTEGGIO)
}

// DOMANDA 1
function rispondidom1() {
  const misto = document.getElementById("misto");
  const italiano = document.getElementById("italiano");
  const australiano = document.getElementById("australiano");
  const femminile = document.getElementById("femminile");
  
  if(misto.checked && italiano.checked && !australiano.checked && !femminile.checked) {
    punteggio += 2;
  } else {
    punteggio--;
  }
}

// DOMANDA 2
document.getElementById("foto1").addEventListener("click", foto1);
document.getElementById("foto2").addEventListener("click", foto2);

let rispostaDom2;

function foto1() {
  rispostaDom2 = "foto1";
}

function foto2() {
  rispostaDom2 = "foto2";
}

function rispondidom2() {
  if(rispostaDom2 == "foto1") {
    punteggio += 2;
  } else {
    punteggio--;
  }
}

// SUGGERIMENTO DOMANDA 2
document.getElementById("suggerimento").addEventListener("click", suggerimento);

let isSugerimentoClick = false;

function suggerimento(){
  if(isSugerimentoClick == false) {
    document.getElementById("suggerimento2").innerHTML = "Suggerimento: Sono tutti senza occhiali";
    isSugerimentoClick = true;
  } else {
    document.getElementById("suggerimento2").innerHTML = "";
    isSugerimentoClick = false;
  }
}

// DOMANDA 3
function rispondidom3() {
  const domanda3 = document.getElementById("domanda3");
  if(domanda3.value == "risposta3") {
    punteggio += 2;
  } else {
    punteggio--;
  }
}
// QUIZ


// PARTE 3 //
function mostraParte3() {
  sezioneQuiz.style.display = "none";
  sezionePunteggi.style.display = "block";

  document.getElementById("nomeVisualizzato").innerHTML = "Nome: " + nome.value;
  document.getElementById("punteggio").innerHTML = "Punteggio totale: " + punteggio;

  document.getElementById("home").addEventListener("click", tornaLogin);
}


// RESET DI TUTTO
function tornaLogin() {
  login.style.display = "block";
  sezioneQuiz.style.display = "none";
  sezionePunteggi.style.display = "none";
  
  // Reset dei dati
  cancella();
  punteggio = 0;
  rispostaDom2 = null;

  //  location.reload(); // ricarica la pagina // forse dovevo usare un altro metodo
}