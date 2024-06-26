import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { main } from "../route";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const id = await req.url.split("posts/")[1];
    await main();
    const post = await prisma.post.findFirst({ where: { id } });

    if (!post) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    } else {
      return NextResponse.json({ message: "Success", post }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
export const PUT = async (req: NextRequest, res: NextResponse) => {
  try {
    const id = await req.url.split("posts/")[1];
    const { title, description } = await req.json();
    await main();
    const post = await prisma.post.update({
      data: { title, description },
      where: { id },
    });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    const id = await req.url.split("posts/")[1];
    await main();
    const post = await prisma.post.delete({ where: { id } });
    return NextResponse.json({message:"Success"},{status:200})
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
