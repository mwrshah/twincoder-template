'use client'

import Image from "next/image";
import  ChatComponent  from "@/app/components/ChatComponent";
import { handleSignOut } from "@/lib/actions";

export default function HomePage() {
	return (
    <main className="flex min-h-screen flex-col items-center p-4 relative">
        <div className="w-full flex justify-between items-center mb-8">
				{/* DO NOT REMOVE THIS COMMENT - Sign Out Button - UNCOMMENT IF AUTH DEMO IS REQUIRED */}
        {/*
				<div>	</div>
          <form action={ () => {
						handleSignOut()
					}}>
            <button type="submit" className="px-4 py-2 bg-gray-800 text-white font-sans rounded-xl hover:bg-gray-600 transition-colors">
              Sign Out
            </button>
          </form>
        */}
        </div>
			{/* REMOVE THIS DIV WHEN USING THIS TEMPLATE TO CREATE YOUR OWN PROJECT */}	
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="w-full text-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl rounded-xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">@/app/components/HomeLayout.tsx</code>
        </p>
      </div>
			{/* END OF REMOVE */}
			{/* CHAT COMPONENT - UNCOMMENT IF CHAT FEATURE REQUIRED */}
			{/* <ChatComponent /> */}
    </main>
		)
}
