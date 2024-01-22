import { redirect } from "next/navigation"

export default function Page() {
    redirect('/home')
    return(
        <h1>redirect...</h1>
    )
}