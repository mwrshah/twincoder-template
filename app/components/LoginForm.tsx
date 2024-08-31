'use client'

import { useForm } from "react-hook-form";
import * as z from "zod";

import { login } from "@/lib/actions";
import { handleGoogleSignIn } from "@/lib/actions";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FcGoogle } from "react-icons/fc";
import { CubeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function LoginForm() {

	const router = useRouter();

	const LoginSchema = z.object({
  	email: z.string().email(),
  	password: z.string().min(6),
	});

  const form = useForm<z.infer<typeof LoginSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

	//Credentials login function
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const result = await login(values, '/');
      if (result.error) {
        form.setError("root", { message: result.error });
      } else {
        if (result.url) {
					const resultURLWithAllow = `${result.url}?allow=true`;
          router.push(resultURLWithAllow);
        }
      }
    } catch (error) {
      form.setError("root", { message: "An unexpected error occurred" });
    }
  };
	

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <Dialog open={true} onClose={() => {}} className="relative z-50">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl text-gray-900">
            <DialogTitle className="text-lg font-medium mb-4 text-gray-900 flex">
              Login
              <CubeIcon className="w-2 h-2 mr-2" style={{ strokeWidth: 0 }} />
            </DialogTitle>

              {/* Credentials based Login */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  {...form.register("email")}
                  type="email"
                  id="email"
                  placeholder="Email address"
                  className="text-gray-900 w-full border border-gray-300 rounded-md px-3 py-2 text-md"
                />
                {form.formState.errors.email && <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>}
              </div>

              <div>
                <input
                  {...form.register("password")}
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="text-gray-900 w-full border border-gray-300 rounded-md px-3 py-2 text-md"
                />
                {form.formState.errors.password && <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>}
              </div>

              {form.formState.errors.root && <p className="text-red-500">{form.formState.errors.root.message}</p>}

              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full bg-zinc-900 text-white text-md py-2 rounded-md hover:bg-zinc-700 transition-colors text-md"
              >
                Login
              </button>
            </form>

              {/* Divider */}
            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Sign In with Google */}
              <div className="mt-4">
                <button
									onClick={async () =>  {
										handleGoogleSignIn('/')}}
                  className="w-full flex items-center justify-center gap-2 bg-white text-md border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-50 transition-colors"
                >
                  <FcGoogle />
                  Sign in with Google
                </button>
              </div>

              {/* New Sign Up link */}
              </div>
              <div className="mt-4 text-center text-sm">
                <span className="text-gray-600">Don't have an account?</span>{' '}
                <a href="/auth/register" className="text-blue-500 hover:underline">Sign Up</a>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
    </div>
  );
};

