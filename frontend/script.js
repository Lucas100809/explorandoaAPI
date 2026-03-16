const dogImage = document.getElementById("dogImage");
const breedName = document.getElementById("breedName");
const randomBtn = document.getElementById("randomBtn");
const searchBtn = document.getElementById("searchBtn");
const breedInput = document.getElementById("breedInput");

const API = "http://10.106.208.12:3001/api/times";

async function buscarTime(url){

try{

const response = await fetch(url);

const data = await response.json();

if(data.status==="error"){

breedName.textContent=data.message;
dogImage.src="";
return;

}

// animação
dogImage.style.opacity=0;

setTimeout(()=>{

dogImage.src=data.message;
dogImage.style.opacity=1;

},200);

const nomeArquivo=data.message.split("/").pop();

const nomeTime=nomeArquivo.replace(/[0-9]/g,"").replace(".jpg","");

breedName.textContent=

nomeTime.charAt(0).toUpperCase()+nomeTime.slice(1);

}catch(error){

breedName.textContent="⚠️ Servidor offline";
dogImage.src="";

}

}

function buscarTimeNome(){

const time = breedInput.value.trim().toLowerCase();

if(!time){

alert("Digite um time");
return;

}

// remover espaços extras
const timeFormatado = time.replace(/\s+/g,"");

buscarTime(`${API}/${timeFormatado}`);

}

buscarTime(`${API}/${time}`);

}

randomBtn.addEventListener("click",timeAleatorio);

searchBtn.addEventListener("click",buscarTimeNome);

dogImage.addEventListener("click",timeAleatorio);

breedInput.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){

buscarTimeNome();

}

});

timeAleatorio();