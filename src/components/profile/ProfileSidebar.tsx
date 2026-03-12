
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="md:w-1/4">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-primary/10 md:sticky md:top-24">
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="h-full">
          <TabsList className="flex flex-col h-auto space-y-2 bg-transparent">
            <TabsTrigger
              value="profile"
              className="justify-start w-full text-left px-4 py-3 data-[state=active]:bg-primary/10 rounded-lg"
            >
              Personal Information
            </TabsTrigger>
            <TabsTrigger
              value="usage"
              className="justify-start w-full text-left px-4 py-3 data-[state=active]:bg-primary/10 rounded-lg"
            >
              Usage Statistics
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="justify-start w-full text-left px-4 py-3 data-[state=active]:bg-primary/10 rounded-lg"
            >
              Analysis History
            </TabsTrigger>
            <TabsTrigger
              value="subscription"
              className="justify-start w-full text-left px-4 py-3 data-[state=active]:bg-primary/10 rounded-lg"
            >
              Subscription Details
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
