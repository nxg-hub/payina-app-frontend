// // let socket = null;
// //
// // export const connectWebSocket = (onMessage) => {
// //   if (socket) {
// //     socket.close();
// //   }
// //
// //   socket = new WebSocket('ws://localhost:8083/ws/notifications');
// //
// //   socket.onopen = () => {
// //     console.log('WebSocket connection established');
// //   };
// //
// //   // socket.onmessage = (event) => {
// //   //   onMessage(event.data);
// //   // };
// //
// //   socket.onmessage = (event) => {
// //     console.log('WebSocket message received:', event.data);
// //     onMessage(event.data);
// //   };
// //
// //   socket.onclose = () => {
// //     console.log('WebSocket connection closed');
// //   };
// //
// //   return () => {
// //     if (socket) {
// //       socket.close();
// //     }
// //   };
// // };
//
// // export const connectWebSocket = (onMessage) => {
// //   const socket = new WebSocket('ws://localhost:8083/ws/notifications');
// //
// //   socket.onopen = () => {
// //     console.log('WebSocket connection established');
// //   };
// //
// //   socket.onmessage = (event) => {
// //     try {
// //       const data = JSON.parse(event.data);
// //       onMessage(data);
// //     } catch (error) {
// //       console.error('Error parsing WebSocket message:', error);
// //     }
// //   };
// //
// //   socket.onclose = (event) => {
// //     console.log('WebSocket connection closed:', event.code, event.reason);
// //   };
// //
// //   socket.onerror = (error) => {
// //     console.error('WebSocket error:', error);
// //   };
// //
// //   return () => {
// //     if (socket.readyState === WebSocket.OPEN) {
// //       socket.close();
// //     }
// //   };
// // };
// //
// //
//
//
// export const connectWebSocket = (onMessage) => {
//   const socket = new WebSocket('ws://localhost:8083/ws/notifications');
//
//   socket.onopen = () => {
//     console.log('WebSocket connection established');
//   };
//
//   socket.onmessage = (event) => {
//     try {
//       // First try to parse as JSON
//       const data = JSON.parse(event.data);
//       onMessage(data);
//     } catch (error) {
//       // If JSON parsing fails, handle as plain text
//       console.log('Received text message:', event.data);
//       onMessage({
//         type: 'text-notification',
//         message: event.data,
//         timestamp: new Date().toISOString()
//       });
//     }
//   };
//
//   socket.onclose = (event) => {
//     console.log('WebSocket connection closed:', event.code, event.reason);
//   };
//
//   socket.onerror = (error) => {
//     console.error('WebSocket error:', error);
//   };
//
//   return () => {
//     if (socket.readyState === WebSocket.OPEN) {
//       socket.close();
//     }
//   };
// };

export const connectWebSocket = (onMessage) => {
  const socket = new WebSocket('ws://localhost:8083/ws/notifications');

  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onmessage = (event) => {
    console.log('WebSocket message received:', event.data); // Log raw message
    try {
      const data = JSON.parse(event.data);
      console.log('Parsed notification:', data); // Log the parsed message
      onMessage(data); // Pass the data to the callback
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
      onMessage({ action: 'unknown', email: 'unknown', details: event.data, timestamp: Date.now() });
    }
  };

  socket.onclose = (event) => {
    console.log('WebSocket connection closed:', event.code, event.reason);
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  return () => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.close();
    }
  };
};

