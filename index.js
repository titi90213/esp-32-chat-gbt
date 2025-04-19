// index.js

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,  // Correctement défini
});

const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const prompt = req.query.prompt;  // On récupère la variable 'prompt' de la requête GET

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",  // Correction du modèle
        messages: [{ role: "user", content: prompt }],  // Utilisation de 'prompt' à la place de 'invite'
      });

      const response = completion.data.choices[0].message.content;
      res.status(200).json({ response: response });  // Renvoi de la réponse en JSON
    } catch (error) {
      res.status(500).json({ error: "Error connecting to the OpenAI API" });  // Gestion de l'erreur
    }
  } else {
    res.status(404).send("Only GET method is supported.");  // Message d'erreur si méthode non supportée
  }
};
