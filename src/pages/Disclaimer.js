import React from 'react';
import { Link } from 'react-router-dom';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-12">
        <Link to="/" className="text-purple-600 hover:text-purple-800 mb-6 inline-block">
          ← Back to ForeverFree Humanizer
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Disclaimer
        </h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-sm text-gray-500">Last Updated: January 2026</p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="font-semibold text-yellow-800">GENERAL DISCLAIMER</p>
            <p className="text-yellow-700">ForeverFree Humanizer is provided as a free tool for general text improvement purposes only. By using this service, you acknowledge and agree to the following:</p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">1. NO PROFESSIONAL ADVICE</h2>
            <p>This service does NOT provide:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Medical advice, diagnosis, or treatment recommendations</li>
              <li>Financial, investment, or tax advice</li>
              <li>Legal advice or legal document preparation</li>
              <li>Professional consultation of any kind</li>
            </ul>
            <p className="mt-4 font-semibold text-red-600">Do not use this service for any professional advice purposes. Always consult qualified professionals for medical, financial, or legal matters.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">2. ACCURACY AND RELIABILITY</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Output quality may vary</li>
              <li>We do not guarantee accuracy, completeness, or reliability</li>
              <li>Results should be reviewed and verified by users</li>
              <li>The service may produce errors or unexpected results</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">3. NO WARRANTIES</h2>
            <p>This service is provided "AS IS" without warranties of any kind, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fitness for a particular purpose</li>
              <li>Merchantability</li>
              <li>Non-infringement</li>
              <li>Uninterrupted or error-free operation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">4. LIMITATION OF LIABILITY</h2>
            <p>To the maximum extent permitted by law:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We are not liable for any damages arising from service use</li>
              <li>We are not responsible for decisions made based on service output</li>
              <li>Maximum liability is limited to $0 (as this is a free service)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">5. USER RESPONSIBILITY</h2>
            <p>You are solely responsible for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Content you submit and generate</li>
              <li>How you use the service output</li>
              <li>Verifying accuracy and appropriateness of results</li>
              <li>Compliance with applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">6. CONTENT ACCURACY</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Do not rely on this service for factual accuracy</li>
              <li>Always verify important information independently</li>
              <li>Service is for writing style improvement, not fact-checking</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">7. COPYRIGHT AND PLAGIARISM</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are responsible for ensuring your use doesn't infringe copyrights</li>
              <li>Check output for originality before using commercially</li>
              <li>We are not responsible for copyright violations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">8. THIRD-PARTY SERVICES</h2>
            <p>We use third-party APIs and services. We are not responsible for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Their availability or reliability</li>
              <li>Their content or output</li>
              <li>Their privacy practices or security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">9. SERVICE AVAILABILITY</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service may be interrupted or discontinued at any time</li>
              <li>We do not guarantee 24/7 availability</li>
              <li>Maintenance may occur without notice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">10. EDUCATIONAL PURPOSE</h2>
            <p>This tool is intended for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Learning and educational purposes</li>
              <li>Writing practice and improvement</li>
              <li>Personal content refinement</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">11. CHANGES TO DISCLAIMER</h2>
            <p>This disclaimer may be updated at any time without notice. Continued use constitutes acceptance of changes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">12. GOVERNING LAW</h2>
            <p>Use of this service is governed by applicable laws in your jurisdiction. You are responsible for compliance with local laws.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">13. CONTACT</h2>
            <p>For questions about this disclaimer: legal@foreverfreehumanizer.com</p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200 bg-purple-50 p-6 rounded-lg">
            <p className="text-center font-semibold text-purple-900">BY USING FOREVERFREE HUMANIZER, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO THIS DISCLAIMER.</p>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">© 2026 ForeverFree Humanizer. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
