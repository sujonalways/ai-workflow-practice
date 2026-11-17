import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'

function fillValidForm() {
  fireEvent.change(screen.getByLabelText('Full name'), { target: { value: 'Jordan Davis' } })
  fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'jordan@example.com' } })
  fireEvent.change(screen.getByLabelText('New password'), { target: { value: 'strongpass123' } })
  fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'strongpass123' } })
}

describe('Account settings form', () => {
  it('shows associated validation messages and blocks invalid submission', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Save changes' }))
    expect(await screen.findByText('Enter your full name.')).toBeInTheDocument()
    expect(screen.getByText('Enter your email address.')).toBeInTheDocument()
    expect(screen.getByText('Your password must be at least 8 characters.')).toBeInTheDocument()
    expect(screen.getByText('Confirm your new password.')).toBeInTheDocument()
    expect(screen.getByLabelText('Full name')).toHaveFocus()
    expect(screen.queryByText('Your account settings have been updated.')).not.toBeInTheDocument()
  })

  it('toggles password visibility accessibly', async () => {
    const user = userEvent.setup()
    render(<App />)
    const password = screen.getByLabelText('New password')
    expect(password).toHaveAttribute('type', 'password')
    await user.click(screen.getByRole('button', { name: 'Show new password' }))
    expect(password).toHaveAttribute('type', 'text')
    await user.click(screen.getByRole('button', { name: 'Hide new password' }))
    expect(password).toHaveAttribute('type', 'password')
  })

  it('rejects mismatched passwords and clears the error when corrected', async () => {
    const user = userEvent.setup()
    render(<App />)
    fillValidForm()
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'not-the-same' } })
    await user.click(screen.getByRole('button', { name: 'Save changes' }))
    expect(await screen.findByText('Passwords do not match.')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'strongpass123' } })
    expect(screen.queryByText('Passwords do not match.')).not.toBeInTheDocument()
  })

  it('shows saving feedback and a success message without retaining password values', async () => {
    const user = userEvent.setup()
    render(<App />)
    fillValidForm()
    await user.click(screen.getByRole('button', { name: 'Save changes' }))
    expect(screen.getByRole('button', { name: 'Saving changes…' })).toBeDisabled()
    expect(await screen.findByRole('status', {}, { timeout: 2000 })).toHaveTextContent('Your account settings have been updated.')
    expect(screen.getByLabelText('New password')).toHaveValue('')
    expect(screen.getByLabelText('Confirm password')).toHaveValue('')
  })
})
