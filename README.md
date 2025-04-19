# ESP32 ChatGPT API

Ce projet permet de connecter un ESP32 à une API basée sur OpenAI ChatGPT pour obtenir des réponses via un serveur déployé sur Vercel.

## Prérequis

Avant de commencer, assure-toi d'avoir les éléments suivants :

- Un compte [GitHub](https://github.com)
- Un compte [Vercel](https://vercel.com)
- Une clé API OpenAI (obtenable sur [OpenAI](https://platform.openai.com/account/api-keys))
- Node.js 14.x ou version supérieure installé sur ton ordinateur (si tu veux tester localement avant le déploiement).

## Configuration du projet

### Étape 1 : Créer le dépôt GitHub

1. Crée un nouveau dépôt GitHub. Par exemple, `esp32-chatgpt`.
2. Télécharge le code source dans ce dépôt. 

### Étape 2 : Variables d'environnement

Pour utiliser l'API OpenAI, tu dois définir ta clé API dans ton environnement :

1. Va sur [Vercel](https://vercel.com).
2. Crée un nouveau projet en connectant ton dépôt GitHub.
3. Dans les paramètres de ton projet Vercel, va dans **Environment Variables**.
4. Ajoute une nouvelle variable d'environnement nommée `OPENAI_API_KEY` et assigne-y ta clé API OpenAI.

### Étape 3 : Code de l'API

Le code principal de l'API est dans le fichier `index.js`. Voici comment il fonctionne :

```javascript
// index.js

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const prompt = req.query.prompt;

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });

      const response = completion.data.choices[0].message.content;
      res.status(200).json({ response: response });
    } catch (error) {
      res.status(500).json({ error: "Error contacting OpenAI API" });
    }
  } else {
    res.status(404).send("Only GET method is supported.");
  }
};
