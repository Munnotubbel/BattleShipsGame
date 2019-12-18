import React, { createContext, Component } from "react";

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
  state = {
    gmId: 1,
    logged: null,
  };

  updateValue = (key,val) => {
    console.log("ICH UPDATE!!!!!!");
    this.setState({ [key]: val });
  };

  render() {
    return (
      <ThemeContext.Provider
        value={{ ...this.state, updateValue: this.updateValue }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeContextProvider;
