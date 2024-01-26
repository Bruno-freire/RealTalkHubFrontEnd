import { auth } from "@/auth"

export async function UserLogged() {
    const session = await auth()

    return(
        <>
          {session?.user?.name}
        </>
    )
}