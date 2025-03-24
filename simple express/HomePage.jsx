// HomePage.jsx
import React, { useState } from 'react';

const HomePage = () => {
  const [showContent, setShowContent] = useState(false);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={() => setShowContent(!showContent)}>
        Toggle Visibility
      </button>
      {showContent && <p>Now you can see me!</p>}
    </div>
  );
};

export default HomePage;
