# Fake News Detector

Um site interativo que permite aos usuários verificar a veracidade de notícias em tempo real, com histórico das últimas análises.

## 📌 Tecnologias utilizadas

- Frontend: HTML, CSS, JavaScript, Parcel (build tool)

- Backend/API: Python (FastAPI/Flask) hospedado no AWS Elastic Beanstalk

- Hospedagem de frontend: AWS S3 + CloudFront

- Gerenciamento de estado: localStorage (para histórico de pesquisas)

- Controle de versão e deploy: GitHub Actions (CI/CD para S3)

## 🚀 Funcionalidades

- Envia notícias para a API e recebe classificação verdadeira/falsa.

- Exibe o resultado com cores e ícones animados.

- Mantém um histórico das últimas 3 pesquisas.

### Responsivo para desktop e mobile.

- Menu e navegação animados, com scrollspy e transições suaves.

- Suporte a HTTPS via CloudFront.

## 🖥️ Como rodar localmente

### Clone o repositório:
```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

### Instale dependências:
```bash
npm install
```

### Rode o build local:
```bash
npx parcel index.html --dist-dir dist
```

### Abra dist/index.html no navegador ou use um servidor local:
```bash
npx serve dist
```
## ☁️ Deploy no AWS
###  Frontend
- Hospedado em S3 com CloudFront para HTTPS.

- Certificado SSL gerenciado pelo AWS Certificate Manager (ACM).

### Backend

- API hospedada no Elastic Beanstalk.

- Endpoint: http://fake-news-api-env.eba-mtctpdyg.us-east-2.elasticbeanstalk.com/predict

- Route com https do API Getaway

- Endpoint: https://07tamcpefa.execute-api.us-east-2.amazonaws.com/predict

## 📝 Estrutura de arquivos
```/src
  ├─ index.html
  ├─ css/
  |  ├─ blocks/ (arquivos scss)
  |  ├─ utils/ (arquivos mixins)
  |  └─ style.scss   
  └─ js/
      └─ main.js
/dist
  └─ (arquivos gerados pelo Parcel)
.github/workflows
  └─ deploy.yml  (GitHub Actions)
```
## ⚙️ Configuração do GitHub Actions

- O workflow faz o build do projeto e sincroniza com o bucket S3 automaticamente:
``` bash
name: Deploy to AWS S3

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npx parcel build index.html --dist-dir dist
      - uses: jakejarvis/s3-sync-action@master
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: nofake-frontend
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: us-east-2
          SOURCE_DIR: dist
```
## 📂 Histórico das pesquisas

- Utiliza localStorage para manter as últimas 3 análises.

### Cada item do histórico mostra:

- Título da notícia

- Status: Verdadeira (verde) ou Falsa (vermelho)

## 🛠️ Próximos passos / melhorias

Otimizar build e deploy via CI/CD avançado.

## 🔗 Links

Frontend (CloudFront HTTPS): https://<sua-distribuicao-cloudfront>.cloudfront.net

Backend API: http://fake-news-api-env.eba-mtctpdyg.us-east-2.elasticbeanstalk.com/predict

Portfólio: Bruno Massuete

- [Fake News ML Model](https://github.com/malvesbruno/fakeNews_ml)
 → treinamento do modelo

- [Fake News API](https://github.com/malvesbruno/fakeNews_API)
 → esta API

- [Fake News Frontend](https://github.com/malvesbruno/fakeNews_FrontEnd)
 → interface do usuário

