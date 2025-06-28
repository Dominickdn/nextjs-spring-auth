"use client"
import { loginUser } from '../../api/auth';
import Link from 'next/link';
import ValidatedForm from '@/components/validatedForm';

export default function Login() {

  const fields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
  ];

  return (
    <div className="flex items-center justify-items-center min-h-screen">
      <div className="w-full flex-col">
        <div className="flex w-full">
          <h1 className="mx-auto text-3xl">
            Welcome
          </h1>
        </div>
        <div className="flex p-1 w-full">
          <h1 className="mx-auto text-xl py-5 font-bold">
            Login
          </h1>
        </div>
        <div className="flex lg:w-1/3 md:w-8/12 w-10/12  bg-white text-black rounded-2xl mx-auto p-1">
          <ValidatedForm fields={fields} onSubmit={loginUser} redirectTo="/dashboard" />
        </div>
        <div className="flex flex-col mx-auto w-full pt-6">
          <div className="mx-auto">
            <span className="flex-col w-full">{"Don't have an account?"}</span>
            <Link href="/register" className="font-bold text-blue-400 hover:text-blue-600">Register now</Link>
          </div>
          <div className="mx-auto mt-2">
            <span className="flex-col w-full">Forgot Password? </span>
            <Link href="/forgot-password" className="font-bold text-blue-400 hover:text-blue-600">reset</Link>
          </div>
        </div>
      </div>
    </div>
  );
}