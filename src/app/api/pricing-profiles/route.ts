import { NextRequest, NextResponse } from "next/server";
import { prisma } from '../../../lib/prisma'
import { PricingProfile } from "@prisma/client";

export async function GET() {
	const profiles = await prisma.pricingProfile.findMany({
		include: {
			priceAdjustments: {
				include: {
					product: true,
				},
			},
		},
	});

	return NextResponse.json(profiles);
}

type PostReqBody = Omit<PricingProfile, 'priceAdjustments'> & {
	adjustments: { productId: string, value: string }[]
}

export async function POST(req: NextRequest) {
	const body: PostReqBody = await req.json();
	const { id, title, adjustmentMode, adjustmentType, adjustments } = body;

	const profile = await prisma.pricingProfile.upsert({
		where: { id },
		create: {
			title,
			adjustmentMode,
			adjustmentType,
			priceAdjustments: {
				create: adjustments.map((adj) => ({
					productId: adj.productId,
					value: adj.value
				})),
			},
		},
		update: {
			title,
			adjustmentMode,
			adjustmentType,
			priceAdjustments: {
			  create: adjustments.map((adj) => ({
				productId: adj.productId,
				value: adj.value,
			  })),
			},
		  },
	});

	return NextResponse.json(profile, { status: 201 });
}
