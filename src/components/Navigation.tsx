
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCredits } from '@/context/CreditContext';
import { AuthModal } from '@/components/AuthModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User, CreditCard, Languages } from 'lucide-react';
import logo from '@/assets/logo.png';
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/context/LanguageContext';
import { Progress } from "@/components/ui/progress";

export function Navigation() {
  const { isLoggedIn, user, logout, credits, availableCredits } = useCredits();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    setShowMobileMenu(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate total max credits (for display purposes)
  const maxCreditsPerTool = isLoggedIn ? 750 : 500;
  const totalMaxCredits = Object.keys(availableCredits || {}).length * maxCreditsPerTool;
  
  const creditPercentage = totalMaxCredits > 0 ? (credits || 0) / totalMaxCredits * 100 : 0;

  // Generate a consistent avatar based on user ID
  const getAvatarUrl = () => {
    if (!user?.id) return null;
    
    const avatarStyle = user?.avatar_style || getAvatarStyleForUser(user.id);
    return `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${user.id}`;
  };
  
  // Function to determine consistent avatar style based on user ID
  const getAvatarStyleForUser = (userId: string) => {
    const avatarStyles = ['adventurer', 'avataaars', 'bottts', 'fun-emoji', 'thumbs', 'lorelei'];
    
    // Convert userId string to a number for consistent selection
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
       hash = ((hash << 5) - hash) + userId.charCodeAt(i);
       hash = hash & hash; // Convert to 32bit integer
    }
    
    // Use absolute value and modulo to get a consistent index
    const styleIndex = Math.abs(hash) % avatarStyles.length;
    return avatarStyles[styleIndex];
  };

  const navigationLinks = [
    { path: '/ai-detector', text: t('navigation.aiDetector') },
    { path: '/ai-summary', text: t('navigation.aiSummarizer') },
    { path: '/grammar-checker', text: t('navigation.grammarChecker') },
    { path: '/translator', text: t('navigation.translator') },
    { path: '/blog', text: 'Blog' },
    { path: '/pricing', text: t('navigation.pricing') },
    { path: '/faq', text: t('navigation.faq') },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-white'
      }`}
    >
      <div className="container relative flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="aitextverifier" className="h-20 w-auto object-contain -my-2" />
        </Link>

        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navigationLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="hover:text-primary transition-colors"
            >
              {link.text}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                  <Avatar className="h-10 w-10 border border-primary/20">
                    <AvatarImage 
                      src={getAvatarUrl()} 
                      alt={user?.name || 'User'} 
                    />
                    <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  {credits !== undefined && (
                    <Badge variant="outline" className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs bg-primary text-white">
                      {credits}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white backdrop-blur-sm">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">{t('profile.availableCredits')}</span>
                        <Badge variant="outline" className="px-2 py-0.5 text-xs">
                          {credits} / {totalMaxCredits}
                        </Badge>
                      </div>
                      <Progress value={creditPercentage} className="h-2" />
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    {t('profile.profile')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    {t('profile.settings')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Languages className="mr-2 h-4 w-4" />
                    <span>{getLanguageDisplay(language)}</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="bg-white">
                      <DropdownMenuLabel className="text-xs font-normal">
                        {t('profile.language')}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
                        <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="es">Español</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="fr">Français</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="de">Deutsch</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="zh">中文</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('profile.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" size="md" onClick={() => setOpenAuthModal(true)}>
              {t('navigation.login')}
            </Button>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </div>

      {showMobileMenu && (
        <div className="md:hidden border-b bg-white backdrop-blur-sm">
          <div className="container flex flex-col py-4 space-y-3">
            {navigationLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="hover:text-primary transition-colors"
              >
                {link.text}
              </Link>
            ))}
            {isLoggedIn ? (
              <Link to="/profile" className="hover:text-primary transition-colors">
                {t('profile.profile')}
              </Link>
            ) : (
              <Button variant="default" size="sm" onClick={() => setOpenAuthModal(true)}>
                {t('navigation.login')}
              </Button>
            )}
          </div>
        </div>
      )}

      <AuthModal
        isOpen={openAuthModal}
        onClose={() => setOpenAuthModal(false)}
        defaultTab="login"
      />
    </header>
  );
}

// Helper function to display language name
function getLanguageDisplay(lang: string): string {
  const languageNames: Record<string, string> = {
    'en': 'English',
    'es': 'Español',
    'fr': 'Français',
    'de': 'Deutsch',
    'zh': '中文'
  };
  
  return languageNames[lang] || 'English';
}
