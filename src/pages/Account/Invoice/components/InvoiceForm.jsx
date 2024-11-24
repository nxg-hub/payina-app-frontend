// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaPlus, FaUser} from 'react-icons/fa'
import Preview from './Preview';

export const InvoiceForm = ({next, }) => {
  const [email, setEmail] = useState('');
  const [customerAdded, setCustomerAdded] = useState(false); 
  const [clientId, setClientId] = useState(null); 
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showClientList, setShowClientList] = useState(false);
  const [isLoadingClients, setIsLoadingClients] = useState(false); 
  const [isAddingClient, setIsAddingClient] = useState(false); 
  const [showPreview, setShowPreview] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [itemAdded, setItemAdded] = useState(false); 
  const [invoiceCreated, setInvoiceCreated] = useState(false); 
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false); 
  const [updatedLineItems, setUpdatedLineItems] = useState ([]);
  const [corporateCustomerId, setCorporateCustomerId] = useState ([]);


  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);


  const handleAddCustomer = async (values,) => {
    setIsAddingClient(true);

    try {
      const customerId = await authenticateEmail(email);
      
      if (!customerId) {
        console.error('Failed to fetch customer ID.');
        return;
      }
      
      const corporateCustomerId = customerId;
      const customerRequestBody = {
              corporateCustomerId: corporateCustomerId,
             firstName: values.customer.Firstname,
             lastName: values.customer.Lastname,
              email: values.customer.email,
              companyName: values.customer.companyName,
               phone: values.customer.contact,
           };
           const response = await fetch(`${import.meta.env.VITE_ADD_CLIENTS_ENDPOINT}${corporateCustomerId}/add-clients`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerRequestBody),
          }
           
          );
          const textResponse = await response.text();

          let parsedResponse;
          try {
            parsedResponse = JSON.parse(textResponse); 
          } catch (error) {
            parsedResponse = textResponse; 
          }
      
          if (response.ok) {

            setCustomerAdded(true); 
            setClientId(parsedResponse.id); 

            setTimeout(() => setCustomerAdded(false), 10000); 
          
          } else {
            console.error('Failed to add customer:', response.status, parsedResponse);
            return;
            }

          } catch (error) {
            console.error('Error adding customer:', error);
          } finally {
            setIsAddingClient(false); 
          }
          
        };
        
        const handleAddItem = (setFieldValue, values) => {
          setIsAddingItem(true);
          try {
               const newItem = {
              invoiceNumber: values.invoice.invoiceNumber,
              dateOfIssue: values.invoice.dateOfIssue,
              dueDate: values.invoice.dateOfDue,
              itemName: values.invoice.itemName,
              quantity: values.invoice.quantity,
              amount: values.invoice.amount,
              tax: 0.075,
              total: (values.invoice.amount * values.invoice.quantity),
              description: values.invoice.itemDescription,
      
           }
      
           const storedItems = JSON.parse(localStorage.getItem('lineItems')) || [];
           const updatedLineItems = [...storedItems, newItem];
           localStorage.setItem('lineItems', JSON.stringify(updatedLineItems));
      
            setUpdatedLineItems(updatedLineItems);
      
        
            setFieldValue('invoice.lineItems', updatedLineItems);
        
      
            setFieldValue('invoice.itemName', '');
            setFieldValue('invoice.quantity', '');
            setFieldValue('invoice.amount', '');
      
        
            setItemAdded(true); 
            setTimeout(() => setItemAdded(false), 10000); 
          } catch (error) {
            console.error('Error adding item:', error);
          }finally {
            setIsAddingItem(false);
          }
        };
      
        useEffect(() => {
          const storedItems = JSON.parse(localStorage.getItem('lineItems')) || [];
        }, []);

          const handleCreateInvoice = async (values) => {  
            setIsCreatingInvoice(true);          
            try {
              if (!clientId) {
                throw new Error('No client ID available');
              }
        
            
     const invoiceRequestBody = {
      invoiceNumber: values.invoice.invoiceNumber,
      description: values.invoice.itemDescription,
      dateOfIssue: values.invoice.dateOfIssue,
      due_date: values.invoice.dateOfDue,
      totalAmount: calculateTotalAmount(values.invoice.lineItems),  
      lineItems: values.invoice.lineItems.map(item => ({
        name: item.itemName,
        amount: item.amount,
        quantity: item.quantity,
      })),
      tax: [
        {
          name: "VAT",
          amount: calculateTaxAmount(values.invoice.lineItems), 
        },
      ],
    };
    
    // Function to calculate the total amount from line items
    function calculateTotalAmount(lineItems) {
      const lineItemTotal = lineItems.reduce((total, item) => {
        const itemTotal = item.amount * item.quantity;
        return total + itemTotal;
      }, 0);
    
      // Calculate tax amount (7.5%)
      const taxAmount = calculateTaxAmount(lineItems);
    
      // Return the combined total amount (lineItems total + tax)
      return lineItemTotal + taxAmount;
    }
    
    // Function to calculate the tax (7.5% of total line items)
    function calculateTaxAmount(lineItems) {
      const lineItemTotal = lineItems.reduce((total, item) => {
        return total + item.amount * item.quantity;
      }, 0);
    
      return lineItemTotal * 0.075; 
    }
    
    // console.log(invoiceRequestBody);
    
           
            const token = localStorage.getItem('authToken');
            if (!token) {
              console.error("Authorization token is missing");
              return;
            }
     const invoiceResponse = await fetch (`${import.meta.env.VITE_CREATE_INVOICE_ENDPOINT}${clientId}/create-invoice`,{
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `${token}`,

     },
     body: JSON.stringify(invoiceRequestBody),
    
   }
  );
        if (!invoiceResponse.ok) {
        throw new Error('Failed to create invoice');
      }

      const invoiceData = await invoiceResponse.json().catch(() => null);

    if (invoiceData && Object.keys(invoiceData).length > 0) {
      // console.log('Invoice created successfully:', invoiceData);
    } else {
      console.error('Invoice creation failed: No response data returned');
    }
      localStorage.removeItem('lineItems');

      
      setInvoiceCreated(true);
      setTimeout(() => setInvoiceCreated(false), 10000); 
      
    }catch (error) {
      console.error('Error:', error);
    }finally {
      setIsCreatingInvoice(false);
    }
    
      };
      
     const handleGetClients = async (values) => {
      setIsLoadingClients(true);
      try {
        const customerId = await authenticateEmail(email);
        
        if (!customerId) {
          console.error('Failed to fetch customer ID.');
          return;
        }
        const corporateCustomerId = customerId;

        setCorporateCustomerId(customerId)

      const response = await fetch(`${import.meta.env.VITE_GET_CLIENTS_ENDPOINT}${corporateCustomerId}/get-clients`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
      );
      if (response.ok) {
        const responseData = await response.json(); 
  
        const clientsData = responseData.map(client => ({
          id: client.id,
          firstName: client.firstName,
          lastName: client.lastName,
          email: client.email,
          companyName: client.companyName,
          phone: client.phone,
        }));

      setClients(clientsData); 
      setShowClientList(true); 
      setClientId(null);  

    } else {
      console.error('Failed to fetch clients:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching clients:', error);
  } finally {
    setIsLoadingClients(false);
  }
};

  const handleSelectClient = (client) => {
    setSelectedClient(client); 
    setClientId(client.id);    
    setShowClientList(false); 
};
 
// function to handle preview button
  const handlePreviewClick = () => {
    setShowPreview(!showPreview); 
  };
  
       // Function to authenticate email and fetch customerId
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
   
  return (
    <div className="md:px-[.5rem] pb-4 w-auto md:clear-right ml-3 md:ml-2 xl:ml-[19.5rem] mr-3 md:mr-2">
      <div className="pt-2 md:pt-[9%] text-sm md:text-base pb-6 " >
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold mb-4">Invoice Form</h1>
      <Formik
        initialValues={{
          customer: {
            Firstname: selectedClient ? selectedClient.firstName : '',
            Lastname: selectedClient ? selectedClient.lastName : '',
            email: selectedClient ? selectedClient.email : '',
            companyName: selectedClient ? selectedClient.companyName : '',
            contact: selectedClient ? selectedClient.phone : '',
          },
          invoice: {
            invoiceNumber: '',
            dateOfIssue: '',
            dateOfDue: '',
            lineItems: [
              {
                itemName: '',
                quantity: '',
                amount: '',
                vat: '',
                total: '',
              },
            ],
            itemDescription: '',
            tax: [
              {
                name: "VAT",
                amount: '',
              },
            ],
          }
        }}
        enableReinitialize

        validationSchema={Yup.object().shape({
          customer: Yup.object().shape({
            Firstname: Yup.string().required('Required'),
            Lastname: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            companyName: Yup.string().required('Required'),
            contact: Yup.string().required('Required')
          }),
          invoice: Yup.object().shape({
            invoiceNumber: Yup.string().required('Required'),
            dateOfIssue: Yup.string().required('Required'),
            dateOfDue: Yup.string().required('Required'),
            // itemName: Yup.string().required('Required'),
            // quantity: Yup.number().required('Required'),
            // amount: Yup.number().required('Required'),
            // vat: Yup.number().required('Required'),
            // total: Yup.number().required('Required'),
            // itemDescription: Yup.string().required('Required')
          })
        })}
        onSubmit={(values) => {
        }}

      >
        {({ isSubmitting, setFieldValue, values, }) => (
          
          <Form className="bg-white  rounded px-4 pt-0 pb-8 mb-4 ">
            <fieldset className="mb-6 shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] py-6  pt-0 px-4 rounded-md   ">
              <legend className="text-xl font-semibold mb-4 pt-11">Customer Information</legend>
              <div className="mb-4">
                <div className='flex'>
                <label htmlFor="customer.Firstname" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2 w-[10rem] ">First Name</label>
                <Field type="text" name="customer.Firstname" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <ErrorMessage name="customerFirst.name" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>

              <div className="mb-4">
                <div className='flex'>
                <label htmlFor="customer.Lastname" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2 w-[10rem] ">Last Name</label>
                <Field type="text" name="customer.Lastname" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <ErrorMessage name="customer.Lastname" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>

              <div className="mb-4">
                <div className='flex'>
                <label htmlFor="customer.email" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2 w-[10rem] ">Email Address</label>
                <Field type="email" name="customer.email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <ErrorMessage name="customer.email" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>

              <div className="mb-4">
                <div className='flex'>
                <label htmlFor="customer.companyName" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2  w-[10rem]">Company Name</label>
                <Field type="text" name="customer.companyName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <ErrorMessage name="customer.companyName" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>

              <div className="mb-6">
                <div className='flex'>
                <label htmlFor="customer.contact" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2  w-[10rem]">Contact</label>
                <Field type="text" name="customer.contact" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <ErrorMessage name="customer.contact" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>
              <div className='grid place-content-end pb-6'>
  <button 
    type="submit"
    onClick={() => handleAddCustomer(values)} 
    disabled={isAddingClient}
    className="flex items-center text-[10px] sm:text-[13px] md:text-base border border-secondary text-secondary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
    <FaPlus className='mr-2'/>
    {isAddingClient ? "Loading..." : "Add Customer"}
    </button>
   {customerAdded && (
      <div className="item-added-box border border-blue-100 bg-blue-100 rounded-lg p-4 mt-4 text-blue-700 max-w-md mx-auto shadow-md">
      <p className="mt-2 text-blue-500 font-bold">Customer added successfully!</p>
    </div>
)}
  <br></br>
  <button 
    type="button"
    onClick={() => handleGetClients(values)}  
    disabled={isLoadingClients}
    className="flex items-center text-[10px] sm:text-[13px] md:text-base border border-secondary text-secondary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
    <FaUser className='mr-2'/>
    {isLoadingClients ? "Loading... please wait" : "Select Existing Customer"}
    </button>
  {showClientList && clients.length > 0 && (
   <div className="client-list-box border border-gray-300 rounded-lg p-4 max-w-md mx-auto mt-4 bg-white shadow-md">
   <h3 className="font-bold text-lg mb-2">Select a customer:</h3>
   <ul className="space-y-2">
     {clients.map(client => (
       <li key={client.id} className="flex justify-between items-center">
         <div>
           <span className="font-medium">{client.firstName} {client.lastName}</span>
           <p className="text-sm text-gray-500">{client.email}</p>
         </div>
         <button 
           type="button"
           onClick={() => handleSelectClient(client)}
           className="text-xs text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 rounded"
           >
           Select
         </button>
       </li>
     ))}
   </ul>
 </div>
)}
</div>
</fieldset>
       <fieldset className="mb-6 shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] py-6   pt-0 px-4 rounded-md  ">
              <legend className=" text-[16px] md:text-[21px] font-semibold mb-4 pt-11 ">Invoice Details</legend>
              <div className="mb-4">
                <label htmlFor="invoice.invoiceNumber" className="block text-[10px] sm:text-[13px] md:text-base  font-bold mb-2">Invoice Number</label>
                <Field type="text" name="invoice.invoiceNumber" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="invoice.invoiceNumber" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>

              <div className='grid grid-cols-2 gap-4'>
              <div className="mb-4">
                <label htmlFor="invoice.dateOfIssue" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">Date of Issue</label>
                <Field type="date" name="invoice.dateOfIssue" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="invoice.dateOfIssue" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="invoice.dateOfDue" className="block text-[10px] sm:text-[13px] md:text-base mb-2">Date of Due</label>
                <Field type="date" name="invoice.dateOfDue" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="invoice.dateOfDue" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>
              </div>

              <div className="mb-4">
                <label htmlFor="invoice.itemName" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">Item Name</label>
                <Field type="text" name="invoice.itemName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="invoice.itemName" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>

              <div className='grid grid-cols-4 gap-4 '> 
              <div className="mb-4 ">
                <label htmlFor="invoice.quantity" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">Quantity</label>
                <Field type="number" name="invoice.quantity" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="invoice.quantity" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="invoice.amount" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">Amount</label>
                <Field type="number" name="invoice.amount" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="invoice.amount" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>
              <div className="mb-4">
  <label htmlFor="invoice.tax[0].amount" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">
    VAT (7.5%)
  </label>
  <div className="relative">
    <Field
      type="number"
      name="invoice"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      value="0.075" // Set the VAT rate to 0.075

      readOnly 
    />
  </div>
  <ErrorMessage
    name="invoice.tax[0].amount"
    component="div"
    className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base mt-1"
  />
</div>


              <div className="mb-4">
                <label htmlFor="invoice.total" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">Total</label>
                <Field type="number" name="invoice.total" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="invoice.total" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>
              </div>

              <div className="mb-6">
                <label htmlFor="invoice.itemDescription" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">Item Description</label>
                <Field type="text" name="invoice.itemDescription" className="shadow appearance-none border rounded w-full h-[8rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="invoice.itemDescription" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1 " />
              </div>
              <div className='grid place-content-end pb-4'>
                <div className='pb-6'>
              <button type="button"
               className=" flex items-center   text-secondary text-[10px] sm:text-[13px] md:text-base font-bold py-2 px-5 border border-secondary rounded focus:outline-none focus:shadow-outline mr-2 "
               onClick={() => handleAddItem(setFieldValue, values)} 
               disabled={isAddingItem}>
              <FaPlus className='mr-2'/>
                {isAddingItem ? "Loading..." : "Add Item"}
              </button>
              {/* Conditionally Render the 'Item Added' Message */}
              {itemAdded && (
  <div className="item-added-box border border-blue-100 bg-blue-100 rounded-lg p-4 mt-4 text-blue-700 max-w-md mx-auto shadow-md">
    <p className="mt-2 text-blue-500 font-bold">Item added successfully!</p>
  </div>
)}

              </div>
              </div>
              <div className='flex justify-center'>
                <div className='pb-6'>
              <button type="button" className="text-secondary text-[10px] sm:text-[13px] md:text-base font-bold py-2 px-4 border border-secondary  rounded focus:outline-none focus:shadow-outline mr-2"

              >
                Cancel
              </button>
              </div>
              <div className='pb-6'>
              <button type="submit" 
               onClick={() => handleCreateInvoice(values)}
               disabled={isCreatingInvoice}
              className="bg-secondary text-primary text-[10px] sm:text-[13px] md:text-base font-bold py-2 px-4 border border-secondary  rounded focus:outline-none focus:shadow-outline mr-2">
                {isCreatingInvoice ? "Loading..." : "Create Invoice"}
                </button>
              {invoiceCreated && (
  <div className="item-added-box border border-blue-100 bg-blue-100 rounded-lg p-4 mt-4 text-blue-700 max-w-md mx-auto shadow-md">
    <p className="mt-2 text-blue-500 font-bold">Invoice successfully created!</p>
  </div>
)}
              </div>
               {/* Preview Button */}
      <div className='pb-6'>
        <button
          type="button"
          onClick={handlePreviewClick} 
          className="bg-secondary text-primary text-[10px] sm:text-[13px] md:text-base font-bold py-2 px-4 border border-secondary rounded focus:outline-none focus:shadow-outline"
        >
          {showPreview ? "Close Preview" : "Preview"}
          </button>
      </div>

      {showPreview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-[664px] h-auto max-h-[90vh] overflow-y-auto p-4 bg-white rounded shadow-lg z-60">
            <Preview className="preview-class" updatedLineItems={updatedLineItems} customerId={corporateCustomerId} email= {email}/>
            <button
              type="button"
              onClick={handlePreviewClick}
              className="absolute right-12 bg-blue-500 text-white py-2 px-3 rounded focus:outline-none"
  style={{ bottom: '20px' }} 
>
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
            </fieldset>
          </Form>
        )}

      </Formik>
    </div>
    </div>
    </div>
  );

};


  
export default InvoiceForm;