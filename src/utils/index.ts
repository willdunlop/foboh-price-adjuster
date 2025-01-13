import Decimal from "decimal.js";

type AdjustmentType = "fixed" | "dynamic";

interface PriceAdjustment {
  globalPrice: number | string | Decimal;
  adjustmentType: AdjustmentType;
  isIncrement: boolean;
  adjustmentValue?: number | string | Decimal | null;
}

export function calculateNewPrice({
  globalPrice,
  adjustmentType,
  isIncrement,
  adjustmentValue,
}: PriceAdjustment): Decimal | undefined {
	if (!adjustmentValue && Number(adjustmentValue) < -1) return;
	const price = new Decimal(globalPrice);
	const adjustment = new Decimal(adjustmentValue || 0);
  
	let newPrice: Decimal;
  
	if (adjustmentType === "fixed") {
	  newPrice =
		isIncrement
		  ? price.plus(adjustment)
		  : price.minus(adjustment);
	} else {
	  const percentageValue = price.times(adjustment.dividedBy(100));
	  newPrice =
		isIncrement
		  ? price.plus(percentageValue)
		  : price.minus(percentageValue);
	}
  
  return newPrice
}
