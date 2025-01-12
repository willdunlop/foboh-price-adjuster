-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "skuCode" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subCategory" TEXT NOT NULL,
    "segment" TEXT NOT NULL,
    "globalPrice" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingProfile" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "PricingProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceAdjustment" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isIncrement" BOOLEAN NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "pricingProfileId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "PriceAdjustment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_skuCode_key" ON "Product"("skuCode");

-- AddForeignKey
ALTER TABLE "PriceAdjustment" ADD CONSTRAINT "PriceAdjustment_pricingProfileId_fkey" FOREIGN KEY ("pricingProfileId") REFERENCES "PricingProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceAdjustment" ADD CONSTRAINT "PriceAdjustment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
