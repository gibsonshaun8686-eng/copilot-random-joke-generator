const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const validCategories = ['Any', 'Programming', 'Misc', 'Dark', 'Pun', 'Spooky', 'Christmas'];

const getJokeUrl = (category = 'Any') => {
  const safeCategory = validCategories.includes(category) ? category : 'Any';
  return `https://v2.jokeapi.dev/joke/${encodeURIComponent(safeCategory)}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`;
};

app.get('/api/joke', async (req, res) => {
  const requestedCategory = req.query.category || 'Any';

  if (!validCategories.includes(requestedCategory)) {
    return res.status(400).json({
      error: 'Invalid category',
      validCategories
    });
  }

  try {
    const jokeUrl = getJokeUrl(requestedCategory);
    const response = await fetch(jokeUrl);

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
      category: data.category ?? requestedCategory,
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
