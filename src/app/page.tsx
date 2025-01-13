'use client';

import { z } from "zod";
import { Box } from "@/components/common/Box";
import { useEffect, useMemo, useRef, useState } from "react";
import { PricingProfile, Product } from "@prisma/client";
import { ProfileCard } from "@/components/ProfileCard";
import { AssignCustomersCard } from "@/components/AssignCustomersCard";
import { useFieldArray, useForm } from "react-hook-form";
import { Select } from "@/components/common/Select";
import { ProductTable } from "@/components/ProductTable";
import { Input } from "@/components/common/Input";
import { ProductSearchResult } from "@/components/ProductSearchResult";
import { OnboardingBreadcrumb } from "@/components/common/OnboardingBreadcrumb";
import { RadioGroup } from "@/components/common/RadioGroup";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/common/Button";
import { toast, ToastContainer } from "react-toastify";
import { calculateNewPrice } from "@/utils";


export interface FilterFormValues {
  search: string;
  category: string;
  segment: string;
  brand: string;
}

export interface ProfileFormValues {
  basedOn: 'Based on Price';
  adjustmentType: 'fixed' | 'dynamic',
  adjustmentMode: 'increase' | 'decrease' | null
  adjustments: { productId: string; value: number | null; }[];
}


const filterFormDefaultValues: FilterFormValues = {
  search: "",
  category: "",
  segment: "",
  brand: "",
}

const profileFormDefaultValues: ProfileFormValues = {
  basedOn: 'Based on Price',
  adjustmentType: "fixed",
  adjustmentMode: "increase",
  adjustments: [],
}

const profileSchema = z.object({
  basedOn: z.literal("Based on Price").default("Based on Price"),
  adjustmentType: z.enum(["fixed", "dynamic"]).nullable().optional(),
  adjustmentMode: z.enum(["increase", "decrease"]).nullable().optional(),
  adjustments: z
    .array(
      z.object({
        productId: z.string(),
        value: z.number().nonnegative("Value must be a non-negative number"),
      })
    ),
});

export default function Home() {
  /** @TODO Implement loading */
  const [, setLoading] = useState(false)
  const [priceProfile, setPriceProfile] = useState<PricingProfile | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])

  const { register: registerFilter, watch: watchFilters, setValue: setFilterValue } = useForm<FilterFormValues>({
    defaultValues: filterFormDefaultValues,
  });
  const filterFormValues = watchFilters();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const isFiltered = useMemo(() => (
    filterFormDefaultValues.search !== filterFormValues.search ||
    filterFormDefaultValues.category !== filterFormValues.category ||
    filterFormDefaultValues.segment !== filterFormValues.segment ||
    filterFormDefaultValues.brand !== filterFormValues.brand
  ), [filterFormValues.search, filterFormValues.category, filterFormValues.segment, filterFormValues.brand])


  const { register: registerProfile, watch: watchProfile, control, handleSubmit: handleProfileSubmit } = useForm<ProfileFormValues>({
    defaultValues: profileFormDefaultValues,
    resolver: zodResolver(profileSchema)
  })
  const { fields: adjustmentFields, append, update } = useFieldArray({
    control,
    name: "adjustments",
  });

  const profileFormValues = watchProfile();
  const someNegatives = useMemo(() => (
    profileFormValues.adjustments.some((adj) => {
      const product = products.find((prod) => prod.id === adj.productId)
      const newPrice = calculateNewPrice({
        globalPrice: product?.globalPrice ?? "",
        adjustmentType: profileFormValues.adjustmentType,
        isIncrement: profileFormValues.adjustmentMode === "increase",
        adjustmentValue: adj.value
      })
      return newPrice?.isNegative()
    })
  ), [profileFormValues.adjustments])


  const handleAdjustmentChange = (productId: string, value: number | null) => {
    if (Number(value) < -1) return;

    const index = adjustmentFields.findIndex((field) => field.productId === productId);

    if (index >= 0) {
      update(index, { productId, value });
    } else {
      append({ productId, value });
    }
  };

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

  const onProfileSubmit = async (profileValues: ProfileFormValues) => {
    try {
      setLoading(true);
      const res = await fetch("/api/pricing-profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: priceProfile?.id,
          title: priceProfile?.title,
          ...profileValues
        }),
      })
      if (!res.ok) throw new Error("Failed to update pricing profile");

      toast.success("Pricing profile successfully updated")
    } catch (error) {
      console.error("Error updating pricing profile", error)
      toast.error("Error updating pricing profile")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchFilteredProducts(filterFormValues);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [filterFormValues.search, filterFormValues.category, filterFormValues.segment, filterFormValues.brand]);


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
    <Box className="max-w-[1200px] mx-auto my-6 bg-slate-50 text-black-grey">
      <ToastContainer />
      <OnboardingBreadcrumb />

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
                formRegister={registerFilter("search")}
                type="text"
                id="search"
                placeholder="Product / SKU"
              />
            </div>
            {/* Category */}
            <Select
              name="Category"
              formRegister={registerFilter("category")}
              value={filterFormValues.category}
              options={["Wine", "Beer", "Liquor & Spirits", "Cider", "Premixed & Ready-to-Drink", "Other"]}
              resetValue={() => setFilterValue("category", "")}
            />

            {/* Segment */}
            <Select
              name="Segment"
              formRegister={registerFilter("segment")}
              value={filterFormValues.segment}
              options={["White", "Red", "Sparkling", "Port/Dessert"]}
              resetValue={() => setFilterValue("segment", "")}
            />
            {/* Brand */}
            <Select
              name="Brand"
              formRegister={registerFilter("brand")}
              value={filterFormValues.brand}
              options={["High Garden", "Koyama Wines", "Lacourte-Godbillon"]}
              resetValue={() => setFilterValue("brand", "")}
            />
          </div>
        </form>

        {/** Product results */}
        <div className="w-full py-6 border-b border-slate-200">
          <p>Showing {products.length} {products.length === 1 ? "Result" : "Results"} {isFiltered && `for ${filterFormValues.search} ${filterFormValues.category} ${filterFormValues.segment} ${filterFormValues.brand}`}</p>
          {products.map((product) => (
            <ProductSearchResult
              key={product.id}
              product={product}
              checked={selectedProducts.some((p) => p.id === product.id)}
              onChange={onProductSelect}
            />
          ))}

          {!!selectedProducts.length && (
            <p>You&apos;ve selected <span>{selectedProducts.length} Products</span>, these will be added to {priceProfile?.title}</p>
          )}
        </div>
        {!!selectedProducts.length && (

          <div className="w-full py-6 border-b border-slate-200">
            <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
              <label>Based on</label>
              <Select
                formRegister={registerProfile("basedOn")}
                className="max-w-[400px]"
                options={['Based on Price']}
                value="Based on Price"
              />

              <RadioGroup
                name="adjustmentType"
                control={control}
                label="Set price adjustment mode"
                options={[{ value: "fixed", label: "Fixed ($)" }, { value: "dynamic", label: "Dynamic (%)" }]}
              />

              <RadioGroup
                name="adjustmentMode"
                control={control}
                label="Set price adjustment increment mode"
                options={[{ value: "increase", label: "Increase +" }, { value: "decrease", label: "Decrease -" }]}
              />

              <ProductTable
                data={selectedProducts}
                profile={profileFormValues}
                adjustments={adjustmentFields}
                onAdjustmentChange={handleAdjustmentChange}
              />

              <div className="flex justify-end gap-2">
                <Button variant="text">Back</Button>
                <Button
                  type="submit"
                  className="px-10"
                  disabled={someNegatives}
                >Submit</Button>
              </div>
            </form>
          </div>
        )}
      </Box>
      {/** END PRODUCT PRICING */}

      <AssignCustomersCard />
    </Box>
  );
}
