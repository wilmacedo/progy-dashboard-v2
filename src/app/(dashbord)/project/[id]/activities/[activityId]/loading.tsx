'use client';

import { ContentNavbar } from '@/components/content-navbar';
import { Button } from '@/components/ui/button';
import { projectTabs } from '@/config/project-config';
import { ChevronsUpDown } from 'lucide-react';

export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="flex space-y-2 flex-col lg:space-y-0 lg:flex-row items-center justify-between">
        <Button
          variant="outline"
          className="text-start h-18 justify-between font-normal"
        >
          <div className="w-80 md:w-96">
            <div className="mt-0.5 h-[1.25rem] w-80 bg-border rounded-md animate-pulse" />
            <div className="mt-0.5 h-[1rem] w-72 bg-border rounded-md animate-pulse" />
          </div>
          <ChevronsUpDown className="ml-4 h-5 w-5 shrink-0 opacity-50" />
        </Button>
      </div>

      <ContentNavbar tabs={projectTabs} />
    </div>
  );
}
