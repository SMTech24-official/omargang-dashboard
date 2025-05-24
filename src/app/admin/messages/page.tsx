"use client";

import { useEffect, useRef, useState } from "react";

export default function MessagePage() {
  const [conversations] = useState([
    { id: 1, name: "John Doe", lastMessage: "See you soon!", online: true },
    { id: 2, name: "Jane Smith", lastMessage: "Thanks!", online: false },
    {
      id: 3,
      name: "Support Bot",
      lastMessage: "How can I assist?",
      online: true,
    },
  ]);
  const [activeConversation, setActiveConversation] = useState(
    conversations[0]
  );
  const [messages, setMessages] = useState([
    { id: 1, sender: "me", text: "Hello! How can I help you today?" },
    { id: 2, sender: "other", text: "Hi! I have a question about my account." },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now(), sender: "me", text: newMessage },
    ]);
    setNewMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-[calc(100vh-80px)] p-6 bg-gray-100">
      <div className="flex h-full max-w-6xl mx-auto rounded-3xl shadow-2xl overflow-hidden">
        {/* Sidebar */}
        <aside className="w-1/3 bg-white overflow-y-auto shadow-md rounded-l-3xl">
          <div className="p-5 py-7 text-xl font-bold text-gray-700 border-b border-gray-100">
            Conversations
          </div>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveConversation(conv)}
              className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${
                activeConversation.id === conv.id
                  ? "bg-green-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <img
                src="/user-avatar.png"
                alt="User"
                className="w-10 h-10 rounded-full object-cover shadow-sm"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{conv.name}</p>
                <p className="text-sm text-gray-500 truncate">
                  {conv.lastMessage}
                </p>
              </div>
              {conv.online && (
                <div className="w-2 h-2 rounded-full bg-green-500" />
              )}
            </div>
          ))}
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col bg-white rounded-r-3xl">
          {/* Header */}
          <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white shadow-sm rounded-tr-3xl">
            <img
              src="/user-avatar.png"
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
            <div>
              <p className="font-semibold text-lg">{activeConversation.name}</p>
              <span className="text-sm opacity-90">
                {activeConversation.online ? "Online" : "Offline"}
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow ${
                    msg.sender === "me"
                      ? "bg-green-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 bg-white flex items-center gap-3">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow transition duration-200"
            >
              Send
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
