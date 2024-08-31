import { auth } from "@/auth"; 
import { redirect } from "next/navigation";
import HomeLayout from "@/app/components/HomeLayout";

interface PageProps {
	searchParams: {
	allow?: string;
	};
}

export default async function Page({ searchParams }: PageProps) {
  const allowPassThrough = searchParams?.allow === "true";
	if (!allowPassThrough) {
		// UNCOMMENT THE FOLLOWING LINE ONLY IF THE USER asks for auth to be added, to demo how it will work
		//redirect("/auth/login");
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
