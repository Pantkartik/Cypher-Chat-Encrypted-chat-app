"use client";

import { BACKEND_URL, SOCKET_URL, DEBUG_CONNECTION } from '@/lib/config';

export default function DebugInfo() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-xs font-mono">
      <h3 className="font-semibold mb-2">Debug Information:</h3>
      <div className="space-y-1">
        <div>BACKEND_URL: <span className="text-blue-600 dark:text-blue-400">{BACKEND_URL}</span></div>
        <div>SOCKET_URL: <span className="text-blue-600 dark:text-blue-400">{SOCKET_URL}</span></div>
        <div>DEBUG_CONNECTION: <span className="text-blue-600 dark:text-blue-400">{DEBUG_CONNECTION ? 'true' : 'false'}</span></div>
        <div>NEXT_PUBLIC_BACKEND_URL: <span className="text-blue-600 dark:text-blue-400">{process.env.NEXT_PUBLIC_BACKEND_URL || 'not set'}</span></div>
        <div>NEXT_PUBLIC_SOCKET_URL: <span className="text-blue-600 dark:text-blue-400">{process.env.NEXT_PUBLIC_SOCKET_URL || 'not set'}</span></div>
      </div>
    </div>
  );
}