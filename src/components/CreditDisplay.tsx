
import React from 'react';
import { useCredits, ToolType } from '../context/CreditContext';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CreditDisplayProps {
  tool: ToolType;
}

export const CreditDisplay: React.FC<CreditDisplayProps> = ({ tool }) => {
  const { availableCredits, isLoggedIn } = useCredits();
  
  // Get max credits based on login status
  const getMaxCredits = () => {
    return isLoggedIn ? 750 : 500;
  };
  
  const maxCredits = getMaxCredits();
  const percentage = Math.max(0, Math.min(100, (availableCredits[tool] / maxCredits) * 100));

  return (
    <div className="flex justify-between items-center w-full max-w-sm animate-fade-in">
      <div className="flex flex-col w-3/4 mr-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-muted-foreground">Credits Available</span>
          <span className="text-sm font-semibold">
            {availableCredits[tool]} / {maxCredits}
          </span>
        </div>
        <Progress value={percentage} className="h-2" />
        <p className="text-xs text-muted-foreground mt-1">
          {isLoggedIn ? '750' : '500'} credits per day (1 credit = 1 word)
        </p>
      </div>
      <Link to="/pricing">
        <Button variant="default" size="sm" className="flex items-center gap-1.5">
          <ArrowUp className="w-4 h-4" />
          Upgrade
        </Button>
      </Link>
    </div>
  );
};
