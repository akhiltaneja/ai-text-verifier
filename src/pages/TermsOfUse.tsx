
import React from 'react';
import { Layout } from '@/components/Layout';

const TermsOfUse = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using AI Content Tools ("the Service"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Service.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Description of Service</h2>
            <p>
              AI Content Tools provides various content analysis tools including AI Content Detection, Grammar Checking, AI Summarization, and more. These tools are designed to assist content creators, writers, and publishers.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
            <p>
              Some features of the Service may require registration. You agree to provide accurate information when registering and to keep this information updated. You are responsible for maintaining the confidentiality of your account credentials.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Content Ownership</h2>
            <p>
              You retain ownership of any content you submit to the Service. However, by submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, store, and process your content for the purpose of providing the Service.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Prohibited Uses</h2>
            <p>
              You agree not to use the Service for any unlawful purpose or in any way that could damage, disable, or impair the Service. Prohibited activities include but are not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Attempting to bypass usage limits</li>
              <li>Reverse engineering the Service</li>
              <li>Uploading harmful content or malware</li>
              <li>Using the Service to violate intellectual property laws</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
            <p>
              The Service is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the Service, including but not limited to direct, indirect, incidental, or consequential damages.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Modification of Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Continued use of the Service after such modifications constitutes your acceptance of the revised Terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Termination</h2>
            <p>
              We may terminate or suspend your access to the Service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users of the Service, us, or third parties, or for any other reason.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws, without regard to its conflict of law provisions.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at support@aicontenttools.com.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfUse;
