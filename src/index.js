$(document).ready(inicia);

var categoria = 't';
var atualizou;
var imagePath;
var filmesAPI = [];
var pos = 0;

var filmesComedia = [];
var filmesAnimacao = [];
var filmesRomance = [];
var filmes = {
    "comedia":[
        {
            "src":  "../imagens/Comedia/autoDacompadecida.jpg"
        },
        {
            "src":  "../imagens/Comedia/oPalhaco.jpg"
        },
        {
            "src":  "../imagens/Comedia/minhaMaeEumaPeca.jpg"
        },
        {
            "src":  "../imagens/Comedia/asBranquelas.jpg"
        },
        {
            "src":  "../imagens/Comedia/sosmulheres.jpg"
        },
        {
            "src":  "../imagens/Comedia/debiELoide.jpg"
        },
        {
            "src":  "../imagens/Comedia/esposaDeMentirinha.jpg"
        },
        {
            "src":  "../imagens/Comedia/LisbelaEoPrisioneiro.jpg"
        },
        {
            "src":  "../imagens/Comedia/vaiQueCola.jpg"
        },
        {
            "src":  "../imagens/Comedia/badBoys.jpg"
        },
        {
            "src":  "../imagens/Comedia/vaiQueDaCerto.jpg"
        },
        {
            "src":  "../imagens/Comedia/americanPie.png"
        }
    ],
    "animacao":[
        {
            "src":  "../imagens/Animacao/beeMovie.jpg"
        },
        {
            "src":  "../imagens/Animacao/rio.jpg"
        },
        {
            "src":  "../imagens/Animacao/shrek.jpg"
        },
        {
            "src":  "../imagens/Animacao/reiLeao.jpg"
        },
        {
            "src":  "../imagens/Animacao/oSegredoDosBichos.jpg"
        },
        {
            "src":  "../imagens/Animacao/Madagascar.jpg"
        },
        {
            "src":  "../imagens/Animacao/aEradoGelo.jpg"
        },
        {
            "src":  "../imagens/Animacao/a fugaDasgalinhas.jpg"
        },
        {
            "src":  "../imagens/Animacao/procurandoNemo.jpg"
        },
        {
            "src":  "../imagens/Animacao/bobEsponja.jpg"
        },
        {
            "src":  "../imagens/Animacao/divertidamente.jpg"
        },
        {
            "src":  "../imagens/Animacao/toyStory.jpg"
        },

    ],
    "romance":[
        {
            "src":  "../imagens/Romance/eoVentoLevou.jpg"
        },
        {
            "src":  "../imagens/Romance/questãoDeTempo.jpg"
        },
        {
            "src":  "../imagens/Romance/umAmorParaRecordar.jpg"
        },
        {
            "src":  "../imagens/Romance/meuPrimeiroAmor.jpg"
        },
        {
            "src":  "../imagens/Romance/comoEuEra.jpg"
        },
        {
            "src":  "../imagens/Romance/after.jpg"
        },
        {
            "src":  "../imagens/Romance/queridoJohn.jpg"
        },
        {
            "src":  "../imagens/Romance/titanic.jpg"
        },
        {
            "src":  "../imagens/Romance/simplesmenteAcontece.jpg"
        },
        {
            "src":  "../imagens/Romance/umaLindaMulher.jpg"
        },
        {
            "src":  "../imagens/Romance/teAmareiParaSempre.jpg"
        },
        {
            "src":  "../imagens/Romance/casaBlanca.jpg"
        }
    ],
    "ficcao":[
        {
            "src":  "../imagens/Ficcao/aChegada.jpg"
        },
        {
            "src":  "../imagens/Ficcao/aOrigem.jpg"
        },
        {
            "src":  "../imagens/Ficcao/oDuplo.jpg"
        },
        {
            "src":  "../imagens/Ficcao/laranjaMecanica.jpg"
        },
        {
            "src":  "../imagens/Ficcao/madMax.jpg"
        },
        {
            "src":  "../imagens/Ficcao/matrix.jpg"
        },
        {
            "src":  "../imagens/Ficcao/interstellar.jpg"
        },
        {
            "src":  "../imagens/Ficcao/bladeRunner.jpg"
        },
        {
            "src":  "../imagens/Ficcao/aGuerraDoAmanha.jpg"
        },
        {
            "src":  "../imagens/Ficcao/upGrade.jpg"
        },
        {
            "src":  "../imagens/Ficcao/venom.jpg"
        },
        {
            "src":  "../imagens/Ficcao/vida.jpeg"
        }
    ],
    "todos":[
        {
            "src":  "../imagens/Comedia/autoDaCompadecida.jpg"
        },
        {
            "src":  "../imagens/Animacao/beeMovie.jpg"
        },
        {
            "src":  "../imagens/Romance/eoVentoLevou.jpg"
        },
        {
            "src":  "../imagens/Ficcao/bladeRunner.jpg"
        },
        {
            "src":  "../imagens/Comedia/oPalhaco.jpg"
        },
        {
            "src":  "../imagens/Romance/simplesmenteAcontece.jpg"
        },
        {
            "src":  "../imagens/Animacao/toyStory.jpg"
        },
        {
            "src":  "../imagens/pulpFiction.jpg"
        },
        {
            "src":  "../imagens/Animacao/oSegredoDosBichos.jpg"
        },
        {
            "src":  "../imagens/Romance/queridoJohn.jpg"
        },
        {
            "src":  "../imagens/Ficcao/aChegada.jpg"
        },
        {
            "src":  "../imagens/Comedia/minhaMaeEumaPeca.jpg"
        }
    ]
}

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

var iframes = [
    {
        "src": "https://www.youtube.com/embed/Ex01UH4hApA",
        "filme": "O auto da compadecida",
        "diretor": "lili",
        "roteiro": "xxxxx"
    },
    {
        "src": "https://www.youtube.com/embed/Ex01UH4hApA",
        "filme": "testey",
        "diretor": "lele",
        "roteiro": "xxxxx"
    },
    {
        "src": "https://www.youtube.com/embed/Ex01UH4hApA",
        "filme": "testez",
        "diretor": "lala",
        "roteiro": "xxxxx"
    }
]

function inicia(){

    /* var API_KEY = `5df9d42e52753432b65c92f566de9ae7`;
    URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;
    imagePath = `https://image.tmdb.org/t/p/w500/`; */

    getFilmes();

    atualizou = 0;
    $("#maisFilmes").click(carregaFilmes);
    $("#maisFilmesVideos").click(carregaFilmesVideos);
    $("#maisAvaliacoes").click(carregaAvaliacoes);

    $("#aventura").click(function(){
        filtraFilmes('a', 'Animação');
    });

    $("#Romance").click(function(){
        filtraFilmes('r', 'Romance');
    });

    $("#Comedia").click(function(){
        filtraFilmes('c', 'Comédia');
    });
    $("#todos").click(function(){
        filtraFilmes('t', 'Todos');
    });
}

function getFilmes(){
    var API_KEY = `5df9d42e52753432b65c92f566de9ae7`;
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
            
        });
}
function classificaFilmes(){
    for(var i = 0;i<filmesAPI.length;i++){
        for(var j=0; j<filmesAPI[i].genre_ids.length; j++){
            if(filmesAPI[i].genre_ids[j] == 35){
                filmesComedia.push(filmesAPI[i]);
            }else if(filmesAPI[i].genre_ids[j] == 16){
                filmesAnimacao.push(filmesAPI[i]);
            }else if(filmesAPI[i].genre_ids[j] == 10749){
                filmesRomance.push(filmesAPI[i]);
            }
        } 
    } 

    console.log(filmesComedia);
    console.log(filmesAnimacao);
    console.log(filmesRomance);
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
        if(categoria == 'c'){
            $(img).prop('src', `${imagePath}${filmesComedia[pos].poster_path}`);  
        }else if(categoria == 'a'){
            $(img).prop('src', `${imagePath}${filmesAnimacao[pos].poster_path}`); 
        }else if(categoria == 'r'){
            $(img).prop('src', `${imagePath}${filmesRomance[pos].poster_path}`); 
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
    console.log("teste")
    for(var i = 0; i <3;i++){
        $("#iframe" + i).prop('src', iframes[i].src);
        $("#iframeFilme" + i).html("<strong>Filme:</strong> "+iframes[i].filme);
        $("#iframeDiretor" + i).html("<strong>Diretor:</strong> "+iframes[i].diretor);
        $("#iframeRoteiro" + i).html("<strong>Roteiro:</strong> "+iframes[i].roteiro);
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


