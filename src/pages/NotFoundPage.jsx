import React from 'react';

const NotFoundPage = () => {
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
      position: 'relative'
    }}>
      {/* Yellow accent line */}
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
        {/* Large 404 number */}
        <div style={{
          fontSize: 'clamp(6rem, 20vw, 12rem)',
          fontWeight: 800,
          color: 'rgba(255, 204, 0, 0.15)', // Very faded yellow
          position: 'absolute',
          zIndex: 0,
          lineHeight: 1
        }}>
          404
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 700,
          color: '#5DB3E4',
          marginBottom: '1rem',
          lineHeight: 1.2,
          position: 'relative',
          zIndex: 1,
          marginTop: '4rem'
        }}>
          Page Not Found
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          maxWidth: '60vw',
          color: '#f7f7f7',
          marginBottom: '3rem',
          lineHeight: 1.8,
          fontWeight: 400,
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable. Don't worry, we've got you covered.
        </p>

        <p style={{
          marginBottom: '2rem',
          fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
          fontWeight: 600,
          color: '#f7f7f7',
          position: 'relative',
          zIndex: 1
        }}>
          Let's get you back on track
        </p>


        <div style={{
          padding: '1.5rem 2rem',
          backgroundColor: '#FFCC00',
          borderRadius: '10px',
          width: 'min(100%, 450px)',
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '3rem',
          position: 'relative',
          zIndex: 1
        }}>
          <button
            onClick={() => (window.location.href = '/')}
            style={{
              backgroundColor: '#000',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '5px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s',
              flex: '1 1 150px',
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
            <span style={{ fontSize: '1.2rem' }}>🏠</span>
            <span>Home Page</span>
          </button>

          <button
            onClick={() => window.history.back()}
            style={{
              backgroundColor: 'transparent',
              color: '#000',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '5px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s',
              flex: '1 1 150px',
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
            <span style={{ fontSize: '1.2rem' }}>⬅️</span>
            <span>Go Back</span>
          </button>
        </div>

        {/* Yellow accent line */}
        <div style={{
          height: '4px',
          width: '87%',
          backgroundColor: '#FFCC00',
          margin: '0 auto'
        }}></div>
      </div>
    </section>
  );
};

export default NotFoundPage;