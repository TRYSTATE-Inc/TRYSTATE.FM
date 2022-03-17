import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { Form, PrimaryButton, FieldTextInput, NamedLink, FieldPhoneNumberInput, FieldBirthdayInput } from '../../components';
import * as validators from '../../util/validators';
import Input from 'react-phone-number-input/input'
// import 'react-phone-number-input/style.css'
import css from './LoginForm.module.css';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input'
import countryNames from 'react-phone-number-input/locale/en.json'
import $ from "jquery"; //babel
/*import PhoneInput from 'react-phone-number-input'*/
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import AuthCode from 'react-auth-code-input';
 


const handleregister = ({ value }) => {
var number=localStorage.getItem("number");

  event.preventDefault();
  var settings = {
    "url": "http://test123444adasd-001-site1.htempurl.com/api/Account/Register",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Authorization": "Bearer -7SfDUdkdTQeH_cQ8VqhN98q-bxErpYoEo4MqIrVAcyrB0O6tLLlFAxyseEALw_Vi-P-4vw5enKiKO5WRQZ5SRbsUkESZbesU7czKFzq27SmrgWCrZp9PVIEWj-c5oyE-1LqMSXusjQd_ahPFvjyNQqwnvbC0ttI2FFOrVuEGv0T4oZ96MiQa88QZQ9oEuJ4Y4FZ2Bkd3Elx7V8C-OYeKfdBPYs-9nGEqLHBA3w6CHuLrPE7rqXYG2enIGmvAeXIJnHBzSuBbvwwIKrS3cVz5XWQk0xezCpaoEeR445TgKDSAX-VKedBZH9n1k_4To67bJ4PszK5PGvqYOOucFO45a-OoEPM1yEIPlyvu2VBg6kdynBNPYzbt78QpcdPxXIq",
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "Email":document.getElementById("Email").value,
      "firstname":document.getElementById("FirstName").value,
      "lastname":document.getElementById("lastname").value,
      "mobilenumber":number,
      "BirthDate":document.getElementById("Birthdate").value,
      "Password":"P@ssw0rd",
      "ConfirmPassword":"P@ssw0rd",      
    }),
  };
  
  $.ajax(settings).done(function (response) {
  window.location.href = '/'
  });

};
function handleLogin(event) {
  event.preventDefault();
 
  var number = txes;

  var settings = {
    "url": "http://test123444adasd-001-site1.htempurl.com/api/Values?number=" + number,
    "method": "POST",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    if (response == true) {
   
      document.getElementById("login").style.display = "none";
      document.getElementById("verfiy").style.display = "";
      localStorage.setItem("number",txes);
      txes=0;

    }
  });

}
function handlecode(event) {
  event.preventDefault();
var number=localStorage.getItem("number");

   var settings = {
     "url": "http://test123444adasd-001-site1.htempurl.com/api/Values?code="+txes+"&mobileNumber="+number,
     "method": "POST",
     "timeout": 0,
   };

   $.ajax(settings).done(function (response) {
    if(!response.isOTPsuccessed)
    {
        alert("the OTP is incorrect !")
    } 
  else  if(response.ISuserregisted)
    {
      window.location.href = '/'
    }
    else{
     document.getElementById("verfiy").style.display = "none";
     document.getElementById("register").style.display = "";
    }
   });
}
var txes=0;
function oncangeitem(value) {
  txes=value;
  console.log(txes)

  // Outputs: United States
  // console.log(countryNames["US"])

  // Outputs: +1
  // console.log("+" + getCountryCallingCode("US"))


}
getCountryCallingCode("US");

const LoginFormComponent = props => (

  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        rootClassName,
        className,
        formId,
        value,
        setValue,
        handleSubmit,
        inProgress,
        intl,
        invalid,
      } = fieldRenderProps;

      // email
      const emailLabel = intl.formatMessage({
        id: 'LoginForm.emailLabel',
      });
      const emailPlaceholder = intl.formatMessage({
        id: 'LoginForm.emailPlaceholder',
      });
      const emailRequiredMessage = intl.formatMessage({
        id: 'LoginForm.emailRequired',
      });
      const emailRequired = validators.required(emailRequiredMessage);
      const emailInvalidMessage = intl.formatMessage({
        id: 'LoginForm.emailInvalid',
      });
      const emailValid = validators.emailFormatValid(emailInvalidMessage);
      const labels = { US: 'США' };


      // password
      const passwordLabel = intl.formatMessage({
        id: 'LoginForm.passwordLabel',
      });
      const passwordPlaceholder = intl.formatMessage({
        id: 'LoginForm.passwordPlaceholder',
      });
      const passwordRequiredMessage = intl.formatMessage({
        id: 'LoginForm.passwordRequired',
      });
      const passwordRequired = validators.requiredStringNoTrim(passwordRequiredMessage);
      const phoneLabel = intl.formatMessage({
        id: 'SignupForm.phoneLabel',
      });
      const phonePlaceholder = intl.formatMessage({
        id: 'SignupForm.phonePlaceholder',
      });
      const phoneRequiredMessage = intl.formatMessage({
        id: 'SignupForm.phoneRequired',
      });
      const phoneRequired = validators.required(phoneRequiredMessage);
      const classes = classNames(rootClassName || css.root, className);
      const submitInProgress = inProgress;
      const submitDisabled = invalid || submitInProgress;

      const passwordRecoveryLink = (
        <NamedLink name="PasswordRecoveryPage" className={css.recoveryLink}>
          <FormattedMessage id="LoginForm.forgotPassword" />
        </NamedLink>
      );

      return (
        <div className={css.POPup}>

          <Form id="login" onSubmit={handleLogin}>
            <span className={css.joinLogin}>Join or Log in</span>

            <div>
              <div style={{ color: '#000000', fontWeight: 'bold', marginBottom: "5%", fontSize: 20 }}> Welcome to the Team.</div>
              <PhoneInput
                international
                placeholder="Enter your phone number"
                className={css.number}
                country={'us'}

                id="item"
                withCountryCallingCode
                value={value}
                onChange={oncangeitem}
                disableDropdown />
              <PrimaryButton className={css.onclick} type="submit" inProgress={submitInProgress} >
                Continue
              </PrimaryButton>
            </div>
          </Form>
          <Form id="register" style={{ display: 'none' }} onSubmit={handleregister}>
            <span className={css.joinLogin}>Finish signing up</span>
            <div>


              <FieldTextInput
                className={css.firstname}
                id= "FirstName"
                name="FirstName"
                placeholder="First name"
              />
              <FieldTextInput
                className={css.LastName}
                id="lastname"
                name="LastName"
                placeholder="Last name"
              />
              <small className={css.terms}>Make sure it matches the name on your governement ID.</small>


              <FieldTextInput
                className={css.UserName}
                id="Email"
                name="UserName"
                placeholder="Username"
              />

              <FieldTextInput
                className={css.birthDate}
                id="Birthdate"
                type="date"
                name="date"
                placeholder="Birthdate"
                maxlength="10"
                pattern="^(1[0-2]|0?[1-9])[./-](3[01]|[12][0-9]|0?[1-9])[./-](?:[0-9]{2})?[0-9]{2}$"
              />
              {/* <span>Birth Day</span>
              <FieldBirthdayInput

                className={css.phone}
                id={formId ? `${formId}.phoneNumber` : 'phoneNumber'}
                name="phoneNumber"
                label=""
                validate={phoneRequired}
              /> */}
              <small className={css.terms}>To sign up, you need to be at least 16. Your birthday won't be shared publicly.</small>

            </div>
            <div className={css.bottomWrapper}>
              <div className={css.justifingPargraph}>
                <p className={css.bottomWrapperText}>
                  By selecting <span className={css.agree}>Agree and continue</span> below, I agree to the TRYSTATE.FM  <a className={css.termsSrv}>Terms of Service</a>.</p>
              </div>
              <PrimaryButton className={css.onclick} type="submit" inProgress={submitInProgress} >
                Continue
              </PrimaryButton>
            </div>
          </Form>
          <Form id='verfiy' onSubmit={handlecode} style={{ display: 'none' }}>
            <span className={css.joinLogin}>Confirm your number</span>
            <h2 className={css.enterCode}>Please enter the code we sent you.</h2>
            <AuthCode
              containerClassName={css.container}
              inputClassName={css.input}
              className={css.enterCode}
              // placeholder="Enter 6 digit here"
              value={value}
              onChange={oncangeitem} />
            <PrimaryButton className={css.onclick} type="submit" inProgress={submitInProgress} >
              Continue
            </PrimaryButton>
          </Form>
        </div>
      );
    }}
  />
);

LoginFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  form: null,
  inProgress: false,
};

const { string, bool } = PropTypes;

LoginFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  form: string,
  inProgress: bool,
  intl: intlShape.isRequired,
};

const LoginForm = compose(injectIntl)(LoginFormComponent);
LoginForm.displayName = 'LoginForm';

export default LoginForm;
