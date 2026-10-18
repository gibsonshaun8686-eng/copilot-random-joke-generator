const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const JOKE_API =
  process.env.JOKE_API ||
  'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

app.get('/api/joke', async (req, res) => {
  try {
    const response = await fetch(JOKE_API);
    if (!response.ok) {
      return res.status(502).json({
        error: 'Upstream joke API error',
        status: response.status
      });
    }

    const data = await response.json();

    let jokeText;
    if (data.type === 'single') {
      jokeText = data.joke;
    } else if (data.type === 'twopart') {
      jokeText = `${data.setup}\n\n${data.delivery}`;
    } else {
      jokeText = JSON.stringify(data);
    }

    res.json({
      joke: jokeText,
      category: data.category ?? 'Unknown',
      id: data.id ?? null,
      source: 'https://v2.jokeapi.dev'
    });
  } catch (err) {
    console.error('Error fetching joke:', err);
    res.status(500).json({
      error: 'Server error',
      details: err.message
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Joke generator running at http://localhost:${PORT}`);
});
