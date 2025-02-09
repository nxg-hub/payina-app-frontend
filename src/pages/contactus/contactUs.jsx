// // ContactUs.jsx
// // eslint-disable-next-line no-unused-vars
// import React from 'react';
// import { Navbar, Sidebar } from '../Account/_components';
// import Footer from '../../components/footer/footer';
//
// const ContactUs = () => {
//   return (
//     <div className="container mx-auto p-5">
//       <Navbar />
//       <br />
//       <h1 className="text-3xl font-bold text-center text-primary">Contact Us</h1>
//
//       {/* Contact Information Section */}
//       <div className="mt-8 text-center">
//         <p className="mt-4 text-lg font-semibold">
//           <a href="mailto:support@payina.com.ng" className="text-primary">
//             <p>
//               Feel free to reach out to us via the following contact details
//               <br />
//               or fill the form below. Our team will reach out to you swiftly.
//             </p>
//             Email: support@payina.com.ng
//           </a>
//         </p>
//         <p className="mt-2 text-lg font-semibold">
//           <a href="tel:+2349037394146" className="text-primary">
//             Phone: +234 903 739 4146
//           </a>
//         </p>
//         {/*<p className="mt-2 text-lg font-semibold">Address: 123 Brough Street, Lux City, USA</p>*/}
//       </div>
//
//       {/* Contact Form Section */}
//       <form className="mt-8 max-w-md mx-auto">
//         <div className="mb-4">
//           <label className="block text-gray-700">Name</label>
//           <input
//             type="text"
//             className="border rounded w-full p-2"
//             placeholder="Full Name"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-white-700">Email</label>
//           <input
//             type="email"
//             className="border rounded w-full p-2"
//             placeholder="Email Address"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Message</label>
//           <textarea
//             className="border rounded w-full p-2"
//             rows="4"
//             placeholder="Message"
//             required></textarea>
//         </div>
//         <button type="submit" className="bg-primary text-black rounded p-2">
//           Send Message
//         </button>
//       </form>
//       <br />
//       <br />
//       <br />
//
//       <Footer />
//     </div>
//   );
// };
//
// export default ContactUs;


// ContactUs.jsx
import React from 'react';
import { Navbar, Sidebar } from '../Account/_components';
import Footer from '../../components/footer/footer';

const ContactUs = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Sidebar />
      <br />
      <h1 className="text-3xl font-bold text-center text-secondary">Contact Us</h1>

      {/* Contact Information Section */}
      <div className="mt-8 text-center">
        <p className="mt-4 text-lg font-semibold text-neutral">
          Feel free to reach out to us via the following contact details
          <br />
          or fill the form below. Our team will reach out to you swiftly.
        </p>
        <p className="mt-4 text-lg font-semibold">
          <a href="mailto:support@payina.com.ng" className="text-secondary">
            Email: support@payina.com.ng
          </a>
        </p>
        <p className="mt-2 text-lg font-semibold">
          <a href="tel:+2349037394146" className="text-secondary">
            Phone: +234 903 739 4146
          </a>
        </p>
      </div>

      {/* Contact Form Section */}
      <form className="mt-8 max-w-md mx-auto bg-lightBlue p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-100">Name</label>
          <input
            type="text"
            className="border rounded w-full p-2 text-gray-900"
            placeholder="Full Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-100">Email</label>
          <input
            type="email"
            className="border rounded w-full p-2 text-gray-900"
            placeholder="Email Address"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-100">Message</label>
          <textarea
            className="border rounded w-full p-2 text-gray-900"
            rows="4"
            placeholder="Message"
            required></textarea>
        </div>
        <button
          type="submit"
          className="bg-yellow text-black font-bold rounded p-2 w-full hover:bg-secondary hover:text-white transition">
          Send Message
        </button>
      </form>
      <br />
      <br />
      {/*<Footer />*/}
    </div>
  );
};

export default ContactUs;
