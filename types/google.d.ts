// Type definitions for Google Identity Services
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string
            callback: (response: { credential: string }) => void
          }) => void
          renderButton: (
            element: HTMLElement | null,
            config?: {
              theme?: 'outline' | 'filled_blue' | 'filled_black'
              size?: 'large' | 'medium' | 'small'
              width?: string | number
              text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin'
            }
          ) => void
          prompt: (callback?: (notification: {
            isNotDisplayed: () => boolean
            isSkippedMoment: () => boolean
          }) => void) => void
        }
        oauth2: {
          initTokenClient: (config: {
            client_id: string
            callback: (response: { credential: string }) => void
            scope?: string
          }) => {
            requestAccessToken: () => void
          }
        }
      }
    }
  }
}

export {}

