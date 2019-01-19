import React, { Component } from "react";
import "./App.css";

import { firestore } from "./firebase";

class App extends Component {
  state = {
    nameList: []
  };
  componentDidMount() {
    firestore.collection("chat").onSnapshot(snapshot => {
      this.setState({
        nameList: snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
      });
    });
  }
  renderNameList = () => {
    const { nameList } = this.state;
    return nameList.map(({ name, id }) => {
      return (
        <div key={id} data-id={id}>
          {name}
        </div>
      );
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const name = this.refs["my-form"].name.value;
    firestore.collection("chat").add({ name });
    this.refs["my-form"].name.value = "";
  };

  renderAddName = () => {
    const { handleSubmit } = this;
    return (
      <form ref="my-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input name="name" />
        </div>
      </form>
    );
  };

  render() {
    const { renderNameList, renderAddName } = this;
    return (
      <div className="App">
        List of names
        {renderAddName()}
        {renderNameList()}
      </div>
    );
  }
}

export default App;
