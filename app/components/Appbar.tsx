'use client'

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar(){

    const session = useSession();

    return (
        <div className="flex justify-between">
            <div>
                <h1>ShuffleIt</h1>
            </div>

            <div>
                {session.data?.user && <Button className="m-2 p-2 bg-blue-400" onClick={() => signOut()}>Logout</Button>}
                
                {!session.data?.user && <Button className="m-2 p-2 bg-blue-400" onClick={() => signIn()}>Signin</Button>}
            </div>
        </div>
    )
}