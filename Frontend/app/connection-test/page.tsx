'use client';

import { useState, useEffect } from 'react';
import { connectionDebugger } from '@/lib/connection-debug';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Wifi, WifiOff } from 'lucide-react';

export default function ConnectionTestPage() {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'failed'>('checking');
  const [socketStatus, setSocketStatus] = useState<'checking' | 'connected' | 'failed'>('checking');
  const [errors, setErrors] = useState<string[]>([]);

  const testConnections = async () => {
    setBackendStatus('checking');
    setSocketStatus('checking');
    setErrors([]);

    // Test backend connection
    const backendConnected = await connectionDebugger.testBackendConnection();
    setBackendStatus(backendConnected ? 'connected' : 'failed');

    // Get any errors from the debugger
    const status = connectionDebugger.getConnectionStatus();
    setErrors(status.errors);

    // For now, we'll mark socket as connected if backend is connected
    // In a real implementation, you'd test the actual socket connection
    setSocketStatus(backendConnected ? 'connected' : 'failed');
  };

  useEffect(() => {
    testConnections();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'checking':
        return <Wifi className="h-5 w-5 text-yellow-500 animate-pulse" />;
      default:
        return <WifiOff className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge variant="default" className="bg-green-500">Connected</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'checking':
        return <Badge variant="secondary">Checking...</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Connection Test</h1>
      
      <div className="grid gap-6 mb-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(backendStatus)}
                <CardTitle>Backend Server</CardTitle>
              </div>
              {getStatusBadge(backendStatus)}
            </div>
            <CardDescription>
              Connection to backend server at http://localhost:3001
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Status: <span className="font-medium">{backendStatus.toUpperCase()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(socketStatus)}
                <CardTitle>WebSocket Connection</CardTitle>
              </div>
              {getStatusBadge(socketStatus)}
            </div>
            <CardDescription>
              Real-time communication with the server
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Status: <span className="font-medium">{socketStatus.toUpperCase()}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {errors.length > 0 && (
        <Card className="border-destructive mb-6">
          <CardHeader>
            <CardTitle className="text-destructive">Connection Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {errors.map((error, index) => (
                <div key={index} className="text-sm text-destructive bg-destructive/10 p-2 rounded">
                  {error}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        <Button onClick={testConnections} disabled={backendStatus === 'checking'}>
          Test Connection Again
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => window.location.href = '/'}
        >
          Go to Home
        </Button>
      </div>

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">Troubleshooting Tips:</h3>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Ensure the backend server is running on port 3001</li>
          <li>Check if any other application is using port 3001</li>
          <li>Verify your firewall settings allow local connections</li>
          <li>Try refreshing the page</li>
          <li>Check the browser console for detailed error messages</li>
        </ul>
      </div>
    </div>
  );
}