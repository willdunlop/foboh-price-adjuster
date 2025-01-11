'use client';

import { Button } from "@/components/common/Button";
import { Box } from "@/components/common/Box";
import { useEffect, useState } from "react";
import { PricingProfile } from "@prisma/client";
import { ProfileCard } from "@/components/ProfileCard";
import { AssignCustomersCard } from "@/components/AssignCustomersCard";
import { Field, Input, Menu, MenuButton, MenuItem, MenuItems, Select } from "@headlessui/react";

export default function Home() {
  const [priceProfile, setPriceProfile] = useState<PricingProfile | null>(null)

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
    <Box className="bg-slate-50 text-black-grey">
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

        <div className="w-full pt-6 border-b border-slate-50">
          <p className="text-sm text-black-grey">Search for Products</p>
          <div className="flex gap-2">
            {/** @TODO Common component */}
            <Field>
              <Input
                type="text"
                placeholder="Search"
                className="mt-3 block w-full rounded-lg border border-black-grey p-3"
              />
            </Field>
            <Field>
              <Input
                type="text"
                placeholder="Product / SKU"
                className="mt-3 block w-full rounded-lg border border-black-grey p-3"
              />
            </Field>
            {/* <Field>
            </Field> */}
            <Field>
            <Input
              type="text"
              placeholder="Category"
              className="mt-3 block w-full rounded-lg border border-black-grey p-3"
            />
              {/* <Menu>
              <MenuButton>Category</MenuButton>
              <MenuItems transition anchor="bottom">
                <MenuItem><p>Wine</p></MenuItem>
                <MenuItem><p>Beer</p></MenuItem>
                <MenuItem><p>Liquor & Spirits</p></MenuItem>
                <MenuItem><p>Cider</p></MenuItem>
                <MenuItem><p>Premixed & Ready-to-go Drink</p></MenuItem>
                <MenuItem><p>Other</p></MenuItem>
              </MenuItems>
            </Menu> */}
              {/* <Select>
                <option>Wine</option>
                <option>Beer</option>
                <option>Liquor & Spirits</option>
                <option>Cider</option>
                <option>Premixed & Ready-to-go Drink</option>
                <option>Other</option>

              </Select> */}
            </Field>
            <Field>
              <Input
                type="text"
                placeholder="Segment"
                className="mt-3 block w-full rounded-lg border border-black-grey p-3"
              />
            </Field>
            <Field>
              <Input
                type="text"
                placeholder="Brand"
                className="mt-3 block w-full rounded-lg border border-black-grey p-3"
              />
            </Field>
          </div>
        </div>

      </Box>
      {/** END PRODUCT PRICING */}

      <AssignCustomersCard />
    </Box>
  );
}
