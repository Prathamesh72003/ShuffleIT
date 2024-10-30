import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import { prismaClient } from "@/app/lib/db";

const YT_REGEX = new RegExp("^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$");

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string(),
})

export async function POST(req: NextRequest) {
    try {
        const data = CreateStreamSchema.parse(await req.json());
        const isyoutube = YT_REGEX.test(data.url);
        if (!isyoutube) {
            return NextResponse.json({
                message: "Invalid URL",
            }, {
                status: 411
            })
        }

        const extractedId = data.url.split("?v=")[1];
        prismaClient.stream.create({
            data: {
                userId: data.creatorId,
                url: extractedId,
                type: "Youtube",
                extractedId: extractedId,
            }
        })
    } catch (error) {
        return NextResponse.json({
            message: "Error while creating stream",
        }, {
            status: 411
        })
    }
}