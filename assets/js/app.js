/* =================================================================
                     [ Show Password ]
==================================================================*/
const viewBtn = document.querySelectorAll('.view__password');
for (let i = 0; i < viewBtn.length; i++) {
  viewBtn[i].addEventListener('click', e => {
    e.preventDefault();
    let parent = e.target.parentElement,
      input = parent.querySelector('.input__style');
    if (input.getAttribute('type') === 'password') {
      input.setAttribute('type', 'text');
      viewBtn[i].classList.add('show');
    } else {
      input.setAttribute('type', 'password');
      viewBtn[i].classList.remove('show');
    }
  })
}

/* =================================================================
                         [ Change Panel ]
==================================================================*/
const registerBtn = document.querySelector('#register-btn'),
  loginBtn = document.querySelector('#login-btn'),
  containerPanel = document.querySelector('.container-panel');

registerBtn.addEventListener('click', e => {
  e.preventDefault();
  containerPanel.classList.add('right-panel-active');
})

loginBtn.addEventListener('click', e => {
  e.preventDefault();
  containerPanel.classList.remove('right-panel-active');
})

/* =================================================================
                   [ Login & Register Validate ]
==================================================================*/
// Everything related to the validation field 
class ValidateField {
  validateEmail(field) {
    let emailText = field.value,
      errorText = field.parentElement.nextElementSibling;
    if (emailText.trim() === '') {
      errorText.textContent = 'ایمیل نمی تواند خالی باشد';
      field.classList.add('error');
    } else {
      if (!validateField.isValidateEmail(emailText.trim())) {
        errorText.textContent = 'ایمیل وارد شده معتبر نمی باشد'
        field.classList.add('error');
      } else {
        errorText.textContent = ''
        field.classList.remove('error');
      }
    }
  }

  validatePassword(field) {
    let passwordText = field.value,
      errorText = field.parentElement.nextElementSibling;
    if (passwordText.trim() === '') {
      errorText.textContent = 'رمز عبور نمی تواند خالی باشد'
      field.classList.add('error');
    } else {
      if (passwordText.length < 6) {
        errorText.textContent = 'رمز عبور باید حداقل شامل 6 کاراکتر باشد'
        field.classList.add('error');
      } else if (passwordText.length > 30) {
        errorText.textContent = 'رمز عبور باید حداکثر شامل 30 کاراکتر باشد'
        field.classList.add('error');
      } else {
        errorText.textContent = '';
        field.classList.remove('error');
      }
    }
  }

  validateUsername(field) {
    let usernameText = field.value,
      errorText = field.parentElement.nextElementSibling;
    if (usernameText.trim() === '') {
      errorText.textContent = 'نام کاربری نمی تواند خالی باشد'
      field.classList.add('error');
    } else {
      if (usernameText.length < 5) {
        errorText.textContent = 'نام کاربری باید حداقل شامل 5 کاراکتر باشد'
        field.classList.add('error');
      } else if (!validateField.isValidateUserName(usernameText.trim())) {
        errorText.textContent = 'نام کاربری فقط می تواند شامل حروف انگلیسی باشد'
        field.classList.add('error');
      } else {
        errorText.textContent = '';
        field.classList.remove('error');
      }
    }
  }

  validatePhone(field) {
    let phoneText = field.value,
      errorText = field.parentElement.nextElementSibling;
    if (phoneText.trim() === '') {
      errorText.textContent = 'موبایل نمی تواند خالی باشد'
      field.classList.add('error');
    } else {
      if (phoneText.length < 11 || !validateField.isValidatePhone(phoneText.trim())) {
        errorText.textContent = 'موبایل اشتباه است'
        field.classList.add('error');
      } else {
        errorText.textContent = '';
        field.classList.remove('error');
      }
    }
  }

  isValidateEmail = (email) => {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
  }

  isValidateUserName(username) {
    return /^[a-zA-Z0-9]+$/.test(username)
  }

  isValidatePhone(phone) {
    return /^0[0-9]+$/.test(phone)
  }

}

// Everything related to the html ui 
class HtmlUi {
  showSpinner(btn) {
    let spinnerSpin = btn.querySelector('.spinner-box__spin'),
      spinnerCheck = btn.querySelector('.spinner-box__check');
    btn.children[0].classList.add('active');
    btn.disabled = true;
    setTimeout(() => {
      spinnerSpin.classList.add('hide')
      spinnerCheck.classList.add('active')
      setTimeout(() => {
        btn.children[0].classList.remove('active');
        spinnerCheck.classList.remove('active')
        spinnerSpin.classList.remove('hide')
        btn.disabled = false;
      }, 1200);
    }, 1500);
  }
}

// Variables
const formLogin = document.querySelector('#form-login'),
  formRegister = document.querySelector('#form-register'),
  formRecover = document.querySelector('#form-recover'),
  emailLogin = document.querySelector('#email-login'),
  passwordLogin = document.querySelector('#password-login'),
  usernameRegister = document.querySelector('#username-register'),
  phoneRegister = document.querySelector('#phone-register'),
  emailRegister = document.querySelector('#email-register'),
  passwordRegister = document.querySelector('#password-register'),
  emailRecover = document.querySelector('#email-recover'),
  validateField = new ValidateField(),
  html = new HtmlUi();


emailLogin.addEventListener('blur', () => {
  validateField.validateEmail(emailLogin)
});

passwordLogin.addEventListener('blur', () => {
  validateField.validatePassword(passwordLogin)
});

emailRegister.addEventListener('blur', () => {
  validateField.validateEmail(emailRegister)
});

passwordRegister.addEventListener('blur', () => {
  validateField.validatePassword(passwordRegister)
});

usernameRegister.addEventListener('blur', () => {
  validateField.validateUsername(usernameRegister)
});

phoneRegister.addEventListener('blur', () => {
  validateField.validatePhone(phoneRegister)
});

emailRecover.addEventListener('blur', () => {
  validateField.validateEmail(emailRecover)
});

// validate form login when submit
formLogin.addEventListener('submit', e => {
  e.preventDefault();
  validateField.validateEmail(emailLogin)
  validateField.validatePassword(passwordLogin)
  let error = formLogin.querySelectorAll('.error');
  btnSubmit = formLogin.querySelector('.btn__style');
  if (error.length === 0) {
    html.showSpinner(btnSubmit)
    setTimeout(() => {
      formLogin.reset()
    }, 2700);
  }
})

// validate form register when submit
formRegister.addEventListener('submit', e => {
  e.preventDefault();
  validateField.validateEmail(emailRegister)
  validateField.validatePassword(passwordRegister)
  validateField.validateUsername(usernameRegister)
  validateField.validatePhone(phoneRegister)
  let error = formRegister.querySelectorAll('.error');
  btnSubmit = formRegister.querySelector('.btn__style');
  if (error.length === 0) {
    html.showSpinner(btnSubmit)
    setTimeout(() => {
      formRegister.reset()
    }, 2700);
  }
})

// validate form recover when submit
formRecover.addEventListener('submit', e => {
  e.preventDefault();
  validateField.validateEmail(emailRecover)
  let error = formRecover.querySelectorAll('.error');
  btnSubmit = formRecover.querySelector('.btn__style');
  if (error.length === 0) {
    html.showSpinner(btnSubmit)
    setTimeout(() => {
      formRecover.reset()
    }, 2700);
  }
})