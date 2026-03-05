
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { ProfileForm } from './ProfileForm';
import { UsageStatsSection } from './UsageStatsSection';
import { SubscriptionDetails } from './SubscriptionDetails';
import { AccountSettings } from './AccountSettings';
import { User } from '@/context/types';

interface ProfileContentProps {
  activeTab: string;
  user: User | null;
}

export const ProfileContent: React.FC<ProfileContentProps> = ({ activeTab, user }) => {
  return (
    <div className="md:w-3/4">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-primary/10">
        {activeTab === 'profile' && (
          <div className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <ProfileForm user={user} onUpdateAvatar={() => {}} />
          </div>
        )}
        
        {activeTab === 'usage' && (
          <div className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <h3 className="text-lg font-medium mb-4">Usage Statistics</h3>
            <UsageStatsSection userId={user?.id} />
          </div>
        )}
        
        {activeTab === 'subscription' && (
          <div className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <h3 className="text-lg font-medium mb-4">Subscription Details</h3>
            <SubscriptionDetails />
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <h3 className="text-lg font-medium mb-4">Account Settings</h3>
            <AccountSettings />
          </div>
        )}
      </div>
    </div>
  );
};
