'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const isStrongPassword = (password) => {
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{8,}$/;
  return strongRegex.test(password);
};

/**
 * @param {Object} props
 * @param {Object[]} props.fields - Array of field configs: { name, label, type }
 * @param {Function} props.onSubmit - async function that receives formData
 * @param {string} [props.redirectTo] - optional URL path to redirect on success
 */

export default function ValidatedForm({ fields, onSubmit, redirectTo  }) {
  const router = useRouter();
  const initialState = Object.fromEntries(fields.map((f) => [f.name, '']));
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    for (const field of fields) {
      const value = formData[field.name]?.trim();
      if (!value) {
        newErrors[field.name] = `${field.label || field.name} is required.`;
      } else if (
        field.name === 'password' &&
        !isStrongPassword(value)
      ) {
        newErrors[field.name] =
          'Password must be at least 8 characters and include upper, lower, number, and symbol.';
      }
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true)
    try {
      const result = await onSubmit(formData);

      if (result?.success !== false) {
        setSubmitted(true);
        setErrors({});
        if (redirectTo) {
          router.push(redirectTo);
        }
      } else {
        setErrors({ form: result?.message || 'Something went wrong.' });
      }
    } catch (err) {
      setErrors({ form: 'An unexpected error occurred.' });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex w-10/12 bg-white text-black rounded-2xl mx-auto p-1">
      <form onSubmit={handleSubmit} className="flex flex-col py-4 mx-auto w-10/12">
        {fields.map(({ name, label, type = 'text' }) => (
          <div className="p-1 flex flex-col" key={name}>
            <span className="py-1 font-semibold w-full">{label || name}</span>
            <input
              name={name}
              type={type}
              value={formData[name]}
              onChange={handleChange}
              className="border-2 border-gray-800 rounded p-1"
            />
            {errors[name] && (
              <p className="text-red-500">{errors[name]}</p>
            )}
          </div>
        ))}
        
        {errors.form && <p className="text-red-600 mb-4 p-1">{errors.form}</p>}
        
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center gap-2 w-full px-4 py-2 rounded-2xl text-white transition-all ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-500'
          }`}
        >
          Submit
          {loading && (
            <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />
          )}
        </button>
        
      </form>
    </div>
  );
}