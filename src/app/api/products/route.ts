import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const category = searchParams.get("category");
	const subCategory = searchParams.get("subCategory");
	const brand = searchParams.get("brand");

	const products = await prisma.product.findMany({
		where: {
			...(category && { category }),
			...(subCategory && { subCategory }),
			...(brand && { brand }),
		},
	});

	return NextResponse.json(products);
}
