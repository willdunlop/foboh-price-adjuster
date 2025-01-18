import React from 'react'
import { Button } from './Button'

export const OnboardingBreadcrumb = () => (
      <div className="flex flex-col justify-between md:flex-row">
        <div>
          <p className="text-base">Pricing Profile &gt; <span className="font-bold text-black-black">Setup a Profile</span></p>
          <p className="text-sm">Setup your pricing profile, select products and assign customers</p>
        </div>
        <div className="flex gap-2 mt-4 ml-auto md:mt-0">
          <Button variant="text">Cancel</Button>
          <Button variant="secondary">Save as Draft</Button>
        </div>
      </div>
)