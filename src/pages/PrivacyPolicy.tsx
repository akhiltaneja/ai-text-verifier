
import React from 'react';
import { Layout } from '@/components/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              At AI Content Tools, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our services.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <p>
              We collect several types of information from and about users of our Service, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Personal identifiers (name, email address)</li>
              <li>Account credentials (username, password)</li>
              <li>Content you input into our tools</li>
              <li>Usage information (features used, time spent)</li>
              <li>Technical data (IP address, browser type, device information)</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide and maintain our Service</li>
              <li>Improve and personalize your experience</li>
              <li>Process transactions and manage your account</li>
              <li>Send administrative information</li>
              <li>Protect against fraudulent or illegal activity</li>
              <li>Fulfill any other purpose for which you provide it</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Third-Party Services</h2>
            <p>
              We may use third-party services to support our Service. These third parties may have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Your Privacy Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal data, such as:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access to your personal data</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your personal data</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our Service and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@aicontenttools.com.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
