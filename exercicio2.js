
async function desafioDogs() {

   

    const resposta = await fetch("https://dog.ceo/api/breeds/list/all");
    const dados = await resposta.json();

    const racas = dados.message;

  

    const listaRacas = Object.keys(racas);
    console.log("Total de raças:", listaRacas.length);

    console.log("\n==============================");
    console.log("RAÇAS COM SUB-RAÇAS");
    console.log("==============================");

    

    for (let raca in racas) {

        if (racas[raca].length > 0) {

            console.log(raca + " → " + racas[raca].join(", "));
        }

    }

    console.log("\n==============================");
    console.log("PROCURANDO RAÇA COM MAIS FOTOS...");
    console.log("==============================");

  
    let maiorQuantidade = 0;
    let racaComMaisFotos = "";

    for (let raca of listaRacas) {

        const respFotos = await fetch(`https://dog.ceo/api/breed/${raca}/images`);
        const dadosFotos = await respFotos.json();

        const quantidade = dadosFotos.message.length;

        if (quantidade > maiorQuantidade) {
            maiorQuantidade = quantidade;
            racaComMaisFotos = raca;
        }

    }

    console.log("\n==============================");
    console.log("RAÇA COM MAIS FOTOS:");
    console.log(racaComMaisFotos);
    console.log("Quantidade de fotos:", maiorQuantidade);

}

desafioDogs();