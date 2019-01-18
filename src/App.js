import React, { Component } from "react";
import "./App.css";

import { firestore } from "./firebase";

class App extends Component {
  state = {
    nameList: []
  };
  componentDidMount() {
    firestore
      .collection("chat")
      .get()
      .then(snapshot => {
        this.setState({
          nameList: snapshot.docs.map(doc => doc.data())
        });
      });
  }
  renderNameList = () => {
    const { nameList } = this.state;
    return nameList.map(({ name }) => {
      const id = `name-id-${Math.random()}`;
      return <div key={id}>{name}</div>;
    });
  };
  render() {
    return (
      <div className="App">
        List of names
        {this.renderNameList()}
      </div>
    );
  }
}

export default App;
