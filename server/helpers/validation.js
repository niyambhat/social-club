const validateEmail = (email) => {
  // Regular expression pattern for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email matches the pattern
  return emailPattern.test(email);
};

const validateLength = (value, minLength, maxLength) => {
  if (value.length > maxLength || value.length < minLength) {
    return false;
  }
  return true;
};

module.exports = { validateEmail, validateLength };
