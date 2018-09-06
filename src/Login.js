import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { createCookie } from './CookieUtils.js'

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      username: '',
      password: '',
      errorMsg: ''
    };
  }

  // findCharacter(username, password) {
  //   let nextUrl = 'https://swapi.co/api/people/'
  //   let that = this
  //
  //   function callNext(nextUrl) {
  //     that.callApi(nextUrl).then(resp => {
  //       console.log('resp', resp);
  //       nextUrl = resp.next
  //       let obj = resp.results.find(o => o.name === username)
  //
  //       if (obj) {
  //         console.log(obj)
  //         if (obj.birth_year == password) {
  //           console.log('login')
  //         } else {
  //           that.setErrorMsg()
  //         }
  //       } else if (nextUrl) {
  //         callNext(nextUrl)
  //       } else {
  //         that.setErrorMsg()
  //       }
  //     })
  //   }
  //
  //   callNext(nextUrl)
  // }

  callApi(url) {
    return fetch(url).then((resp) => {
      return resp.json().then(data => {
        return data
      })
    })
  }

  setErrorMsg() {
    this.setState({
      errorMsg: 'Invalid username/password'
    })
  }

  setUsername(event) {
    this.setState({username: event.target.value})
  }

  setPassword(event) {
    this.setState({password: event.target.value})
  }

  login() {
    let password = this.state.password
    console.log(this.props);

    this.callApi(`https://swapi.co/api/people/?search=${this.state.username}`).then(resp => {
      let results = resp.results
      let character = results.find(obj => obj.name == this.state.username)
      if (character && character.birth_year == password) {
        console.log('login');
        createCookie('isAuthenticated', 'true')
        this.props.history.push('/search')
      } else {
        this.setErrorMsg()
      }
    })
  }

  render() {
    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Username
          </Col>
          <Col sm={6}>
            <FormControl placeholder="Username" value={this.state.username} onChange={this.setUsername}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={6}>
            <FormControl type="password" placeholder="Password" value={this.state.password} onChange={this.setPassword}/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button onClick={this.login}>Sign in</Button>
          </Col>
        </FormGroup>

        {this.state.errorMsg &&
          <div>{this.state.errorMsg}</div>
        }
      </Form>
    );
  }
}

export default Login;
