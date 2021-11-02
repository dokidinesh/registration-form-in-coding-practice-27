// Write your JS code here
import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    showFirstNameError: false,
    showLastNameError: false,
    isFormSubmitted: false,
  }

  onChangeFirstName = event => {
    const value = event.target.value
    this.setState({firstName: value})
  }

  onChangeLastName = event => {
    const value = event.target.value
    this.setState({lastName: value})
  }

  isValidFirstName = () => {
    const {firstName} = this.state
    return firstName !== ''
  }

  isValidLastName = () => {
    const {lastName} = this.state
    return lastName !== ''
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.isValidFirstName()
    this.setState({showFirstNameError: !isValidFirstName})
  }

  onBlurLastName = () => {
    const isValidLastName = this.isValidLastName()
    this.setState({showLastNameError: !isValidLastName})
  }

  renderFirstName = () => {
    const {firstName, showFirstNameError} = this.state
    const className = showFirstNameError ? 'input error-input' : 'input'

    return (
      <div className="input-container">
        <label htmlFor="first" className="label">
          FIRST NAME
        </label>
        <input
          className={className}
          type="text"
          placeholder="First name"
          id="first"
          onBlur={this.onBlurFirstName}
          onChange={this.onChangeFirstName}
          value={firstName}
        />
      </div>
    )
  }

  renderLastName = () => {
    const {lastName, showLastNameError} = this.state
    const className = showLastNameError ? 'input error-input' : 'input'
    return (
      <div className="input-container">
        <label htmlFor="last" className="label">
          LAST NAME
        </label>
        <input
          className={className}
          type="text"
          placeholder="Last name"
          id="last"
          onBlur={this.onBlurLastName}
          onChange={this.onChangeLastName}
          value={lastName}
        />
      </div>
    )
  }

  submitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.isValidFirstName()
    const isValidLastName = this.isValidLastName()

    if (isValidFirstName && isValidLastName) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showFirstNameError: !isValidFirstName,
        showLastNameError: !isValidLastName,
        isFormSubmitted: false,
      })
    }
  }

  renderRegistrationForm = () => {
    const {showFirstNameError, showLastNameError} = this.state
    return (
      <form onSubmit={this.submitForm} className="form-container">
        {this.renderFirstName()}
        {showFirstNameError && <p className="error-message">Required</p>}
        {this.renderLastName()}
        {showLastNameError && <p className="error-message">Required</p>}
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    )
  }

  onClickSubmitAnotherResponse = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      firstName: '',
      lastName: '',
    }))
  }

  renderSubmissionSuccessView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
      />
      <p>Submitted Successfully</p>
      <button
        className="button"
        type="button"
        onClick={this.onClickSubmitAnotherResponse}
      >
        Submit Another Response
      </button>
    </>
  )

  render() {
    const {isFormSubmitted} = this.state

    return (
      <div className="app-container">
        <h1 className="heading">Registration</h1>
        <div className="view-container">
          {isFormSubmitted
            ? this.renderSubmissionSuccessView()
            : this.renderRegistrationForm()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
