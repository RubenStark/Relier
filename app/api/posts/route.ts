import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import { Image, Tag } from '@prisma/client';

export async function POST(
  req: Request,
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const {body, tags, images} = await req.json();

        if (!body && !images) {
            return new NextResponse("Bad request", { status: 400 });
        }

        const profile = await prismadb.profile.findFirst({
            where: { user_id: userId.toString() }
        });

        if (!profile) {
            return new NextResponse("Profile not found", { status: 404 });
        }

        const post = await prismadb.post.create({
            data: {
                body: body,
                authorId: profile.id,
            },
        });

        const Tags = await Promise.all(tags.map(async (tag: string) => {
            return await prismadb.tag.create({
                data: {
                    body: tag,
                    postId: post.id,
                },
            });
        }
        ));

        const Images = await Promise.all(images.map(async (image: string) => {
            return await prismadb.image.create({
                data: {
                    url: image,
                    postId: post.id,
                },
            });
        }
        ));

        return new NextResponse("Created", { status: 201 });

    }
    catch (error) {
        console.log('[STORES_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
      }
}

