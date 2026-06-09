import { useState } from "react";
import "../styles/llmstyle.css";

function LLMChat() {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!question.trim()) return;

        setLoading(true);
        setResponse("");

        try {
            const res = await fetch("http://localhost:3000/api/llm/ask-question", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question,
                    userId: localStorage.getItem("userId"), // Assuming token contains user ID or is used for authentication
                }),
            });

            const data = await res.json();

            // Update according to your API response
            setResponse(data?.data?.answer || "No answer received.") ;
        } catch (error) {
            console.error(error);
            setResponse("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="llm-chat-container">
            <div className="llm-chat-card">
                <h1 className="llm-chat-title">LLM Chat</h1>

                <textarea
                    className="llm-chat-input"
                    placeholder="Ask anything..."
                    rows="5"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />

                <button
                    className="llm-chat-button"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Submit"}
                </button>

                {response && (
                    <div className="llm-chat-response">
                        <h3>Response</h3>
                        <p>{response}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LLMChat;