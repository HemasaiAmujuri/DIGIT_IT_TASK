const express = require("express");

const router = express.Router();

const {
    register,
    login
} = require("../controllers/authController/authController");


const { askQuestion } = require("../controllers/llmIntegration/llmIntegration");

router.post("/user/register", register);
router.post("/user/login", login);
router.post("/llm/ask-question", askQuestion);

module.exports = router;