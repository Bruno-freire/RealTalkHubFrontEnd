import { Logout } from "../ui/logout";
import { UserLogged } from "../ui/userLogged";
import TopicList from "../ui/topics/topics";
import TopicsForm from "../ui/topics/topicsForm";
import { Suspense } from "react";

export default function Home() {

    return(
        <>
         <header className="flex  justify-between items-center mt-5">
            <h2 className="text-white font-mono font-bold">Hello <UserLogged/>!</h2>
            <nav>
                <Logout/>
            </nav>
        </header>
        <div className="flex w-full flex-col items-center">
            <h3 className="text-white font-mono w-full m-4 font-bold">
            Create a topic to talk about your favorite topics
            </h3>
            <TopicsForm/>
        </div>
        <Suspense fallback={<span>Carregando listas</span>}>
            <TopicList/>
        </Suspense>
        </>
       
    )
}