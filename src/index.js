$(document).ready(inicia);
/* http://api.themoviedb.org/3/movie/157336/videos?api_key=5df9d42e52753432b65c92f566de9ae7 */
var API_KEY = `5df9d42e52753432b65c92f566de9ae7`;
var movieDB = `https://www.themoviedb.org/movie/`
var categoria = 't';
var atualizou;
var atualizouVideo;
var imagePath;
var pos = 0;
var posVideos = 0;
var dadosDiretores = [];
var dadosRoteiro = [];

var filmesDrama = [];
var filmesAnimacao = [];
var filmesAcao = [];
var filmesAPI = [];
var videos = [];

var avaliacoes = [
    {
        "nome": "Bruno Nascimento",
        "avaliacao": "Pra quem jogou os games na era do Mega Drive/Dreamcast vai gostar muito do resultado final. O filme não é perfeito, mas deixa um sentimento de trabalho feito com carinho. Jim Carrey nasceu pra ser o Robotinic, e esse segundo filme acaba sendo uma mistura dos jogos Sonic 2, Sonic & Knucles e Sonic Adventure. As referências aos jogos são bem feitas, os efeitos estão muito bons, e os personagens se adequam bem ao cenário, dando a sensação de que eles realmente fazem parte do mundo real (belo trabalho de cores, luzes e sombras). Sonic 2 é melhor que o primeiro filme, o que aumenta o hype para um terceiro filme.",
        "estrelas": 5
    },
    {
        "nome": "Nayara Rodrigues",
        "avaliacao": "Filme bastante mentiroso. Aquela mulher que do nada, deixa o homem louco é sempre esse homens são ricos. Inspiração de 50 tons de cinza. Cenas de sexo até q são boas, mais a história fica a desejar. Várias partes q passam sem agente entender. Filme poderia sem melhor. Atores bonitos e com química também teve pontos.",
        "estrelas": 2
    },
    {
        "nome": "Mykaelle Ferreira",
        "avaliacao": "Eu gostei do filme, composição sonora, arte visual, qualidade excepcional. Mas achei q poderia ter havido uma composição melhor no roteiro da historia em si, atores excepcionais na interpretação só faltou um final  bacana, embora sabemos q ira ter sequencia. Sabemos q a historia são baseado em 4 livros e que o volume de informações são grandes. confesso esta ansiosa pro próximo filme.",
        "estrelas": 3
    }
]

function inicia(){

    /* var API_KEY = `5df9d42e52753432b65c92f566de9ae7`;
    URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;
    imagePath = `https://image.tmdb.org/t/p/w500/`; */

    getFilmes();
    carregaLancamentos();
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
            console.log(filmesAPI);
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
                                roteiro +=  crew[j].name + "," ;
                            }
                        }
                        dadosDiretores.push(diretores);
                        dadosRoteiro.push(roteiro);
                        carregaFilmesVideos();   
                    })
            }
        });
}

function carregaLancamentos(){
    URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pt-BR&region=BR`;
    fetch(URL)
        .then(res => res.json())
        .then(filmes => {
            //console.log(filmes.results);
           for(var i = 0; i<3; i++){
                URL = `http://api.themoviedb.org/3/movie/${filmes.results[i].id}/videos?api_key=${API_KEY}&language=pt-BR&region=BR`;
                var j = 0;
                fetch(URL)
                    .then(res => res.json())
                    .then(v => {
                        var src = `https://www.youtube.com/embed/${v.results[0].key}`;
                        var iframe = `#iframeLancamento${j}`;
                        $(`#linkLancamento${j}`).prop('href', `https://www.themoviedb.org/movie/${filmes.results[j].id}`);
                        $(iframe).prop('src', src);
                        $(`#nomeFilmeL${j}`).html("<strong>Nome do filmes:</strong> "+filmes.results[j].title);
                        $(`#sinopseL${j}`).html("<strong>Sinopse:</strong> "+filmes.results[j].overview);
                        j++;   
                    })
            }
            carregaDadosDiretor();
            carregaDadosELenco();
        })
}

function carregaDadosDiretor(){
    URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pt-BR&region=BR`;
    fetch(URL)
        .then(res => res.json())
        .then(filmes => {
            //console.log(filmes.results);
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
            //console.log(filmes.results);
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

function atualiza(){
    location.reload();
}

function pesquisa(){
    var pesquisa = $('#botaoepesquisa').val();

    if(pesquisa == ""){
        atualiza();
    }else{
        URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&region=BR&query=${pesquisa}`;
        var filmes = '';
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                data.results.map(filme => {
                    if(filme.overview != ""){
                        if(filme.poster_path != undefined){
                            filmes += 
                            `<div style="margin-top:80px; border-color:blue;"class="col-12 col-sm-12 col-md-4 col-lg-4">
                                <a style="color:black;" href="https://www.themoviedb.org/movie/${filme.id}">
                                    <img style="width:200px;"src="${imagePath}${filme.poster_path}"</img>
                                    <p><b> Filme:</b>  ${filme.title}</p>
                                    <p><b>Descrição:</b> ${filme.overview}</p>
                                </a>   
                            </div> `
                        }
                    } 
                })
                $('#corpoDoSite').html(filmes);
            });
    }
    
}
function filtraFilmes(categoria, nomeCategoria){
    atualizou = 0;
    $('#dropdownMenuButton').text('Categoria: ' + nomeCategoria);
    $('#todos').css('visibility', 'visible');
    this.categoria = categoria;
    
    alteraFilmes(categoria, 0);
}


function carregaFilmes(){
    
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
    
    //console.log(atualizou, pos);
    alteraFilmes(categoria,pos);
}

function alteraFilmes(categoria, pos){
    
    for(var i=0;i<4;i++, pos++){
        let link = "#link" + i;
        let img = '#img' + i;
        if(categoria == 'd'){
            $(link).prop('href', `https://www.themoviedb.org/movie/${filmesDrama[pos].id}`);  
            $(img).prop('src', `${imagePath}${filmesDrama[pos].poster_path}`);  
        }else if(categoria == 'a'){
            $(link).prop('href', `https://www.themoviedb.org/movie/${filmesAnimacao[pos].id}`);
            $(img).prop('src', `${imagePath}${filmesAnimacao[pos].poster_path}`); 
        }else if(categoria == 'ac'){
            $(link).prop('href', `https://www.themoviedb.org/movie/${filmesAcao[pos].id}`);
            $(img).prop('src', `${imagePath}${filmesAcao[pos].poster_path}`); 
        }else{  
            $(link).prop('href', `https://www.themoviedb.org/movie/${filmesAPI[pos].id}`);
            $(img).prop('src', `${imagePath}${filmesAPI[pos].poster_path}`); 
        }
    }         
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
    //console.log(posVideos);
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
        $("#avaNome"+i).html("<b>" + avaliacoes[i].nome + "</b>");
        $("#avaComentario"+i).html("<b>Avaliação: </b>"+avaliacoes[i].avaliacao);
        //document.getElementById("avaNome"+i).textContent = avaliacoes[i].nome;
    }
}


