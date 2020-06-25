import React from "react";
import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts_data: [],
    };
  }

  componentDidMount() {
    fetch(" http://127.0.0.1:8000/posts/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ posts_data: data });
      });
  }

  render() {
    return (
      <div className="App">
        <h1>hello World</h1>
      </div>
    );
  }
}

export default App;