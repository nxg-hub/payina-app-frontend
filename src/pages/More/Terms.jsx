import React, { useState } from 'react';
import { images } from '../../constants';
import { jsPDF } from 'jspdf';
import PropTypes from 'prop-types';

const Terms = ({ goBack }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [showAllTerms, setShowAllTerms] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });

    const content = document.getElementById('terms-document');
    let yOffset = 10; // Start position for text

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    const sections = content.querySelectorAll('h1, h2, p');

    sections.forEach((section) => {
      let text = section.innerText.trim();

      if (text) {
        let textWidth = doc.internal.pageSize.getWidth() - 20;
        let lines = doc.splitTextToSize(text, textWidth);

        if (yOffset + lines.length * 7 > doc.internal.pageSize.getHeight() - 10) {
          doc.addPage();
          yOffset = 10; // Reset for new page
        }

        if (section.tagName === 'H1') {
          doc.setFontSize(16);
          doc.setFont('helvetica', 'bold');
        } else if (section.tagName === 'H2') {
          doc.setFontSize(14);
          doc.setFont('helvetica', 'bold');
        } else {
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
        }

        doc.text(lines, 10, yOffset);
        yOffset += lines.length * 7 + 5;
      }
    });

    doc.save('terms_of_service.pdf');
  };

  return (
    <div
      id="terms-document"
      className="flex flex-col justify-between lg:items-center items-start py-7 px-5 lg:px-0 ml-0 lg:ml-80 lg:py-28 pt-10 mx-auto">
      <div className="flex flex-row justify-between items-left gap-[5rem] lg:gap-[45rem] pb-7">
        <div className="text-xl md:text-3xl font-medium">Terms And conditions</div>
        <div className="cancelAction-img mr-[5rem]" onClick={goBack}>
          <img src={images.BackIcon} alt="cancelAction"></img>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="text-black text-3xl font-bold text-center">
          Payina Payment Solution Terms of Use
        </h1>
        <p className="text-[17px] font-medium leading-6 lg:w-[50vw] w-full text-center">
          Please review these documents carefully to understand your rights and obligations when
          using the Payina app. Your continued use of our services indicates your acceptance of
          these terms.
        </p>
        <button
          type="submit"
          onClick={downloadPdf}
          className="rounded-full text-xs md:text-base py-[10px] px-[30px] border border-lightBlue bg-yellow hover:bg-[#FFb950] text-black hover:bg-yellow-400 transition-all transform hover:scale-105 hover:animate-bounce">
          Download Page
        </button>
      </div>

      {/* Mobile-Friendly Terms Head */}
      <div className="w-full bg-gray-50 py-4 px-5 shadow-md rounded-xl block lg:hidden">
        <hr className="border-gray-300 mb-4" />
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowAllTerms(!showAllTerms)}>
          <span className="text-lg font-bold">Welcome To Payina</span>
          <span className="text-2xl">{showAllTerms ? '▲' : '▼'}</span>
        </div>
        {showAllTerms && (
          <ol className="mt-3 space-y-2">
            {[
              'Acceptance of Terms',
              'User Responsibilities',
              'Service Availability',
              'Modifications',
              'Intellectual Property',
              'Limitation of Liability',
              'Governing Law',
              'Contact Us',
            ].map((item, index) => (
              <li
                key={index}
                className="cursor-pointer text-lg text-gray-700 hover:text-lightBlue"
                onClick={() => scrollToSection(item.replace(/\s+/g, '').toLowerCase())}>
                {item}
              </li>
            ))}
          </ol>
        )}
        <hr className="border-gray-300 mt-4" />
      </div>

      {/* Terms Section */}
      <div
        id="terms-content"
        className="termsText flex flex-row gap-10 mt-3 lg:mt-10 px-5 lg:px-10 py-5">
        {/* Terms Body (Left Side) */}
        <div className="termsBody w-full lg:w-2/3 space-y-8">
          <Section
            id="WelcomeToPayina"
            title="Welcome To Payina"
            content="Welcome to Payina! By using our services, you agree to the following terms and
              conditions. If you do not agree, please do not use our services."
          />
          <Section
            id="AcceptanceofTerms"
            title="Acceptance of Terms"
            content="By accessing our website or downloading Payina Mobile App and using our services, you
              accept and agree to be bound by these Terms of Service and our Privacy Policy. If you
              are using the services on behalf of a business or entity, you represent that you have
              the authority to bind that entity to these terms."
          />
          <Section
            id="UserResponsibilities"
            title="User Responsibilities"
            content="Users are responsible for maintaining the confidentiality of their account information
              and for all activities that occur under their account. You agree to notify us
              immediately of any unauthorized use of your account or any other breach of security.
              We will not be liable for any loss or damage arising from your failure to comply with
              this provision."
          />
          <Section
            id="ServiceAvailability"
            title="Service Availability"
            content=" Payina aims to provide continuous availability of its services; however, we do not
              guarantee that our services will always be available, uninterrupted, or error-free. We
              may occasionally suspend or restrict access to our services for maintenance or other
              reasons."
          />
          <Section
            id="Modifications"
            title="Modifications"
            content="We reserve the right to modify these Terms at any time. Changes will be effective
              immediately upon posting on our website. Your continued use of the services after any
              such changes constitutes your acceptance of the new Terms."
          />
          <Section
            id="IntellectualProperty"
            title="Intellectual Property"
            content="All content and materials on our website, including but not limited to text, graphics,
              logos, and software, are the property of Payina or its licensors and are protected by
              intellectual property laws. You may not reproduce, distribute, or create derivative
              works from any content without our prior written consent."
          />
          <Section
            id="LimitationofLiability"
            title="Limitation of Liability"
            content="To the fullest extent permitted by law, Payina shall not be liable for any direct,
              indirect, incidental, special, or consequential damages arising out of or in
              connection with your use of our services, including but not limited to damages for
              loss of profits, goodwill, use, data, or other intangible losses."
          />
          <Section
            id="GoverningLaw"
            title="Governing Law"
            content="These Terms shall be governed by and construed in accordance with the laws of Nigeria.
              Any disputes arising out of or related to these Terms or your use of the services
              shall be subject to the exclusive jurisdiction of the courts located in Nigeria."
          />
          <Section
            id="ContactUs"
            title="Contact Us"
            content="If you have any questions about these Terms of Service, please contact us at:
              Email: support@payina.com.ng"
          />
        </div>
        {/* Terms Head (Right Side) */}
        {/* Desktop Terms Head */}
        <div className="termsHead w-1/3 sticky top-28 h-screen overflow-auto bg-gray-50 py-7 px-10 shadow-md rounded-xl hidden lg:block">
          <hr className="border-gray-300 mb-4" />
          <ol className="[list-style-type:upper-roman] space-y-4 ml-4">
            {[
              'Welcome To Payina',
              'Acceptance of Terms',
              'User Responsibilities',
              'Service Availability',
              'Modifications',
              'Intellectual Property',
              'Limitation of Liability',
              'Governing Law',
              'Contact Us',
            ].map((item, index) => {
              const id = item.replace(/\s+/g, '').toLowerCase();
              const isActive = activeSection === id;

              return (
                <li key={index} className="cursor-pointer">
                  <div
                    className={`py-2 px-2 text-lg ${isActive ? 'text-yellow font-bold' : 'text-black'} hover:text-lightBlue`}
                    onClick={() => scrollToSection(id)}>
                    {item}
                  </div>
                  <hr className="border-gray-200" />
                </li>
              );
            })}
          </ol>
          {/* <hr className="border-gray-300 mt-4" /> */}
        </div>
      </div>
    </div>
  );
};

// Reusable Section Component
const Section = ({ id, title, content }) => {
  // Check if content contains an email and replace it with a clickable link
  const renderContent = () => {
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
    const parts = content.split(emailRegex);

    return parts.map((part, index) =>
      emailRegex.test(part) ? (
        <a key={index} href={`mailto:${part}`} className="text-blue-500 hover:underline">
          {part}
        </a>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <div id={id.toLowerCase()} className="scroll-mt-28">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-700">{renderContent()}</p>
    </div>
  );
};

export default Terms;

Terms.propTypes = {
  goBack: PropTypes.func.isRequired,
};

Section.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
