
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const AdvertisementBanner: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        {/* Banner Image */}
        <div className="relative h-64 md:h-80">
          <img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
            alt="Professional Content Analysis Tools"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
            <div className="max-w-lg">
              <span className="inline-block px-4 py-1 bg-white/90 text-primary rounded-full text-sm font-medium mb-4">
                Limited Time Offer
              </span>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                30% Off Premium Subscription
              </h3>
              <p className="text-white/90 text-lg mb-6 max-w-md">
                Get unlimited access to all our professional content tools with our premium plan.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/pricing">
                  <Button size="lg" className="font-medium">
                    Claim Offer
                  </Button>
                </Link>
                <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
