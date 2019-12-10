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
    this.setState({ [event.target.id]: event.target.value }, () =>
      console.log(this.state)
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    this.signUp();
  };

  fetchLogin = () => {
    const URL = `/api/login`;
    fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `userName=${this.state.username}&password=${this.state.password}`
    })
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          console.log("logged in!");
        } else {
          alert("Invalid username or password");
        }
      })
      .catch(err => console.log("err", err));
  };

  signUp = () => {
    fetch("/api/players", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `userName=${this.state.username}&password=${this.state.password}}`
    }).then(response => {
      if (response.status == 201) {
        console.log("user added");
        this.fetchLogin();
      } else if (response.status == 409) {
        console.log("User exists");
      } else {
        console.log("Something is missing");
      }
    });
  };

  fetchLogin = () => {
    const URL = `/api/login`;
    fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `userName=${this.state.username}&password=${this.state.password}`
    })
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          console.log("logged in!");
        } else {
          console.log("something went wrong");
        }
      })
      .catch(err => console.log("err", err));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" id="username" onChange={this.handleChange} />
          </label>

          <label>
            Password:
            <input type="password" id="password" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Sign up" />
        </form>
      </div>
    );
  }
}
