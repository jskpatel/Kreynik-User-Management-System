import SignInForm from '@/components/auth/SignInForm'
import { Metadata } from 'next'
import React, { ReactElement } from 'react'

export const metadata: Metadata = {
  title: "User Management || KreyNik",
  description: "A secure and scalable system for managing user identities, roles, and access permissions efficiently."
}

const SignIn = (): ReactElement => {
  return <SignInForm />
}

export default SignIn