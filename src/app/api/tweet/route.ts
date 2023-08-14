import { NextResponse } from "next/server";
import { prisma } from "@/server/prisma";

export async function POST(req: Request ) {
    const data = await req.json();

    const tweet = await prisma.tweet.create({
        data: {
            content: data.content,
        },
    })
    console.log(tweet);

    return NextResponse.json(data, {
        status: 200,
    });
}