import React from 'react';
import Logo from '../../components/navbar/_components/logo';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const VendReceipt = ({ setElectricity }) => {
  //   const vend = {
  //     error: false,
  //     status: 'success',
  //     message: 'Successfully processed the vend request',
  //     responseCode: '00',
  //     responseData: {
  //       packageName: 'EKEDC PREPAID',
  //       tokenData: {
  //         stdToken: {
  //           amount: '100.00',
  //           receiptNumber: '7124202502200215357',
  //           units: '1.9',
  //           unitsType: 'Kwh',
  //           value: '6705 0051 9740 7752 5100',
  //         },
  //       },
  //       paymentDate: '2025-02-20T08:23:28',
  //       paid: true,
  //       description: 'Prepaid Residential 1PH Band C',
  //       paymentReference: 'NXG-PYYPbRO1oo2-1739992905845',
  //       transactionId: '7124202502200215357',
  //       walletBalance: 11933.69,
  //       accountBalance: 0,
  //       vendStatus: 'CONFIRMED',
  //       channel: 'web',
  //       narration: 'Vend Successful',
  //       statusCode: '00',
  //       amount: 100.0,
  //       debtPayment: 0.0,
  //       convenienceFee: 0.0,
  //       customerMessage:
  //         "Your EKEDC PREPAID EKEDC PREPAID payment of NGN 100.00 for 0232210079025 was successful.\nToken: 6705 0051 9740 7752 5100\nUnits: 1.9\nREF: 7124202502200215357. Thank you for using the service. C'Gate",
  //       meterNumber: '0232210079025',
  //       customerName: 'OLUOMA UKPAKA CHINAEZE ',
  //       accountNumber: '701623736',
  //       ekedcExtraData: {
  //         mapUnits: 0.0,
  //         mapAmount: 0,
  //         refundAmount: 0,
  //         refundUnits: 0.0,
  //         unitsTopUp: [
  //           {
  //             concept: 'CC283',
  //             conceptName: 'Prepaid Energy - Band C',
  //             units: 1.9168,
  //             price: 48.53,
  //             amount: 93.02,
  //           },
  //           { concept: 'CC501', conceptName: 'VAT', units: 93.02, price: 7.5, amount: 6.98 },
  //         ],
  //       },
  //     },
  //   };
  const vendResponse = localStorage.getItem('vendValueResponse');
  const vend = JSON.parse(vendResponse);
  const exportToPDF = () => {
    const element = document.getElementById('receipt-container');
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190; // Fit the image width to A4 size
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('receipt.pdf');
    });
  };
  return (
    <div className="w-[80%] md:w-[60%] xl:md:w-[40%] m-auto bg-blue-100 py-4 mt-20 z-50 relative md:mt-[175px]">
      <div id="receipt-container">
        <div className="w-[90%] m-auto  mb-5">
          <Logo />
        </div>
        <article className="w-[90%] m-auto space-y-2  font-semibold ">
          <h3>CUSTOMER NAME: {vend?.responseData?.customerName}</h3>
          <h3>DATE: {new Date(vend?.responseData?.paymentDate).toLocaleString()}</h3>
          <h3>PAYMENT REFERENCE: {vend?.responseData?.paymentReference}</h3>
          <h3>TRASANCTION ID: {vend?.responseData?.transactionId}</h3>
          <h3>
            TOKEN:
            <span className="font-bold">{vend?.responseData?.tokenData?.stdToken?.value}</span>
          </h3>
          <h3>DESCRIPTION: {vend?.responseData?.description}</h3>
        </article>
      </div>
      <div className=" w-[90%] m-auto space-x-2">
        <button
          onClick={exportToPDF}
          className="rounded-[5px] text-xs md:text-base m-auto  py-2 border border-lightBlue bg-lightBlue w-[40%] text-primary">
          Download
        </button>
        <button
          onClick={() => {
            setElectricity(false);
          }}
          className="rounded-[5px] text-xs md:text-base m-auto  py-2 border border-lightBlue bg-red-500 w-[40%] text-primary">
          close
        </button>
      </div>
    </div>
  );
};

export default VendReceipt;
