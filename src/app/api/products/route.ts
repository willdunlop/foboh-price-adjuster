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

export async function POST(request: Request) {
	try {
		const { search, category, segment, brand } = await request.json();
		const filters: Record<string, string> = {
			...(category && { subCategory: category }),
			...(segment && { segment }),
			...(brand && { brand }),
		};

		if (search && typeof search !== "string") {
			return NextResponse.json(
			  { error: "Search must be a string" },
			  { status: 400 }
			);
		  }

		let products;
		if (search) {
			products = await prisma.product.findMany({
				where: {
					...filters,
					title: { contains: search },
				},
			});
			// If no results, search by SKU code
			if (products.length === 0) {
				products = await prisma.product.findMany({
					where: {
						...filters,
						skuCode: { contains: search },
					},
				});
			}
		} else {
			products = await prisma.product.findMany({
				where: filters,
			});
		}

		return NextResponse.json(products, { status: 200 });
	} catch (error) {
		console.error("Error fetching products:", error);

		return NextResponse.json(
			{ error: "Failed to fetch products. Please try again." },
			{ status: 500 }
		);
	}
}
