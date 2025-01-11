import { NextRequest, NextResponse } from "next/server";
import { prisma } from '../../../lib/prisma'
// import { PriceAdjustment } from "@prisma/client";

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

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { title /*adjustments*/ } = body;

	const profile = await prisma.pricingProfile.create({
		data: {
			title,
			// priceAdjustments: {
			// 	create: adjustments.map((adj: PriceAdjustment) => ({
			// 		title: adj.title,
			// 		productId: adj.productId,
			// 	})),
			// },
		},
	});

	return NextResponse.json(profile, { status: 201 });
}
