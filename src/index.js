window.addEventListener("load", inicia);
        
function inicia() {
    document.getElementById("maisFilmes").addEventListener("click",carregaFilmes);
    document.getElementById("maisAvaliacoes").addEventListener("click",carregaAvaliacoes);

    document.getElementById("aventura").addEventListener("click",function(){
        filtraFilmes('a');
    });

    document.getElementById("Romance").addEventListener("click",function(){
        filtraFilmes('r');
    });

    document.getElementById("Comedia").addEventListener("click", function(){
        filtraFilmes('c');
    });
}

function carregaFilmes(){
    //alert("filmes");
}

function carregaAvaliacoes(){
    //alert("avaliacoes");
}

function filtraFilmes(categoria){
    
    for(var i=1;i<=4;i++){
        if(categoria=='a'){
            document.getElementById("img" + i).src = "../imagens/passaros.jpg"
            document.getElementById("avaNome"+i).textContent = "Teste";
        }else if(categoria == 'r'){
            document.getElementById("img" + i).src = "../imagens/pulpFiction.jpg"
        }else{
            document.getElementById("img" + i).src = "../imagens/autoDaCompadecida.jpg"
        }
    }   
}