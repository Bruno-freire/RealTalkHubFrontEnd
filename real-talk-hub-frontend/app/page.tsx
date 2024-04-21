import Link from "next/link"
import { redirect } from "next/navigation"

export default function Page() {
    redirect('/home')
    return(
        <Link href={`/auth/login`}>Go to login</Link>
    )
}