import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './componets/Header'
import Posts from './componets/Posts'


function App() {
  return (
    <div className="container">
      <Header />
      <Posts />
    </div>
  );
}

export default App;
