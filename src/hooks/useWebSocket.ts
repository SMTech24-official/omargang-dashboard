// Inside useWebSocket.ts
import { useEffect, useRef, useState, useCallback } from "react";

export default function useWebSocket(
  url: string,
  onMessage: (data: any) => void
) {
  const socketRef = useRef<WebSocket | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!url) return;

    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => setIsReady(true);

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error("Invalid message format", event.data);
      }
    };

    socket.onerror = (err) => console.error("WebSocket error:", err);

    socket.onclose = () => setIsReady(false);

    return () => socket.close();
  }, [url]);

  const sendMessage = useCallback((message: object) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket not ready");
    }
  }, []);

  return { sendMessage: isReady ? sendMessage : undefined };
}
