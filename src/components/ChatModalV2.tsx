import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import type { AIChatResponse } from "../lib/definitions";
import { sendAIQuestion } from "../lib/data";

export interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  timestamp?: string;
}

export interface ChatModalV2Props {
  open: boolean;
  onClose: () => void;
  // stockId: string | number;
  initialMessages?: ChatMessage[];
  onSend?: (question: string) => void;
}

const ChatModalV2: React.FC<ChatModalV2Props> = ({ open, onClose, initialMessages = [], onSend }) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AIChatResponse>();

  const handleSend = async () => {
    if (!question.trim()) return;
    const userMsg: ChatMessage = { sender: "user", text: question, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setError(null);
    if (onSend) onSend(question);
    try {
      const newItems = await sendAIQuestion(question);
      setData(newItems);
      // Assume newItems.answer or newItems.response contains the answer string
      const botText = newItems?.answer || newItems?.response || "No answer received.";
      const botMsg: ChatMessage = { sender: "bot", text: botText, timestamp: new Date().toISOString() };
      setMessages((prev) => [...prev, botMsg]);
      setQuestion("");
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/30">
      <div className="bg-white rounded-t-2xl shadow-lg w-full max-w-md m-4 p-4 flex flex-col" style={{ maxHeight: "80vh" }}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">Ask Stock AI</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl">×</button>
        </div>
        <div className="flex-1 overflow-y-auto mb-2 space-y-2 border rounded p-2 bg-gray-50" style={{ minHeight: 120, maxHeight: 300 }}>
          {messages.length === 0 && <div className="text-gray-400 text-sm">Ask anything about this stock.</div>}
          {messages.map((msg, i) => (
            <div key={i} className={`text-sm ${msg.sender === "user" ? "text-right" : "text-left"}`}>
              <span className={`inline-block px-3 py-2 rounded-lg ${msg.sender === "user" ? "bg-blue-100 text-blue-800 ml-auto" : "bg-gray-200 text-white"}`}>
                {msg.sender === "bot" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
                {msg.timestamp && (
                  <span className="block text-[10px] text-gray-400 mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                )}
              </span>
            </div>
          ))}
        </div>
        {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded px-3 py-2 text-sm text-black focus:outline-none focus:ring"
            placeholder="Type your question..."
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
            disabled={loading}
            autoFocus
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleSend}
            disabled={loading || !question.trim()}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModalV2;
