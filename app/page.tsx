import { auth } from "@/auth"; 
import { redirect } from "next/navigation"
import HomeLayout from "@/app/components/HomeLayout";

export default async function Page() {
	const session = await auth();
		if (!session || !session.user || !session.user.id) {
			redirect("/auth/login");
		}

  return (
		<HomeLayout />
  );
}
