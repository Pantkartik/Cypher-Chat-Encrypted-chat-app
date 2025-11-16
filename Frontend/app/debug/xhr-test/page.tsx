'use client';

import { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function XHRTestPage() {
  const [status, setStatus] = useState('Initializing...');
  const [logs, setLogs] = useState<string[]>([]);
  const [socket, setSocket] = useState<any>(null);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';
    
    addLog(`Attempting connection to ${SOCKET_URL}`);
    setStatus('Connecting...');

    // Test 1: Basic polling connection
    const testConnection = () => {
      addLog('Creating Socket.IO connection with polling first...');
      
      const socketInstance = io(SOCKET_URL, {
        transports: ['polling', 'websocket'],
        timeout: 10000,
        reconnection: false,
        forceNew: true,
        path: '/socket.io/',
        withCredentials: true,
        // Reduce polling frequency to avoid rate limiting
        polling: {
          duration: 30000,
          timeout: 35000
        }
      });

      socketInstance.on('connect', () => {
        addLog(`✅ Connected successfully! ID: ${socketInstance.id}`);
        addLog(`Transport: ${socketInstance.io.engine.transport.name}`);
        setStatus('Connected');
        setSocket(socketInstance);
      });

      socketInstance.on('connect_error', (error) => {
        addLog(`❌ Connection error: ${error.message}`);
        addLog(`Error type: ${error.type}`);
        addLog(`Error description: ${error.description}`);
        
        if (error.message.includes('xhr poll error')) {
          addLog('XHR poll error detected - trying WebSocket-only connection...');
          testWebSocketOnly();
        } else {
          setStatus('Connection Failed');
        }
      });

      socketInstance.on('disconnect', (reason) => {
        addLog(`Disconnected: ${reason}`);
        setStatus('Disconnected');
      });
    };

    // Test 2: WebSocket-only connection as fallback
    const testWebSocketOnly = () => {
      addLog('Trying WebSocket-only connection...');
      setStatus('Trying WebSocket...');
      
      const wsSocket = io(SOCKET_URL, {
        transports: ['websocket'],
        timeout: 10000,
        reconnection: false,
        forceNew: true,
        path: '/socket.io/',
        withCredentials: true
      });

      wsSocket.on('connect', () => {
        addLog(`✅ WebSocket connected! ID: ${wsSocket.id}`);
        setStatus('Connected via WebSocket');
        setSocket(wsSocket);
      });

      wsSocket.on('connect_error', (error) => {
        addLog(`❌ WebSocket connection failed: ${error.message}`);
        setStatus('All connection methods failed');
      });
    };

    // Start connection test
    testConnection();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const testManualXHR = async () => {
    const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';
    addLog('Testing manual XHR request...');
    
    try {
      const response = await fetch(`${SOCKET_URL}/socket.io/?EIO=4&transport=polling`);
      addLog(`XHR Response status: ${response.status}`);
      addLog(`XHR Response ok: ${response.ok}`);
      
      if (response.ok) {
        const text = await response.text();
        addLog(`XHR Response data: ${text.substring(0, 100)}...`);
      } else {
        const errorText = await response.text();
        addLog(`XHR Error response: ${errorText}`);
      }
    } catch (error) {
      addLog(`XHR Fetch error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Socket.IO XHR Poll Error Debug</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <div className="flex items-center gap-4">
            <div className={`w-4 h-4 rounded-full ${
              status === 'Connected' || status === 'Connected via WebSocket' 
                ? 'bg-green-500' 
                : status === 'Connecting...' || status === 'Trying WebSocket...'
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}></div>
            <span className="text-lg">{status}</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Connection Logs</h2>
            <button 
              onClick={testManualXHR}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
            >
              Test Manual XHR
            </button>
          </div>
          <div className="bg-black rounded p-4 h-64 overflow-y-auto font-mono text-sm">
            {logs.map((log, index) => (
              <div key={index} className="mb-1">{log}</div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Troubleshooting Steps</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Check if backend server is running on port 3001</li>
            <li>Verify CORS settings allow connections from localhost:3002</li>
            <li>Check browser console for additional error details</li>
            <li>Try disabling browser extensions that might block WebSocket</li>
            <li>Check firewall/antivirus settings</li>
            <li>Verify network connectivity to localhost:3001</li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <a 
            href="/auth/chat/test-session" 
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg inline-block"
          >
            Go to Chat Test
          </a>
        </div>
      </div>
    </div>
  );
}