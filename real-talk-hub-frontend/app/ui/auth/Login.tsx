'use client';


import { singInAuthentication } from "@/app/lib/actions";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom"
import { Button } from "../button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useSearchParams } from "next/navigation";

export default function LoginForm({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
    const initialState = {
      email: useSearchParams().get("email") ?? '',
      password: useSearchParams().get("password") ?? ''
    }
    const [errorMessage, dispatch] = useFormState(singInAuthentication, undefined);

    return (
            <form action={dispatch} className="max-w-md mx-auto p-4 bg-gray-800 rounded shadow-md flex flex-col gap-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={initialState.email}
                required
                className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              />
        
              <label htmlFor="password" className="block mt-2 text-sm font-medium text-gray-300">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                defaultValue={initialState.password}
                className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-gray-300bg-green-600  text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
              />
              <LoginButton/>
              {
                errorMessage && (
                  <>
                    <p className="text-red-700 px-1">{errorMessage}</p>
                  </>
                )
              }
              <Link className="text-white py-1 px-1 rounded-md hover:text-green-400" href="/auth/register">
                Don't have an account?
              </Link>
            </form>
    )
}

function LoginButton() {
  const { pending } = useFormStatus();
 
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );  
}