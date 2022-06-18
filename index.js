$(document).ready(inicia);
var API_KEY = `5df9d42e52753432b65c92f566de9ae7`;
var movieDB = `https://www.themoviedb.org/movie/`
var categoria = 't';
var atualizou;
var atualizouVideo;
var imagePath = `https://image.tmdb.org/t/p/w500/`; 
var pos = 0;
var posVideos = 0;
var dadosDiretores = [];
var dadosRoteiro = [];

var filmesDrama = [];
var filmesAnimacao = [];
var filmesAcao = [];
var filmesAPI = [];
var videos = [];

var nomeF;
var idF; 
var sinopseF; 
var dataF;
var generosF;

function inicia(){

    var pesquisa = $('#botaoepesquisa').val();
    if(pesquisa == ""){
        getFilmes();
    }else{
        adicionaFilmesPesquisa(pesquisa);
    }

}

function getFilmes(){
    
    URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&region=BR`;
    imagePath = `https://image.tmdb.org/t/p/w500/`;

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            data.results.map(filme =>{
                if(filme.poster_path != undefined && filme.overview != ""){
                    filmesAPI.push(filme);
                }
            })
            carregaCreditosIframes
            adicionaFilmesNaTela();
           
        });

    URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=pt-BR&region=BR`;
    imagePath = `https://image.tmdb.org/t/p/w500/`;

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            data.results.map(filme =>{
                if(filme.poster_path != undefined && filme.overview != ""){
                    filmesAPI.push(filme);
                }
            })

        });
}



function carregaCreditosIframes(){
    for(let i = 0; i <filmesAPI.length; i++){
        URL = `http://api.themoviedb.org/3/movie/${filmesAPI[i].id}/credits?api_key=${API_KEY}`;
        fetch(URL)
            .then(res => res.json())
            .then(dados => {
                var diretores = '';
                var roteiro = '';
                var qtdDiretor = 0;
                var qtdRoteiro = 0;
                var crew = dados.crew;
                for(var j = 0; j<crew.length; j++){
                    if(crew[j].job == "Director" && qtdDiretor != 2){
                        diretores += crew[j].name + ",";
                    }else if(crew[j].job == "Screenplay" && qtdRoteiro != 2){
                        roteiro +=  crew[j].name + "," ;
                    }
                }
                dadosDiretores.push(diretores);
                dadosRoteiro.push(roteiro);
            })
    }
    adicionaFilmesNaTela();
}


function carregaDadosDiretor(){
    URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pt-BR&region=BR`;
    fetch(URL)
        .then(res => res.json())
        .then(filmes => {
            for(var i = 0; i<3; i++){
                URL = `http://api.themoviedb.org/3/movie/${filmes.results[i].id}/credits?api_key=${API_KEY}`;
                var j = 0;
                var k = 0;
                fetch(URL)
                .then(res => res.json())
                .then(dados => {
                    
                    var diretores = '';
                    var qtdDiretor = 0;
                    var crew = dados.crew;
                    for(var j = 0; j<crew.length; j++){
                        if(crew[j].job == "Director" && qtdDiretor != 2){
                            diretores += crew[j].name ;
                        }
                    }
                    $(`#diretorL${k}`).html("<strong>Diretor: </strong> "+diretores);
                    k++;
                    
                })
            }
        })
}

function carregaDadosELenco(){
    URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pt-BR&region=BR`;
    fetch(URL)
        .then(res => res.json())
        .then(filmes => {
            for(var i = 0; i<3; i++){
                URL = `http://api.themoviedb.org/3/movie/${filmes.results[i].id}/credits?api_key=${API_KEY}`;
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
                    $(`#elenco${k}`).html("<b>Elenco: </b>"+elenco);
                    k++;
                    
                })
            }
        })
}

function atualiza(){
    location.reload();
}

function pesquisa(){
    var pesquisa = $('#botaoepesquisa').val();

    if(pesquisa == ""){
        atualiza();
    }else{
        adicionaFilmesPesquisa(pesquisa);
    }  
}

function adicionaFilmesPesquisa(pesquisa){
    URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&region=BR&query=${pesquisa}`;
    var filmes = '';
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            data.results.map(filme => {
                if(filme.overview != ""){
                    if(filme.poster_path != undefined){
                        filmes +=
                        `<div style="margin-top:30px; border-color:blue;"class="col-12 col-sm-12 col-md-6 col-lg-4">
                                <div id="cardFilmePesquisa" class="card">
                                    <img style="width:80%px;"src="${imagePath}${filme.poster_path}"</img>
                                    <p><b> Filme:</b>  ${filme.title}</p>
                                    <p><b>Descrição:</b> ${filme.overview}</p>
                                    <a href="https://www.themoviedb.org/movie/${filme.id}" style="color:black;">
                                        <button  class="btn btn-success";" class="btn btn-success">Ver mais</button>
                                    </a>
                                </div>  
                        </div> `
                    }
                } 
            })
            
            $(".textoDestaque").html("Filmes encontrados:");
            $(".textoDestaque").css("font-size", "35px");
            $(".textoDestaque").css("text-align", "left");
            $(".textoDestaque").css("margin-bottom", "1px");
            
            $('#main').html(filmes);
        });
}

function adicionaFilmesNaTela(){
    var filmes = '';
    for(var i = 0; i <filmesAPI.length; i++){
        if(filmesAPI[i].overview != ""){
            if(filmesAPI[i].poster_path != undefined){
                var genero = '';
                var generos = filmesAPI[i].genre_ids;
                for(var k = 0; k<generos.length; k++){
                    if(generos[k] == 18){
                        genero += ' Drama' + ",";
                    }else if(generos[k] == 16){
                        genero += ' Animação' + ",";
                    }else if(generos[k] == 28){
                        genero += ' Ação' + ",";
                    }else if(generos[k] == 12){
                        genero += ' Aventura' + ",";
                    }else if(generos[k] == 35){
                        genero += ' Comedia' + ",";
                    }else if(generos[k] == 80){
                        genero += ' Crime' + ",";
                    }else if(generos[k] == 18){
                        genero += ' Drama' + ",";
                    }else if(generos[k] == 14){
                        genero += ' Fantasia' + ",";
                    }else if(generos[k] == 10751){
                        genero += ' Família' + ",";
                    }else if(generos[k] == 17){
                        genero += ' Terror' + ",";
                    }else if(generos[k] == 10749){
                        genero += ' Romance' + ",";
                    }else if(generos[k] == 9648){
                        genero += ' Mistério' + ",";
                    }else if(generos[k] == 878){
                        genero += ' Ficção científica' + ",";
                    }else if(generos[k] == 53){
                        genero += ' Thriller' + ",";
                    }
                }
                nomeF = filmesAPI[i].title;
                idF = filmesAPI[i].id;
                sinopseF = filmesAPI[i].overview;
                generosF = genero;
                dataF = filmesAPI[i].release_date;

                filmes += 
                `<div  id="divFilme" class="col-12 col-sm-12 col-md-12 col-lg-4" style="margin-top:50px;">
                    <div id="cardFilme" class="card">
                        <img id="img0" class="imagemDestaque" src="${imagePath}${filmesAPI[i].poster_path}">
                        <div class="card-body">
                        <p class="card-title"><b>Titulo: </b>
                            <p id="tituloFilme" >${filmesAPI[i].title}</p>
                        </p>
                        <p id = "sinopseFilme0"class="card-text"><b>Descrição: </b>${filmesAPI[i].overview}</p>
                        <p id = "sinopseFilme0"class="card-text"><b>Gêneros: </b>${genero}</p>
                        <p id = "sinopseFilme0"class="card-text"><b>Data: </b>${filmesAPI[i].release_date}</p>
                        <button onClick="abreDetalhes(${filmesAPI[i].id});" class="btn btn-success";" class="btn btn-success">Detalhes</button>
                        </div>
                    </div>
                </div>`
            }
        } 
    }
    $('#main').html(filmes);  
}

function abreDetalhes(id){
    localStorage.setItem("id", id);
    window.location.href = 'detalhes.html';
}



