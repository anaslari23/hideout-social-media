
import { getAuthToken } from './authHelper';

type MessageHandler = (data: any) => void;
type ConnectionHandler = () => void;

// WebSocket client for real-time features
class WebSocketClient {
  private socket: WebSocket | null = null;
  private url: string;
  private messageHandlers: Map<string, Set<MessageHandler>> = new Map();
  private connectionHandlers: {
    onConnect: Set<ConnectionHandler>,
    onDisconnect: Set<ConnectionHandler>,
    onError: Set<(error: Event) => void>
  } = {
    onConnect: new Set(),
    onDisconnect: new Set(),
    onError: new Set()
  };
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectTimeout: number = 0;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private isManualClose: boolean = false;

  constructor(url: string) {
    this.url = url;
  }

  // Connect to the WebSocket server
  connect(): void {
    if (this.socket && (this.socket.readyState === WebSocket.CONNECTING || this.socket.readyState === WebSocket.OPEN)) {
      return;
    }

    // Get auth token for authentication
    const token = getAuthToken();
    const wsUrl = token ? `${this.url}?token=${token}` : this.url;

    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.connectionHandlers.onConnect.forEach(handler => handler());
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket disconnected', event);
      
      this.connectionHandlers.onDisconnect.forEach(handler => handler());
      
      // Attempt to reconnect unless manually closed
      if (!this.isManualClose) {
        this.attemptReconnect();
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.connectionHandlers.onError.forEach(handler => handler(error));
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const eventType = data.type;
        
        if (eventType && this.messageHandlers.has(eventType)) {
          this.messageHandlers.get(eventType)?.forEach(handler => handler(data));
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
  }

  // Disconnect from the WebSocket server
  disconnect(): void {
    this.isManualClose = true;
    
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  // Send a message to the WebSocket server
  send(data: any): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  // Subscribe to a specific message type
  on(eventType: string, handler: MessageHandler): () => void {
    if (!this.messageHandlers.has(eventType)) {
      this.messageHandlers.set(eventType, new Set());
    }
    
    this.messageHandlers.get(eventType)?.add(handler);
    
    // Return unsubscribe function
    return () => {
      this.messageHandlers.get(eventType)?.delete(handler);
    };
  }

  // Subscribe to connection events
  onConnect(handler: ConnectionHandler): () => void {
    this.connectionHandlers.onConnect.add(handler);
    return () => {
      this.connectionHandlers.onConnect.delete(handler);
    };
  }

  onDisconnect(handler: ConnectionHandler): () => void {
    this.connectionHandlers.onDisconnect.add(handler);
    return () => {
      this.connectionHandlers.onDisconnect.delete(handler);
    };
  }

  onError(handler: (error: Event) => void): () => void {
    this.connectionHandlers.onError.add(handler);
    return () => {
      this.connectionHandlers.onError.delete(handler);
    };
  }

  // Attempt to reconnect with exponential backoff
  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Max reconnect attempts reached');
      return;
    }
    
    this.reconnectAttempts++;
    
    // Exponential backoff with random jitter
    const timeout = Math.min(1000 * (2 ** this.reconnectAttempts) + Math.random() * 1000, 30000);
    
    console.log(`Attempting to reconnect in ${Math.round(timeout / 1000)}s (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
    
    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, timeout);
  }
}

// Create a singleton instance for the app
const WEBSOCKET_URL = 'wss://api.hideout.app/ws';
const webSocketClient = new WebSocketClient(WEBSOCKET_URL);

export default webSocketClient;
