let apiKey="AIzaSyD_0ER7-J4Qb1XzqWAKDXrBLv_jPio9x6c";

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", 
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 22,
    responseMimeType: "text/plain",
};

async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        history: [   
        ],
    });

    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
}

export default run;


