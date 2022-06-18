$(document).ready(inicia);
var API_KEY = `5df9d42e52753432b65c92f566de9ae7`;
var imagePath = `https://image.tmdb.org/t/p/w500/`; 

function inicia() {
    var filme = JSON.parse(localStorage.getItem("filme"));
    console.log(filme);
    getFilme(filme);
}

function getFilme(dados) {
    //URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR&region=BR`;
    //fetch(URL)
   // .then(res => res.json())
    //.then(dados => {
        //var genero = getGenero(dados.genres);
        $("#sinopse").html("<strong>Sinopse:</strong> "+dados.overview);
        $("#data").html("<strong>Data de lançamento:</strong> "+dados.release_date);
        //$("#generos").html("<strong>Gêneros:</strong> "+genero);
        $("#nome").html(dados.title);
        getInfos(dados.id);
        getVideo(dados.id, dados.poster_path);
        
   // });
}

function getGenero(generos){
    var genero = '';
    for(var k = 0; k<generos.length; k++){
        genero += generos[k].name + ", ";
    } 
    return genero;
}

function getInfos(id){
    URL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;
    var j = 0;
    var k = 0;
    fetch(URL)
    .then(res => res.json())
    .then(dados => {
        var diretores = '';
        var roteiro = '';
        var elenco = '';
        var qtdDiretor = 0;
        var crew = dados.crew;
        var cast = dados.cast;
        for(var j = 0; j<crew.length; j++){
            if(crew[j].job == "Director"){
                diretores += crew[j].name + ", ";
            }else if(crew[j].job == "Screenplay"){
                roteiro +=  crew[j].name + "," ;
            }
        }
        for(var j = 0; j<cast.length; j++){
            if(cast[j].known_for_department == "Acting"){
                elenco += cast[j].name + ", ";
            }
        }
        $("#diretor").html("<strong>Diretor:</strong> "+diretores);
        if(roteiro != ""){
            $("#roteiro").html("<strong>Roteiro:</strong> "+roteiro); 
        } 
        $("#elenco").html("<strong>Elenco:</strong> "+elenco);
    })
}

function carregaDadosELenco(id){
    
    URL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;
    var j = 0;
    var k = 0;
    fetch(URL)
    .then(res => res.json())
    .then(dados => {
        var elenco = '';
        var qtdElenco = 0;
        var cast = dados.cast;
        for(var j = 0; j<cast.length; j++){
            if(cast[j].known_for_department == "Acting" && qtdElenco != 4){
                elenco +=  cast[j].name + "," ;
                qtdElenco++;
            }
        }
        $("elenco").html("<b>Elenco: </b>"+elenco);
        
    })
}

function atualiza(){
    location.href = "index.html";
}

function getVideo(id, poster){
    var div = '';
    URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=pt-BR&region=BR`;
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if(data.results.length != 0){
                
                var src = `https://www.youtube.com/embed/${data.results[0].key}`
                div +=
                `<iframe id="iframe" width="80%" height="400" src=${src} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                //$("#img").css("visibility", "hidden")`;
                //$("#iframe").prop('src', src);
                
            }else{
                var src = imagePath + poster;
                div += 
                `<img id="imgFilme" src=${src} width="40%" height="400px" id="img">`;
            }
            $('#divIframe').html(div); 
        })
}