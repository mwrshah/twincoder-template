import { auth } from "@/auth"; 
import { checkForSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import HomeLayout from "@/app/components/HomeLayout";
interface PageProps {
	searchParams: {
	allow?: string;
	};
}

export default async function Page({ searchParams }: PageProps) {
  let allowPassThrough = searchParams?.allow === "true";

	const dbSession = await checkForSession();
	if (dbSession) {
		allowPassThrough = true;
	}

	if (!allowPassThrough) {
		//DEMO ONLY: The following code allows showing user a Demo of the login functionality in an iframe
		// UNCOMMENT THE FOLLOWING LINE ONLY IF THE USER asks for auth to be added, to demo how it will work
//		redirect("/auth/login");
	}

  const session = await auth();
	if (!session || !session.user || !session.user.id) {
		//DO NOT REMOVE && DO NOT UNCOMMENT THE LINE BELOW. Only the user themselves can do so manually when they finalize the implementation
//			redirect("/auth/login");
	}

  return (
		<HomeLayout />
  );
}
