import  { Component, type ErrorInfo } from 'react'
import { Button } from './ui/button'
import { AlertCircle } from 'lucide-react'
import type { Props, State } from '@/types'



class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in ErrorBoundary:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex w-full flex-col items-center justify-center gap-4 rounded-md border p-8 text-center bg-gray-50 min-h-[50vh]">
          <div className="flex flex-col items-center gap-2">
            <AlertCircle className="h-10 w-10 text-red-500" />
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              Something went wrong!
            </h2>
            <p className="text-sm text-gray-500 max-w-[500px]">
              {this.state.error?.message ||
                'An unexpected error occurred while rendering this component.'}
            </p>
          </div>
          <Button
            onClick={() => {
              this.setState({ hasError: false, error: undefined })
              window.location.reload()
            }}
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
