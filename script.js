const urlAPI = "https://script.google.com/macros/s/AKfycbw1tpj17x4-9ASydmVBpZF8S1ObsgL2uFO9R4sDuuJ1aUkmlVRHT5j9a8ajSbRBxOsa/exec";

const grid = document.getElementById("grid");

let numeroAtual = null;

function criarNumeros(){

for(let i=1;i<=200;i++){

let div = document.createElement("div");

div.className = "numero";

let numeroFormatado = String(i).padStart(3,"0");

div.innerText = numeroFormatado;

div.dataset.numero = numeroFormatado;

div.onclick = () => abrirModal(numeroFormatado);

grid.appendChild(div);

}

}

function abrirModal(numero){

numeroAtual = numero;

document.getElementById("numeroSelecionado").innerText = numero;

document.getElementById("modal").style.display = "flex";

}

function fecharModal(){

document.getElementById("modal").style.display = "none";

document.getElementById("nome").value = "";
document.getElementById("telefone").value = "";

}

function registrarVenda(){

let nome = document.getElementById("nome").value;

let telefone = document.getElementById("telefone").value;

if(!nome || !telefone){

alert("Preencha nome e telefone");

return;

}

fetch(urlAPI,{

method:"POST",

body:JSON.stringify({

numero:numeroAtual,

nome:nome,

telefone:telefone

})

})

.then(res => res.json())

.then(()=>{

// BLOQUEAR NÚMERO NA TELA

let numeroDiv = document.querySelector(`[data-numero="${numeroAtual}"]`);

if(numeroDiv){

numeroDiv.classList.add("vendido");

numeroDiv.onclick = null;

numeroDiv.style.pointerEvents = "none";

}

fecharModal();

})

}

function carregarNumeros(){

fetch(urlAPI)

.then(res=>res.json())

.then(data=>{

data.forEach(numero=>{

let numeroDiv = document.querySelector(`[data-numero="${numero}"]`);

if(numeroDiv){

numeroDiv.classList.add("vendido");

numeroDiv.onclick = null;

numeroDiv.style.pointerEvents = "none";

}

})

})

}

criarNumeros();

carregarNumeros();

// atualização automática a cada 5 segundos
setInterval(carregarNumeros, 5000);
