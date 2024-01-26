import { signOut } from "@/auth"

export async function Logout() {
    return(
            <form className="flex items-center" action={async () => {
                "use server"
                await signOut()
            }}>
                <button className="font-mono font-bold text-red-600 flex border-2 min-w-20 justify-center border-red-600 p-2 items-center bg-transparent rounded-md 
                hover:bg-red-600 hover:text-white transition-colors
                ">Log out</button>
            </form>
    )
}