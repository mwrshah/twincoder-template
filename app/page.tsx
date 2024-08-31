import { auth } from "@/auth"; 
import { redirect } from "next/navigation"
import HomeLayout from "@/app/components/HomeLayout";

export default async function Page() {
	const session = await auth();
		if (!session || !session.user || !session.user.id) {
			//Nothing for now. Only if implementing auth will this be commented out
//			redirect("/auth/login");
		}

  return (
		<HomeLayout />
  );
}
