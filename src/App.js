import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Particles from "react-particles-js";
import Rank from "./components/Rank/Rank";
import FaceDetection from "./components/FaceDetection/FaceDetection";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import "./App.css";

const particleParams = {
  particles: {
    number: {
      value: 3,
      density: {
        enable: true,
        value_area: 100,
      },
    },
  },
};

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onRouteChange = (route) => {
    if (route === "home") {
      this.setState({ isSignedIn: true });
    } else {
      this.setState(initialState);
    }
    this.setState({ route: route });
  };

  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    fetch("https://radiant-chamber-25939.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        fetch("https://radiant-chamber-25939.herokuapp.com/image", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: this.state.user.id,
          }),
        })
          .then((response) => response.json())
          .then((count) => {
            this.setState(Object.assign(this.state.user, { entries: count }));
          });

        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log("Cannot access API"));
  };

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  render() {
    return (
      <div className='container'>
        <Particles className='particles' params={particleParams} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceDetection box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : this.state.route === "register" ? (
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
