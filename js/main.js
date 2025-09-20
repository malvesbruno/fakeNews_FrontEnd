
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
let text_result = document.getElementById("text_result")
let disclaimer = document.getElementById("disclaimer")
let history = document.getElementById('history')
let contato = document.getElementById("contato")
let input = document.getElementById('input')
let sobre = document.getElementById('sobre')
let contatoNav = document.getElementById("contatoNav")
let inputNav = document.getElementById('analisarNav')
let sobreNav = document.getElementById('sobreNav')


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


        let result = 1;
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


function mostrar_card(resposta){
  resposta_card.style.display = 'flex'
  resposta_card.style.border = '1em solid rgba(255, 255, 255, 0.136)'
  if(resposta == 1){
    resposta_card.style.backgroundColor = 'rgba(31, 165, 31)';
  } else{
    resposta_card.style.backgroundColor = 'rgba(230, 47, 47)';
    
  }
}

function mostrar_resultado(resposta){
  if (resposta == 1){
    text_result.innerText = 'Provavelmente Verdadeira'
  } else{
    text_result.innerText = 'Provavelmente Falsa'
  }
}

function mostrar_robot(resposta){
  robotBg.style.display = 'flex';
  if(resposta == 1){
    robotBg.style.backgroundColor = 'rgba(31, 165, 31)';
     robot.style.display = 'block';
  } else{
     robotBg.style.backgroundColor = 'rgba(230, 47, 47)'
    robotFn.style.display = 'block';
  }

}

function apagar_items(){
      itens = [true_icon, false_icon, true_lf, false_lf, resposta_card, robotBg, disclaimer]
      itens.map((el) => {
        el.style.display = 'none';
      })
      loading.style.display = 'flex'
}

function irParaElemento(el){
    el.scrollIntoView({'behavior': 'smooth', 'block': 'center'});
}

function removerLoaderEMostrarResposta(result){
  irParaElemento(loading);
  setTimeout(()=>{
            loading.style.display = 'none'
            disclaimer.style.display = 'flex'
            mostrar_card(result)
            mostrar_robot(result)
            mostrar_resultado(result)
            irParaElemento(robot)
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
    inicio.scrollIntoView({'behavior': 'smooth', 'block': 'start'})
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

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting){
        if(entry.target.id == 'input'){
          inputNav.style.transform = 'scale(1.1)'
          inputNav.style.color = "#ffffff"
          inputNav.style.filter = "drop-shadow(0px 0px 5px #10edfdb8)"
        }
        else if (entry.target.id == 'sobre'){
          sobreNav.style.transform = 'scale(1.1)'
          sobreNav.style.color = "#ffffff"
          sobreNav.style.filter = "drop-shadow(0px 0px 5px #10edfdb8)"
        } else{
          contatoNav.style.transform = 'scale(1.1)'
          contatoNav.style.color = "#ffffff"
          contatoNav.style.filter = "drop-shadow(0px 0px 5px #10edfdb8)"
        }
      } else {
        if(entry.target.id == 'input'){
          inputNav.style.transform = 'scale(1.0)'
          inputNav.style.color = "#10EFFD"
          inputNav.style.filter = "none"
        }
        else if (entry.target.id == 'sobre'){
          sobreNav.style.transform = 'scale(1.0)'
          sobreNav.style.color = "#10EFFD"
          sobreNav.style.filter = "none"
        } else{
          contatoNav.style.transform = 'scale(1.0)'
          contatoNav.style.color = "#10EFFD"
          contatoNav.style.filter = "none"
      }
    }});
}, {threshold: 0.5})

observer.observe(input)
observer.observe(sobre)
observer.observe(contato)

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


function definirTamanhoHistorico(){
  historico = pegarHistorico();
  if (historico.length == 0){
    input.style.flexBasis = '100%'
    input.style.marginRight = '1em'
    history.style.display = 'none'
  } else{
    input.style.flexBasis = '70%'
    input.style.marginRight = '0'
    history.style.display = 'flex'
  }
}

definirTamanhoHistorico()

function navbar_buttons(el){
  let element;
  if (el == 'sobre'){
    element = sobre
  } else if(el == 'analisar'){
    element = input
  } else{
    element = contato
  }
  if (el == 'analisar' || el == 'contato'){
  element.scrollIntoView({'behavior': 'smooth', 'block': 'end'});
  } else{
    element.scrollIntoView({'behavior': 'smooth', 'block': 'start'});
  }
}

function irParaSite(el){
  if (el == 'linkedin'){
    window.open('https://www.linkedin.com/in/bruno-massuete-7a91b3234')
  } else if(el == 'github'){
    window.open('https://github.com/malvesbruno')
  } else{
    window.open('https://malvesbruno.github.io/NewPortifolio/')
  }
}