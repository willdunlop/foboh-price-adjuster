import { Decimal } from "decimal.js"
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma"

enum AdjustmentType {
  Fixed = "fixed",
  Dynamic = "dynamic"
}

interface RequestBody {
  type: AdjustmentType;
  isIncrement: boolean;
  value: string;
  productId: string;
  pricingProfileId: string;
}

export async function POST(req: NextRequest) {
    try {
      console.log("+++ POST for apply-adjustments")
      const body: RequestBody = await req.json();
      console.log("+++ body", body)
      const { type, isIncrement, value, productId, pricingProfileId } = body;
  
      // Validate input
      if (!Object.values(AdjustmentType).includes(type as AdjustmentType)) {
        return NextResponse.json(
          { error: "Invalid type. Must be 'fixed' or 'dynamic'." },
          { status: 400 }
        );
      }
  
      const adjustmentValue = new Decimal(value);
      if (adjustmentValue.isNegative()) {
        return NextResponse.json(
          { error: "Adjustment value must be a positive number." },
          { status: 400 }
        );
      }
  
      // Find the product
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
  
      if (!product) {
        return NextResponse.json(
          { error: "Product not found." },
          { status: 404 }
        );
      }
  
      const { globalPrice } = product;
  
      // Calculate the new price
      let newPrice: Decimal;
      if (type === "fixed") {
        newPrice = isIncrement
          ? globalPrice.plus(adjustmentValue)
          : globalPrice.minus(adjustmentValue);
      } else {
        const adjustmentAmount = globalPrice.times(adjustmentValue.dividedBy(100));
        newPrice = isIncrement
          ? globalPrice.plus(adjustmentAmount)
          : globalPrice.minus(adjustmentAmount);
      }
  
      // Validate that the new price is not negative
      if (newPrice.isNegative()) {
        return NextResponse.json(
          { error: "The adjustment would result in a negative price." },
          // Could be 400 (Bad Request), if a more common status code is preferred
          { status: 422 }
        );
      }
  
      // Create the PriceAdjustment entry in the database
      const priceAdjustment = await prisma.priceAdjustment.create({
        data: {
          type,
          isIncrement,
          value: adjustmentValue.toString(),
          productId,
          pricingProfileId,
        },
      });
  
      return NextResponse.json(priceAdjustment, { status: 201 });
    } catch (error) {
      console.error("Error processing apply-adjustments:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
  }
