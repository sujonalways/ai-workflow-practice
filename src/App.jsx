import { useState } from 'react'
import './App.css'
import { validateAccountForm } from './accountValidation.js'

const initialValues = { fullName: '', email: '', newPassword: '', confirmPassword: '' }

function App() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState('')

  const updateField = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setSuccess('')
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }))
    if (name === 'newPassword' && errors.confirmPassword) {
      setErrors((current) => ({ ...current, confirmPassword: '' }))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validateAccountForm(values)
    setErrors(nextErrors)
    setSuccess('')
    if (Object.keys(nextErrors).length > 0) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus()
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => window.setTimeout(resolve, 650))
    setIsSubmitting(false)
    setSuccess('Your account settings have been updated.')
    setValues((current) => ({ ...current, newPassword: '', confirmPassword: '' }))
    setShowPassword(false)
    setShowConfirmation(false)
  }

  const fieldClass = (field) => `form-field${errors[field] ? ' has-error' : ''}`

  return (
    <main className="settings-page">
      <div className="page-topline"><a className="wordmark" href="#account" aria-label="Forma home"><span className="wordmark-icon">f</span> forma</a><span className="top-note"><span className="online-dot"/> All changes are private</span></div>
      <section className="settings-card" aria-labelledby="page-title">
        <header className="card-header">
          <div className="header-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.2 3.1-5 7-5s6.2 1.8 7 5"/></svg></div>
          <div className="eyebrow">YOUR ACCOUNT</div>
          <h1 id="page-title">Account settings</h1>
          <p>Keep your personal details and sign-in information up to date.</p>
        </header>

        <form className="account-form" onSubmit={handleSubmit} noValidate>
          <div className={fieldClass('fullName')}>
            <label htmlFor="fullName">Full name</label>
            <input id="fullName" name="fullName" type="text" autoComplete="name" placeholder="e.g. Jordan Davis" value={values.fullName} onChange={updateField} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'fullName-error' : undefined} />
            {errors.fullName && <span className="field-error" id="fullName-error" role="alert">{errors.fullName}</span>}
          </div>

          <div className={fieldClass('email')}>
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={updateField} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
            {errors.email && <span className="field-error" id="email-error" role="alert">{errors.email}</span>}
          </div>

          <div className={fieldClass('newPassword')}>
            <label htmlFor="newPassword">New password</label>
            <div className="password-control">
              <input id="newPassword" name="newPassword" type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder="At least 8 characters" value={values.newPassword} onChange={updateField} aria-invalid={Boolean(errors.newPassword)} aria-describedby={errors.newPassword ? 'newPassword-error password-hint' : 'password-hint'} />
              <button type="button" className="visibility-button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide new password' : 'Show new password'} aria-pressed={showPassword}>{showPassword ? 'Hide' : 'Show'}</button>
            </div>
            <span className="field-hint" id="password-hint">Use at least 8 characters.</span>
            {errors.newPassword && <span className="field-error" id="newPassword-error" role="alert">{errors.newPassword}</span>}
          </div>

          <div className={fieldClass('confirmPassword')}>
            <label htmlFor="confirmPassword">Confirm password</label>
            <div className="password-control">
              <input id="confirmPassword" name="confirmPassword" type={showConfirmation ? 'text' : 'password'} autoComplete="new-password" placeholder="Re-enter your new password" value={values.confirmPassword} onChange={updateField} aria-invalid={Boolean(errors.confirmPassword)} aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined} />
              <button type="button" className="visibility-button" onClick={() => setShowConfirmation((visible) => !visible)} aria-label={showConfirmation ? 'Hide confirmation password' : 'Show confirmation password'} aria-pressed={showConfirmation}>{showConfirmation ? 'Hide' : 'Show'}</button>
            </div>
            {errors.confirmPassword && <span className="field-error" id="confirmPassword-error" role="alert">{errors.confirmPassword}</span>}
          </div>

          <div className="privacy-note"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg><span>Your password is only used to update your sign-in details and is never displayed.</span></div>
          <button className="submit-button" type="submit" disabled={isSubmitting}>{isSubmitting ? <><span className="spinner" aria-hidden="true"/> Saving changes…</> : 'Save changes'}</button>
          <div className="form-feedback" aria-live="polite" role={success ? 'status' : undefined}>{success}</div>
        </form>
      </section>
      <footer className="page-footer"><span>© 2024 Forma, Inc.</span><span>Need help? <a href="mailto:support@forma.example">Contact support</a></span></footer>
    </main>
  )
}

export default App
