$(document).ready(inicia);
/* http://api.themoviedb.org/3/movie/157336/videos?api_key=5df9d42e52753432b65c92f566de9ae7 */
var API_KEY = `5df9d42e52753432b65c92f566de9ae7`;
var categoria = 't';
var atualizou;
var atualizouVideo;
var imagePath;
var filmesAPI = [];
var pos = 0;
var videos = [];
var posVideos = 0;
var dadosDiretores = [];
var dadosRoteiro = [];

var filmesDrama = [];
var filmesAnimacao = [];
var filmesAcao = [];


var avaliacoes = [
    {
        "nome": "XXXX",
        "avaliacao": "testex",
        "estrelas": 5
    },
    {
        "nome": "YYYYY",
        "avaliacao": "testey",
        "estrelas": 2
    },
    {
        "nome": "ZZZZ",
        "avaliacao": "testez",
        "estrelas": 3
    }
]

function inicia(){

    /* var API_KEY = `5df9d42e52753432b65c92f566de9ae7`;
    URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;
    imagePath = `https://image.tmdb.org/t/p/w500/`; */

    getFilmes();
    atualizou = 0;
    atualizouVideo = 0;
    $("#maisFilmes").click(carregaFilmes);
    $("#maisFilmesVideos").click(carregaFilmesVideos);
    $("#maisAvaliacoes").click(carregaAvaliacoes);

    $("#aventura").click(function(){
        filtraFilmes('a', 'Animação');
    });

    $("#Acao").click(function(){
        filtraFilmes('ac', 'Ação');
    });

    $("#drama").click(function(){
        filtraFilmes('d', 'Drama');
    });
    $("#todos").click(function(){
        filtraFilmes('t', 'Todos');
    });
}

function getFilmes(){
    
    URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;
    imagePath = `https://image.tmdb.org/t/p/w500/`; 

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            data.results.map(filme =>{
                filmesAPI.push(filme);
            })
 
        }); 
    URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    imagePath = `https://image.tmdb.org/t/p/w500/`;

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            data.results.map(filme =>{
                filmesAPI.push(filme);
            })

            
        });
        URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
    imagePath = `https://image.tmdb.org/t/p/w500/`;

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            data.results.map(filme =>{
                filmesAPI.push(filme);
            })

            classificaFilmes();
            carregaFilmes();
            for(let i = 0; i <filmesAPI.length; i++){
                URL = `http://api.themoviedb.org/3/movie/${filmesAPI[i].id}/videos?api_key=${API_KEY}`;
                fetch(URL)
                    .then(res => res.json())
                    .then(data => {
                        videos.push(data.results[0]);
                    })
            }
            //console.log(videos);

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
                                roteiro += "," + crew[j].name;
                            }
                        }
                        dadosDiretores.push(diretores);
                        dadosRoteiro.push(roteiro);
                            
                    })
            }
            console.log(filmesAPI);
            console.log(dadosDiretores);
        });
}
function classificaFilmes(){
    for(var i = 0;i<filmesAPI.length;i++){
        for(var j=0; j<filmesAPI[i].genre_ids.length; j++){
            if(filmesAPI[i].genre_ids[j] == 18){
                filmesDrama.push(filmesAPI[i]);
            }else if(filmesAPI[i].genre_ids[j] == 16){
                filmesAnimacao.push(filmesAPI[i]);
            }else if(filmesAPI[i].genre_ids[j] == 28){
                filmesAcao.push(filmesAPI[i]);
            }
        }   
    } 
}


function pesquisa(){
    var pesquisa = $('#botaoepesquisa').val();
    
    URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&region=BR&query=${pesquisa}`;
    var filmes = '';
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            data.results.map(filme => {
                if(filme.overview != ""){
                    filmes += 
                        `<div style="margin-top=300px;"class="col-12 col-sm-12 col-md-4 col-lg-4">
                        <a href="https://www.themoviedb.org/movie/${filme.id}">
                            <img style="width:200px;"src="${imagePath}${filme.poster_path}"</img>
                        </a>
                            <p><b> Filme:</b>  ${filme.title}</p>
                            <p><b>Descrição:</b> ${filme.overview}</p>    
                        </div> `
                } 
            })
           // console.log(data.results);
            
            $('#corpoDoSite').html(filmes);
        });
}
function filtraFilmes(categoria, nomeCategoria){
    atualizou = 0;
    $('#dropdownMenuButton').text('Categoria: ' + nomeCategoria);
    $('#todos').css('visibility', 'visible');
    this.categoria = categoria;
    
    alteraFilmes(categoria, 0);
}

function alteraFilmes(categoria, pos){
    //console.log(filmesAPI);
    var isCategory = false;
    for(var i=0;i<4;i++, pos++){
        let img = '#img' + i;
        if(categoria == 'd'){
            $(img).prop('src', `${imagePath}${filmesDrama[pos].poster_path}`);  
        }else if(categoria == 'a'){
            $(img).prop('src', `${imagePath}${filmesAnimacao[pos].poster_path}`); 
        }else if(categoria == 'ac'){
            $(img).prop('src', `${imagePath}${filmesAcao[pos].poster_path}`); 
        }else{  
            $(img).prop('src', `${imagePath}${filmesAPI[pos].poster_path}`);   
        }
    }         
}


function carregaFilmes(){
    
    /* if(atualizou == 0){
        var pos = 4;
        atualizou++;
    }else if(atualizou == 1){
        var pos = 8;
        atualizou++;
    }else if(atualizou == 2){
        var pos = 12;
        atualizou++;
    }else if(atualizou == 3){
        var pos = 16;
        atualizou++;
    }else if(atualizou == 4){
        var pos = 0;
        atualizou = 0;
    } */
    console.log(categoria);
    if(categoria == 't'){
        if(atualizou == 0){
            pos = 4;
            atualizou++;
        }else if(pos < 56){
            atualizou++;
            pos+= 4;
        }else{
            pos = 0;
            atualizou = 0;
        }
    }else if(categoria == 'ac'){
        if(atualizou == 0){
            pos = 4;
            atualizou++;
        }else if(pos < 20){
            atualizou++;
            pos+= 4;
        }else{
            pos = 0;
            atualizou = 0;
        }
    }else if(categoria == 'd'){
        if(atualizou == 0){
            pos = 4;
            atualizou++;
        }else if(pos < 16){
            atualizou++;
            pos+= 4;
        }else{
            pos = 0;
            atualizou = 0;
        }
    }else{
        if(atualizou == 0){
                pos = 4;
                atualizou++;
        }else if(atualizou == 1){
            pos = 8;
            atualizou++;
        }else if(atualizou == 2){
            pos = 0;
            atualizou = 0;
        } 
    }
    
    console.log(atualizou, pos);
    alteraFilmes(categoria,pos);
}

function carregaFilmesVideos(){
    
    if(atualizouVideo == 0){
        posVideos = 0;
        atualizouVideo++;
    }else if(posVideos < 42){
        atualizouVideo++;
        posVideos+= 3;
    }else{
        posVideos = 0;
        atualizouVideo = 0;
    }
    var posV = posVideos;
    console.log(posVideos);
    for(var i = 0; i <3;i++, posV++){
        var src = `https://www.youtube.com/embed/${videos[posV].key}`
        $("#iframe" + i).prop('src', src);
        $("#iframeFilme" + i).html("<strong>Filme:</strong> "+filmesAPI[posV].title);
        $("#iframeDiretor" + i).html("<strong>Diretor:</strong> "+dadosDiretores[posV]);
        if(dadosRoteiro[posV] != ""){
            $("#iframeRoteiro" + i).html("<strong>Roteiro:</strong> "+dadosRoteiro[posV]);
        }else{
            $("#iframeRoteiro" + i).html("");
        }
        
    }
    
}

function carregaAvaliacoes(){
    for(var i = 0; i <3; i++){
        console.log(avaliacoes[i].nome);
        $("#avaNome"+i).prop('textContent', avaliacoes[i].nome);
        $("#avaComentario"+i).prop('textContent', avaliacoes[i].avaliacao);
        //document.getElementById("avaNome"+i).textContent = avaliacoes[i].nome;
    }
}


