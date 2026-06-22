# 🎡 App Roleta Neon

## Visão Geral

Aplicativo de roleta interativa desenvolvido sob demanda para atender a um evento da **Neon**, rodando em um **totem físico touch de 42 polegadas**. A roleta é totalmente personalizável (cores, títulos e probabilidades de cada prêmio) e foi projetada como ferramenta de **captação de leads** durante o evento: o visitante preenche seus dados, gira a roleta e recebe um prêmio/cupom sorteado.

## Problema Resolvido

Em ativações de marca em eventos presenciais, é comum usar dinâmicas de sorteio para atrair o público e, ao mesmo tempo, capturar dados de contato de forma orgânica e divertida. No caso deste evento, havia um agravante: **não havia garantia de internet estável no local**, o que tornava arriscado depender de envio direto dos dados para um banco remoto a cada cadastro — uma queda de conexão durante o evento significaria perda de leads.

Para resolver isso, o app foi desenhado como **offline-first**: em vez de enviar os dados diretamente a um banco externo, cada cadastro é salvo localmente no próprio dispositivo (storage local via SQLite), garantindo que nenhum lead seja perdido independentemente da qualidade da conexão durante o evento. Os dados acumulados no totem podem então ser extraídos/sincronizados posteriormente.

Os desafios resolvidos foram:

- Capturar e persistir os leads **sem depender de internet**, evitando perda de dados em caso de instabilidade de rede no evento.
- Rodar de forma estável em um **totem grande, sempre ligado, em modo touch**.
- Capturar e validar dados do lead (nome, e-mail, telefone) antes de liberar o giro da roleta.
- Permitir que a probabilidade de cada prêmio seja configurável pela equipe de marketing, sem alterar código.
- Entregar uma experiência visual atrativa (animações, confete, som/feedback) que reforce a marca do evento.

## Solução Implementada

O app foi construído em **React Native (Expo)**, otimizado para rodar em tablets/totens grandes em modo touch, com persistência de dados **local** via SQLite — garantindo que os leads sejam capturados mesmo em conexões instáveis durante o evento.

Principais funcionalidades:

- **Formulário de Captação de Leads:** coleta de nome, e-mail e telefone, com validação via `email-validator` e máscara de input (`react-native-mask-input`) para garantir dados consistentes.
- **Roleta Personalizável:** renderizada com `react-native-pie`, permitindo configurar dinamicamente os segmentos (prêmios), cores e títulos, além do peso/probabilidade de cada fatia.
- **Persistência Local:** os dados capturados são armazenados em **SQLite** (`expo-sqlite`) gerenciado de forma reativa com **TinyBase**, permitindo que o app funcione de forma autônoma no totem e sincronize os leads posteriormente.
- **Feedback Visual de Prêmio:** animações com `react-native-reanimated` e `lottie-react-native`, além de efeito de confete (`react-native-confetti-cannon`) ao revelar o prêmio sorteado.
- **Navegação:** fluxo de telas (cadastro → roleta → resultado) gerenciado com `@react-navigation/native-stack`.
- **UI Responsiva para Tela Grande:** estilização com `twrnc` (Tailwind para React Native), pensada para a resolução e distância de visualização típicas de um totem de 42".

## Contexto de Uso

- **Dispositivo:** totem físico touch de 42 polegadas, instalado no espaço do evento.
- **Objetivo de negócio:** captação de leads qualificados durante a ativação da marca Neon, com experiência gamificada.
- **Operação:** app fica em execução contínua no totem durante todo o evento, acumulando os cadastros localmente.

## Stack Tecnológica

- **Framework:** [React Native](https://reactnative.dev/) `0.79` com [Expo](https://expo.dev/) `~53`
- **Navegação:** [React Navigation](https://reactnavigation.org/) (native-stack)
- **Banco de Dados Local:** [SQLite](https://www.sqlite.org/) via `expo-sqlite` + [TinyBase](https://tinybase.org/) (state reativo sincronizado com o banco)
- **Validação de Formulário:** `email-validator`, `react-native-mask-input`
- **Visualização da Roleta:** `react-native-pie`, `react-native-svg`
- **Animações e Feedback:** `react-native-reanimated`, `lottie-react-native`, `react-native-confetti-cannon`
- **Estilização:** `twrnc` (Tailwind CSS para React Native)
- **Ícones e Fontes:** `lucide-react-native`, `@expo-google-fonts/nunito`
- **Linguagem:** TypeScript

## Design e Experiência do Usuário

- **Pensado para tela grande e modo touch:** elementos com áreas de toque amplas, adequadas ao uso em totem de 42".
- **Identidade visual personalizável:** cores, títulos e prêmios da roleta configuráveis conforme a identidade do evento/marca.
- **Feedback de recompensa:** animações e confete reforçam a sensação de "ganhar", aumentando o engajamento do público no evento.

## Como Rodar o Projeto Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) `>=18`
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (via `npx`)
- App **Expo Go** no celular, ou emulador Android/iOS configurado

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/ElFabrica/app-roleta-neon.git
cd app-roleta-neon
```

### Passo 2: Instalar Dependências

```bash
npm install
```

### Passo 3: Executar o Projeto

```bash
npx expo start
```

- Para abrir direto no Android: `npm run android`
- Para abrir direto no iOS: `npm run ios`
- Para abrir no navegador (web): `npm run web`

## 🛠️ Scripts Disponíveis

- `npm start` — inicia o Expo (escolha a plataforma no menu interativo)
- `npm run android` — abre no emulador/dispositivo Android
- `npm run ios` — abre no simulador/dispositivo iOS
- `npm run web` — abre a versão web (via `react-native-web`)

## Resultados / Impacto

[Complete com dados concretos do evento, se possível — ex.: quantidade de leads capturados, duração do evento, taxa de conversão do formulário]
