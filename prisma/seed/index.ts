// import { priceProfile, seedProducts } from "./data";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// const seedProducts = [
//   {
//     title: "High Garden Pinot Noir 2021",
//     skuCode: "HGVPIN216",
//     brand: "High Garden",
//     category: "Alcoholic Beverage",
//     subCategory: "Wine",
//     segment: "Red",
//     globalPrice: 279.06,
//   },
//   {
//     title: "Koyama Methode Brut Nature NV",
//     skuCode: "KOYBRUNV6",
//     brand: "Koyama Wines",
//     category: "Alcoholic Beverage",
//     subCategory: "Wine",
//     segment: "Sparkling",
//     globalPrice: 120.0,
//   },
//   {
//     title: "Koyama  Riesling 2018",
//     skuCode: "KOYNR1837",
//     brand: "Koyama Wines",
//     category: "Alcoholic Beverage",
//     subCategory: "Wine",
//     segment: "Port/Dessert",
//     globalPrice: 215.04,
//   },
//   {
//     title: "Koyama Tussock Riesling 2019",
//     skuCode: "KOYRIE19",
//     brand: "Koyama Wines",
//     category: "Alcoholic Beverage",
//     subCategory: "Wine",
//     segment: "White",
//     globalPrice: 215.04,
//   },
//   {
//     title: "Lacourte-Godbillon Brut Cru NV",
//     skuCode: "LACBNATNV6",
//     brand: "Lacourte-Godbillon",
//     category: "Alcoholic Beverage",
//     subCategory: "Wine",
//     segment: "Sparkling",
//     globalPrice: 409.32,
//   },
// ]

// const seedPriceProfile = {
//   title: "Profile for Cork & Barrel Cellar"
// }

async function main() {
    try {
        await prisma.product.createMany({
          data: [
            {
              title: "High Garden Pinot Noir 2021",
              skuCode: "HGVPIN216",
              brand: "High Garden",
              category: "Alcoholic Beverage",
              subCategory: "Wine",
              segment: "Red",
              globalPrice: 279.06,
            },
            {
              title: "Koyama Methode Brut Nature NV",
              skuCode: "KOYBRUNV6",
              brand: "Koyama Wines",
              category: "Alcoholic Beverage",
              subCategory: "Wine",
              segment: "Sparkling",
              globalPrice: 120.0,
            },
            {
              title: "Koyama  Riesling 2018",
              skuCode: "KOYNR1837",
              brand: "Koyama Wines",
              category: "Alcoholic Beverage",
              subCategory: "Wine",
              segment: "Port/Dessert",
              globalPrice: 215.04,
            },
            {
              title: "Koyama Tussock Riesling 2019",
              skuCode: "KOYRIE19",
              brand: "Koyama Wines",
              category: "Alcoholic Beverage",
              subCategory: "Wine",
              segment: "White",
              globalPrice: 215.04,
            },
            {
              title: "Lacourte-Godbillon Brut Cru NV",
              skuCode: "LACBNATNV6",
              brand: "Lacourte-Godbillon",
              category: "Alcoholic Beverage",
              subCategory: "Wine",
              segment: "Sparkling",
              globalPrice: 409.32,
            },
          ],
        });

        await prisma.pricingProfile.create({
          data: {
            title: "Cork & Barrel Cellar #2"
          }
        })
        
    } catch (err) {
      console.error("DB seeding failed", err)
    }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });