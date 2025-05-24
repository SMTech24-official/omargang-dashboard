"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Cookies from "js-cookie";
import useWebSocket from "@/hooks/useWebSocket";

export default function MessagePage() {
  const base_Url = "https://api.barakadish.com";

  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConversation, setActiveConversation] = useState<any | null>(
    null
  );
  const [messages, setMessages] = useState<Map<string, any[]>>(new Map());
  const [newMessage, setNewMessage] = useState("");
  const [chatroomId, setChatroomId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const token = useMemo(() => Cookies.get("accessToken") || null, []);
  const receiverId = activeConversation?.participants?.userId;

  const handleIncomingMessage = useCallback((data: any) => {
    switch (data.type) {
      case "authSuccess":
        break;
      case "joinPrivateChat":
        setChatroomId(data.chatroomId);
        break;
      case "receivePrivateMessage": {
        const senderId = data.senderId;
        setMessages((prev) => {
          const updated = new Map(prev);
          const existing = updated.get(senderId) || [];
          updated.set(senderId, [
            ...existing,
            { id: Date.now(), sender: "other", text: data.content },
          ]);
          return updated;
        });
        break;
      }
      case "conversationList":
        setConversations(data?.conversationList?.result || []);
        break;
      default:
        console.warn("Unknown message type:", data);
    }
  }, []);

  const { sendMessage: sendToSocket } = useWebSocket(
    token ? `wss://api.barakadish.com?token=${token}` : "",
    handleIncomingMessage
  );

  // Initial join
  useEffect(() => {
    if (token && sendToSocket) {
      sendToSocket({ type: "joinApp" });
      sendToSocket({ type: "conversationList" });
    }
  }, [token, sendToSocket]);

  // Join specific chat
  useEffect(() => {
    if (receiverId && sendToSocket) {
      sendToSocket({ type: "joinPrivateChat", user2Id: receiverId });
    }
  }, [receiverId, sendToSocket]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, receiverId]);

  const sendMessage = () => {
    if (!newMessage.trim() || !receiverId) return;

    const message = { id: Date.now(), sender: "me", text: newMessage };

    // Optimistically update messages in UI
    setMessages((prev) => {
      const updated = new Map(prev);
      const existing = updated.get(receiverId) || [];
      updated.set(receiverId, [...existing, message]);
      return updated;
    });

    // Send private message via WebSocket
    sendToSocket?.({
      type: "sendPrivateMessage",
      receiverId,
      content: newMessage,
    });

    // Request updated conversation list immediately after sending a message
    sendToSocket?.({
      type: "conversationList",
    });

    // Clear input box
    setNewMessage("");
  };

  const currentMessages = useMemo(
    () => messages.get(receiverId) || [],
    [messages, receiverId]
  );

  return (
    <div className="h-[calc(100vh-80px)] p-6">
      <div className="flex h-full max-w-6xl mx-auto rounded-3xl shadow-2xl overflow-hidden">
        {/* Sidebar */}
        <aside className="w-1/3 bg-white overflow-y-auto shadow-md rounded-l-2xl">
          <div className="p-5 py-7 flex items-center justify-between text-xl font-bold text-gray-700 border-b border-gray-100">
            <span>Conversations</span>
            <button
              onClick={() =>
                sendToSocket?.({
                  type: "joinPrivateChat",
                  user2Id: "67de4b5db3d0bda15b780ca4",
                })
              }
              className="text-sm bg-green-500 text-white px-3 py-1 rounded-md shadow hover:bg-green-600 transition"
            >
              Support
            </button>
          </div>
          {conversations.map((conv) => (
            <div
              key={conv.conversationId}
              onClick={() => setActiveConversation(conv)}
              className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${
                activeConversation?.conversationId === conv.conversationId
                  ? "bg-green-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <img
                src={conv.participants?.avater || "/user-avatar.png"}
                alt="User"
                className="w-10 h-10 rounded-full object-cover shadow-sm"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  {conv.participants?.username || "Unknown"}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {conv.lastMessage}
                </p>
              </div>
              <div className="text-xs text-gray-400">{conv.unseen || 0}</div>
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
              <p className="font-semibold text-lg">
                {activeConversation?.participants?.username || "Select a chat"}
              </p>
              <span className="text-sm opacity-90">
                Chatroom: {chatroomId || "--"}
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50">
            {currentMessages.map((msg) => (
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
