import { BACKEND_URL, SOCKET_URL, DEBUG_CONNECTION } from './config';

export interface ConnectionStatus {
  backend: boolean;
  socket: boolean;
  timestamp: Date;
  errors: string[];
}

export class ConnectionDebugger {
  private static instance: ConnectionDebugger;
  private status: ConnectionStatus = {
    backend: false,
    socket: false,
    timestamp: new Date(),
    errors: []
  };

  static getInstance(): ConnectionDebugger {
    if (!ConnectionDebugger.instance) {
      ConnectionDebugger.instance = new ConnectionDebugger();
    }
    return ConnectionDebugger.instance;
  }

  async testBackendConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000
      } as RequestInit);

      const isConnected = response.ok;
      this.status.backend = isConnected;
      
      if (DEBUG_CONNECTION) {
        console.log(`Backend connection test: ${isConnected ? 'SUCCESS' : 'FAILED'}`);
        console.log(`Backend URL: ${BACKEND_URL}`);
        console.log(`Response status: ${response.status}`);
      }

      return isConnected;
    } catch (error) {
      this.status.backend = false;
      const errorMessage = `Backend connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      this.status.errors.push(errorMessage);
      
      if (DEBUG_CONNECTION) {
        console.error('Backend connection error:', error);
        console.error('Attempted URL:', `${BACKEND_URL}/api/health`);
      }
      
      return false;
    }
  }

  async testSocketConnection(io: any): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          this.status.socket = false;
          this.status.errors.push('Socket connection timeout');
          resolve(false);
        }, 5000);

        io.on('connect', () => {
          clearTimeout(timeout);
          this.status.socket = true;
          
          if (DEBUG_CONNECTION) {
            console.log('Socket connection test: SUCCESS');
            console.log('Socket URL:', SOCKET_URL);
          }
          
          resolve(true);
        });

        io.on('connect_error', (error: any) => {
          clearTimeout(timeout);
          this.status.socket = false;
          const errorMessage = `Socket connection failed: ${error.message || 'Unknown error'}`;
          this.status.errors.push(errorMessage);
          
          if (DEBUG_CONNECTION) {
            console.error('Socket connection error:', error);
            console.error('Socket URL:', SOCKET_URL);
          }
          
          resolve(false);
        });
      });
    } catch (error) {
      this.status.socket = false;
      const errorMessage = `Socket connection test error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      this.status.errors.push(errorMessage);
      
      if (DEBUG_CONNECTION) {
        console.error('Socket test error:', error);
      }
      
      return false;
    }
  }

  getConnectionStatus(): ConnectionStatus {
    return {
      ...this.status,
      timestamp: new Date()
    };
  }

  resetErrors(): void {
    this.status.errors = [];
    this.status.timestamp = new Date();
  }

  logFullStatus(): void {
    if (!DEBUG_CONNECTION) return;

    console.log('=== CONNECTION DEBUG INFO ===');
    console.log(`Backend URL: ${BACKEND_URL}`);
    console.log(`Socket URL: ${SOCKET_URL}`);
    console.log(`Backend Connected: ${this.status.backend}`);
    console.log(`Socket Connected: ${this.status.socket}`);
    console.log(`Last Check: ${this.status.timestamp.toISOString()}`);
    
    if (this.status.errors.length > 0) {
      console.log('Errors:');
      this.status.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`);
      });
    }
    
    console.log('=== END DEBUG INFO ===');
  }
}

export const connectionDebugger = ConnectionDebugger.getInstance();