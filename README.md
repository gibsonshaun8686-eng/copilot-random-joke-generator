# Random Joke Generator

A simple Node.js + Express app that fetches a random joke from an external API and displays it in a small web UI.

## Prerequisites
- Node.js 18+
- npm

## Install
```bash
npm install
```

## Run
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

## Notes
This app uses the JokeAPI:
```text
https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit
```

It avoids some offensive categories by default and normalizes both single and two-part jokes.
