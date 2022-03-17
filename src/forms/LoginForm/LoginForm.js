import React, { useState }   from 'react';
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
import  PhoneInput   from '../../external/react-phone-input-2-master/src/index.js';
import AuthCode from 'react-auth-code-input';


import   '../../external/style.css';

const handleregister = ({ value }) => {
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
      "Email":document.getElementById("Email").value+"@trystate.com",
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
var nmber=localStorage.getItem("item");

  event.preventDefault();
   var settings = {
     "url": "http://test123444adasd-001-site1.htempurl.com/api/Values?number=" + nmber,
     "method": "POST",
     "timeout": 0,
   };

   $.ajax(settings).done(function (response) {
     if (response == true) {
      document.getElementById("login").classList.add(css.register)
      document.getElementById("verfiy").classList.remove(css.register)

     }
  });

}
function handlecode(event) {

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
     document.getElementById("Loginbutton").innerText = "Hi "+response.Profile.FirstName;
     document.getElementById("Popup").style.display = "none";
     document.getElementById("JoinButton").style.display = "none";

    //  let x = document.getElementById('Popup');
    
      // window.location.href = '/'
    }
    else{
      document.getElementById("verfiy").classList.add(css.register)
      document.getElementById("register").classList.remove(css.register)
     }
   
   });
}
var number=0;
function oncangeitem(value) {
localStorage.setItem("item",value);
}

var txes=0;
function oncangeitem2222(value) {
     txes=value;
    if(value.length==6)
    {
      handlecode();
    }


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
        <div >
           {/* *********************************** enter your number*************************************** */}
          <Form id="login" onSubmit={handleLogin}>
           <span className={css.joinLogin}>Join or Log in</span>
            <div>
              <div className={css.welcomeTeam}> Welcome to the Team.</div>
              <PhoneInput
                international
                placeholder="Enter your phone number"
                className={css.number}
                country={'us'}

                id="item"
                withCountryCallingCode
                value={value}
                onChange={oncangeitem}
                disableDropdown/>
                
              <div className={css.mobileMarginOflogin}>
               <PrimaryButton  className={css.onclick} type="submit" inProgress={submitInProgress} >
                Continue
                </PrimaryButton>
             </div>
             </div>
           
          </Form>
         {/* *********************************** Finish signing up*************************************** */}
         <Form id="register" className={css.register}  onSubmit={handleregister}>
              <span className={css.joinLogin}>Finish signing up</span>
            <div className={css.fixedDiv}>
              

              <FieldTextInput
                className={css.firstname}
                id='FirstName'
                name="FirstName"
                placeholder="First name"
              />
              <FieldTextInput
                className={css.LastName}
                id='lastname'
                name="LastName"
                placeholder="Last name"
              />
              <p  className={css.terms}>Make sure it matches the name on your governement ID.</p>
         

              <div className={css.userContainer} >
              <FieldTextInput
                className={css.UserName}
                id={formId ? `${formId}.UserName` : 'UserName'}
                name="UserName"
                placeholder="Username"
              />
              <label className={css.trystateSpan}>@trystate.com</label>
            </div>

              <FieldTextInput
                     className={css.birthDate}
                     type="date"
                     id='Birthdate'
                     name="date"
                      placeholder="Birthdate"
                       maxlength="10"
                      pattern= "^(1[0-2]|0?[1-9])[./-](3[01]|[12][0-9]|0?[1-9])[./-](?:[0-9]{2})?[0-9]{2}$" 
                /> 
                
              {/* <span>Birth Day</span>
              <FieldBirthdayInput

                className={css.phone}
                id={formId ? `${formId}.phoneNumber` : 'phoneNumber'}
                name="phoneNumber"
                label=""
                validate={phoneRequired}
              /> */}
              <p className={css.ageTerms}>To sign up, you need to be at least 16. Your birthday won't be shared publicly.</p>
            
            </div>
            <div className={css.bottomWrapper}>
              <div className={css.justifingPargraph}>
              <p className={css.bottomWrapperText}>
                By selecting <span className={css.agree}>Agree and continue</span> below, I agree to the  <span className={css.mobileJustifingPargraph}>TRYSTATE.FM  <a className={css.termsSrv}>Terms of Service</a>.</span></p>
                </div>
                
              <PrimaryButton className={css.onclick} type="submit" inProgress={submitInProgress} >
              Agree and continue
              </PrimaryButton>
             
            </div>
          </Form>
           {/* *********************************** ENTER THE CODE WE SENT YOU*************************************** */}
           <Form id='verfiy' onSubmit={handlecode} className={css.register}>
           <span className={css.joinLogin}>Confirm your number</span>
           <h2 className={css.enterCode}>Please enter the code we sent you.</h2>
            <AuthCode
             containerClassName={css.container}
             inputClassName={css.input}
              className={css.enterCode}
              // placeholder="Enter 6 digit here"
              value={value}
              onChange={oncangeitem2222} />
              <div className={css.resendCode}>
              <a>Resend code</a>
              </div>
            {/* <PrimaryButton className={css.onclick} type="submit" inProgress={submitInProgress} >
              Continue
            </PrimaryButton> */}
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
