// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { FaPlus, FaUser } from 'react-icons/fa';
import Preview from './Preview';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientSuccess } from '../../../../Redux/GetClientsSlice';

export const InvoiceForm = ({ next, lineItems }) => {
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
  const [updatedLineItems, setUpdatedLineItems] = useState([]);
  const [corporateCustomerId, setCorporateCustomerId] = useState([]);
  const [invoiceId, setInvoiceId] = useState(null);
  const [isSendingInvoice, setIsSendingInvoice] = useState(false);
  const [invoiceSent, setInvoiceSent] = useState(false);
  const [total, setTotal] = useState(0);
  const clientss = useSelector((state) => state.clients.clients);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleAddCustomer = async (values) => {
    const customerDetails = values.customer;
    if (
      customerDetails.Firstname === '' ||
      customerDetails.Lastname === '' ||
      customerDetails.companyName === '' ||
      customerDetails.contact === '' ||
      customerDetails.email === ''
    ) {
      return;
    }
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
      const response = await fetch(
        `${import.meta.env.VITE_ADD_CLIENTS_ENDPOINT}${corporateCustomerId}/add-clients`,
        {
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
        //if client has been added successfully call the get clients endpoint and update it in the store
        const response = await fetch(
          `${import.meta.env.VITE_GET_CLIENTS_ENDPOINT}${corporateCustomerId}/get-clients`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.ok) {
          const responseData = await response.json();

          const clientsData = responseData.map((client) => ({
            id: client.id,
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            companyName: client.companyName,
            phone: client.phone,
          }));

          dispatch(fetchClientSuccess(clientsData));
          setCustomerAdded(true);
          setClientId(parsedResponse.id);
        }

        setTimeout(() => setCustomerAdded(false), 10000);
      } else {
        console.error('Failed to add customer:', response.status, parsedResponse);
        return;
      }
      setSelectedClient({
        firstName: values.customer.Firstname,
        lastName: values.customer.Lastname,
        email: values.customer.email,
        companyName: values.customer.companyName,
        phone: values.customer.contact,
      });
    } catch (error) {
      console.error('Error adding customer:', error);
    } finally {
      setIsAddingClient(false);
    }
  };

  // Function to calculate the difference in days between two dates
  const calculateDaysDifference = (dateOfIssue, due_date) => {
    const start = new Date(dateOfIssue);
    const end = new Date(due_date);

    if (start && end && end >= start) {
      const diffTime = Math.abs(end - start);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return '';
  };

  const handleAddItem = (setFieldValue, values) => {
    if (
      values.invoice.invoiceNumber === '' ||
      values.invoice.dateOfIssue === '' ||
      values.invoice.due_date === '' ||
      values.invoice.name === '' ||
      values.invoice.quantity === '' ||
      values.invoice.amount === '' ||
      values.invoice.itemDescription === ''
      // values.invoice.lineItems[0].name === ''
      // values.invoice.lineItems[0].quantity === '' ||
      // values.invoice.lineItems[0].amount === ''
      // values.invoice.lineItems[0].vat === ''
      // values.invoice.lineItems[0].total === ''
    ) {
      return;
    }
    setIsAddingItem(true);
    try {
      const newItem = {
        invoiceNumber: values.invoice.invoiceNumber,
        dateOfIssue: values.invoice.dateOfIssue,
        due_date: values.invoice.due_date,
        name: values.invoice.name,
        quantity: values.invoice.quantity,
        amount: values.invoice.amount,
        invoiceValidity: values.invoice.invoiceValidity,
        tax: 0.075,
        total: values.invoice.amount * values.invoice.quantity,
        description: values.invoice.itemDescription,
      };

      const storedItems = JSON.parse(localStorage.getItem('lineItems')) || [];

      const updatedLineItems = [...storedItems, newItem];
      localStorage.setItem('lineItems', JSON.stringify(updatedLineItems));

      setUpdatedLineItems(updatedLineItems);

      setFieldValue('invoice.lineItems', updatedLineItems);

      setFieldValue('invoice.name', '');
      setFieldValue('invoice.quantity', '');
      setFieldValue('invoice.amount', '');
      setFieldValue('invoice.total', '');

      setItemAdded(true);
      setTimeout(() => setItemAdded(false), 10000);
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setIsAddingItem(false);
    }
  };

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('lineItems')) || [];
  }, []);

  const handleCreateInvoice = async (values) => {
    if (
      values.invoice.invoiceNumber === '' ||
      values.invoice.dateOfIssue === '' ||
      values.invoice.due_date === '' ||
      values.invoice.name === '' ||
      values.invoice.quantity === '' ||
      values.invoice.amount === '' ||
      values.invoice.itemDescription === '' ||
      values.invoice.invoiceValidity === ''
      // values.invoice.lineItems[0].name === '' ||
      // values.invoice.lineItems[0].quantity === '' ||
      // values.invoice.lineItems[0].amount === '' ||
      // values.invoice.lineItems[0].vat === '' ||
      // values.invoice.lineItems[0].total === ''
    ) {
      return;
    }
    setIsCreatingInvoice(true);
    try {
      if (!clientId) {
        throw new Error('No client ID available');
      }

      // Check if there are items in local storage
      let storedLineItems = JSON.parse(localStorage.getItem('lineItems')) || [];

      // Fallback for single-item input if storedLineItems is empty
      if (
        storedLineItems.length === 0 &&
        values.invoice.name &&
        values.invoice.quantity &&
        values.invoice.amount
      ) {
        storedLineItems = [
          {
            name: values.invoice.name,
            amount: parseFloat(values.invoice.amount),
            quantity: parseInt(values.invoice.quantity, 10),
          },
        ];
      }

      const invoiceRequestBody = {
        invoiceNumber: values.invoice.invoiceNumber,
        description: values.invoice.itemDescription,
        dateOfIssue: values.invoice.dateOfIssue,
        due_date: values.invoice.due_date,
        totalAmount: calculateTotalAmount(storedLineItems),
        invoiceValidity: values.invoice.invoiceValidity,
        lineItems: storedLineItems, // Use the populated or fallback lineItems array

        tax: [
          {
            name: 'VAT',
            amount: calculateTaxAmount(storedLineItems),
          },
        ],
      };

      function calculateTotalAmount(lineItems) {
        const lineItemTotal = lineItems.reduce((total, item) => {
          const itemTotal = item.amount * item.quantity;
          return total + itemTotal;
        }, 0);

        // Use calculateTaxAmount for the tax
        const taxAmount = calculateTaxAmount(lineItems);

        return lineItemTotal + taxAmount;
      }

      function calculateTaxAmount(lineItems) {
        const lineItemTotal = lineItems.reduce((total, item) => {
          if (item.amount && item.quantity) {
            return total + item.amount * item.quantity;
          }
          return total;
        }, 0);

        const taxAmount = lineItemTotal * 0.075; // 7.5% tax

        return taxAmount;
      }

      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('Authorization token is missing');
        return;
      }

      const invoiceResponse = await fetch(
        `${import.meta.env.VITE_CREATE_INVOICE_ENDPOINT}${clientId}/create-invoice`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(invoiceRequestBody),
        }
      );
      if (!invoiceResponse.ok) {
        throw new Error('Failed to create invoice');
      }

      const invoiceData = await invoiceResponse.json().catch(() => null);

      if (invoiceData && Object.keys(invoiceData).length > 0) {
        const { id: invoiceId } = invoiceData;

        setInvoiceId(invoiceId);
      } else {
        console.error('Invoice creation failed: No response data returned');
      }
      localStorage.removeItem('lineItems');

      setInvoiceCreated(true);
      setTimeout(() => setInvoiceCreated(false), 10000);
    } catch (error) {
      console.error('Error:', error);
      return false;
    } finally {
      setIsCreatingInvoice(false);
    }
  };

  const handleCalculateTotal = (values, setFieldValue) => {
    // console.log("Calculating total with values:", values);
    const { amount = 0, quantity = 0 } = values.invoice;
    const subtotal = amount * quantity;
    const totalValue = subtotal + subtotal * 0.075;

    setTotal(totalValue);
    setFieldValue('invoice.total', totalValue);
  };

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setClientId(client.id);
    setShowClientList(false);
  };
  const sendInvoice = async (invoiceId, values) => {
    if (
      values.invoice.invoiceNumber === '' ||
      values.invoice.dateOfIssue === '' ||
      values.invoice.due_date === '' ||
      values.invoice.name === '' ||
      values.invoice.quantity === '' ||
      values.invoice.amount === '' ||
      values.invoice.itemDescription === '' ||
      values.invoice.invoiceValidity === ''
      // values.invoice.lineItems[0].name === '' ||
      // values.invoice.lineItems[0].quantity === '' ||
      // values.invoice.lineItems[0].amount === '' ||
      // values.invoice.lineItems[0].vat === '' ||
      // values.invoice.lineItems[0].total === ''
    ) {
      return;
    }
    if (!invoiceId) {
      console.error('No invoiceId available to send.');
      return;
    }

    try {
      setIsSendingInvoice(true);
      const recipientEmail = selectedClient.email || values.customer.email;

      const requestBody = {
        invoiceId: invoiceId,
        recipientEmail,
      };
      const sendInvoiceResponse = await fetch(
        `${import.meta.env.VITE_SEND_INVOICE_ENDPOINT}${invoiceId}/send-invoice?recipientEmail=${encodeURIComponent(requestBody.recipientEmail)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!sendInvoiceResponse.ok) {
        throw new Error(`Failed to send invoice: ${sendInvoiceResponse.statusText}`);
      }
      const responseText = await sendInvoiceResponse.text();

      setInvoiceSent(true);
      setTimeout(() => setInvoiceSent(false), 10000);
    } catch (error) {
      console.error('Error sending invoice:', error);
    } finally {
      setIsSendingInvoice(false);
    }
  };

  const handlePreviewClick = (values) => {
    // Get stored items from localStorage
    const storedItems = JSON.parse(localStorage.getItem('lineItems')) || [];

    // Check if there are unadded items in the form
    const unaddedItem =
      (values?.invoice?.name || 'Default Item') &&
      values?.invoice?.quantity &&
      values?.invoice?.amount &&
      values?.invoice?.invoiceNumber &&
      values?.invoice?.dateOfIssue &&
      values?.invoice?.due_date
        ? {
            name: values.invoice.name || 'Default Item',
            amount: values.invoice.amount,
            quantity: values.invoice.quantity,
            invoiceNumber: values.invoice.invoiceNumber,
            dateOfIssue: values.invoice.dateOfIssue,
            due_date: values.invoice.due_date,
            total: values.invoice.amount * values.invoice.quantity,
          }
        : null;

    // Merge stored items and unadded items
    const updatedLineItems = unaddedItem ? [...storedItems, unaddedItem] : storedItems;

    setUpdatedLineItems(updatedLineItems);

    // Toggle the preview
    setShowPreview(!showPreview);
  };

  const authenticateEmail = async (email) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_GET_USER_BY_EMAIL_ENDPOINT}?email=${encodeURIComponent(email)}`
      );
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
      <div className="pt-2 md:pt-[9%] text-sm md:text-base pb-6 ">
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
                due_date: '',
                lineItems: [
                  {
                    name: '',
                    quantity: '',
                    amount: '',
                    vat: '',
                    total: '',
                  },
                ],
                invoiceValidity: '',

                itemDescription: '',
                tax: [
                  {
                    name: 'VAT',
                    amount: '',
                  },
                ],
              },
            }}
            enableReinitialize
            validationSchema={Yup.object().shape({
              customer: Yup.object().shape({
                Firstname: Yup.string().required('Required'),
                Lastname: Yup.string().required('Required'),
                email: Yup.string().email('Invalid email address').required('Required'),
                companyName: Yup.string().required('Required'),
                contact: Yup.string().required('Required'),
              }),
              invoice: Yup.object().shape({
                invoiceNumber: Yup.string().required('Required'),
                dateOfIssue: Yup.string().required('Required'),
                due_date: Yup.string().required('Required'),
                name: Yup.string().required('Required'),
                quantity: Yup.number().required('Required'),
                amount: Yup.number().required('Required'),
                vat: Yup.number().required('Required'),
                total: Yup.number().required('Required'),
                itemDescription: Yup.string().required('Required'),
                lineItems: Yup.object().shape({
                  name: Yup.number().required('Required'),
                  quantity: Yup.number().required('Required'),
                  amount: Yup.number().required('Required'),
                }),
              }),
            })}
            onSubmit={(values) => {}}>
            {({ isSubmitting, setFieldValue, values, resetForm }) => (
              <Form className="bg-white  rounded px-4 pt-0 pb-8 mb-4 ">
                <fieldset className="mb-6 shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] py-6  pt-0 px-4 rounded-md   ">
                  <legend className="text-xl font-semibold mb-4 pt-11">Customer Information</legend>
                  <div className="mb-4">
                    <div className="flex">
                      <label
                        htmlFor="customer.Firstname"
                        className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2 w-[10rem] ">
                        First Name
                      </label>
                      <Field
                        type="text"
                        name="customer.Firstname"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <ErrorMessage
                      name="customerFirst.name"
                      component="div"
                      className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1"
                    />
                  </div>

                  <div className="mb-4">
                    <div className="flex">
                      <label
                        htmlFor="customer.Lastname"
                        className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2 w-[10rem] ">
                        Last Name
                      </label>
                      <Field
                        type="text"
                        name="customer.Lastname"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <ErrorMessage
                      name="customer.Lastname"
                      component="div"
                      className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1"
                    />
                  </div>

                  <div className="mb-4">
                    <div className="flex">
                      <label
                        htmlFor="customer.email"
                        className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2 w-[10rem] ">
                        Email Address
                      </label>
                      <Field
                        type="email"
                        name="customer.email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <ErrorMessage
                      name="customer.email"
                      component="div"
                      className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1"
                    />
                  </div>

                  <div className="mb-4">
                    <div className="flex">
                      <label
                        htmlFor="customer.companyName"
                        className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2  w-[10rem]">
                        Company Name
                      </label>
                      <Field
                        type="text"
                        name="customer.companyName"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <ErrorMessage
                      name="customer.companyName"
                      component="div"
                      className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1"
                    />
                  </div>

                  <div className="mb-6">
                    <div className="flex">
                      <label
                        htmlFor="customer.contact"
                        className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2  w-[10rem]">
                        Contact
                      </label>
                      <Field
                        type="text"
                        name="customer.contact"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <ErrorMessage
                      name="customer.contact"
                      component="div"
                      className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1"
                    />
                  </div>
                  <div className="grid place-content-end pb-6">
                    <button
                      type="submit"
                      onClick={() => handleAddCustomer(values)}
                      disabled={isAddingClient}
                      className="flex items-center text-[10px] sm:text-[13px] md:text-base border border-secondary text-secondary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      <FaPlus className="mr-2" />
                      {isAddingClient ? 'Loading...' : 'Add Customer'}
                    </button>
                    {customerAdded && (
                      <div className="item-added-box border border-blue-100 bg-blue-100 rounded-lg p-4 mt-4 text-blue-700 max-w-md mx-auto shadow-md">
                        <p className="mt-2 text-blue-500 font-bold">Customer added successfully!</p>
                      </div>
                    )}
                    <br></br>
                    <button
                      type="button"
                      onClick={() => {
                        setShowClientList(true);
                      }}
                      disabled={isLoadingClients}
                      className="flex items-center text-[10px] sm:text-[13px] md:text-base border border-secondary text-secondary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      <FaUser className="mr-2" />
                      {isLoadingClients ? 'Loading... please wait' : 'Select Existing Customer'}
                    </button>
                    {showClientList && clientss.length > 0 && (
                      <div className="client-list-box border border-gray-300 rounded-lg p-4 max-w-md mx-auto mt-4 bg-white shadow-md">
                        <h3 className="font-bold text-lg mb-2">Select a customer:</h3>
                        <ul className="space-y-2">
                          {clientss.map((client) => (
                            <li key={client.id} className="flex justify-between items-center">
                              <div>
                                <span className="font-medium">
                                  {client.firstName} {client.lastName}
                                </span>
                                {/* <p className="text-sm text-gray-500">{client.email}</p> */}
                              </div>
                              <button
                                type="button"
                                onClick={() => handleSelectClient(client)}
                                className="text-xs text-white bg-[#126180] hover:bg-[#26428B] py-1 px-2 rounded">
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
                  <legend className=" text-[16px] md:text-[21px] font-semibold mb-4 pt-11 ">
                    Invoice Details
                  </legend>
                  <div className="mb-4">
                    <label
                      htmlFor="invoice.invoiceNumber"
                      className="block text-[10px] sm:text-[13px] md:text-base  font-bold mb-2">
                      Invoice Number
                    </label>
                    <Field
                      type="text"
                      name="invoice.invoiceNumber"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="invoice.invoiceNumber"
                      component="div"
                      className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label
                        htmlFor="invoice.dateOfIssue"
                        className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">
                        Date of Issue
                      </label>
                      <Field
                        type="date"
                        name="invoice.dateOfIssue"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => {
                          setFieldValue('invoice.dateOfIssue', e.target.value);
                          const daysDifference = calculateDaysDifference(
                            e.target.value,
                            values.invoice.due_date
                          );
                          setFieldValue(
                            'invoice.invoiceValidity',
                            daysDifference ? `${daysDifference} days` : ''
                          );
                        }}
                      />
                      <ErrorMessage
                        name="invoice.dateOfIssue"
                        component="div"
                        className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="invoice.due_date"
                        className="block text-[10px] sm:text-[13px] md:text-base mb-2">
                        Due Date
                      </label>
                      <Field
                        type="date"
                        name="invoice.due_date"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => {
                          setFieldValue('invoice.due_date', e.target.value);
                          const daysDifference = calculateDaysDifference(
                            values.invoice.dateOfIssue,
                            e.target.value
                          );
                          setFieldValue(
                            'invoice.invoiceValidity',
                            daysDifference ? `${daysDifference} days` : ''
                          );
                        }}
                      />
                      <ErrorMessage
                        name="invoice.due_date"
                        component="div"
                        className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="invoice.name"
                      className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">
                      Item Name
                    </label>
                    <Field
                      type="text"
                      name="invoice.name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="invoice.name"
                      component="div"
                      className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-4 ">
                    <div className="mb-4 ">
                      <label
                        htmlFor="invoice.quantity"
                        className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">
                        Quantity
                      </label>
                      <Field
                        type="number"
                        name="invoice.quantity"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => {
                          const quantity = parseInt(e.target.value);
                          setFieldValue('invoice.quantity', quantity);
                          handleCalculateTotal(values, setFieldValue);
                        }}
                      />
                      <ErrorMessage
                        name="invoice.quantity"
                        component="div"
                        className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="invoice.amount"
                        className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">
                        Amount
                      </label>
                      <Field
                        type="number"
                        name="invoice.amount"
                        onChange={(e) => {
                          const amount = parseFloat(e.target.value) || 0;
                          setFieldValue('invoice.amount', amount); // Update Formik state
                          handleCalculateTotal(
                            { ...values, invoice: { ...values.invoice, amount } },
                            setFieldValue
                          );
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <ErrorMessage
                        name="invoice.amount"
                        component="div"
                        className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="invoice.tax[0].amount"
                        className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">
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
                      <label
                        htmlFor="invoice.total"
                        className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">
                        Total
                      </label>
                      <Field
                        type="number"
                        name="invoice.total"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={values.invoice.total ? values.invoice.total.toFixed(2) : ''}
                        readOnly
                      />
                      <ErrorMessage
                        name="invoice.total"
                        component="div"
                        className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="invoice.invoiceValidity"
                        className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">
                        Invoice Validity
                      </label>
                      <Field
                        type="text"
                        name="invoice.invoiceValidity"
                        value={values.invoice.invoiceValidity}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="20 days"
                      />
                      <ErrorMessage
                        name="invoice.invoiceValidity"
                        component="div"
                        className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="invoice.itemDescription"
                      className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">
                      Item Description
                    </label>
                    <Field
                      type="text"
                      name="invoice.itemDescription"
                      className="shadow appearance-none border rounded w-full h-[8rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="invoice.itemDescription"
                      component="div"
                      className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1 "
                    />
                  </div>
                  <div className="grid place-content-end pb-4">
                    <div className="pb-6">
                      <button
                        type="button"
                        className=" flex items-center   text-secondary text-[10px] sm:text-[13px] md:text-base font-bold py-2 px-5 border border-secondary rounded focus:outline-none focus:shadow-outline mr-2 "
                        onClick={() => handleAddItem(setFieldValue, values)}
                        disabled={isAddingItem}>
                        <FaPlus className="mr-2" />
                        {isAddingItem ? 'Loading...' : 'Add Item'}
                      </button>
                      {/* Conditionally Render the 'Item Added' Message */}
                      {itemAdded && (
                        <div className="item-added-box border border-blue-100 bg-blue-100 rounded-lg p-4 mt-4 text-blue-700 max-w-md mx-auto shadow-md">
                          <p className="mt-2 text-blue-500 font-bold">Item added successfully!</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="pb-6">
                      <button
                        type="button"
                        className="text-secondary text-[10px] sm:text-[13px] md:text-base font-bold py-2 px-4 border border-secondary  rounded focus:outline-none focus:shadow-outline mr-2"
                        onClick={resetForm}>
                        Cancel
                      </button>
                    </div>

                    <div className="pb-6">
                      <button
                        type="submit"
                        onClick={() => handleCreateInvoice(values)}
                        disabled={isCreatingInvoice}
                        className="bg-secondary text-primary text-[10px] sm:text-[13px] md:text-base font-bold py-2 px-4 border border-secondary  rounded focus:outline-none focus:shadow-outline mr-2">
                        {isCreatingInvoice ? 'Loading...' : 'Create Invoice'}
                      </button>
                      {invoiceCreated && (
                        <div className="item-added-box border border-blue-100 bg-blue-100 rounded-lg p-4 mt-4 text-blue-700 max-w-md mx-auto shadow-md">
                          <p className="mt-2 text-blue-500 font-bold">
                            Invoice successfully created!
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="pb-6">
                      <button
                        type="submit"
                        onClick={() => sendInvoice(invoiceId, values)}
                        disabled={isSendingInvoice}
                        className="bg-secondary text-primary text-[10px] sm:text-[13px] md:text-base font-bold py-2 px-4 border border-secondary  rounded focus:outline-none focus:shadow-outline mr-2">
                        {isSendingInvoice ? 'Sending Invoice...' : 'Send Invoice'}
                      </button>

                      {invoiceSent && (
                        <div className="item-added-box border border-blue-100 bg-blue-100 rounded-lg p-4 mt-4 text-blue-700 max-w-md mx-auto shadow-md">
                          <p className="mt-2 text-blue-500 font-bold">Invoice sent</p>
                        </div>
                      )}
                    </div>

                    <div className="pb-6">
                      <button
                        type="button"
                        onClick={() => handlePreviewClick(values)}
                        className="bg-secondary text-primary text-[10px] sm:text-[13px] md:text-base font-bold py-2 px-4 border border-secondary rounded focus:outline-none focus:shadow-outline">
                        {showPreview ? 'Close Preview' : 'Preview'}
                      </button>
                    </div>

                    {showPreview && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="w-full max-w-[664px] h-auto max-h-[90vh] overflow-y-auto p-4 bg-white rounded shadow-lg z-60">
                          <Preview
                            className="preview-class"
                            updatedLineItems={updatedLineItems}
                            customerId={corporateCustomerId}
                            email={email}
                          />
                          <button
                            type="button"
                            onClick={handlePreviewClick}
                            className="absolute right-12 bg-blue-500 text-white py-2 px-3 rounded focus:outline-none"
                            style={{ bottom: '20px' }}>
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
