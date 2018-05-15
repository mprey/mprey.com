import React, { Component } from 'react';

class TextInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      parsed: false,
      omitted: [],
      omittedWordCount: 0,
      wordCount: 0
    };
  }

  parseText() {
    const text = this.textarea.value
    if (!text) {
      return alert("Please enter your text in the box");
    }

    let omitted = [];
    let omittedWordCount = 0;
    let wordCount = 0;
    let parts = text.split(" ");

    let omit = [];
    let quoting = false, parenthing = false;
    for (let word of parts) {
      
      // check for parenthesis first
      if (word.charAt(0) === '(') {
        parenthing = true;
        omit.push(word);
        omittedWordCount++;
      } else if (word.includes(")")) {
        parenthing = false;
        omit.push(word);
        omittedWordCount++;
        omitted.push(omit.join(" "));
        omit = [];
      } else if (word.charAt(0) === '"') { // check for quotes
        quoting = true;
        omit.push(word);
        omittedWordCount++;
      } else if (word.charAt(word.length - 1) === '"') {
        quoting = false;
        omit.push(word);
        omittedWordCount++;
        omitted.push(omit.join(" "));
        omit = [];
      } else if (parenthing || quoting) {
        omit.push(word);
        omittedWordCount++; 
      }else {
        wordCount++;
      }

    }

    this.setState({
      parsed: true,
      omitted,
      omittedWordCount,
      wordCount
    });
  }

  renderResults() {
    if (!this.state.parsed) {
      return null;
    }

    let omittedWords = this.state.omitted.map((word, i) => (
      <p key={i}>{ word }</p>
    ));

    return (
      <div className="results">
        <p>Word Count: { this.state.wordCount } </p>
        <p>Omitted Word Count: { this.state.omittedWordCount } </p>
        <p>Omitted Words: </p>
        { omittedWords }
      </div>
    )
  }

  render() {
    return (
      <div className="text-input">
        <textarea ref={ref => this.textarea = ref} />
        <div className="submit" onClick={() => this.parseText()}> 
          Submit
        </div>
        { this.renderResults() }
      </div>
    );
  }
}

export default TextInput;
