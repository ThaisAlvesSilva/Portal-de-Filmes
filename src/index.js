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
    
    if(categoria=='a'){
        document.getElementById("img1").src = "../imagens/passaros.jpg"
    }else if(categoria == 'r'){
        document.getElementById("img1").src = "../imagens/genioIndomavel.jpg"
    }else{
        document.getElementById("img1").src = "../imagens/pulpFiction.jpg"
    }
}