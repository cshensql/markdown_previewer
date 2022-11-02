import "./index.css";
import { marked } from "marked";
import React from "react";
import ReactDOM from "react-dom/client";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

class App extends React.Component {
  state = {
    input: "",
    inputExpand: false,
    previewExpand: false,
  };

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  handleSelect = (event) => {
    const data = event.target.value;
    // console.log(data);
    data === "breaks"
      ? marked.setOptions({ breaks: true })
      : marked.setOptions({ breaks: false });
  };

  handleClick1 = (event) => {
    console.log(event.target.id);
    const input = document.getElementById('input-field');
    const preview = document.getElementById('preview-field');
    console.log("handleClick11111 runned!");
    if (!this.state.inputExpand) {
      input.className += ' areaExpand';
      preview.className += ' displayNone';
      this.setState({inputExpand: true});
    } else {
      input.className = 'inputField';
      preview.className = 'previewField';
      this.setState({inputExpand: false});
    }
    /* switch (option) {
      case "input":
        this.setState({ inputExpand: !(this.state.inputExpand)});
        console.log('here I am the first button!');
        break;
      case "preview":
        this.setState({ previewExpand: !this.state.previewExpand });
        break;
      default:
        break;*/
    }
  
  handleClick2 = () => {
    console.log("handleClick2222 runned!");
    const input = document.getElementById('input-field');
    const preview = document.getElementById('preview-field');
    console.log("handleClick11111 runned!");
    if (!this.state.previewExpand) {
      preview.className += ' areaExpand';
      input.className += ' displayNone';
      this.setState({previewExpand: true});
    } else {
      input.className = 'inputField';
      preview.className = 'previewField';
      this.setState({previewExpand: false});
    }
  }

 /* componentDidMount() {
    const input = document.getElementById('input-field');
    const preview = document.getElementById('preview-field');
    if (this.state.inputExpand) {
      input.className += ' areaExpand';
      preview.className += ' displayNone'; 
    } else if (this.state.previewExpand) {
      input.className += ' displayNone';
      preview.className += ' areaExpand';
    } else {
      input.className = 'inputField';
      preview.className = 'previewField';
    }
  }*/

  render() {
    return (
      <div id="wrapper">
        <div id="input-field" className="inputField">
          <div id="top-menu1">
            <div id="mode-options">
              <span>Choose mode:</span>
              <select id="options" onChange={this.handleSelect}>
                <option value="default">Default</option>
                <option value="breaks">Breaks sensitive</option>
              </select>
            </div>
              {/* <button className="toggleView1" ></button> */}
              <i id='icon1' className="fa-solid fa-maximize" onClick={this.handleClick1}></i>
          </div>
          <textarea
            id="input-content"
            onChange={this.handleChange}
            value={this.state.input}
          />
        </div>
        {/* {jsx} */}
        <div id="preview-field" className="previewField">
          <div id="top-menu2">
              <i id='icon2' className="fa-solid fa-maximize" onClick={this.handleClick2}></i>
          </div>
          <div className='previewContent'>
            {parse(DOMPurify.sanitize(marked.parse(this.state.input)))}
          </div>  
        </div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
