async function buscarResultado(event){
    event.preventDefault(); 

    let text = tratarDados();
    try{
        let resposta = await fetch('http://fake-news-api-env.eba-mtctpdyg.us-east-2.elasticbeanstalk.com/predict', {
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
        console.log("Resposta da API:", result);

        // Se a API retorna só 0 ou 1:
        if (result === 1) {
            alert("✅ Provavelmente verdadeira");
        } else {
            alert("❌ Provavelmente falsa");
        }
    } catch(err) {
        console.error("Erro:", err);
    }
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

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY; // quanto rolou
  const windowHeight = window.innerHeight; // altura da tela
  const documentHeight = document.documentElement.scrollHeight; // altura total


  // Exemplo: desabilitar botão ao chegar no fim
  const button = document.getElementById("scrollspy");
  if (scrollTop < documentHeight/10) {
    button.style.animation = 'none';
    button.style.opacity = 0
  } else {
    button.style.animation = 'comeDown 0.8s ease-in-out forwards'
    button.style.opacity = 100
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