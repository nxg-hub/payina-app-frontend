import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useState } from 'react';
import UpdateInventoryForm from './UpdateInventoryForm';
import ReactPaginate from 'react-paginate';

const InventoryTable = ({ searchTerm }) => {
  const exportToPDF = () => {
    const element = document.getElementById('table-container');
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190; // Fit the image width to A4 size
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('table.pdf');
    });
  };

  const [inventoryData] = useState([
    {
      id: 1,
      productName: 'Rice',
      pricePerProduct: 60000,
      totalQunatityStocked: 50,
      totalQunatitySold: 25,
      stockLeft: 25,
      totalSalesPerProduct: 700000,
    },
    {
      id: 2,
      productName: 'Beans',
      pricePerProduct: 60000,
      totalQunatityStocked: 50,
      totalQunatitySold: 25,
      stockLeft: 25,
      totalSalesPerProduct: 700000,
    },
    {
      id: 3,
      productName: 'yam',
      pricePerProduct: 60000,
      totalQunatityStocked: 50,
      totalQunatitySold: 25,
      stockLeft: 25,
      totalSalesPerProduct: 700000,
    },
    {
      id: 4,
      productName: 'phone',
      pricePerProduct: 60000,
      totalQunatityStocked: 50,
      totalQunatitySold: 25,
      stockLeft: 25,
      totalSalesPerProduct: 700000,
    },
    {
      id: 5,
      productName: 'shovel',
      pricePerProduct: 60000,
      totalQunatityStocked: 50,
      totalQunatitySold: 25,
      stockLeft: 25,
      totalSalesPerProduct: 700000,
    },
    {
      id: 6,
      productName: 'light',
      pricePerProduct: 60000,
      totalQunatityStocked: 50,
      totalQunatitySold: 25,
      stockLeft: 25,
      totalSalesPerProduct: 700000,
    },
    {
      id: 7,
      productName: 'bulb',
      pricePerProduct: 60000,
      totalQunatityStocked: 50,
      totalQunatitySold: 25,
      stockLeft: 25,
      totalSalesPerProduct: 700000,
    },
    {
      id: 8,
      productName: 'laptop',
      pricePerProduct: 60000,
      totalQunatityStocked: 50,
      totalQunatitySold: 25,
      stockLeft: 25,
      totalSalesPerProduct: 700000,
    },
    {
      id: 9,
      productName: 'palm',
      pricePerProduct: 60000,
      totalQunatityStocked: 50,
      totalQunatitySold: 25,
      stockLeft: 25,
      totalSalesPerProduct: 700000,
    },
    {
      id: 10,
      productName: 'tv',
      pricePerProduct: 60000,
      totalQunatityStocked: 50,
      totalQunatitySold: 25,
      stockLeft: 25,
      totalSalesPerProduct: 700000,
    },
    {
      id: 11,
      productName: 'car',
      pricePerProduct: 60000,
      totalQunatityStocked: 50,
      totalQunatitySold: 25,
      stockLeft: 25,
      totalSalesPerProduct: 700000,
    },
    {
      id: 12,
      productName: 'roll',
      pricePerProduct: 60000,
      totalQunatityStocked: 50,
      totalQunatitySold: 25,
      stockLeft: 25,
      totalSalesPerProduct: 700000,
    },
  ]);

  // State to track which popup is visible
  const [visiblePopup, setVisiblePopup] = useState(null);
  const [update, setUpdate] = useState(false);

  const [currentPage, setCurrentPage] = useState(0); // Current page index

  // Filter items based on the search term
  const filteredItems = inventoryData.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 10; // Number of items per page
  const pageCount = Math.ceil(inventoryData.length / itemsPerPage); // Total pages

  // Get items for the current page
  const currentItems = filteredItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    setVisiblePopup(null); // Close any open popups when switching pages
  };

  // Toggle the popup visibility for a specific item
  const togglePopup = (id) => {
    setVisiblePopup((prev) => (prev === id ? null : id)); // Toggle visibility
  };

  const handleUpdate = () => {
    setUpdate(true);
  };

  return (
    <>
      <div id="table-container">
        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full border border-[#77777766] bg-white text-sm">
            <thead className="bg-[#ddd] text-gray-700 ">
              <tr>
                <th className="border-b border-[#77777766] px-4 py-2">S/N</th>
                <th className="border-b border-[#77777766] px-4 py-2">Product Name</th>
                <th className="border-b border-[#77777766] px-4 py-2">Price per Product(1 Qty)N</th>
                <th className="border-b border-[#77777766] px-4 py-2">Total Quantity Stocked </th>
                <th className="border-b border-[#77777766] px-4 py-2">Total Quantity Sold </th>
                <th className="border-b border-[#77777766] px-4 py-2">Stock Left</th>
                <th className="border-b border-[#77777766] px-4 py-2">
                  Total Sales per product (N)
                </th>
                <th className="border-b border-[#77777766] px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((data, i) => {
                return (
                  <tr key={i} className="border-b">
                    <td className="border-b border-[#77777766] px-4 py-2">{i + 1}</td>
                    <td className="border-b border-[#77777766] px-4 py-2">{data.productName}</td>
                    <td className="border-b border-[#77777766] px-4 py-2">
                      {data.pricePerProduct}
                    </td>
                    <td className="border-b border-[#77777766] px-4 py-2">
                      {data.totalQunatityStocked}
                    </td>
                    <td className="border-b border-[#77777766] px-4 py-2">
                      {data.totalQunatitySold}
                    </td>
                    <td className="border-b border-[#77777766] px-4 py-2">{data.stockLeft}</td>
                    <td className="border-b border-[#77777766] px-4 py-2 flex gap-5 justify-around">
                      {data.totalSalesPerProduct}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          handleUpdate();
                        }}
                        className="p-1 rounded-md text-black  border bg-[#00618133] border-[#000] mt-2 font-bold  right-1 mb-2 z-20">
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {update && (
            <>
              <div className=" z-50 absolute top-[0%] right-[5%] w-[80%]">
                <UpdateInventoryForm />
                <button
                  onClick={() => {
                    setUpdate(false);
                  }}
                  className="bg-red-600 text-white z-50 absolute p-2 rounded-md font-bold top-[4%] right-[22%]">
                  Close
                </button>
              </div>
              <div
                onClick={() => {
                  setUpdate(false);
                }}
                className="text-black fixed top-0 left-0 right-0 w-full h-[150%] mt-[-1rem] z-20 backdrop-blur-[2px] transition-all duration-150 animate-slideLeft "></div>
            </>
          )}
        </div>

        {/* No items found message */}
        {filteredItems.length === 0 && (
          <p className="text-gray-500 text-center mt-4">No items found.</p>
        )}
      </div>
      {/* Export btn */}
      <div className="mt-4">
        <button
          onClick={exportToPDF}
          className="bg-[#00618133] font-bold px-4 py-2 rounded-lg  hover:bg-stone-400 border shadow-md">
          Export as PDF
        </button>
      </div>

      {/* Pagination Component */}
      <ReactPaginate
        previousLabel={'← Previous'}
        nextLabel={'Next →'}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName="flex justify-center space-x-2 mt-4"
        pageClassName="px-3 py-1 rounded-md border border-gray-300 text-gray-700 cursor-pointer hover:bg-gray-200"
        activeClassName="bg-[#00618133] text-black"
        previousClassName="px-3 py-1 rounded-md border border-gray-300 text-gray-700 cursor-pointer hover:bg-gray-200"
        nextClassName="px-3 py-1 rounded-md border border-gray-300 text-gray-700 cursor-pointer hover:bg-gray-200"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </>
  );
};

export default InventoryTable;
