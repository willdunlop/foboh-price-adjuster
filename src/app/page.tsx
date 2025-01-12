'use client';

import { Button } from "@/components/common/Button";
import { Box } from "@/components/common/Box";
import { useEffect, useState } from "react";
import { PricingProfile, Product } from "@prisma/client";
import { ProfileCard } from "@/components/ProfileCard";
import { AssignCustomersCard } from "@/components/AssignCustomersCard";
import { Field, Input, Menu, MenuButton, MenuItem, MenuItems, Radio, RadioGroup } from "@headlessui/react";
import Select from "react-select";
import { useForm } from "react-hook-form";

type OptionType = { value: string; label: string };

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [priceProfile, setPriceProfile] = useState<PricingProfile | null>(null)
  const [category, setCategory] = useState(null)

  const { register, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      search: "",
      category: "",
      segment: "",
      brand: "",
    },
  });
  const formValues = watch();

  // @TODO no any
  const onSubmit = (data: any) => {
    console.log("Filter values:", data);
  };
  const submitForm = async () => {
    console.log("Filter values:", formValues);
    // You can send formValues to the backend here:
    // await fetch('/api/products/filter', { method: 'POST', body: JSON.stringify(formValues) });
  };

  useEffect(() => {
    submitForm();
  }, [formValues])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products")
      if (!res.ok) throw new Error("Failed to fetch pricing profile")
      const products: Product[] = await res.json()
      setProducts(products)

    }


    const fetchPriceProfile = async () => {
      const res = await fetch("/api/pricing-profiles")
      if (!res.ok) throw new Error("Failed to fetch pricing profile")
      const profile: PricingProfile[] = await res.json()
      setPriceProfile(profile[0])
    }

    fetchPriceProfile()
    fetchProducts()
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
        <div className="flex justify-between w-full pb-6 border-b border-slate-50">
          <div>
            <h2 className="text-black-black font-medium">Set Product Pricing</h2>
            <p className="text-sm text-black-grey">Set details</p>
          </div>
        </div>

        <div className="flex justify-between w-full pt-6 border-b border-slate-50">
          <div>
            <p className="text-sm text-black-grey">You are creating a Pricing Profile for</p>
            <div className="flex mt-3">
              {/* <div>
                <input id="one-product" type="radio" checked={false} />
                <label htmlFor="one-product" className="ml-2 text-black-black">One Product</label>
              </div>
              <div className="ml-4">
                <input id="multiple-product" type="radio" checked />
                <label htmlFor="multiple-product" className="ml-2 text-black-black">Multiple Product</label>
              </div>
              <div className="ml-4">
                <input id="all-products" type="radio" checked={false} />
                <label htmlFor="all-products" className="ml-2 text-black-black">All Products</label>
              </div> */}
            </div>
          </div>
        </div>




        <form className="space-y-4">
          <div className="grid grid-cols-5 gap-2">
            {/* Search Input */}
            <div>
              <input
                type="text"
                id="search"
                {...register("search")}
                placeholder="Product / SKU"
                className="mt-3 block w-full rounded-lg border border-black-grey p-3"
              />
            </div>
            {/* Category */}
            <div className="flex items-center">
              <select {...register("category")} className="mt-3 block w-full rounded-lg border border-black-grey bg-white p-3">
                <option className="capitalize text-black-black text-xs font-medium" value="" disabled>Category</option>
                <option value="wine">Wine</option>
                <option value="beer">Beer</option>
                <option value="liquor">Liquor & Spirits</option>
              </select>

                {/* {formValues.category && ( */}
                  <button
                    type="button"
                    onClick={() => setValue("category", "")}
                    className="flex h-full items-center text-gray-500 hover:text-black"
                  >
                    ✕
                  </button>
                {/* )} */}
            </div>

            {/* Segment */}
            <div>
              <select {...register("segment")} className="mt-3 block w-full rounded-lg border border-black-grey bg-white p-3">
                <option className="capitalize text-black-black text-xs font-medium" value="" disabled>Segment</option>
                <option value="luxury">Luxury</option>
                <option value="value">Value</option>
              </select>
            </div>

            {/* Brand */}
            <div>
              <select {...register("brand")} className="mt-3 block w-full rounded-lg border border-black-grey bg-white p-3">
                <option className="capitalize text-black-black text-xs font-medium" value="" disabled>Brand</option>
                <option value="high-garden">High Garden</option>
                <option value="koyama-wines">Koyama Wines</option>
              </select>
            </div>

          </div>

        </form>




        <div className="w-full pt-6 border-b border-slate-50">
          <p>Showing *count* for *prod/sku* *category* *brand*</p>
          <div>
            <Button variant="text">Deselect All</Button>
            <Button variant="text">Select All</Button>
          </div>

          {products.map((product) => (
            <div className="max-w-96 mb-4">
              <p className="text-black-black">{product.title}</p>
              <div className="mt-2 flex justify-between">
                <p>{product.skuCode}</p>
                <p>{product.category}</p>
                <p>{product.segment}</p>
              </div>
            </div>
          ))}
        </div>

      </Box>
      {/** END PRODUCT PRICING */}

      <AssignCustomersCard />
    </Box>
  );
}
