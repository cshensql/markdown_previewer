import './index.css';
import { marked } from 'marked';
import React from 'react';
import ReactDOM from 'react-dom/client';


class App extends React.Component {
  state = {
    input:''
  };

  handleChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }


  render(){
    document.getElementById("content").innerHTML
     = marked.parse(this.state.input);
    return (
      <div id="input-content">
        <textarea onChange={this.handleChange} value={this.state.input} />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
