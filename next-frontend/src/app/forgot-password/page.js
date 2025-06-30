"use client"
import { forgotPassword } from '../../api/auth';
import Link from 'next/link';
import ValidatedForm from '@/components/validatedForm';
import { useState } from 'react';

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);

  const fields = [
    { name: 'email', label: 'Email', type: 'email' }
  ];

  const handleSubmit = async (formData) => {
    const result = await forgotPassword(formData);

    if (result.success) {
      setSubmitted(true);
    } 
    
    return result
  };

  return (
    <div className="flex items-center justify-items-center min-h-screen">
      <div className="w-full flex-col">
        <div className="flex w-full">
          <h1 className="mx-auto text-3xl">
            Forgot your password?
          </h1>
        </div>
        {submitted ? (
            <>
                <div className="flex p-1 w-full">
                    <h1 className="mx-auto text-md md:text-xl py-5 font-bold pt-8">
                        Please click on the email confirmation link
                    </h1>
                </div>
            </>
          ) : (
            <>
                <div className="flex p-1 w-full">
                    <h1 className="mx-auto text-xl py-5 font-bold pt-2">
                        Confirm your email to reset.
                    </h1>
                </div>
                <div className="flex lg:w-1/3 md:w-8/12 w-10/12 bg-white text-black rounded-2xl mx-auto p-1">
                    <ValidatedForm fields={fields} onSubmit={handleSubmit} />
                </div>
            </>
          )}
    
        <div className="flex flex-col mx-auto w-full pt-6">
          <div className="mx-auto">
            <span className="flex-col w-full">Click here to login? </span>
            <Link href="/login" className="font-bold text-blue-400 hover:text-blue-600">Login now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}