import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const Preview = ({ className = "", updatedLineItems= [], corporateCustomerId= '', email}) => {

  const { invoiceNumber, dateOfIssue, dueDate } = updatedLineItems[updatedLineItems.length - 1] || {};
  const totalAmount = updatedLineItems.reduce((sum, item) => sum + item.total, 0); // Sum of item totals
  const taxAmount = totalAmount * 0.075; // 7.5% tax of total amount
  const totalAmountWithTax = totalAmount + taxAmount; 

  const [profileData, setProfileData] = useState({
    businessName: "",
    businessHouseNumber: "",
    businessStreetName: "",
    businessState: "",
    businessLGA: "",
  });
  const [customerId, setCustomerId] = useState(corporateCustomerId);

  const authenticateEmail = async (email) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_GET_USER_BY_EMAIL_ENDPOINT}?email=${encodeURIComponent(email)}`);
      if (response.ok) {
        const data = await response.json();
        return data.customerId; 
      } else {
        console.error('Failed to authenticate email:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error authenticating email:', error);
      throw error;
    }
  };

  const parseXML = (xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    return {
      businessName: xmlDoc.querySelector('businessName')?.textContent || "",
      businessHouseNumber: xmlDoc.querySelector('businessHouseNumber')?.textContent || "",
      businessStreetName: xmlDoc.querySelector('businessStreetName')?.textContent || "",
      businessState: xmlDoc.querySelector('businessState')?.textContent || "",
      businessLGA: xmlDoc.querySelector('businessLGA')?.textContent || "",
    };
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch customerId using the provided email
        const fetchedCustomerId = await authenticateEmail(email);
        
        if (!fetchedCustomerId) {
          console.error('Failed to fetch customer ID.');
          return;
        }
        
        setCustomerId(fetchedCustomerId);  

        const response = await fetch(`${import.meta.env.VITE_VIEW_PROFILE_ENDPOINT}${fetchedCustomerId}`);
        
        if (response.ok) {
          const xmlString = await response.text(); 
          const parsedData = parseXML(xmlString); 
          
          setProfileData(parsedData); 
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProfile();
  }, [email]); 
  return (
    <div
      className={`w-[664px] max-w-full bg-white overflow-hidden leading-normal tracking-normal text-left text-base text-black font-body-text21-semibold mq450:h-auto mq450:min-h-[824] p-6 ${className}`}
    >
      {/* Header Section */}
      <div className="w-full flex flex-row justify-between items-start gap-5 flex-wrap">
        <div className="w-[212px] flex flex-col gap-[16.5px]">
          <img
            className="w-24 h-24 rounded-full object-contain"
            alt="Company logo"
            src="https://images.pexels.com/photos/258174/pexels-photo-258174.jpeg"
          />

           <div className="w-full font-medium">
            <p className="m-0">{profileData.businessName}</p>
            <p className="m-0">{`${profileData.businessHouseNumber} ${profileData.businessStreetName}`}</p>
            <p className="m-0">{`${profileData.businessLGA}, ${profileData.businessState}`}</p>
          </div>
          
      <div className="relative w-[45vw] border">
  <div className="absolute inset-0 border-t-3 border-black rounded"></div>
  <div className="relative w-full border border-black rounded">
    <div className="flex flex-col gap-4 text-lg p-2">
    <div className="flex flex-row justify-between " >
            <b>Invoice Number:</b>
                <span>{invoiceNumber}</span>
              </div>
    
            <div className="flex flex-row justify-between " >
            <b>Issue date:</b>
                <span>{dateOfIssue}</span>
              </div>
              <div className="flex flex-row justify-between">
              <b>Due date:</b>
                <span>{dueDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
<section className="mt-8 w-full text-left text-black">
  <table className="w-full table-auto border-collapse border border-black">
    <thead>
      <tr>
        <th className="text-left p-2 border border-black" style={{ width: '50%' }}>Items</th>
        <th className="text-left p-2 border border-black" style={{ width: '30%' }}>Quantity</th>
        <th className="text-left p-2 border border-black" style={{ width: '30%' }}>Amount</th>
        <th className="text-left p-2 border border-black" style={{ width: '30%' }}>VAT</th>
        <th className="text-left p-2 border border-black" style={{ width: '30%' }}>Total</th>
      </tr>
    </thead>
    <tbody>
    {updatedLineItems.map((item, index) => (
  <tr key={index}>
    <td className="p-2 border-r border-black">{item.itemName}</td>
    <td className="p-2 border-r border-black">{item.quantity}</td>
    <td className="p-2 border-r border-black">{item.amount}</td>
    <td className="p-2 border-r border-black">0.075 </td>
    <td className="p-2">{item.total}</td>
  </tr>
))}
          <tr className="font-bold border border-black">
          <td colSpan="4" className="p-2 border-black">Total Amount:</td>
          <td className="p-2">{totalAmountWithTax}</td>
          </tr>
                </tbody>
  </table>
</section>
    </div>
  );
};

Preview.propTypes = {
  className: PropTypes.string,
  updatedLineItems: PropTypes.shape({
    itemName: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    invoiceNumber: PropTypes.string,
    dateOfIssue: PropTypes.string,
    due_date: PropTypes.string,
  }),
};

Preview.defaultProps = {
  updatedLineItems: {
    itemName: '',
    quantity: 0,
    amount: 0,
    total: 0,
    tax: 0,
    invoiceNumber: '',
    dateOfIssue: '',
    due_date: '',
  }, // Default to an empty object if no data is passed
};

export default Preview;

    