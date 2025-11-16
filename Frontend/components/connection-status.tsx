'use client';

import { useState, useEffect } from 'react';
import { connectionDebugger } from '@/lib/connection-debug';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ConnectionStatusProps {
  onConnectionRestored?: () => void;
  className?: string;
}

export function ConnectionStatus({ onConnectionRestored, className = '' }: ConnectionStatusProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  const checkConnection = async () => {
    setIsChecking(true);
    connectionDebugger.resetErrors();

    try {
      // Test backend connection
      const backendConnected = await connectionDebugger.testBackendConnection();
      
      if (backendConnected) {
        setIsConnected(true);
        setErrors([]);
        if (onConnectionRestored) {
          onConnectionRestored();
        }
      } else {
        setIsConnected(false);
        const status = connectionDebugger.getConnectionStatus();
        setErrors(status.errors);
      }
    } catch (error) {
      setIsConnected(false);
      setErrors([`Connection test failed: ${error instanceof Error ? error.message : 'Unknown error'}`]);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    // Initial connection check
    checkConnection();

    // Set up periodic connection checks
    const interval = setInterval(() => {
      checkConnection();
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (isConnected) {
    return null; // Don't show anything if connected
  }

  return (
    <Card className={`border-destructive/50 bg-destructive/10 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <CardHeader className="text-destructive p-0">Connection Failed</CardHeader>
          </div>
          <Badge variant="destructive">Offline</Badge>
        </div>
        <CardDescription className="text-destructive/80">
          Unable to connect to the server. Please check your connection and try again.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button 
            onClick={checkConnection} 
            disabled={isChecking}
            size="sm"
            className="flex-1"
          >
            {isChecking ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry Connection
              </>
            )}
          </Button>
          <Button 
            onClick={() => setShowDetails(!showDetails)}
            variant="outline"
            size="sm"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Button>
        </div>

        {showDetails && (
          <div className="space-y-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
            <div className="text-sm text-destructive/70">
              <div className="flex justify-between mb-2">
                <span>Backend URL:</span>
                <span className="font-mono">http://localhost:3001</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Last Check:</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            {errors.length > 0 && (
              <div className="space-y-1">
                <span className="text-xs font-medium text-destructive/80">Errors:</span>
                {errors.map((error, index) => (
                  <div key={index} className="text-xs text-destructive/60 bg-destructive/10 px-2 py-1 rounded">
                    {error}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="rounded-lg border border-destructive/20 bg-background/50 p-3">
          <h4 className="text-sm font-medium text-destructive mb-2">Troubleshooting Steps:</h4>
          <ol className="text-xs text-destructive/70 space-y-1 list-decimal list-inside">
            <li>Check if the backend server is running on port 3001</li>
            <li>Verify no other application is using port 3001</li>
            <li>Ensure your internet connection is stable</li>
            <li>Try refreshing the page</li>
            <li>Check browser console for detailed error messages</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}