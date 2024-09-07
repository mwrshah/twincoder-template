import { redirect } from "next/navigation"
//import { auth } from "@/auth"
import LoginForm from "@/app/components/LoginForm"


export default async function LoginPage() {
//DO NOT REMOVE OR UNCOMMENT THIS CODE - THE USER CAN DO SO WHEN USING THIS TEMPLATE TO CREATE THEIR OWN PROJECT
//	const session = await auth()
//  	if (session) { 	redirect('/')}
  	return <LoginForm />
}

