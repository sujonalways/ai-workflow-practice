const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateAccountForm({ fullName, email, newPassword, confirmPassword }) {
  const errors = {}
  if (!fullName.trim()) errors.fullName = 'Enter your full name.'
  if (!email.trim()) errors.email = 'Enter your email address.'
  else if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Enter a valid email address.'
  if (newPassword.length < 8) errors.newPassword = 'Your password must be at least 8 characters.'
  if (!confirmPassword) errors.confirmPassword = 'Confirm your new password.'
  else if (confirmPassword !== newPassword) errors.confirmPassword = 'Passwords do not match.'
  return errors
}
