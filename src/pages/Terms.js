import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-12">
        <Link to="/" className="text-purple-600 hover:text-purple-800 mb-6 inline-block">
          ← Back to ForeverFree Humanizer
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Terms of Use
        </h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-sm text-gray-500">Last Updated: January 2026</p>
          
          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">1. ACCEPTANCE OF TERMS</h2>
            <p>By using ForeverFree Humanizer, you agree to these Terms of Use. If you do not agree, do not use this service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">2. SERVICE DESCRIPTION</h2>
            <p>ForeverFree Humanizer is a free online tool that transforms AI-generated text into more natural, human-like writing. The service is provided "as is" without any warranties.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">3. ACCEPTABLE USE</h2>
            <p><strong>You may use this service for:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal writing improvement</li>
              <li>Content editing and refinement</li>
              <li>Educational purposes</li>
            </ul>
            
            <p className="mt-4"><strong>You may NOT use this service for:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Medical advice or medical content</li>
              <li>Financial or investment advice</li>
              <li>Legal advice or legal documents</li>
              <li>Creating harmful, illegal, or malicious content</li>
              <li>Violating copyright or intellectual property rights</li>
              <li>Generating NSFW or adult content</li>
              <li>Political manipulation or misinformation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">4. USER RESPONSIBILITIES</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are responsible for all content you submit</li>
              <li>You must not abuse or overload the service</li>
              <li>You must not attempt to bypass rate limits or security measures</li>
              <li>You retain ownership of your submitted content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">5. INTELLECTUAL PROPERTY</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You retain all rights to content you submit</li>
              <li>The service output is provided for your use</li>
              <li>Our branding and code remain our property</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">6. SERVICE AVAILABILITY</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We provide this service free of charge</li>
              <li>We may modify or discontinue the service at any time</li>
              <li>We do not guarantee 100% uptime or availability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">7. LIMITATION OF LIABILITY</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service is provided "as is" without warranties</li>
              <li>We are not liable for any damages from service use</li>
              <li>Maximum liability is limited to $0 (free service)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">8. PRIVACY</h2>
            <p>See our <Link to="/privacy" className="text-purple-600 hover:underline">Privacy Policy</Link> for data handling. We do not store your submitted text. We use ads to support the free service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">9. CHANGES TO TERMS</h2>
            <p>We may update these terms at any time. Continued use constitutes acceptance of changes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">10. CONTACT</h2>
            <p>For questions: support@foreverfreehumanizer.com</p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">© 2026 ForeverFree Humanizer. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
