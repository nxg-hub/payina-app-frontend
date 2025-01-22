import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Preview = ({ className = '', updatedLineItems = [] }) => {
  // console.log(updatedLineItems);
  const { invoiceNumber, dateOfIssue, due_date, vat } =
    updatedLineItems[updatedLineItems.length - 1] || {};
  const itemsWithTotalVAT = updatedLineItems.map((item) => {
    const vatAmount = (item.vat / 100) * item.total; // Calculate VAT
    const totalIncludingVAT = item.total + vatAmount; // Add VAT to total
    return {
      ...item,
      totalIncludingVAT, // Add a new property for the total including VAT
    };
  });
  const totalAmount = itemsWithTotalVAT.reduce((sum, item) => sum + item.totalIncludingVAT, 0);

  //getting the userProfile from the redux store
  const userDetails = useSelector((state) => state.user.user);
  const userBusinessDetails = useSelector((state) => state.coporateCustomerProfile.customerDetails);

  return (
    <div
      className={`w-[664px] max-w-full bg-white overflow-hidden leading-normal tracking-normal text-left text-base text-black font-body-text21-semibold mq450:h-auto mq450:min-h-[824] p-6 ${className}`}>
      {/* Header Section */}
      <div className="w-full flex flex-row justify-between items-start gap-5 flex-wrap">
        <div className="w-[212px] flex flex-col gap-[16.5px]">
          <img
            className="w-24 h-24 rounded-full object-contain"
            alt="Company logo"
            src={userDetails.companyLogoUrl}
          />

          <div className="w-full font-medium">
            <p className="m-0">{userBusinessDetails.businessName}</p>
            <p className="m-0">{`${userBusinessDetails.businessHouseNumber} ${userBusinessDetails.businessStreetName}`}</p>
            <p className="m-0">{`${userBusinessDetails.businessLGA}, ${userBusinessDetails.businessState}`}</p>
          </div>

          <div className="relative w-[45vw] border">
            <div className="absolute inset-0 border-t-3 border-black rounded"></div>
            <div className="relative w-full border border-black rounded">
              <div className="flex flex-col gap-4 text-lg p-2">
                <div className="flex flex-row justify-between ">
                  <b>Invoice Number:</b>
                  <span>{invoiceNumber}</span>
                </div>

                <div className="flex flex-row justify-between ">
                  <b>Issue date:</b>
                  <span>{dateOfIssue}</span>
                </div>
                <div className="flex flex-row justify-between">
                  <b>Due date:</b>
                  <span>{due_date}</span>
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
              <th className="text-left p-2 border border-black" style={{ width: '50%' }}>
                Items
              </th>
              <th className="text-left p-2 border border-black" style={{ width: '30%' }}>
                Quantity
              </th>
              <th className="text-left p-2 border border-black" style={{ width: '30%' }}>
                Amount
              </th>
              <th className="text-left p-2 border border-black" style={{ width: '30%' }}>
                VAT(%)
              </th>
              <th className="text-left p-2 border border-black" style={{ width: '30%' }}>
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {updatedLineItems.map((item, index) => (
              <tr key={index}>
                <td className="p-2 border-r border-black">{item.itemName || item.name}</td>
                <td className="p-2 border-r border-black">{item.quantity}</td>
                <td className="p-2 border-r border-black">{item.amount}</td>
                <td className="p-2 border-r border-black">{item.vat} </td>
                <td className="p-2">{item.total + (item.vat / 100) * item.total}</td>
              </tr>
            ))}
            <tr className="font-bold border border-black">
              <td colSpan="4" className="p-2 border-black">
                Total Amount:
              </td>
              <td className="p-2">{totalAmount}</td>
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
    name: '',
    quantity: 0,
    amount: 0,
    total: 0,
    tax: 0,
    invoiceNumber: '',
    dateOfIssue: '',
    due_date: '',
  },
};

export default Preview;
