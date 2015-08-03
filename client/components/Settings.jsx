Settings = React.createClass({
  render() {
    return (
      <div>
        <Profile ionModal={this.props.ionModal} />
        <SettingsList ionModal={this.props.ionModal} />
      </div>
    )
  }
});

Profile = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    if (Meteor.loggingIn() || !Meteor.user()) {this.setState({loginStatus: false})};
    if (Meteor.user()) {this.setState({loginStatus: true})};
    return {
      user: Meteor.user(),
      userLoading: Meteor.loggingIn()
    }
  },
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.loginStatus !== this.state.loginStatus;
  },
  getInitialState() {
    return {
      loginStatus: false
    }
  },
  render() {
    if (this.data.userLoading) {
      return <AppLoading />
    }
    if (!this.data.user) {
      return <h2>Please Log in.</h2>
    }
    return (
      <div className="profile-wrapper">
        <div className="image-wrapper">
          <img src={this.data.user.profile.image} />
        </div>
        <div className="login-wrapper">
          {this.state.loginStatus ? <LoggedIn ionModal={this.props.ionModal} /> : <NotLoggedIn ionModal={this.props.ionModal} />}
        </div>
      </div>
    )
  }
})

LoggedIn = React.createClass({
  logout() {
    Meteor.logout();
  },
  render() {
    return (
      <div>
        <a onClick={this.logout}>Logout</a>
      </div>
    )
  }
})

NotLoggedIn = React.createClass({
  login(user, pass) {
    Meteor.loginWithPassword(user, pass);
  },
  render() {
    return <a>Login</a>
  }
})

SettingsList = React.createClass({
  getDefaultProps() {
    return {
      settings: ["Setting 1", "Setting 2", "Setting 3"]
    }
  },
  render() {
    let list = this.props.settings.map((setting) => {
      return (
        <div onClick={this.props.ionModal.bind(null, setting)} className="item" key={setting}>
          <h2><a>{setting}</a></h2>
        </div>
      )
    })
    return (
      <div className="list">
        {list}
      </div>
    )
  }
})
