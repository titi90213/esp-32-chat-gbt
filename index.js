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
      res.status(500).json({ error: "Erreur lors de la connexion à l'API OpenAI" });
    }
  } else {
    res.status(404).send("Seule la méthode GET est prise en charge.");
  }
};
