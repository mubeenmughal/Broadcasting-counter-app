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
      </div>
    </>
  );
};

export default Counter;
