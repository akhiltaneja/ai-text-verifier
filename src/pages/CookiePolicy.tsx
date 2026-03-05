
import React, { useEffect } from 'react';
import { Layout } from '@/components/Layout';

const CookiePolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="lead">Last Updated: March 1, 2025</p>
          
          <h2>1. Introduction</h2>
          <p>
            This Cookie Policy explains how AI Content Tools ("we", "us", or "our") uses cookies and similar technologies 
            to recognize you when you visit our website at https://aicontenttools.com ("Website"). It explains what these 
            technologies are and why we use them, as well as your rights to control our use of them.
          </p>
          
          <h2>2. What Are Cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
            Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, 
            as well as to provide reporting information.
          </p>
          <p>
            Cookies set by the website owner (in this case, AI Content Tools) are called "first-party cookies". Cookies set 
            by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party 
            features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). 
            The parties that set these third-party cookies can recognize your computer both when it visits the website in question 
            and also when it visits certain other websites.
          </p>
          
          <h2>3. Why Do We Use Cookies?</h2>
          <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order 
            for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable 
            us to track and target the interests of our users to enhance the experience on our Website. Third parties serve cookies through 
            our Website for analytics and other purposes.</p>
          
          <h2>4. Types of Cookies We Use</h2>
          <p>The specific types of first and third-party cookies served through our Website and the purposes they perform are described below:</p>
          
          <h3>4.1 Essential Website Cookies</h3>
          <p>
            These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, 
            such as access to secure areas. These cookies are essential for using the service and cannot be rejected.
          </p>
          
          <h3>4.2 Performance and Functionality Cookies</h3>
          <p>
            These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. 
            However, without these cookies, certain functionality may become unavailable.
          </p>
          
          <h3>4.3 Analytics and Customization Cookies</h3>
          <p>
            These cookies collect information that is used either in aggregate form to help us understand how our Website is being used 
            or how effective our marketing campaigns are, or to help us customize our Website for you.
          </p>
          
          <h3>4.4 Targeting Cookies</h3>
          <p>
            These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad 
            from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting 
            advertisements that are based on your interests.
          </p>
          
          <h2>5. How Can You Control Cookies?</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences 
            in the Cookie Consent Manager that we show you when you first visit our Website.
          </p>
          <p>
            You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still 
            use our Website though your access to some functionality and areas of our Website may be restricted. As the means by which you can 
            refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.
          </p>
          
          <h2>6. How Often Will We Update This Cookie Policy?</h2>
          <p>
            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for 
            other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about 
            our use of cookies and related technologies.
          </p>
          <p>
            The date at the top of this Cookie Policy indicates when it was last updated.
          </p>
          
          <h2>7. Where Can You Get Further Information?</h2>
          <p>
            If you have any questions about our use of cookies or other technologies, please email us at privacy@aicontenttools.com.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default CookiePolicy;
