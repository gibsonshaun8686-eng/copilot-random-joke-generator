# Random Joke Generator

A simple Node.js + Express app that fetches a random joke from an external API and displays it in a small web UI.

## Features
- Random jokes from JokeAPI
- Category filtering (`Any`, `Programming`, `Misc`, `Dark`, `Pun`, `Spooky`, `Christmas`)
- Auto-play mode for continuous jokes
- Simple, deployable web app

## Prerequisites
- Node.js 18+
- npm

## Install
```bash
npm install
```

## Run locally
```bash
npm start
```

Then open:
```text
http://localhost:3000
```

## Configuration
- `PORT`: change the server port (default: 3000)
- `JOKE_API`: override the upstream joke API URL if needed

## Deployment on Render
This repo includes a `render.yaml` config for easy deployment on Render.

1. Push the repo to GitHub.
2. Sign in to Render.
3. Import this repository as a Web Service.
4. Render should detect `render.yaml` and configure the app automatically.

## Notes
This app uses the JokeAPI:
```text
https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit
```

The app blocks offensive categories by default and normalizes both single and two-part jokes.
