const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,  // Remarque : Assure-toi que ta clé API OpenAI est dans les variables d'environnement
});

const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const prompt = req.query.prompt;

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",  // Remarque : Assure-toi d'utiliser un modèle valide
        messages: [{ role: "user", content: prompt }],
      });

      const response = completion.data.choices[0].message.content;
      res.status(200).json({ response: response });
    } catch (error) {
      res.status(500).json({ error: "Error connecting to OpenAI API" });
    }
  } else {
    res.status(404).send("Only GET method is supported.");
  }
};
