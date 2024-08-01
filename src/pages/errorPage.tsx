import { CornerUpLeftIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function ErrorPage() {

    return (
        <section className='flex flex-col gap-6 justify-center items-center h-screen w-screen text-git-text-primary bg-git-950 '>
            <article className='flex flex-col items-center justify-center'>
                <h1 className="font-bold text-5xl">
                    404
                </h1>
                <p className='font-thin text-sm'>
                    Ha... some error happened!
                </p>
            </article>
            <NavLink to='/' className='flex flex-row items-center gap-2 bg-git-800 px-4 py-2 rounded-sm hover:bg-git-700'>
                <CornerUpLeftIcon size={14} className='stroke-git-text-primary' />
                <p>Back to Login</p>
            </NavLink>
        </section>

    )
}