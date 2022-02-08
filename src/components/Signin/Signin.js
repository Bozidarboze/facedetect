import React from "react";
import { PropagateLoader } from "react-spinners";

class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signInEmail: "",
      signInPassword: "",
      loading: false,
      isValid: true,
    };
  }

  onEmailChange = (e) => {
    this.setState({ signInEmail: e.target.value });
  };

  onPasswordChange = (e) => {
    this.setState({ signInPassword: e.target.value });
  };

  onSubmitSignIn = () => {
    this.setState({ loading: true });
    this.setState({ isValid: true });
    fetch("https://radiant-chamber-25939.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          this.props.loadUser(data);
          this.props.onRouteChange("home");
        } else {
          this.setState({ isValid: false, loading: false });
        }
      })
      .catch(() => {
        console.log("Failed to sign in");
      });
  };

  onHitEnter = (e) => {
    if (e.key === "Enter") {
      this.onSubmitSignIn();
    }
  };

  render() {
    return (
      <div>
        <article className='br2 mv4 mw6 w-90 tc center shadow-3'>
          <main className='pa4 black-80'>
            <div className='measure'>
              <fieldset id='sign_up' className='ba b--transparent ph0 mh0 pb0'>
                <legend className='f2 fw6 ph0 mh0'>Sign In</legend>
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
              </fieldset>
              {!this.state.isValid ? (
                <div>
                  <p className='f7 red mt0 mb3'>Wrong email or password</p>
                </div>
              ) : (
                ""
              )}
              <div>
                <input
                  onClick={this.onSubmitSignIn}
                  className='border b ph3 pv2 input-button input-reset ba bg-transparent grow pointer f6 dib'
                  type='submit'
                  value='Sign in'
                />
              </div>
              <div className='lh-copy mt3'>
                <p onClick={() => this.props.onRouteChange("register")} href='' className='f6 pointer link dim db'>
                  Register
                </p>
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

export default Signin;
