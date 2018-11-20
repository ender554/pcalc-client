import React from "react";
import {Redirect} from 'react-router-dom';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../actions/users';
import Input from './input';
import { login } from '../actions/auth';
import { required, nonEmpty, length, isTrimmed } from '../validators';
import './login.css';

const passwordLength = length({ min: 10, max: 72 });

export class LoginForm extends React.Component {
  onSubmitLogin(values) {
    return this.props.dispatch(login(values.username, values.password))
  }
  onSubmitRegister(values) {
    const { username, password } = values;
    const user = { username, password };

    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>
        {error}
        <label htmlFor="username">User Name</label>
        <Field
          component={Input}
          type="text"
          name="username"
          id="username"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <label htmlFor="password">Password</label>
        <Field
          component={Input}
          type="password"
          name="password"
          id="password"
          validate={[required, nonEmpty, passwordLength, isTrimmed]}
        />
        <button type="submitLogin" onClick={this.props.handleSubmit(values => 
            this.onSubmitLogin(values)
          )} >Log In</button>
        <button type="submitRegister" onClick={this.props.handleSubmit(values =>
          this.onSubmitRegister(values)
        )}>Register</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm)