export function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex?.test(email);
}

export function isUsernameValid(username) {
  const userNameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  return userNameRegex?.test(username);
}

export function isPhoneNumberValid(phoneNumber) {
  const phoneRegex = /^\d{7,15}$/;
  return phoneRegex?.test(phoneNumber);
}

export function isPasswordValid(password) {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  return passwordRegex.test(password);
}

export function isNumber(input) {
  return !isNaN(input) && isFinite(input);
}

export function validatePassword(password) {
  if (!password) {
    return 'Password is required.';
  }
  if (password?.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  if (!/[A-Z]/?.test(password)) {
    return 'Password must contain at least one uppercase letter.';
  }
  if (!/[a-z]/?.test(password)) {
    return 'Password must contain at least one lowercase letter.';
  }
  if (!/\d/?.test(password)) {
    return 'Password must contain at least one number.';
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/?.test(password)) {
    return 'Password must contain at least one special character.';
  }
  return null;
}

export function validateName(name) {
  if (!name) {
    return 'Name is required.';
  }
  if (name?.length < 2) {
    return 'Name must be at least 2 characters long.';
  }
  if (!/^[a-zA-Z\s]+$/?.test(name)) {
    return 'Name must contain only alphabets and spaces.';
  }
  if (name?.trim()?.length === 0) {
    return 'Name cannot be just spaces.';
  }
  return null;
}

export function validateEmail(email) {
  if (!email) {
    return 'Email is required.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter valid email';
  }
  return null;
}

export function validateConfirmPassword(
  password,
  confirmPassword,
) {
  if (!confirmPassword) {
    return 'Re-Type password is required.';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }
  return null;
}
