'use client'

import { resetPassword } from '@/api/auth'
import ValidatedForm from '@/components/validatedForm'
import Link from 'next/link'
import { useState } from 'react'

export default function ResetPasswordPage() {
const fields = [
        { name: 'password', label: 'New Password', type: 'password' },
        { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
    ]
  const [submitted, setSubmitted] = useState(false)
  const handleResetSubmit = async (formData) => {

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    console.log(typeof token)
 
    if (token == null || token == false) {
      return { success: false, message: 'Missing or invalid token.' };
    }

    if (formData.password !== formData.confirmPassword) {
      return { success: false, message: 'Passwords do not match.' };
    }
    const result = await resetPassword({
      token,
      newPassword: formData.password,
    });
  
    if (result.success) {
      setSubmitted(true);
    } 
    return result
  };

    return (
      <>
      {
        submitted ? (
        <div className="flex items-center justify-items-center min-h-screen">
          <div className="w-full flex-col">
            <div className="flex w-full">
              <h1 className="mx-auto text-xl md:text-3xl p-1">
                Password Reset Successful 🎉
              </h1>
            </div>
            <div className="flex w-full h-10"></div>
            <div className="flex w-full mr-4">
              <p className="mx-auto flex text-md md:text-xl">
                You can now login with your new password.
              </p>
            </div>
            <div className="flex w-full mr-4">
              <div className="mx-auto mt-2">
                <span className="flex-col w-full">Login? </span>
                <Link href="/login" className="font-bold text-blue-400 hover:text-blue-600">Login now</Link>
              </div>
            </div>
          </div>
        </div>
        ) : (
        <div className="flex items-center justify-items-center min-h-screen">
          <div className="w-full flex-col">
            <div className="flex w-full">
              <h1 className="mx-auto text-3xl">
                Reset Password
              </h1>
            </div>
            <div className="flex p-1 w-full h-10">
            </div>
            <div className="flex lg:w-1/3 md:w-8/12 w-10/12  bg-white text-black rounded-2xl mx-auto p-1">
                <ValidatedForm
                    fields={fields}
                    onSubmit={handleResetSubmit} />
            </div>
          </div>
        </div>
        )
      }
    </>
  )
}
    
