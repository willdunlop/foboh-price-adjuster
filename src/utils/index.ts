import Decimal from "decimal.js";

export const debounce = (func: Function, delay: number) => {
	let timer: NodeJS.Timeout;
	return (...args: any[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => func(...args), delay);
	};
};


type AdjustmentType = "fixed" | "dynamic";

interface PriceAdjustment {
  globalPrice: number;
  adjustmentType: AdjustmentType;
  isIncrement: boolean;
  adjustmentValue: number;
}

export function calculateNewPrice({
  globalPrice,
  adjustmentType,
  isIncrement,
  adjustmentValue,
}: PriceAdjustment): Decimal {
	const price = new Decimal(globalPrice);
	const adjustment = new Decimal(adjustmentValue);
  
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
