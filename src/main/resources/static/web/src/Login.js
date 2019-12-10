import React, { Component } from "react";
import Axios from "axios";

export default class Login extends Component {
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
    Axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    Axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    Axios.post("http://localhost:8080/api/login", {
      userName: "Bobo",
      password: "12345"
    }).then(function() {
      console.log("logged in!");
    });
    // fetch(
    //   "https://ubiqum-cors-anywhere.herokuapp.com/http://localhost:8080/api/login",
    //   {
    //     credentials: "include",
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json"
    //     },

    //   }
    // ).then(function(json) {
    //   console.log(json);
    // });
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
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}
