import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.fetchLogin();
  };

  fetchLogin = () => {
    fetch("/api/players", {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `userName=${this.state.username}&password=${this.state.password}`
    }).then(function(json) {
      console.log(json);
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              id="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Signup" />
        </form>
      </div>
    );
  }
}
