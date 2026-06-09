const express = require("express");

const axios = require("axios");

const LlmInfo = require("../../models/llmInfo/llmInfo");

const askQuestion = async (req, res) => {
    try {
        const { question, userId } = req.body;

        if (!question && !userId) {
            return res.status(400).json({
                success: false,
                message: "Question and User ID are required"
            });
        }

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "nex-agi/nex-n2-pro:free",
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

        const llmInfo = new LlmInfo({
            question,
            answer,
            userId: userId
        });

        await llmInfo.save();

        return res.status(200).json({
            success: true,
            data: llmInfo,
            message: "Response from LLM saved successfully"
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