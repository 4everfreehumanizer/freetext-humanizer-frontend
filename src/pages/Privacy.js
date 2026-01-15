import React from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-12">
        <Link to="/" className="text-purple-600 hover:text-purple-800 mb-6 inline-block">
          ← Back to ForeverFree Humanizer
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-sm text-gray-500">Last Updated: January 2026</p>
          
          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">1. INFORMATION WE COLLECT</h2>
            
            <p><strong>We Do NOT Collect:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your name or email (no registration required)</li>
              <li>Your submitted text (not stored permanently)</li>
              <li>Personal identification information</li>
            </ul>
            
            <p className="mt-4"><strong>We DO Collect:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Anonymous usage statistics (page views, feature usage)</li>
              <li>IP addresses for rate limiting and abuse prevention (temporary)</li>
              <li>Cookie data for ad serving (managed by ad networks)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">2. HOW WE USE INFORMATION</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Rate Limiting:</strong> IP addresses temporarily stored to prevent abuse</li>
              <li><strong>Analytics:</strong> Anonymous data to improve service quality</li>
              <li><strong>Advertising:</strong> Cookies from ad networks (Google AdSense, etc.)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">3. DATA STORAGE</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Submitted Text:</strong> Processed in memory, not saved to database</li>
              <li><strong>Cached Results:</strong> Temporarily cached (1 hour) for performance</li>
              <li><strong>IP Logs:</strong> Automatically deleted after 24 hours</li>
              <li><strong>No permanent user data storage</strong></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">4. THIRD-PARTY SERVICES</h2>
            <p>We use:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>OpenAI API (ChatGPT-4o-mini) for text processing</li>
              <li>Google AdSense for advertising</li>
              <li>Analytics services for usage statistics</li>
            </ul>
            <p className="mt-2">These services have their own privacy policies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">5. COOKIES</h2>
            <p>We use cookies for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ad serving and personalization</li>
              <li>Analytics tracking</li>
              <li>Service functionality</li>
            </ul>
            <p className="mt-2">You can disable cookies in your browser, but ads may not display properly.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">6. DATA SECURITY</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>HTTPS encryption for all connections</li>
              <li>No permanent data storage</li>
              <li>Regular security audits</li>
              <li>API keys stored securely server-side</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">7. YOUR RIGHTS</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the service anonymously</li>
              <li>Disable cookies in your browser</li>
              <li>Request information about data practices</li>
              <li>Stop using the service at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">8. CHILDREN'S PRIVACY</h2>
            <p>This service is not intended for children under 13. We do not knowingly collect data from children.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">9. INTERNATIONAL USERS</h2>
            <p>By using this service, you consent to data processing as described, which may occur in various jurisdictions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">10. CHANGES TO PRIVACY POLICY</h2>
            <p>We may update this policy at any time. Changes are effective immediately upon posting.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">11. CONTACT</h2>
            <p>For privacy questions: privacy@foreverfreehumanizer.com</p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">© 2026 ForeverFree Humanizer. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
