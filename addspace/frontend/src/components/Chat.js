import React, { useState } from 'react';
import axios from 'axios';
import './Chat.css';

const Chat = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post(
              'https://api.openai.com/v1/completions',
              {
                model: "text-davinci-003", // Or whichever model you're using
                prompt: prompt,
                temperature: 0.5,
                max_tokens: 100,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer YOUR_API_KEY_HERE`, // Replace YOUR_API_KEY_HERE with your actual API key
                }
              }
            );

            setResponse(result.data.choices[0].text);
        } 
        catch (error) {
            console.error('Error fetching the data from OpenAI:', error);
            setResponse('Failed to fetch response from OpenAI.');
        }
    };

    return(
        <div className="chat-component">
            <form onSubmit={handleSubmit} className="chat-form">
                <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="prompt-input"
                placeholder="Enter your prompt"
                ></textarea>
                <button type="submit" className="submit-button">Submit</button>
            </form>
            <div className="response">{response}</div>
        </div>
    );
};

export default Chat;