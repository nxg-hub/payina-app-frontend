// TermsOfService.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';

const TermsOfService = () => {
  return (
    <div className="container mx-auto p-5 bg-white">
      <Navbar />
      <h1 className="text-3xl font-bold text-center text-primary mb-4">Terms of Service</h1>
      <p className="text-lg text-gray-700 mb-4">
        Welcome to Payina! By using our services, you agree to the following terms and conditions.
        If you do not agree, please do not use our services.
      </p>

      <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
      <p className="text-lg text-gray-700 mb-4">
        By accessing our website or downloading Payina Mobile App and using our services, you accept
        and agree to be bound by these Terms of Service and our Privacy Policy. If you are using the
        services on behalf of a business or entity, you represent that you have the authority to
        bind that entity to these terms.
      </p>

      <h2 className="text-2xl font-semibold">2. User Responsibilities</h2>
      <p className="text-lg text-gray-700 mb-4">
        Users are responsible for maintaining the confidentiality of their account information and
        for all activities that occur under their account. You agree to notify us immediately of any
        unauthorized use of your account or any other breach of security. We will not be liable for
        any loss or damage arising from your failure to comply with this provision.
      </p>

      <h2 className="text-2xl font-semibold">3. Service Availability</h2>
      <p className="text-lg text-gray-700 mb-4">
        Payina aims to provide continuous availability of its services; however, we do not guarantee
        that our services will always be available, uninterrupted, or error-free. We may
        occasionally suspend or restrict access to our services for maintenance or other reasons.
      </p>

      <h2 className="text-2xl font-semibold">4. Modifications</h2>
      <p className="text-lg text-gray-700 mb-4">
        We reserve the right to modify these Terms at any time. Changes will be effective
        immediately upon posting on our website. Your continued use of the services after any such
        changes constitutes your acceptance of the new Terms.
      </p>

      <h2 className="text-2xl font-semibold">5. Intellectual Property</h2>
      <p className="text-lg text-gray-700 mb-4">
        All content and materials on our website, including but not limited to text, graphics,
        logos, and software, are the property of Payina or its licensors and are protected by
        intellectual property laws. You may not reproduce, distribute, or create derivative works
        from any content without our prior written consent.
      </p>

      <h2 className="text-2xl font-semibold">6. Limitation of Liability</h2>
      <p className="text-lg text-gray-700 mb-4">
        To the fullest extent permitted by law, Payina shall not be liable for any direct, indirect,
        incidental, special, or consequential damages arising out of or in connection with your use
        of our services, including but not limited to damages for loss of profits, goodwill, use,
        data, or other intangible losses.
      </p>

      <h2 className="text-2xl font-semibold">7. Governing Law</h2>
      <p className="text-lg text-gray-700 mb-4">
        These Terms shall be governed by and construed in accordance with the laws of Nigeria. Any
        disputes arising out of or related to these Terms or your use of the services shall be
        subject to the exclusive jurisdiction of the courts located in Nigeria.
      </p>

      <h2 className="text-2xl font-semibold">8. Contact Us</h2>
      <p className="text-lg text-gray-700 mb-4">
        If you have any questions about these Terms of Service, please contact us at:
        <br />
        <strong>Email:</strong> support@payina.com.ng
      </p>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default TermsOfService;
