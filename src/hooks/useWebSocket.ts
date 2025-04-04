
import { useEffect, useRef, useState } from 'react';
import webSocketClient from '../utils/webSocketClient';

interface UseWebSocketOptions {
  autoConnect?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Event) => void;
}

interface WebSocketSubscription {
  eventType: string;
  handler: (data: any) => void;
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const subscriptionsRef = useRef<WebSocketSubscription[]>([]);
  const unsubscribeFunctionsRef = useRef<(() => void)[]>([]);
  
  // Auto-connect if specified
  useEffect(() => {
    if (options.autoConnect !== false) {
      connect();
    }
    
    return () => {
      // Cleanup subscriptions on unmount
      unsubscribeAll();
    };
  }, []);
  
  const connect = () => {
    // Setup connection event handlers
    const connectUnsubscribe = webSocketClient.onConnect(() => {
      setIsConnected(true);
      if (options.onConnect) options.onConnect();
    });
    
    const disconnectUnsubscribe = webSocketClient.onDisconnect(() => {
      setIsConnected(false);
      if (options.onDisconnect) options.onDisconnect();
    });
    
    const errorUnsubscribe = webSocketClient.onError((error) => {
      if (options.onError) options.onError(error);
    });
    
    // Store unsubscribe functions
    unsubscribeFunctionsRef.current.push(
      connectUnsubscribe,
      disconnectUnsubscribe,
      errorUnsubscribe
    );
    
    // Connect to WebSocket
    webSocketClient.connect();
    
    // Re-subscribe to any existing subscriptions
    subscriptionsRef.current.forEach(({ eventType, handler }) => {
      const unsubscribe = webSocketClient.on(eventType, handler);
      unsubscribeFunctionsRef.current.push(unsubscribe);
    });
  };
  
  const disconnect = () => {
    webSocketClient.disconnect();
    unsubscribeAll();
  };
  
  const subscribe = <T>(eventType: string, handler: (data: T) => void) => {
    // Store subscription for reconnect
    subscriptionsRef.current.push({ eventType, handler });
    
    // Subscribe to event
    const unsubscribe = webSocketClient.on(eventType, handler);
    unsubscribeFunctionsRef.current.push(unsubscribe);
    
    // Return unsubscribe function
    return () => {
      unsubscribe();
      subscriptionsRef.current = subscriptionsRef.current.filter(
        sub => !(sub.eventType === eventType && sub.handler === handler)
      );
      unsubscribeFunctionsRef.current = unsubscribeFunctionsRef.current.filter(fn => fn !== unsubscribe);
    };
  };
  
  const send = (data: any) => {
    webSocketClient.send(data);
  };
  
  const unsubscribeAll = () => {
    // Call all unsubscribe functions
    unsubscribeFunctionsRef.current.forEach(fn => fn());
    unsubscribeFunctionsRef.current = [];
  };
  
  return {
    isConnected,
    connect,
    disconnect,
    subscribe,
    send
  };
}
