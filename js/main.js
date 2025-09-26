//Carrega os elementos DOM

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
let contatoMenu = document.getElementById("contatoMenu")
let inputMenu = document.getElementById('analisarMenu')
let sobreMenu = document.getElementById('sobreMenu')
let menu = document.getElementById('menu')
let menuBtn = document.getElementById('menubtn')
let historico_item1 = document.getElementById('historico_item1')
let historico_item2 = document.getElementById('historico_item2')
let historico_item3 = document.getElementById('historico_item3')
let historico_item1_true = document.getElementById('historico_item1_true')
let historico_item2_true = document.getElementById('historico_item2_true')
let historico_item3_true = document.getElementById('historico_item3_true')
let historico_item1_fake = document.getElementById('historico_item1_fake')
let historico_item2_fake = document.getElementById('historico_item2_fake')
let historico_item3_fake = document.getElementById('historico_item3_fake')


//carrega a mediaQuery para que possamos aplicar funcionalidades somente para mobile
let mediaQuerySmall = window.matchMedia("(max-width: 1024px)")

//carrega o histórico assim que a página carrega
let historico = pegarHistorico();
mostrar_historico(historico)

// chama a função para que o tamanho seja calculado assim que a página for carregada
definirTamanhoHistorico()

//faz a requisição para a API com o modelo de inteligência artificial
async function buscarResultado(event){
    event.preventDefault(); // previne que o submit recarregue a página

    let text = tratarDados(); // trata os dados dos inputs
    let title = document.getElementById('title');
    let corpo = document.getElementById('corpo');
    let portal = document.getElementById('portal');
    let date = document.getElementById("date");

    if (title.value.length == 0 || corpo.value.length == 0 || portal.value.length == 0 || date.value == 0){
      if (title.length == 0){
        title.style.border = '1px solid red'
      }
      if(corpo.length == 0){
        corpo.style.border = '1px solid red'
      }
      if (portal.length == 0){
        portal.style.border = '1px solid red'
      }
      if (date.length == 0){
        date.style.border = '1px solid red'
      }
      return
    }
    else{
    try{
        let resposta = await fetch('https://07tamcpefa.execute-api.us-east-2.amazonaws.com/predict', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });
        if (!resposta.ok){
            throw new Error("Erro na requisição: " + response.status);
        }
        let result = await resposta.json();
        console.log("Resposta da API:", result.prediction);
        result = result.prediction

        let titulo = retornaTituloNoticia()
        apagar_items(); // apaga os elementos antes que eles apareçam de novo. Assim habilitando o circularProgressBar
        salvarPesquisa({'title': titulo, 'true': result});
        let historico = pegarHistorico(); //chamamos a função de chamar o histórico novamente para que ele atualize a cada chamada 
        mostrar_historico(historico) 

        // A api retorna 1 para verdadeiro e 0 para falso
        if (result === 1) {
          //caso verdadeiro, deixamos o campo de resultado visível 
          resultado_place.style.display = 'flex';
          //e o icone de verdadeiro também
          true_icon.style.display = 'block'
          //remove o loader e mostra a resposta
          removerLoaderEMostrarResposta(result)
          // espera o gif do icone terminar e deixa visível só seu último frame
          setTimeout(() => {
            true_icon.style.display = 'none'
            true_lf.style.display = 'block'
          }, 2700)
        } else {
            //caso falso, deixamos o campo de resultado visível 
            resultado_place.style.display = 'flex';
            //e o icone de falso também
            false_icon.style.display = 'block'
            //remove o loader e mostra a resposta
            removerLoaderEMostrarResposta(result)
            // espera o gif do icone terminar e deixa visível só seu último frame
          setTimeout(() => {
            false_icon.style.display = 'none'
            false_lf.style.display = 'block'
          }, 2700)
        }
    } catch(err) {
        console.error("Erro:", err);
    }
  }
}

// mostra o card com a resposta
function mostrar_card(resposta){
  resposta_card.style.display = 'flex'
  resposta_card.style.border = '1em solid rgba(255, 255, 255, 0.136)'
  if(resposta == 1){
    // se a resposta for verdadeira, usa a cor verde
    resposta_card.style.backgroundColor = 'rgba(31, 165, 31)';
  } else{
    // se for falsa, vermelho
    resposta_card.style.backgroundColor = 'rgba(230, 47, 47)';
    
  }
}

// define o texto de cada resposta
function mostrar_resultado(resposta){
  if (resposta == 1){
    text_result.innerText = 'Provavelmente Verdadeira'
  } else{
    text_result.innerText = 'Provavelmente Falsa'
  }
}

// mostra a imagem do robô
function mostrar_robot(resposta){
  robotBg.style.display = 'flex';
  if(resposta == 1){
    // se a resposta for verdadeira, usa a cor verde
    robotBg.style.backgroundColor = 'rgba(31, 165, 31)';
     robot.style.display = 'block';
  } else{
    // se for false, a cor vermelha
     robotBg.style.backgroundColor = 'rgba(230, 47, 47)'
    robotFn.style.display = 'block';
  }

}

// apaga a lista de items para recarregar
function apagar_items(){
      itens = [true_icon, false_icon, true_lf, false_lf, resposta_card, robotBg, disclaimer]
      itens.map((el) => {
        el.style.display = 'none';
      })
      loading.style.display = 'flex'
}

// vai para um elemento específico com o scroll
function irParaElemento(el){
    el.scrollIntoView({'behavior': 'smooth', 'block': 'center'});
}

// remove o loader mostra a resposta e o badge
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


// trata os inputs e retorna um texto no formado que a API usa
function tratarDados(){
    // pega os elementos DOM
    let title = document.getElementById('title').value;
    let corpo = document.getElementById('corpo').value;
    let portal = document.getElementById('portal').value;
    let date = document.getElementById("date");

    //transforma a data no modelo utilizado pela API
    let dataSelecionada = new Date(date.value);
    let nomeMesAbrev = dataSelecionada.toLocaleString('pt-BR', { month: 'short' });
    nomeMesAbrev = nomeMesAbrev.charAt(0).toLocaleUpperCase() + nomeMesAbrev.slice(1, -1);
    date = nomeMesAbrev + ' ' + dataSelecionada.getDay() + ', ' + dataSelecionada.getFullYear(); 

    title = title.trim();
    corpo = corpo.trim();
    portal = portal.trim();

    //retorna o texto no modelo que a API usa
    let finalText = title + ' ' + corpo + ' ' + portal + ' ' + date;
    return finalText;
}

function retornaTituloNoticia(){
  let title = document.getElementById('title').value;
  return title;
}

// retorna para o topo da página
function goTotop(){
    let inicio = document.getElementById("inicio")
    inicio.scrollIntoView({'behavior': 'smooth', 'block': 'start'})
}

// pega o elemento do scrollspy
const button = document.getElementById("scrollspy");

// esconde o botão só quando a animação "comeUp" terminar
button.addEventListener("animationend", (e) => {
  if (e.animationName === "comeUp") {
    button.style.opacity = "0";
    button.style.pointerEvents = "none";
  }
});

// mostra o scrollspy somente quando o scroll da página está em uma certa altura
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollTop < documentHeight / 10) {
    button.style.animation = "comeUp 0.8s ease-in-out forwards";
  } else {
    button.style.pointerEvents = "all"; // garante que aparece antes
    mediaQuerySmall.matches ? button.style.animation = "comeDownTransparent 0.8s ease-in-out forwards"  : button.style.animation = "comeDown 0.8s ease-in-out forwards";
  }
});


// cria um observer para observar os card e iluminar os botões da navbar
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    let isSmall = mediaQuerySmall.matches;

    if (entry.isIntersecting) {
      if (entry.target.id === 'input') {
        (isSmall ? inputMenu : inputNav).style.transform = 'scale(1.1)';
        (isSmall ? inputMenu : inputNav).style.color = '#ffffff';
        (isSmall ? inputMenu : inputNav).style.filter = 'drop-shadow(0px 0px 5px #10edfdb8)';

        input.style.opacity = '1';
        input.style.animation ='appear forwards ease-in-out 400ms'
      } 
      else if (entry.target.id === 'sobre') {
        (isSmall ? sobreMenu : sobreNav).style.transform = 'scale(1.1)';
        (isSmall ? sobreMenu : sobreNav).style.color = '#ffffff';
        (isSmall ? sobreMenu : sobreNav).style.filter = 'drop-shadow(0px 0px 5px #10edfdb8)';

        sobre.style.opacity = '1';
        sobre.style.animation = 'appear forwards ease-in-out 400ms' 
      } 
      else if (entry.target.id === 'contato'){
        (isSmall ? contatoMenu : contatoNav).style.transform = 'scale(1.1)';
        (isSmall ? contatoMenu : contatoNav).style.color = '#ffffff';
        (isSmall ? contatoMenu : contatoNav).style.filter = 'drop-shadow(0px 0px 5px #10edfdb8)';

        contato.style.opacity = '1';
        contato.style.animation = 'appear forwards ease-in-out 400ms'
      }
      else{
        entry.target.style.opacity = '0';
        entry.target.style.animation = 'appear forwards ease-in-out 400ms'
      }
    } else {
      if (entry.target.id === 'input') {
        (isSmall ? inputMenu : inputNav).style.transform = 'scale(1.0)';
        (isSmall ? inputMenu : inputNav).style.color = '#10EFFD';
        (isSmall ? inputMenu : inputNav).style.filter = 'none';

        input.style.opacity = '0';
        input.style.animation = 'none';
      } 
      else if (entry.target.id === 'sobre') {
        (isSmall ? sobreMenu : sobreNav).style.transform = 'scale(1.0)';
        (isSmall ? sobreMenu : sobreNav).style.color = '#10EFFD';
        (isSmall ? sobreMenu : sobreNav).style.filter = 'none';

        sobre.style.opacity = '0';
        sobre.style.animation = 'none';
      } 
      else if (entry.target.id === 'contato'){
        (isSmall ? contatoMenu : contatoNav).style.transform = 'scale(1.0)';
        (isSmall ? contatoMenu : contatoNav).style.color = '#10EFFD';
        (isSmall ? contatoMenu : contatoNav).style.filter = 'none';

        contato.style.opacity = '0';
        contato.style.animation = 'none';
      }
      else{
        entry.target.style.opacity = '0';
        entry.target.style.animation = 'none'
      }

    }
  });
}, { threshold: mediaQuerySmall?0.1: 0.5 });

// observa o input, sobre e o contato
observer.observe(input)
observer.observe(sobre)
observer.observe(contato)
observer.observe(history)
observer.observe(resultado_place)


// salva a última noticía mandada para a API
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


// pega o histórico salvo no localStorage
function pegarHistorico() {
    // Retorna para 
  return JSON.parse(localStorage.getItem('historicoPesquisas')) || [];
}

// Define o tamanho do histórico com base no histórico salvo
function definirTamanhoHistorico(){
  historico = pegarHistorico();
  // se o histórico estiver vázio, o card de histórico some e dá espaço ao de input
  if (historico.length == 0){
    input.style.flexBasis = '100%'
    input.style.marginRight = '1em'
    history.style.display = 'none'
  } else{
    // caso contrário, ele aparece e divide espaço com o input
    input.style.flexBasis = '70%'
    input.style.marginRight = '0'
    history.style.display = 'flex'
  }
}



// mostra o histórico baseado no tamanho do histórico salvo, além de verificar se o item do histórico é verdadeiro ou falso
function mostrar_historico(historico){

  // mostra os ícones de acordo com o tamanho do histórico
  if(historico.length == 3){
    // se o histórico for ígual à 3, mostra os 3
    historico_item1.style.display = 'block'
    historico_item2.style.display = 'block'
    historico_item3.style.display = 'block'
  } else if(historico.length == 2){
     // se o histórico for ígual à 2, mostra 2
    historico_item1.style.display = 'block'
    historico_item2.style.display = 'block'
    historico_item3.style.display = 'none'
  } else if(historico.length == 1){
     // se o histórico for ígual à 1, mostra 1
    historico_item1.style.display = 'block'
    historico_item2.style.display = 'none'
    historico_item3.style.display = 'none'
  }
  else{
     // se o histórico for ígual à 0, não mostra nenhum
    historico_item1.style.display = 'none'
    historico_item2.style.display = 'none'
    historico_item3.style.display = 'none'
  }

  // a cada elemento, mostra o título e o badge de verdadeiro ou falso
  for (let c = 0; c < historico.length; c++){
    if (c == 0){
      // mostra o title do elemento 1
      title = historico_item1.querySelector('.side_history-title')
      title.innerText = historico[c].title;
      border = historico_item1.querySelector('.badge')

      if(historico[c].true){
        // se for verdadeiro, usa o fundo verde e mostra a imagem de verdadeiro
        historico_item1_fake.style.display = 'none';
        historico_item1_true.style.display = 'block';
        border.style.backgroundColor = 'rgba(31, 165, 31)'
      } else{
        // se for falso, usa o fundo vermelho e mostra a imagem de falso
         historico_item1_fake.style.display = 'block';
        historico_item1_true.style.display = 'none';
        border.style.backgroundColor = 'rgba(230, 47, 47)'
      }
    }
    else if(c == 1){
      // mostra o title do elemento 2
      title = historico_item2.querySelector('.side_history-title')
      title.innerText = historico[c].title;
      border = historico_item2.querySelector('.badge')

      if(historico[c].true){
        // se for verdadeiro, usa o fundo verde e mostra a imagem de verdadeiro
        historico_item2_fake.style.display = 'none';
        historico_item2_true.style.display = 'block';
        border.style.backgroundColor = 'rgba(31, 165, 31)'

      } else{
        // se for falso, usa o fundo vermelho e mostra a imagem de falso
         historico_item2_fake.style.display = 'block';
        historico_item2_true.style.display = 'none';
        border.style.backgroundColor = 'rgba(230, 47, 47)'
      }
    }
    else{
      // mostra o title do elemento 3
      title = historico_item3.querySelector('.side_history-title')
      title.innerText = historico[c].title;
      border = historico_item3.querySelector('.badge')

      if(historico[c].true){
        // se for verdadeiro, usa o fundo verde e mostra a imagem de verdadeiro
        historico_item3_fake.style.display = 'none';
        historico_item3_true.style.display = 'block';
        border.style.backgroundColor = 'rgba(31, 165, 31)'
      } else{
        // se for falso, usa o fundo vermelho e mostra a imagem de falso
         historico_item3_fake.style.display = 'block';
        historico_item3_true.style.display = 'none';
        border.style.backgroundColor = 'rgba(230, 47, 47)'
      }
    }
  }
}


// vai para o elemento da navbar, ou seja, se clicarmos no 'sobre' ele vai para card sobre
function navbar_buttons(el){
  let element;
  if (el == 'sobre'){
    element = sobre
  } else if(el == 'analisar'){
    element = input
  } else{
    element = contato
  }
  if (el == 'analisar'){
  element.scrollIntoView({'behavior': 'smooth', 'block': 'end'});
  } else{
    element.scrollIntoView({'behavior': 'smooth', 'block': 'start'});
  }
}


//Função abre uma nova guia, baseado em um nome e o nome do site
function irParaSite(name, el){
  // se o name for 'bruno' abre os sites referentes ao bruno
  if (name == 'bruno'){
    // se o elemento for linkedin abre o linkedin do bruno
  if (el == 'linkedin'){
    window.open('https://www.linkedin.com/in/bruno-massuete-7a91b3234')
  } 
  // se o elemento for github abre o github do bruno
  else if(el == 'github'){
    window.open('https://github.com/malvesbruno')
  } 
  // se o elemento for portfólio abre o portfólio do bruno
  else{
    window.open('https://malvesbruno.github.io/NewPortifolio/')
  }} 
  // se o name for 'igor' abre os sites referentes ao igor
  else{
    // se o elemento for linkedin abre o linkedin do igor
    if (el == 'linkedin'){
    window.open('https://www.linkedin.com/in/igor-rocha-')
  } 
    //se o elemento for github abre o github do igor
  else if(el == 'github'){
    window.open('https://github.com/Igor-hrm')
  } 
  }
}

// mostra menu mobile
function showMenu(){
  // pega as imagens do elemento menuBtn
  let open = menuBtn.querySelector('#open');
  let close = menuBtn.querySelector('#close')
  console.log(open, close)

  //se o menu estiver aberto ele fecha
  if (menu.style.display == 'flex'){
    menu.style.display = 'none';
    menuBtn.style.backgroundColor = '#8096d188'
    open.style.display='block'
    close.style.display='none'
  } 
  // se tiver fechado, ele abre
  else{
    menu.style.display = 'flex';
    menuBtn.style.backgroundColor = '#131c34'
    close.style.display='block'
    open.style.display='none'
  }
}