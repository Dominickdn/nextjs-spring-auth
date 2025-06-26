'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProtectedData, logoutUser } from '../../api/auth';

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  const handleLogout = async () => {
    const success = await logoutUser();
    if (success) {
      router.push('/');
    } else {
      alert('Failed to logout');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProtectedData();
        if (!res) {
          setNotLoggedIn(true);
        } else {
          setData(res);
        }
      } catch (error) {
        setNotLoggedIn(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <h1 className="mx-auto text-3xl md:text-5xl mb-0 md:mb-4 px-6 pt-6 md:pt-6">Loading...</h1>;

  if (notLoggedIn) return (
    <div className="p-4">
      <h1 className="mx-auto text-3xl md:text-5xl mb-0 md:mb-4 px-6 pt-6 md:pt-0">
        Hidden Page
      </h1>
      <span className="pl-6">You are not logged in. Please </span>
      <a href="/login" className="text-blue-600 underline">log in.</a>
    </div>
  )

  return (
    <div className="p-4 flex-col">
      <h1 className="mx-auto text-3xl md:text-5xl mb-0 md:mb-4 px-6 pt-6 md:pt-0">
        Secured Data
      </h1>
      <p className="pl-6">Hello {data.firstname}!! </p>

      <p className="pl-6 py-4 underline">User Details: </p>
      <p className="pl-6">Last Name: {data.lastname} </p>
      <p className="pl-6">Email: {data.email} </p>
  
      <div className="pl-6">
        <button onClick={handleLogout} className="rounded p-2 bg-blue-500 text-white mt-4">
          Logout
        </button>
      </div>

    </div>
  );
}
