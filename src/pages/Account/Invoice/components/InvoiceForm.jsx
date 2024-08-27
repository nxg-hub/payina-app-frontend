
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaPlus, FaUser} from 'react-icons/fa'

export const InvoiceForm = ({next, }) => {
  const [email, setEmail] = useState('');
  const [customerAdded, setCustomerAdded] = useState(false); // State to manage customer added message
  const [clientId, setClientId] = useState(null); // State to store client id
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null); // Store selected client
  const [showClientList, setShowClientList] = useState(false);
  const [isLoadingClients, setIsLoadingClients] = useState(false); // Loading state for fetching clients
  const [isAddingClient, setIsAddingClient] = useState(false); // Loading state for adding client


  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);


  const handleAddCustomer = async (values,) => {
    setIsAddingClient(true);

    try {
      // Fetch customerId using the provided email
      const customerId = await authenticateEmail(email);
      
      if (!customerId) {
        console.error('Failed to fetch customer ID.');
        return;
      }
      
      // Set corporateCustomerId to the fetched customerId
      const corporateCustomerId = customerId;
      console.log('Corporate Customer ID:', corporateCustomerId);
    
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
            parsedResponse = JSON.parse(textResponse); // Try to parse as JSON
          } catch (error) {
            parsedResponse = textResponse; // If it fails, handle as plain text
          }
      
          if (response.ok) {
            console.log('Customer added successfully:', parsedResponse);
            setCustomerAdded(true); // Show the message after customer is added successfully
            setClientId(parsedResponse.id); // Store client ID in state

            setTimeout(() => setCustomerAdded(false), 10000); // Hide the message after 10 seconds
          
          } else {
            console.error('Failed to add customer:', response.status, parsedResponse);
            return;
            }

          } catch (error) {
            console.error('Error adding customer:', error);
          } finally {
            setIsAddingClient(false); // Stop loading
          }
          
        };
      
          // After successful customer creation, proceed with invoice creation
          const handleCreateInvoice = async (values) => {
            try {
              if (!clientId) {
                throw new Error('No client ID available');
              }
        
     console.log('Customer added successfully. ID:', clientId,);
            
      const invoiceRequestBody = {
               invoiceNumber: values.invoice.invoiceNumber,
              description: values.invoice.itemDescription,
              dateOfIssue: values.invoice.dateOfIssue,
              due_date: values.invoice.dateOfDue,
              clientId: clientId,
              lineItems: [
                {
                  name: values.invoice.itemName,
                  amount: values.invoice.amount,
                  quantity: values.invoice.quantity,
                },
              ],
            };
      
     const invoiceResponse = await fetch (`${import.meta.env.VITE_CREATE_INVOICE_ENDPOINT}${clientId}/create-invoice`,{
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(invoiceRequestBody),
    
   }
  );
        if (!invoiceResponse.ok) {
        throw new Error('Failed to create invoice');
      }

      const invoiceData = await invoiceResponse.json();
      console.log('Invoice created successfully:', invoiceData);

      alert('Invoice created successfully!');
      
    }catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
      };
        // Function to handle getting existing clients
     const handleGetClients = async (values) => {
      setIsLoadingClients(true);
      try {
        // Fetch customerId using the provided email
        const customerId = await authenticateEmail(email);
        
        if (!customerId) {
          console.error('Failed to fetch customer ID.');
          return;
        }
        const corporateCustomerId = customerId;

        console.log('Fetching clients for client ID:', corporateCustomerId);
   
      const response = await fetch(`${import.meta.env.VITE_GET_CLIENTS_ENDPOINT}${corporateCustomerId}/get-clients`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors'
      
    }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const responseText = await response.text(); // Get the response as plain text
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(responseText, "application/xml"); // Parse the XML
  
      // Extract client data from the XML
      const items = xmlDoc.getElementsByTagName('item');
      const clientsData = Array.from(items).map(item => ({
        id: item.getElementsByTagName('id')[0].textContent,
        firstName: item.getElementsByTagName('firstName')[0].textContent,
        lastName: item.getElementsByTagName('lastName')[0].textContent,
        email: item.getElementsByTagName('email')[0].textContent,
        companyName: item.getElementsByTagName('companyName')[0].textContent,
        phone: item.getElementsByTagName('phone')[0].textContent,
      }));
  
      setClients(clientsData); // Set the clients state
      setShowClientList(true); // Show the client list

    } catch (error) {
      console.error('Failed to fetch clients:', error);
    }finally {
      setIsLoadingClients(false);
    }
  };

  // function to handle/display selected clients
  const handleSelectClient = (client) => {
    setSelectedClient(client); // Set selected client data
    setShowClientList(false); // Hide the client list after selection

  };

       // Function to authenticate email and fetch customerId
  const authenticateEmail = async (email) => {
    console.log ('Email:', email)
    try {
      const response = await fetch(`${import.meta.env.VITE_GET_USER_BY_EMAIL_ENDPOINT}?email=${encodeURIComponent(email)}`);
      if (response.ok) {
        const data = await response.json();
        return data.customerId; // Return the customerId
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
            itemName: '',
            quantity: '',
            amount: '',
            vat: '',
            total: '',
            itemDescription: ''
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
            itemName: Yup.string().required('Required'),
            quantity: Yup.number().required('Required'),
            amount: Yup.number().required('Required'),
            vat: Yup.number().required('Required'),
            total: Yup.number().required('Required'),
            itemDescription: Yup.string().required('Required')
          })
        })}
        onSubmit={(values) => {
        }}

      >
        {({ isSubmitting, values }) => (
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
  {/* Add Customer Button */}
  <button 
    type="submit"
    onClick={() => handleAddCustomer(values)} // Call add customer handler
    disabled={isAddingClient}
    className="flex items-center text-[10px] sm:text-[13px] md:text-base border border-secondary text-secondary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
    <FaPlus className='mr-2'/>
    {isAddingClient ? "Loading..." : "Add Customer"}
    </button>
   {/* Conditionally Render the 'Customer Added' Message */}
   {customerAdded && (
      <div className="customer-added-box border border-green-100 bg-green-100 rounded-lg p-4 mt-4 text-green-700 max-w-md mx-auto shadow-md">

    <p className="mt-2 text-green-500 font-bold">Customer added successfully!</p>
    </div>
)}
  <br></br>
  <button 
    type="button"
    onClick={() => handleGetClients(values)} // Call get clients handler
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
           onClick={() => handleSelectClient(client)} // Select the client and auto-fill the form
           className="text-sm text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded-lg"
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
                <label htmlFor="invoice.vat" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">VAT</label>
                <Field type="number" name="invoice.vat" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="invoice.vat" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
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
              <button type="button" className=" flex items-center   text-secondary text-[10px] sm:text-[13px] md:text-base font-bold py-2 px-5 border border-secondary rounded focus:outline-none focus:shadow-outline mr-2 ">
                
                <FaPlus className='mr-2'/>
                Add Item
              
              </button>
              </div>
              </div>
              <div className='flex justify-center'>
                <div className='pb-6'>
              <button type="button" className="text-secondary text-[10px] sm:text-[13px] md:text-base font-bold py-2 px-4 border border-secondary  rounded focus:outline-none focus:shadow-outline mr-2">
                Cancel
              </button>
              </div>
              <div className='pb-6'>
              <button type="submit" 
               onClick={() => handleCreateInvoice(values)}
               disabled={isSubmitting}
              className="bg-secondary text-primary text-[10px] sm:text-[13px] md:text-base font-bold py-2 px-4 border border-secondary  rounded focus:outline-none focus:shadow-outline mr-2">
                Create Invoice
              </button>
              </div>
              <div className='pb-6'>
              <button type="button" className="bg-secondary text-primary text-[10px] sm:text-[13px] md:text-base font-bold py-2 px-4 border border-secondary  rounded focus:outline-none focus:shadow-outline">
                Preview
              </button>
              </div>
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