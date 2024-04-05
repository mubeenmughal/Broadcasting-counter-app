import React, { useState, useEffect } from 'react';
import '../components/Counter.css'

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Create a new Broadcast Channel with a unique name
    const channel = new BroadcastChannel('counter_channel');

    // Listen for messages from other tabs
    channel.onmessage = event => {
      // Update count when receiving a message
      setCount(event.data);
    };

    return () => {
      // Close the channel when component unmounts
      channel.close();
    };
  }, []);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);

    // Broadcast the updated count to other tabs
    const channel = new BroadcastChannel('counter_channel');
    channel.postMessage(newCount);
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);

    // Broadcast the updated count to other tabs
    const channel = new BroadcastChannel('counter_channel');
    channel.postMessage(newCount);
  };

  return (
    <>
      <div className="counterContainer">
        Counter App
        <div className="counterValue">
          {count}
        </div>
        <div className="buttons">
          <button
            onClick={increment}
            className="increment" // Note: This class isn't defined in CSS, but you could add it for future styling
          >
            Increment
          </button>
          <button
            onClick={decrement}
            className="decrement" // This class applies the decrement button styles
          >
            Decrement
          </button>
        </div>
      </div><br/><br/>
      <div className="container">
        <div className="header">State Management</div>
        <div className="text">
          Managing state in React involves overseeing data throughout your application, which is essential for monitoring changes, updating the user interface accordingly, and maintaining consistency in the data displayed by your components. This becomes increasingly significant in elaborate applications where distributing data among deeply nested components or different parts of the app can become challenging.
        </div>

        <div className="section-header">React's Built-in State Management Tools</div>
        <div className="text">
          React comes with hooks like <span className="bold">useState</span> and <span className="bold">useReducer</span> to manage state within components.
        </div>

        <div className="section-header">Overcoming Prop Drilling</div>
        <div className="text">
          For smaller applications, state management can be achieved by elevating it to common parent components and then distributing it to necessary child components via props. This method becomes less practical as applications expand, leading to "prop drilling".
        </div>

        <div className="section-header">Utilizing Context API</div>
        <div className="text">
          The Context API in React permits state sharing across the entire application without the manual propagation of props through each component level. This is particularly useful for global data, such as themes and user authentication.
        </div>

        <div className="section-header">Advanced State Management with External Libraries</div>
        <div className="text">
          For more intricate applications, external state management libraries provide enhanced solutions. Redux stands out among state management libraries by maintaining a single immutable state tree ("store") to which components can subscribe.
        </div>
      </div>
    </>
  );
};

export default Counter;
