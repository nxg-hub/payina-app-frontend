import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section style={{
          backgroundColor: '#000',
          color: '#ffffff',
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
          padding: '2.5rem 2rem',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999
        }}>

          <div style={{
            height: '4px',
            width: '87%',
            backgroundColor: '#FFCC00',
            margin: '0 auto 3rem auto'
          }}></div>

          <div style={{
            maxWidth: '800px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: '#5DB3E4',
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}>
              Something went wrong
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              maxWidth: '60vw',
              color: '#f7f7f7',
              marginBottom: '3rem',
              lineHeight: 1.8,
              fontWeight: 400,
              textAlign: 'center'
            }}>
              We've encountered an unexpected error. Our team has been notified and is working to resolve the issue.
              Meanwhile, you can return to the home page to continue your experience.
            </p>

            <p style={{
              marginBottom: '2rem',
              fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
              fontWeight: 600,
              color: '#f7f7f7'
            }}>
              Get back on track
            </p>


            <div style={{
              padding: '1.5rem 2rem',
              backgroundColor: '#FFCC00',
              borderRadius: '10px',
              width: 'min(100%, 350px)',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '3rem'
            }}>
              <button
                onClick={() => (window.location.href = '/')}
                style={{
                  backgroundColor: '#000',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 2rem',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  width: '100%',
                  maxWidth: '250px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(0.95)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>🏠</span>
                <span>Home Page</span>
              </button>
            </div>

            <div style={{
              height: '4px',
              width: '87%',
              backgroundColor: '#FFCC00',
              margin: '0 auto'
            }}></div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;