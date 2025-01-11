import { Button } from "@/components/Button";
import { Box } from "@/components/Box";
import Image from "next/image";

export default function Home() {
  return (
    <Box className="bg-slate-50 text-black-black">
      {/** @TODO Breadcrumb component, use an icon instead of > */}
      <div className="flex justify-between">
        <div className="text-black-grey">
          <p className="text-base">Pricing Profile &gt; <span className="font-bold text-black-black">Setup a Profile</span></p>
          <p className="text-sm">Setup your pricing profile, select products and assign customers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="text">Cancel</Button>
          <Button variant="secondary">Save as Draft</Button>
        </div>
      </div>

      <Box>
        <div className="flex justify-between">
          <div>
            <h1>Basic Pricing Profile</h1>
            {/** @TODO MAKE ME A PROPER DESCRIPTION */}
            <p className="text-sm text-black-grey">Cheeky little description goes in here</p>
          </div>
        </div>
      </Box>
    </Box>
  );
}
