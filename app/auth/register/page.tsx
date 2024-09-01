"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { register } from "@/lib/actions";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { CubeIcon } from "@heroicons/react/24/outline";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }

    const result = await register({ name, email, password, passwordConfirmation });

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setSuccess(result.success);
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Dialog open={true} onClose={() => {}} className="relative z-50">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl text-gray-900">
            <DialogTitle className="text-lg font-medium mb-4 text-gray-900 flex items-center">
              Register an account
              <CubeIcon className="w-2 h-2 mr-2 stroke-0" />
            </DialogTitle>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="text-gray-900 w-full border border-gray-300 rounded-md px-3 py-2 text-md"
                  required
                />
              </div>
              <div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="text-gray-900 w-full border border-gray-300 rounded-md px-3 py-2 text-md"
                  required
                />
              </div>
              <div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="text-gray-900 w-full border border-gray-300 rounded-md px-3 py-2 text-md"
                  required
                />
              </div>
              <div>
                <input
                  id="passwordConfirmation"
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="Confirm Password"
                  className="text-gray-900 w-full border border-gray-300 rounded-md px-3 py-2 text-md"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white text-md py-2 rounded-md hover:bg-blue-600 transition-colors text-md"
              >
                Register
              </button>
            </form>
            <div className="mt-4 text-center text-sm">
              <span className="text-gray-600">Already have an account?</span>{" "}
              <Link href="/auth/login" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

