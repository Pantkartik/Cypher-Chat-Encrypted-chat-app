'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff, Users, Minimize2, Maximize2, X, AlertCircle } from 'lucide-react'

interface JitsiVideoCallProps {
  isOpen: boolean
  onClose: () => void
  targetUserId?: string
  isAudioOnly?: boolean
  isGroupCall?: boolean
  roomName?: string
  username?: string
  sessionId?: string
}

export default function JitsiVideoCall({
  isOpen,
  onClose,
  targetUserId,
  isAudioOnly = false,
  isGroupCall = false,
  roomName,
  username = 'User',
  sessionId
}: JitsiVideoCallProps) {
  const jitsiContainerRef = useRef<HTMLDivElement>(null)
  const [jitsiApi, setJitsiApi] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [isAudioMuted, setIsAudioMuted] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const isInitializingRef = useRef(false)
  const initializationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isOpen) {
      // Clean up any existing API when component is closed
      if (jitsiApi) {
        console.log('Disposing Jitsi API - component closing')
        jitsiApi.dispose()
        setJitsiApi(null)
      }
      if (initializationTimeoutRef.current) {
        clearTimeout(initializationTimeoutRef.current)
        initializationTimeoutRef.current = null
      }
      isInitializingRef.current = false
      return
    }

    // Prevent multiple simultaneous initializations
    if (isInitializingRef.current) {
      console.log('Jitsi initialization already in progress, skipping...')
      return
    }

    const loadJitsi = async () => {
      // Double-check initialization guard
      if (isInitializingRef.current) {
        console.log('Jitsi initialization race condition detected, skipping...')
        return
      }
      
      isInitializingRef.current = true
      
      try {
        setIsLoading(true)
        setConnectionError(null)
        
        // Load Jitsi Meet API script
        if (!(window as any).JitsiMeetExternalAPI) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script')
            script.src = 'https://meet.jit.si/external_api.js'
            script.async = true
            script.onload = () => resolve()
            script.onerror = () => reject(new Error('Failed to load Jitsi script'))
            document.head.appendChild(script)
          })
        }

        if (jitsiContainerRef.current && (window as any).JitsiMeetExternalAPI) {
          const domain = 'meet.jit.si'
          
          console.log('Jitsi API loaded successfully, creating meeting...')
          console.log('Session ID:', sessionId)
          console.log('Target User ID:', targetUserId)
          console.log('Username:', username)
          console.log('Is Audio Only:', isAudioOnly)
          console.log('Is Group Call:', isGroupCall)
          
          // Generate cryptographically secure room name
          let room: string
          if (roomName) {
            // Sanitize room name to ensure it's valid for Jitsi
            room = roomName.replace(/[^a-zA-Z0-9-_]/g, '').substring(0, 50)
          } else if (sessionId) {
            // Create cryptographically secure room name from session ID
            const timestamp = Date.now().toString(36)
            const crypto = window.crypto || (window as any).msCrypto
            const array = new Uint8Array(8)
            crypto.getRandomValues(array)
            const secureRandom = Array.from(array, byte => byte.toString(36)).join('').substring(0, 8)
            
            // For private chats, ensure consistent room naming
            if (isGroupCall === false && targetUserId && username) {
              const sortedIds = [username, targetUserId].sort().join('-')
              const baseName = `cypher-private-${sortedIds}`
              // Sanitize and limit length
              room = `${baseName.replace(/[^a-zA-Z0-9-_]/g, '').substring(0, 30)}-${timestamp}-${secureRandom}`
            } else {
              const baseName = `cypher-secure-${sessionId}`
              room = `${baseName.replace(/[^a-zA-Z0-9-_]/g, '').substring(0, 30)}-${timestamp}-${secureRandom}`
            }
          } else {
            // Fallback secure room name with crypto random
            const timestamp = Date.now().toString(36)
            const crypto = window.crypto || (window as any).msCrypto
            const array = new Uint8Array(8)
            crypto.getRandomValues(array)
            const secureRandom = Array.from(array, byte => byte.toString(36)).join('').substring(0, 8)
            const baseName = `cypher-secure-${targetUserId || 'default'}`
            room = `${baseName.replace(/[^a-zA-Z0-9-_]/g, '').substring(0, 30)}-${timestamp}-${secureRandom}`
          }
          
          console.log('Creating cryptographically secure Jitsi room:', room)
          
          const options = {
            roomName: room,
            width: '100%',
            height: '100%',
            parentNode: jitsiContainerRef.current,
            userInfo: {
              displayName: username
            },
            configOverwrite: {
              startWithAudioMuted: false,
              startWithVideoMuted: isAudioOnly,
              // Fix microphone blinking and conflicts
              disableAudioLevels: true,
              enableNoAudioDetection: false,
              enableNoisyMicDetection: false,
              enableTalkWhileMuted: false,
              // Audio processing settings to prevent conflicts
              disableAudioProcessing: false,
              stereo: true,
              enableLipSync: false,
              // Disable features that might cause mic issues
              disableRemoteMute: true,
              disableGrantModerator: true,
              disableKick: true,
              // Connection and performance settings
              disableSimulcast: false,
              enableLayerSuspension: true,
              disableSuspendVideo: true,
              // Security settings
              disableDeepLinking: true,
              disableInviteFunctions: true,
              disableThirdPartyRequests: true,
              enableWelcomePage: false,
              prejoinPageEnabled: false,
              requireDisplayName: false,
              enableUserRolesBasedOnToken: false,
              disableProfile: true,
              enableFeaturesBasedOnToken: false,
              disableSelfView: false,
              disableSelfViewSettings: true,
              enableClosePage: false,
              disablePrivateMessages: true,
              disableChat: true,
              enableLobbyChat: false,
              disableReactions: true,
              disablePolls: true,
              disableRaiseHand: true,
              disableRecording: true,
              disableLiveStreaming: true,
              disableBreakoutRooms: true,
              disableWhiteboard: true,
              disableSharedVideo: true,
              disableVirtualBackground: true,
              // Media settings
              enableAutomaticUrlCopy: false,
              enableSaveLogs: false,
              disableH264: false,
              preferH264: true,
              enableTcc: true,
              useStunTurn: true,
              enableP2P: true,
              p2p: {
                enabled: true,
                stunServers: [
                  { urls: 'stun:stun.l.google.com:19302' },
                  { urls: 'stun:stun1.l.google.com:19302' }
                ]
              },
              backToInCallBlue: true,
              suppressNotSupportedWarning: true,
              resolution: 720,
              constraints: {
                video: {
                  height: {
                    ideal: 720,
                    max: 720,
                    min: 180
                  },
                  width: {
                    ideal: 1280,
                    max: 1280,
                    min: 320
                  }
                },
                audio: {
                  // Enable audio processing for better quality
                  echoCancellation: true,
                  noiseSuppression: true,
                  autoGainControl: true,
                  sampleRate: 48000,
                  channelCount: 2,
                  // Add specific constraints to prevent mic conflicts
                  googEchoCancellation: true,
                  googAutoGainControl: true,
                  googNoiseSuppression: true,
                  googHighpassFilter: true,
                  googTypingNoiseDetection: true
                }
              }
            },
            interfaceConfigOverwrite: {
              SHOW_JITSI_WATERMARK: false,
              SHOW_WATERMARK_FOR_GUESTS: false,
              SHOW_BRAND_WATERMARK: false,
              SHOW_POWERED_BY: false,
              TOOLBAR_BUTTONS: [
                'microphone', 'camera', 'desktop', 'fullscreen',
                'fodeviceselection', 'hangup', 'profile', 'chat',
                'recording', 'livestreaming', 'etherpad', 'sharedvideo',
                'settings', 'raisehand', 'videoquality', 'filmstrip',
                'invite', 'feedback', 'stats', 'shortcuts',
                'tileview', 'videobackgroundblur', 'download', 'help',
                'mute-everyone', 'security'
              ],
              SETTINGS_SECTIONS: ['devices', 'language', 'moderator', 'profile'],
              VERTICAL_FILMSTRIP: true,
              FILM_STRIP_MAX_HEIGHT: 120,
              DEFAULT_BACKGROUND: '#040404',
              DEFAULT_LOCAL_DISPLAY_NAME: 'Me',
              DEFAULT_REMOTE_DISPLAY_NAME: 'Participant',
              TOOLBAR_ALWAYS_VISIBLE: true,
              RECENT_LIST_ENABLED: false,
              OPTIMAL_BROWSERS: ['chrome', 'firefox', 'webkit'],
              UNSUPPORTED_BROWSERS: []
            }
          }

          let api: any
          try {
            api = new (window as any).JitsiMeetExternalAPI(domain, options)
            console.log('Jitsi API instance created successfully')
          } catch (error) {
            console.error('Failed to create Jitsi API instance:', error)
            setIsLoading(false)
            setConnectionError('Failed to create video call session. Please try again.')
            isInitializingRef.current = false
            return
          }
          
          // Add connection timeout
          initializationTimeoutRef.current = setTimeout(() => {
            if (isLoading && isInitializingRef.current) {
              console.error('Jitsi connection timeout after 30 seconds')
              setIsLoading(false)
              setConnectionError('Connection timeout. Please check your internet connection and try again.')
              isInitializingRef.current = false
              // Clean up the API instance if it exists
              if (api) {
                try {
                  api.dispose()
                } catch (disposeError) {
                  console.error('Error disposing timeout API:', disposeError)
                }
              }
            }
          }, 30000) // 30 second timeout
          
          api.addEventListeners({
            readyToClose: () => {
              console.log('Jitsi meeting ready to close')
              if (initializationTimeoutRef.current) {
                clearTimeout(initializationTimeoutRef.current)
                initializationTimeoutRef.current = null
              }
              onClose()
            },
            videoConferenceJoined: () => {
              console.log('Successfully joined Jitsi conference')
              if (initializationTimeoutRef.current) {
                clearTimeout(initializationTimeoutRef.current)
                initializationTimeoutRef.current = null
              }
              setIsLoading(false)
              
              // Get initial mute states
              try {
                const audioMuted = api.isAudioMuted()
                const videoMuted = api.isVideoMuted()
                setIsAudioMuted(audioMuted)
                setIsVideoMuted(videoMuted)
                console.log('Initial mute states - Audio:', audioMuted, 'Video:', videoMuted)
              } catch (error) {
                console.warn('Could not get initial mute states:', error)
                // Set safe defaults
                setIsAudioMuted(false)
                setIsVideoMuted(isAudioOnly)
              }
            },
            videoConferenceLeft: () => {
              console.log('Left Jitsi conference')
              onClose()
            },
            participantJoined: (participant: any) => {
              console.log('Participant joined:', participant)
            },
            participantLeft: (participant: any) => {
              console.log('Participant left:', participant)
            },
            audioMuteStatusChanged: (data: any) => {
              console.log('Audio mute status changed:', data)
              setIsAudioMuted(data.muted)
            },
            videoMuteStatusChanged: (data: any) => {
              console.log('Video mute status changed:', data)
              setIsVideoMuted(data.muted)
            },
            screenSharingStatusChanged: (data: any) => {
              console.log('Screen sharing status changed:', data)
            },
            dominantSpeakerChanged: (data: any) => {
              console.log('Dominant speaker changed:', data)
            },
            errorOccurred: (error: any) => {
              console.error('Jitsi error occurred:', error)
            },
            connectionFailed: (error: any) => {
              console.error('Jitsi connection failed:', error)
              if (initializationTimeoutRef.current) {
                clearTimeout(initializationTimeoutRef.current)
                initializationTimeoutRef.current = null
              }
              setIsLoading(false)
              setConnectionError(`Connection failed: ${error.message || 'Please check your internet connection and try again.'}`)
              isInitializingRef.current = false
            },
            connectionEstablished: () => {
              console.log('Jitsi connection established')
            },
            connectionDisconnected: () => {
              console.log('Jitsi connection disconnected')
            }
          })

          setJitsiApi(api)
        }
      } catch (error) {
        console.error('Error loading Jitsi:', error)
        setIsLoading(false)
        setConnectionError(`Failed to load video call: ${error instanceof Error ? error.message : 'Unknown error'}`)
        isInitializingRef.current = false
      }
    }

    loadJitsi()

    return () => {
      if (jitsiApi) {
        console.log('Disposing Jitsi API - cleanup function')
        jitsiApi.dispose()
        setJitsiApi(null)
      }
      if (initializationTimeoutRef.current) {
        clearTimeout(initializationTimeoutRef.current)
        initializationTimeoutRef.current = null
      }
      isInitializingRef.current = false
    }
  }, [isOpen, roomName, targetUserId, username, isAudioOnly, onClose, sessionId])

  const isEndingCallRef = useRef(false)

  const handleEndCall = () => {
    if (jitsiApi) {
      try {
        // Prevent multiple end call attempts
        if (isEndingCallRef.current) return
        isEndingCallRef.current = true
        
        jitsiApi.executeCommand('hangup')
      } catch (error) {
        console.error('Error disposing Jitsi API:', error)
      } finally {
        // Clean up state
        setJitsiApi(null)
        setIsLoading(false)
        isEndingCallRef.current = false
        onClose()
      }
    } else {
      onClose()
    }
  }

  const handleToggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleToggleAudio = () => {
    if (jitsiApi) {
      try {
        const currentAudioMuted = jitsiApi.isAudioMuted()
        jitsiApi.executeCommand('toggleAudio')
        // Optimistically update UI
        setIsAudioMuted(!currentAudioMuted)
        console.log('Toggling audio from', currentAudioMuted, 'to', !currentAudioMuted)
      } catch (error) {
        console.error('Error toggling audio:', error)
      }
    }
  }

  const handleToggleVideo = () => {
    if (jitsiApi) {
      try {
        const currentVideoMuted = jitsiApi.isVideoMuted()
        jitsiApi.executeCommand('toggleVideo')
        // Optimistically update UI
        setIsVideoMuted(!currentVideoMuted)
        console.log('Toggling video from', currentVideoMuted, 'to', !currentVideoMuted)
      } catch (error) {
        console.error('Error toggling video:', error)
      }
    }
  }

  if (!isOpen || isEndingCallRef.current) return null

  return (
    <div className={`fixed inset-0 z-50 ${isMinimized ? 'bg-transparent' : 'bg-black/80'} flex items-center justify-center`}>
      <Card className={`${isMinimized ? 'w-80 h-60' : 'w-full max-w-6xl h-full max-h-[90vh]'} flex flex-col`}>
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            {isAudioOnly ? <Phone className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            {isAudioOnly ? 'Audio Call' : 'Video Call'}
            {isGroupCall && <Users className="w-4 h-4 ml-1" />}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleMinimize}
              className="h-8 w-8"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEndCall}
              className="h-8 w-8 text-red-500 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p>Loading Jitsi Meet...</p>
              </div>
            </div>
          )}
          
          {connectionError && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <div className="text-center text-white p-6 bg-red-900/80 rounded-lg backdrop-blur-sm">
                <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-4" />
                <p className="text-red-200 mb-4">{connectionError}</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="outline" 
                  className="text-white border-white/50 hover:bg-white/10"
                >
                  Retry Connection
                </Button>
              </div>
            </div>
          )}
          
          <div 
            ref={jitsiContainerRef} 
            className="w-full h-full"
            style={{ minHeight: isMinimized ? '200px' : '400px' }}
          />
        </CardContent>

        {!isMinimized && (
          <div className="flex items-center justify-center gap-4 p-4 bg-background border-t">
            <Button
              onClick={handleToggleAudio}
              variant={isAudioMuted ? "destructive" : "outline"}
              size="icon"
              className="w-12 h-12 rounded-full"
              title={isAudioMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {isAudioMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
            
            <Button
              onClick={handleToggleVideo}
              variant={isVideoMuted ? "destructive" : "outline"}
              size="icon"
              className="w-12 h-12 rounded-full"
              title={isVideoMuted ? "Turn On Video" : "Turn Off Video"}
            >
              {isVideoMuted ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </Button>
            
            <Button
              onClick={handleEndCall}
              variant="destructive"
              size="icon"
              className="w-12 h-12 rounded-full"
              title="End Call"
            >
              <PhoneOff className="w-5 h-5" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}