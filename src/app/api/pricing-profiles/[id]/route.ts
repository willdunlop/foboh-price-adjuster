import { NextRequest, NextResponse } from "next/server";
import { prisma } from '../../../../lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params
    const profile = await prisma.pricingProfile.findUnique({
        where: { id },
        include: {
            priceAdjustments: {
                include: {
                    product: true,
                },
            },
        },
    });

    if (!profile) {
        return NextResponse.json({ error: "Profile not found" }, { status: 404 });
      }

    return NextResponse.json(profile);
}

