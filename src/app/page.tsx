'use client';

import { Button } from "@/components/common/Button";
import { Box } from "@/components/common/Box";
import { useEffect, useMemo, useRef, useState } from "react";
import { PricingProfile, Product } from "@prisma/client";
import { ProfileCard } from "@/components/ProfileCard";
import { AssignCustomersCard } from "@/components/AssignCustomersCard";
import { useForm } from "react-hook-form";
import { Select } from "@/components/common/Select";
import { ProductTable } from "@/components/ProductTable";
import { Input } from "@/components/common/Input";
import { ProductSearchResult } from "@/components/ProductSearchResult";


export interface FilterFormValues {
  search: string;
  category: string;
  segment: string;
  brand: string;
}

// interface Adjustment {
//   skuCode: string;
//   value: string;
//   newPrice: string;
// }

const filterFormDefaultValues = {
  search: "",
  category: "",
  segment: "",
  brand: "",
}

export default function Home() {
  const [, setLoading] = useState(false)
  const [priceProfile, setPriceProfile] = useState<PricingProfile | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  // const [adjustments, setAdjustments] = useState<Adjustment[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])

  const { register, watch, setValue } = useForm<FilterFormValues>({
    defaultValues: filterFormDefaultValues,
  });
  const formValues = watch();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const isFiltered = useMemo(() => (
    filterFormDefaultValues.search !== formValues.search ||
    filterFormDefaultValues.category !== formValues.category ||
    filterFormDefaultValues.segment !== formValues.segment ||
    filterFormDefaultValues.brand !== formValues.brand
  ), [formValues.search, formValues.category, formValues.segment, formValues.brand])

  // const calculateAdjustment = (products: Product[], adjustment: Adjustment) => {
  //   const newAdjustments = products.map((product) => {
  //     const existingAdjustment = adjustments.find((adjustment) => adjustment.skuCode === product.skuCode)
  //     return {
  //       skuCode: product.skuCode,
  //       value: existingAdjustment?.value ?? '',
  //       newPrice: calculateNewPrice()
  //     }
  //   })

  // }

  const fetchFilteredProducts = async (filters: FilterFormValues) => {
    setLoading(true);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });

      if (!response.ok) throw new Error("Failed to fetch filtered products");
      const data: Product[] = await response.json();
      setProducts(data);

      // const newAdjustments = data.map((product) => {
      //   const existingAdjustment = adjustments.find((adjustment) => adjustment.skuCode === product.skuCode)
      //   return {
      //     skuCode: product.skuCode,
      //     value: existingAdjustment?.value ?? '',
      //     newPrice: calculateNewPrice()
      //   }
      // })
      // setAdjustments(newAdjustments)
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const onProductSelect = (event: React.ChangeEvent<HTMLInputElement>, product: Product) => {
    if (event.target.checked) {
      setSelectedProducts((prev) => [...prev, product]);
    } else {
      setSelectedProducts((prev) =>
        prev.filter((p) => p.id !== product.id)
      );
    }
  }

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchFilteredProducts(formValues);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [formValues.search, formValues.category, formValues.segment, formValues.brand]);


  useEffect(() => {
    const fetchPriceProfile = async () => {
      const res = await fetch("/api/pricing-profiles")
      if (!res.ok) throw new Error("Failed to fetch pricing profile")
      const profile: PricingProfile[] = await res.json()
      setPriceProfile(profile[0])
    }

    fetchPriceProfile()
  }, [])

  return (
    <Box className="max-w-[1200px] mx-auto mt-6 bg-slate-50 text-black-grey">
      <div className="flex justify-between">
        <div>
          <p className="text-base">Pricing Profile &gt; <span className="font-bold text-black-black">Setup a Profile</span></p>
          <p className="text-sm">Setup your pricing profile, select products and assign customers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="text">Cancel</Button>
          <Button variant="secondary">Save as Draft</Button>
        </div>
      </div>

      {priceProfile && (<ProfileCard title={priceProfile.title} />)}

      {/** START PRODUCT PRICING */}
      <Box className="bg-white mt-6">
        <div className="flex justify-between w-full pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-black-black font-medium">Set Product Pricing</h2>
            <p className="text-sm text-black-grey">Set details</p>
          </div>
        </div>

        <div className="flex justify-between w-full pt-6 border-b border-slate-200">
          <div>
            <p className="text-sm text-black-grey">You are creating a Pricing Profile for</p>
            <div className="flex mt-3">
            </div>
          </div>
        </div>


        <form className="space-y-4">
          <div className="grid grid-cols-5 gap-2">
            {/* Search Input */}
            <div>
              <Input
                formRegister={register("search")}
                type="text"
                id="search"
                placeholder="Product / SKU"
              />
            </div>
            {/* Category */}
            <Select
              name="Category"
              formRegister={register("category")}
              value={formValues.category}
              options={["Wine", "Beer", "Liquor & Spirits", "Cider", "Premixed & Ready-to-Drink", "Other"]}
              resetValue={() => setValue("category", "")}
            />

            {/* Segment */}
            <Select
              name="Segment"
              formRegister={register("segment")}
              value={formValues.segment}
              options={["White", "Red", "Sparkling", "Port/Dessert"]}
              resetValue={() => setValue("segment", "")}
            />
            {/* Brand */}
            <Select
              name="Brand"
              formRegister={register("brand")}
              value={formValues.brand}
              options={["High Garden", "Koyama Wines", "Lacourte-Godbillon"]}
              resetValue={() => setValue("brand", "")}
            />
          </div>
        </form>

        {/** Product results */}
        <div className="w-full pt-6 border-b border-slate-200">
          <p>Showing {products.length} {products.length === 1 ? "Result" : "Results"} {isFiltered && `for ${formValues.search} ${formValues.category} ${formValues.segment} ${formValues.brand}`}</p>
          {products.map((product) => (
            <ProductSearchResult
              key={product.id}
              product={product}
              checked={selectedProducts.some((p) => p.id === product.id)}
              onChange={onProductSelect}
            />
          ))}

          {!!selectedProducts.length && (
            <ProductTable data={selectedProducts} adjustments="" onAdjustmentChange={() => {}} />
          )}

        </div>

      </Box>
      {/** END PRODUCT PRICING */}

      <AssignCustomersCard />
    </Box>
  );
}
