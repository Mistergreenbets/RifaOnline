const urlAPI = "https://script.google.com/macros/s/AKfycbyS5QrxORvPeleMbrOXW9LzG9a2nYsjLnhrTVsKvCNLXaCvNHc28hPaclt3wPsoeyum/exec";

const grid = document.getElementById("grid");

let numeroAtual = null;

function criarNumeros(){

for(let i=1;i<=200;i++){

let div = document.createElement("div");

div.className="numero";

div.innerText=i;

div.onclick=()=>abrirModal(i);

grid.appendChild(div);

}

}

function abrirModal(numero){

numeroAtual=numero;

document.getElementById("numeroSelecionado").innerText=numero;

document.getElementById("modal").style.display="block";

}

function fecharModal(){

document.getElementById("modal").style.display="none";

}

function registrarVenda(){

let nome=document.getElementById("nome").value;

let telefone=document.getElementById("telefone").value;

fetch(urlAPI,{

method:"POST",

body:JSON.stringify({

numero:numeroAtual,

nome:nome,

telefone:telefone

})

})

.then(res=>res.json())

.then(()=>{

fecharModal();

carregarNumeros();

})

}

function carregarNumeros(){

fetch(urlAPI)

.then(res=>res.json())

.then(data=>{

document.querySelectorAll(".numero").forEach(el=>{

let num=el.innerText;

if(data.includes(num)){

el.classList.add("vendido");

}

})

})

}

criarNumeros();

carregarNumeros();
