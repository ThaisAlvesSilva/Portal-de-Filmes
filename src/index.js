$(document).ready(inicia);

var categoria = 't';
var atualizou;
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
            "src":  "../imagens/Comedia/LisbelaEoPrisioneiro.jpg"
        },
        {
            "src":  "../imagens/Comedia/genteGrande.jpg"
        },
    ],
    "animacao":[
        {
            "src":  "../imagens/Animacao/beeMovie.jpg"
        },
        {
            "src":  "../imagens/Animacao/rio.jpg"
        },
        {
            "src":  "../imagens/Animacao/reiLeao.jpg"
        },
        {
            "src":  "../imagens/Animacao/shrek.jpg"
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
            "src":  "../imagens/Animacao/toyStory.jpg"
        }

    ],
    "romance":[
        {
            "src":  "../imagens/Romance/comoEuEra.jpg"
        },
        {
            "src":  "../imagens/Romance/simplesmenteAcontece.jpg"
        },
        {
            "src":  "../imagens/Romance/queridoJohn.jpg"
        },
        {
            "src":  "../imagens/Romance/titanic.jpg"
        },
        {
            "src":  "../imagens/Romance/questãoDeTempo.jpg"
        },
        {
            "src":  "../imagens/Romance/after.jpg"
        },
        {
            "src":  "../imagens/Romance/umAmorParaRecordar.jpg"
        },
        {
            "src":  "../imagens/Romance/porLugaresIncriveis.jpg"
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
            "src":  "../imagens/Romance/comoEuEra.jpg"
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
            "src":  "../imagens/Animacao/toyStory.jpg"
        },
        {
            "src":  "../imagens/Comedia/minhaMaeEumaPeca.jpg"
        }
    ]

}
function inicia(){
    atualizou = 0;
    $("#maisFilmes").click(carregaFilmes);
    $("maisAvaliacoes").click(carregaFilmes);

    $("#aventura").click(function(){
        filtraFilmes('a', 'Animação');
    });

    $("#Romance").click(function(){
        filtraFilmes('r', 'Romance');
    });

    $("#Comedia").click(function(){
        filtraFilmes('c', 'Comédia');
    });
    $("#Comedia").click(function(){
        filtraFilmes('c', 'Comédia');
    });
    $("#todos").click(function(){
        filtraFilmes('t', 'Todos');
    });
}


function filtraFilmes(categoria, nomeCategoria){
    
    $('#dropdownMenuButton').text('Categoria: ' + nomeCategoria);
    $('#todos').css('visibility', 'visible');
    this.categoria = categoria;
    
    alteraFilmes(categoria, 0);
}

function alteraFilmes(categoria, pos){
    for(var i=0;i<4;i++, pos++){
        let img = '#img' + i;
        if(categoria == 'c'){
            $(img).prop('src', filmes.comedia[pos].src);
        }else if(categoria == 'a'){
            $(img).prop('src', filmes.animacao[pos].src);
        }else if(categoria == 'r'){
            $(img).prop('src', filmes.romance[pos].src);
        }else{
            $(img).prop('src', filmes.todos[pos].src);
        }
    }   
}

function carregaFilmes(){
    if(atualizou == 0){
        var pos = 4;
        atualizou++;
    }else if(atualizou == 1){
        var pos = 0;
        atualizou--;
    }

    if(categoria == 'c'){
        alteraFilmes(categoria, pos);
    }else if(categoria == 'a'){
        alteraFilmes(categoria, pos);
    }else if(categoria == 'r'){
        alteraFilmes(categoria, pos);
    }else{
        alteraFilmes(categoria, pos);
    }
}


/* window.addEventListener("load", inicia);
        
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
} */