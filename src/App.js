import React from 'react';
import './App.css';
import promo from "./promo.json";
import logo from "./assets/logo.png"
import info from "./assets/info.png"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      status: 'Teacher',
      newsLetterSub: true,
      agreeConditions: false,

      emailError: '',
      passwordError: '',
      agreeConditionsError: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Affiche la date en format dd/mm/yyyy
  formatDate(date) {
    return new Date(date).toLocaleString().split(',')[0]
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // Verifications
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (name === "email") {
      if (value.length === 0 || !value.match(emailRegex)) {
        this.setState({emailError: 'Please enter a valid email address'});
      } else this.setState({emailError: ''});
    } else if (name === "password") {
      if (value.length < 8) {
        this.setState({passwordError: 'Your password must be at least 8 characters long'});
      } else this.setState({passwordError: ''});
    } else if (name === "passwordConfirmation") {
      if (value !== this.state.password) {
        this.setState({passwordError: 'Passwords do not match'});
      } else this.setState({passwordError: ''});
    } else if (name === "agreeConditions") {
      if (!value) {
        this.setState({agreeConditionsError: 'You must agree to the terms and conditions'});
      } else this.setState({agreeConditionsError: ''});
    }

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    if (!this.state.email || !this.state.password || !this.state.passwordConfirmation) {
      alert('You must fill all the required fields');
      event.preventDefault();
    } else if (this.state.emailError || this.state.passwordError) {
      alert(this.state.emailError + '\n' + this.state.passwordError);
      event.preventDefault();
    } else if (!this.state.agreeConditions) {
      this.setState({agreeConditionsError: 'You must agree to the terms and conditions'});
      event.preventDefault();
    } else {
      alert(`Successfully registered!\n
      Firstname: ${this.state.firstname}\n
      Lastname: ${this.state.Lastname}\n
      Email: ${this.state.email}\n
      Status: ${this.state.status}\n
      Subscribed to newsletter: ${this.state.newsLetterSub ? 'YES' : 'NO'}`)
    }
  }

  render () {
    return (
      <div className="p-2">
        <header>
          <img src={logo} className="h-12 mb-4" alt="logo" />
          <div className="flex flex-row max-w-max border-2 border-blue-400 py-1 px-2 mb-4 rounded items-center">
            <img src={info} className="h-20 mr-4" alt="logo" />
            <div>
              <h1>Next promotion</h1>
              <p><span className="denominator">Name</span> : {promo.nom}</p>
              <p><span className="denominator">Training start</span> : {this.formatDate(promo.startDate)}</p>
              <p><span className="denominator">Training end</span> : {this.formatDate(promo.endDate)}</p>
            </div>
          </div>
        </header>

        <body>
          <h1>Register form</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="input-field">
              <label>Firstname</label>
              <input
                type="text"
                name="firstname"
                value={this.state.firstname}
                onChange={this.handleChange}
                className="text-field" />
            </div>
            <div className="input-field">
              <label>Lastname</label>
              <input
                type="text"
                name="lastname"
                value={this.state.lastname}
                onChange={this.handleChange}
                className="text-field" />
            </div>
            <div className="input-field">
              <label>Email <span className="text-red-600">*</span></label>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                className="text-field" />
            </div>
            <p className="error-message">{this.state.emailError}</p>
            <div className="input-field">
              <label>Password <span className="text-red-600">*</span></label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                className="text-field" />
            </div>
            <div className="input-field">
              <label>Confirm Password <span className="text-red-600">*</span></label>
              <input
                type="password"
                name="passwordConfirmation"
                value={this.state.passwordConfirmation}
                onChange={this.handleChange}
                className="text-field" />
            </div>
            <p className="error-message">{this.state.passwordError}</p>
            <div className="input-field">
              <label>Status</label>
              <select name="status" value={this.state.status} onChange={this.handleChange} className="text-field">
                <option value="Teacher">Teacher</option>
                <option value="Assistant Teacher">Assistant Teacher</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <div className="flex flex-row items-center">
              <input
                name="newsLetterSub"
                type="checkbox"
                checked={this.state.newsLetterSub}
                onChange={this.handleChange}
                className="h-4 w-4" />
              <p className="ml-2 font-medium">Subscribe to Newsletter</p>
            </div>
            <div className="flex flex-row items-center">
              <input
                name="agreeConditions"
                type="checkbox"
                checked={this.state.agreeConditions}
                onChange={this.handleChange}
                className="h-4 w-4" />
              <p className="ml-2 font-medium">I have read and agree to the terms and conditions <span className="text-red-600">*</span></p>
            </div>
            <p className="error-message">{this.state.agreeConditionsError}</p>
            <input
              type="submit"
              value="Submit"
              className="p-3 mt-3 border-2 border-blue-400 rounded-md text-blue-400 font-semibold bg-white hover:bg-blue-400 hover:text-white" />
          </form>
        </body>
      </div>
    );
  }
}

export default App;
