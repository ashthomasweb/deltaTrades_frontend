// src/hooks/useWebSocket.ts
import { useEffect, useRef, useState } from "react";

export const useWebSocket = (url: string) => {
	const socket = useRef<WebSocket | null>(null);
	const [isConnected, setIsConnected] = useState(false);
	const [messages, setMessages] = useState<any[]>([]);

	useEffect(() => {
		socket.current = new WebSocket(url);

		socket.current.onopen = () => {
			setIsConnected(true);
			console.log("WebSocket connected");
			console.log(socket.current);
			setTimeout(() => {
				socket.current?.send(JSON.stringify({ type: "getHistorical" }));
			}, 1500);
		};

		socket.current.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);
				setMessages((prev) => [...prev, data]);
			} catch (err) {
				console.error("WebSocket message parse error", err);
			}
		};

		socket.current.onclose = () => {
			setIsConnected(false);
			console.log("WebSocket disconnected");
		};

		return () => {
			socket.current?.close();
		};
	}, [url]);

	return { isConnected, messages };
};
