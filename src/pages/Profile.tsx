
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { SubscriptionDetails } from '@/components/profile/SubscriptionDetails';
import { AccountSettings } from '@/components/profile/AccountSettings';
import { UsageStatsSection } from '@/components/profile/UsageStatsSection';
import { useCredits } from '@/context/CreditContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';
import { ProfileContent } from '@/components/profile/ProfileContent';

const Profile = () => {
  const { isLoggedIn, user, setUser } = useCredits();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 relative">
          <BackgroundBeams className="absolute inset-0 opacity-20" />
          <div className="relative z-10">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Access Denied</CardTitle>
                <CardDescription>You need to be logged in to view this page</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert variant="warning" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Authentication Required</AlertTitle>
                  <AlertDescription>
                    Please log in or create an account to access your profile.
                  </AlertDescription>
                </Alert>
                <Button asChild className="w-full">
                  <Link to="/login">Sign In</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50 opacity-50"></div>
        <BackgroundBeams className="absolute inset-0 opacity-20" />

        <div className="container max-w-6xl mx-auto py-10 px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-6">
            <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <ProfileContent activeTab={activeTab} user={user} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
