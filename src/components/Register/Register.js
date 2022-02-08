import React from "react";
import { PropagateLoader } from "react-spinners";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      loading: false,
      isValid: true,
    };
  }

  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  onEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  onSubmitRegister = () => {
    const { name, email, password } = this.state;

    this.setState({ loading: true, isValid: true });

    fetch("https://radiant-chamber-25939.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        } else {
          this.setState({ loading: false, isValid: false });
        }
      })
      .catch((err) => {
        console.log("Unable to register");
      });
  };

  onHitEnter = (e) => {
    if (e.key === "Enter") {
      this.onSubmitRegister();
    }
  };

  render() {
    return (
      <div>
        <article className='br2 mv4 mw6 w-90 tc center shadow-3'>
          <main className='pa4 black-80'>
            <div className='measure'>
              <fieldset id='sign_up' className='ba b--transparent ph0 mh0 pb0'>
                <legend className='f2 fw6 ph0 mh0'>Register</legend>
                <div className='mt3'>
                  <label className='db fw6 lh-copy f6' htmlFor='name'>
                    Name
                  </label>
                  <input
                    className='border pa2 input-reset ba bg-transparent hover-white w-100'
                    type='text'
                    name='name'
                    id='name'
                    onChange={this.onNameChange}
                    onKeyPress={this.onHitEnter}
                  />
                </div>
                <div className='mt3'>
                  <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                    Email
                  </label>
                  <input
                    className='border pa2 input-reset ba bg-transparent hover-white w-100'
                    type='email'
                    name='email-address'
                    id='email-address'
                    onChange={this.onEmailChange}
                    onKeyPress={this.onHitEnter}
                  />
                </div>
                <div className='mv3'>
                  <label className='db fw6 lh-copy f6' htmlFor='password'>
                    Password
                  </label>
                  <input
                    className='border b pa2 input-reset ba bg-transparent hover-white w-100'
                    type='password'
                    name='password'
                    id='password'
                    onChange={this.onPasswordChange}
                    onKeyPress={this.onHitEnter}
                  />
                </div>
                {!this.state.isValid ? (
                  <div>
                    <p className='f7 red mt0 mb3'>All forms are required</p>
                  </div>
                ) : (
                  ""
                )}
              </fieldset>
              <div className=''>
                <input
                  onClick={this.onSubmitRegister}
                  className='border b ph3 pv2 input-button input-reset ba bg-transparent grow pointer f6 dib'
                  type='submit'
                  value='Register'
                />
              </div>
            </div>
          </main>
        </article>
        <div className='center'>
          <PropagateLoader loading={this.state.loading} color='#05aed6' />
        </div>
      </div>
    );
  }
}

export default Register;
