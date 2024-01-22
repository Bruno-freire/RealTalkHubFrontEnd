'use client';

import { register } from "@/app/lib/actions";
import server from "@/app/lib/userServices";
import Link from "next/link";
import { useFormState } from "react-dom"

export default function RegisterForm() {
    const [errorMessage, dispatch] = useFormState(register, undefined);

    return (
            <form action={dispatch} className="max-w-md mx-auto p-4 bg-gray-800 rounded shadow-md flex flex-col gap-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Name:
                </label>
                <input
                    type="name"
                    id="name"
                    name="name"
                    placeholder="Batman"
                    required
                    className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 "
                />
              
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="user@gmail.com"
                required
                className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 "
              />
        
              <label htmlFor="password" className="block mt-2 text-sm font-medium text-gray-300">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="abcd@123"
                className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              />
        
              <button
                type="submit"
                className="w-full mt-4 bg-green-500 text-white rounded-md p-2 hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 "
              >
                Register
              </button>
              {typeof errorMessage === 'string' ? (
                    <p className="text-red-700 px-1">{errorMessage}</p>
                ) : null}
              <Link className="text-white py-1 px-1 rounded-md hover:text-green-400 mt-1.5" href="/auth/login">
                Already have an account?
              </Link>
            </form>
    )
}