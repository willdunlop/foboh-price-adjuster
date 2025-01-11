import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import Image from "next/image";

export default function Home() {
  return (
    <Card className="bg-slate-50">
      {/** @TODO Breadcrumb component, use an icon instead of > */}
      <div className="flex">
        <div>
          <p>Pricing Profile &gt; <span className="font-bold">Setup a Profile</span></p>
          <p>Setup your pricing profile, select products and assign customers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="text">Cancel</Button>
          <Button>Save as Draft</Button>
        </div>

      </div>
    </Card>
  );
}
