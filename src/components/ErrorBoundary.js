import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ 
          padding: '20px', 
          margin: '20px auto',
          maxWidth: '800px',
          backgroundColor: '#111',
          border: '1px solid #333',
          borderRadius: '8px'
        }}>
          <h2 style={{ color: '#dc2626' }}>Something went wrong</h2>
          <p style={{ color: '#fff', marginBottom: '20px' }}>
            We're sorry, but there was an error loading this page. Please try refreshing or go back to the home page.
          </p>
          <button 
            onClick={() => window.location.href = '/'} 
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Go to Home
          </button>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details style={{ 
              marginTop: '20px',
              padding: '10px',
              backgroundColor: '#222',
              borderRadius: '4px'
            }}>
              <summary style={{ cursor: 'pointer', color: '#aaa' }}>Error Details</summary>
              <pre style={{ 
                overflowX: 'auto', 
                whiteSpace: 'pre-wrap',
                color: '#f87171',
                padding: '10px',
                fontSize: '14px'
              }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
} 