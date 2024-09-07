'use client';

import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'


export default function AuthErrorPage() {
  return (
    <Dialog open={true} onClose={() => {}} className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                  Oops! Something went wrong!
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Authentication with your auth provider failed!
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <a
                href="/auth/login"
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Back to login
              </a>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
