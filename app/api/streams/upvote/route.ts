import { prismaClient } from "@/app/lib/db";
import NextAuth, { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';

const UpvoteStreamSchema = z.object({
    userId: z.string(),
    streamId: z.string(),
})

export async function POST(req: NextRequest) {
    const session = await getServerSession();

    const user = await prismaClient.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }
    });

    if (!user) {
        return NextResponse.json({
            message: "User not found",
        }, {
            status: 403
        })
    }
}