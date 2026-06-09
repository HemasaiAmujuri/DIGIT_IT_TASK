const express = require("express");

const axios = require("axios");

const askQuestion = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                success: false,
                message: "Question is required"
            });
        }

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "meta-llama/llama-3.3-8b-instruct:free",
                messages: [
                    {
                        role: "user",
                        content: question
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const answer = response.data.choices[0].message.content;

        return res.status(200).json({
            success: true,
            question,
            answer
        });

    } catch (error) {
        console.error(error.response?.data || error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to get response from LLM"
        });
    }
};

module.exports = {
    askQuestion
};