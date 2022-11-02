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

  handleClick1 = () => {
    // console.log(event.target.id);
    const input = document.getElementById("input-field");
    const preview = document.getElementById("preview-field");
    const icon = document.getElementById("icon1");
    // console.log("handleClick11111 runned!");
    if (!this.state.inputExpand) {
      input.className += " areaExpand";
      preview.className += " displayNone";
      icon.className = "fa-solid fa-up-right-and-down-left-from-center";
      this.setState({ inputExpand: true });
    } else {
      input.className = "inputField";
      preview.className = "previewField";
      icon.className = "fa-solid fa-maximize";
      this.setState({ inputExpand: false });
    }
  };

  handleClick2 = () => {
    // console.log("handleClick2222 runned!");
    const input = document.getElementById("input-field");
    const preview = document.getElementById("preview-field");
    const icon = document.getElementById("icon2");
    // console.log("handleClick11111 runned!");
    if (!this.state.previewExpand) {
      preview.className += " areaExpand";
      input.className += " displayNone";
      icon.className = "fa-solid fa-up-right-and-down-left-from-center";
      this.setState({ previewExpand: true });
    } else {
      input.className = "inputField";
      preview.className = "previewField";
      icon.className = "fa-solid fa-maximize";
      this.setState({ previewExpand: false });
    }
  };

  handleDownload = () => {
    const pageHTML = document.getElementById("preview-content").innerHTML;
    const blob = new Blob([pageHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const tempEl = document.createElement("a");
    document.body.appendChild(tempEl);
    tempEl.href = url;
    tempEl.download = "markdown-preview.html";
    tempEl.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      tempEl.parentNode.removeChild(tempEl);
    }, 2000);
  };

  handleKeyDown = (event) => {
    if (event.keyCode === 9) {
      // tab was pressed
      event.preventDefault();
      let val = this.state.input,
        start = event.target.selectionStart,
        end = event.target.selectionEnd;
      this.setState(
        {
          input: val.substring(0, start) + "\t" + val.substring(end),
        },
        () => {
          const textarea = document.getElementById("input-content");
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        }
      );
    }
  };

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
            <i
              id="icon1"
              className="fa-solid fa-maximize"
              onClick={this.handleClick1}
            ></i>
          </div>
          <textarea
            id="input-content"
            onChange={this.handleChange}
            value={this.state.input}
            onKeyDown={this.handleKeyDown}
          />
        </div>
        <div id="preview-field" className="previewField">
          <div id="top-menu2">
            <button onClick={this.handleDownload}>Download</button>
            <i
              id="icon2"
              className="fa-solid fa-maximize"
              onClick={this.handleClick2}
            ></i>
          </div>
          <div id="preview-content" className="previewContent">
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
