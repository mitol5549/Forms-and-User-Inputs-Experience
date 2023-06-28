import { /* useRef, */ useState } from 'react';

import useInput from '../hooks/use-input';

const SimpleInput = props => {
  // const nameInputRef = useRef();
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(value => value.trim() !== '');

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredEmailIsValid = enteredEmail.includes('@');
  const emailInputIsValid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const emailInputChangeHandler = event => {
    setEnteredEmail(event.target.value);
  };

  const emailInputBlurHandler = event => {
    setEnteredEmailTouched(true);
  };

  const formSubmissionHandler = event => {
    event.preventDefault();

    if (!enteredNameIsValid && !enteredEmailIsValid) {
      return;
    }

    console.log(enteredName, enteredEmail);

    // const enteredValue = nameInputRef.current.value;
    // console.log(enteredValue);

    resetNameInput();

    setEnteredEmail('');
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputIsValid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          /* ref={nameInputRef} */
          type="text"
          id="name"
          onBlur={nameBlurHandler}
          onChange={nameChangedHandler}
          value={enteredName}
        />
        {nameInputHasError && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your E-Mail</label>
        <input
          type="email"
          id="email"
          onBlur={emailInputBlurHandler}
          onChange={emailInputChangeHandler}
          value={enteredEmail}
        />
        {emailInputIsValid && <p className="error-text">Please enter a valid E-Mail.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
