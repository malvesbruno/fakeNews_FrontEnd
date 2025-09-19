
let resultado_place = document.getElementById('resultado');
let true_lf = document.getElementById('true_lf');
let false_lf = document.getElementById('false_lf')
let true_icon = document.getElementById('true');
let false_icon = document.getElementById('false');
let loading = document.getElementById('loading');
let resposta_card = document.getElementById('resposta_card');
let robotBg = document.getElementById('robotBg')
let robot = document.getElementById('robot')
let robotFn = document.getElementById('robotFn')


async function buscarResultado(event){
    event.preventDefault(); 

    let text = tratarDados();
    try{
        /* let resposta = await fetch('http://fake-news-api-env.eba-mtctpdyg.us-east-2.elasticbeanstalk.com/predict', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });
        if (!resposta.ok){
            throw new Error("Erro na requisição: " + response.status);
        }
        let result = resposta.json();
        console.log("Resposta da API:", result); */


        let result = 0;
        apagar_items();

        // Se a API retorna só 0 ou 1:
        if (result === 1) {
          resultado_place.style.display = 'flex';
          true_icon.style.display = 'block'
          removerLoaderEMostrarResposta(result)
          setTimeout(() => {
            true_icon.style.display = 'none'
            true_lf.style.display = 'block'
          }, 2700)
        } else {
            resultado_place.style.display = 'flex';
            false_icon.style.display = 'block'
            removerLoaderEMostrarResposta(result)
          setTimeout(() => {
            false_icon.style.display = 'none'
            false_lf.style.display = 'block'
          }, 2700)
        }
    } catch(err) {
        console.error("Erro:", err);
    }
}

function mostrar_robot(resposta){
  robotBg.style.display = 'flex';
  if(resposta == 1){
    robotBg.style.backgroundColor = 'green';
     robot.style.display = 'block';
    console.log(robot)
  } else{
     robotBg.style.backgroundColor = 'rgba(230, 47, 47, 0.905)'
    robotFn.style.display = 'block';
  }

}

function apagar_items(){
      itens = [true_icon, false_icon, true_lf, false_lf, resposta_card, robotBg]
      itens.map((el) => {
        el.style.display = 'none';
      })
      loading.style.display = 'flex'
}

function irParaAResposta(){
    loading.scrollIntoView({'behavior': 'smooth', 'block': 'start'});
}

function removerLoaderEMostrarResposta(result){
  irParaAResposta();
  setTimeout(()=>{
            loading.style.display = 'none'
            resposta_card.style.display = 'flex'
            mostrar_robot(result)
          }, 2000)

}

function tratarDados(){
    let title = document.getElementById('title').value;
    let corpo = document.getElementById('corpo').value;
    let portal = document.getElementById('portal').value;
    let date = document.getElementById("date");
    let dataSelecionada = new Date(date.value);
    let nomeMesAbrev = dataSelecionada.toLocaleString('pt-BR', { month: 'short' });
    nomeMesAbrev = nomeMesAbrev.charAt(0).toLocaleUpperCase() + nomeMesAbrev.slice(1, -1);
    date = nomeMesAbrev + ' ' + dataSelecionada.getDay() + ', ' + dataSelecionada.getFullYear(); 

    let finalText = title + ' ' + corpo + ' ' + portal + ' ' + date;
    return finalText;
}

function goTotop(){
    let inicio = document.getElementById("inicio")
    inicio.scrollIntoView({'behavior': 'smooth', 'block': 'end'})
}

const button = document.getElementById("scrollspy");

// esconde o botão só quando a animação "comeUp" terminar
button.addEventListener("animationend", (e) => {
  if (e.animationName === "comeUp") {
    button.style.opacity = "0";
    button.style.pointerEvents = "none";
  }
});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollTop < documentHeight / 10) {
    button.style.animation = "comeUp 0.8s ease-in-out forwards";
  } else {
    button.style.pointerEvents = "all"; // garante que aparece antes
    button.style.opacity = "1";
    button.style.animation = "comeDown 0.8s ease-in-out forwards";
  }
});


function salvarPesquisa(novaPesquisa) {
  // Pega o histórico atual do localStorage
  let historico = JSON.parse(localStorage.getItem('historicoPesquisas')) || [];

  // Adiciona a nova pesquisa no início do array
  historico.unshift(novaPesquisa);

  // Mantém apenas as 3 últimas pesquisas
  historico = historico.slice(0, 3);

  // Salva de volta no localStorage
  localStorage.setItem('historicoPesquisas', JSON.stringify(historico));
}

function pegarHistorico() {
    // Retorna para 
  return JSON.parse(localStorage.getItem('historicoPesquisas')) || [];
}