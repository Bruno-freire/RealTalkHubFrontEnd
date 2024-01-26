import LoginForm from "@/app/ui/auth/Login";

export default function page() {

    return(
        <>
            <h2 className="text-xl flex w-full justify-center text-white pb-4">Log in with your user</h2>
            <LoginForm/>
        </>
    )
}