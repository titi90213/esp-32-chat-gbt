const { Configuration, OpenAIApi } = require("openai");

// Configuration de l'API OpenAI avec ta clé API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  // Vérifier si la méthode de requête est GET
  if (req.method === 'GET') {
    const prompt = req.query.prompt;  // Récupérer le paramètre 'prompt' de la requête

    try {
      // Effectuer la requête à OpenAI pour obtenir une réponse
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",  // Utilisation du modèle GPT-3.5
        messages: [{ role: "user", content: prompt }],  // Contenu de la requête
      });

      const response = completion.data.choices[0].message.content;  // Récupérer la réponse de l'API
      res.status(200).json({ response: response });  // Renvoyer la réponse au client
    } catch (error) {
      // En cas d'erreur, renvoyer une erreur 500
      res.status(500).json({ error: "Error connecting to OpenAI API" });
    }
  } else {
    // Si la méthode n'est pas GET, renvoyer une erreur 404
    res.status(404).send("Only GET method is supported.");
  }
};
