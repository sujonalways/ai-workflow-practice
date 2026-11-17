import { describe, expect, it } from 'vitest'
import { validateAccountForm } from './accountValidation.js'

const validForm = {
  fullName: 'Jordan Davis',
  email: 'jordan@example.com',
  newPassword: 'password123',
  confirmPassword: 'password123',
}

describe('validateAccountForm', () => {
  it('requires a non-empty full name', () => {
    expect(validateAccountForm({ ...validForm, fullName: '  ' }).fullName).toBe('Enter your full name.')
  })

  it('rejects malformed email addresses', () => {
    expect(validateAccountForm({ ...validForm, email: 'jordan@invalid' }).email).toBe('Enter a valid email address.')
  })

  it('requires at least eight password characters', () => {
    expect(validateAccountForm({ ...validForm, newPassword: 'short', confirmPassword: 'short' }).newPassword).toMatch(/at least 8/)
  })

  it('requires confirmation and exact password match', () => {
    expect(validateAccountForm({ ...validForm, confirmPassword: '' }).confirmPassword).toBe('Confirm your new password.')
    expect(validateAccountForm({ ...validForm, confirmPassword: 'different123' }).confirmPassword).toBe('Passwords do not match.')
  })

  it('returns no errors for valid values and accepts a valid address with surrounding whitespace', () => {
    expect(validateAccountForm({ ...validForm, email: ' jordan@example.com ' })).toEqual({})
  })
})
