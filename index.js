window.addEventListener("load", inicia);
        
function inicia() {
    document.getElementById("maisFilmes").addEventListener("click",carregaFilmes);
    document.getElementById("maisAvaliacoes").addEventListener("click",carregaAvaliacoes);
    document.getElementById("aventura").addEventListener("click",filtraFilmes);
    document.getElementById("Romance").addEventListener("click",filtraFilmes);
    document.getElementById("Comedia").addEventListener("click", filtraFilmes);
}

function carregaFilmes(){
    //alert("filmes");
}

function carregaAvaliacoes(){
    //alert("avaliacoes");
}

function filtraFilmes(){
    //alert("FiltraFilmes");
}