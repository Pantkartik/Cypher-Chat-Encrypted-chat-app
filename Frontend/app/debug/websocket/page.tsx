"use client";

import { useEffect, useState } from 'react';
import { SOCKET_URL } from '@/lib/config';
import { io, Socket } from 'socket.io-client';

export default function WebSocketDebugPage() {
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  useEffect(() => {
    addLog(`Socket URL: ${SOCKET_URL}`);
    addLog('Starting WebSocket connection test...');
    
    setConnectionStatus('connecting');
    
    try {
      const testSocket = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
        timeout: 10000,
        reconnection: false, // Disable auto-reconnection for testing
        forceNew: true,
        upgrade: true
      });

      setSocket(testSocket);

      testSocket.on('connect', () => {
        addLog(`✅ Connected! Socket ID: ${testSocket.id}`);
        setConnectionStatus('connected');
        setError('');
      });

      testSocket.on('connect_error', (error) => {
        addLog(`❌ Connection error: ${error.message}`);
        setConnectionStatus('error');
        setError(`Connection error: ${error.message}`);
      });

      testSocket.on('disconnect', (reason) => {
        addLog(`🔌 Disconnected: ${reason}`);
        setConnectionStatus('disconnected');
      });

      testSocket.on('error', (error) => {
        addLog(`💥 Socket error: ${error.message || error}`);
        setError(`Socket error: ${error.message || error}`);
      });

      return () => {
        addLog('🧹 Cleaning up socket connection...');
        testSocket.close();
      };
    } catch (err) {
      addLog(`🚨 Failed to create socket: ${err instanceof Error ? err.message : String(err)}`);
      setConnectionStatus('error');
      setError(`Failed to create socket: ${err instanceof Error ? err.message : String(err)}`);
    }
  }, []);

  const testConnection = () => {
    if (socket) {
      addLog('🔄 Testing connection...');
      socket.connect();
    }
  };

  const disconnectSocket = () => {
    if (socket) {
      addLog('🔌 Manually disconnecting...');
      socket.disconnect();
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            WebSocket Connection Debugger
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Testing connection to: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{SOCKET_URL}</code>
          </p>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                connectionStatus === 'connected' ? 'bg-green-500' :
                connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' :
                connectionStatus === 'error' ? 'bg-red-500' :
                'bg-gray-400'
              }`}></div>
              <span className="font-medium capitalize text-gray-900 dark:text-white">
                {connectionStatus}
              </span>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={testConnection}
                disabled={connectionStatus === 'connecting'}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Test Connection
              </button>
              <button
                onClick={disconnectSocket}
                disabled={connectionStatus !== 'connected'}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Disconnect
              </button>
              <button
                onClick={clearLogs}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Clear Logs
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <h3 className="text-red-800 dark:text-red-200 font-semibold mb-2">Error Details:</h3>
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Connection Logs
          </h2>
          <div className="bg-gray-900 text-green-400 font-mono text-sm rounded-lg p-4 h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-500">No logs yet...</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Troubleshooting Tips
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Make sure the backend server is running on port 3001</li>
            <li>• Check if there are any firewall blocking WebSocket connections</li>
            <li>• Verify that CORS is properly configured in the backend</li>
            <li>• Try refreshing the page if connection fails</li>
            <li>• Check browser console for additional error messages</li>
            <li>• Ensure both frontend and backend are using compatible Socket.IO versions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}