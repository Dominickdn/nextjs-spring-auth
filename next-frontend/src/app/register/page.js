"use client"
import { registerUser } from '../../api/auth';
import Link from 'next/link';
import ValidatedForm from '@/components/validatedForm';

export default function Register() {

  const fields = [
    { name: 'firstname', label: 'First Name' },
    { name: 'lastname', label: 'Last Name' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
  ];
  
  return (
        <div className="flex items-center justify-items-center min-h-screen">
          <div className="w-full flex-col">
            <div className="flex w-full">
              <h1 className="mx-auto text-3xl">
                Create an Account
              </h1>
            </div>
            <div className="flex p-1 w-full">
              <h1 className="mx-auto text-xl py-5 font-bold">
                Register
              </h1>
            </div>
            <div className="flex lg:w-1/3 md:w-8/12 w-10/12  bg-white text-black rounded-2xl mx-auto p-1">
              <ValidatedForm fields={fields} onSubmit={registerUser} redirectTo="/dashboard" />
            </div>
            <div className="flex flex-col mx-auto w-full pt-6">
              <div className="mx-auto">
                <span className="flex-col w-full">Already have an account? </span>
                <Link href="/login" className="font-bold text-blue-400 hover:text-blue-600">Login now</Link>
              </div>
            </div>
          </div>
        </div>
  );
}