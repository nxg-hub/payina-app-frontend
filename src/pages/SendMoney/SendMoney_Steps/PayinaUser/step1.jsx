import React from 'react';
import backArrow from '../../../../assets/images/Group-backArrow.png';
import progressLine from '../../../../assets/images/Union.png';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { RecieverSchema } from './schemas/schemas.js';

const RecipientDetails = ({ nextStep }) => {
  return (
    <div className="flex flex-col justify-center items-start xl:ml-80 xl:pt-28 md:pt-10 mx-auto">
      <div className="flex flex-row justify-between items-left gap-[45rem]">
        <div className="text-xl md:text-3xl font-medium">Send Money</div>
        <div className="flex flex-row gap-2 cancelAction-img">
          <img src={backArrow} alt="cancelAction"></img>
          <div className="text-md text-center mt-2">Back</div>
        </div>
      </div>
      <div className="item-center mt-5 mx-auto">
        <img src={progressLine} alt="progressLine"></img>
      </div>
      <div className="flex flex-col items-left justify-left gap-4 form">
        <span className="text-md md:text-xl font-medium mt-5">Recipient Details</span>
        <Formik
          initialValues={{
            payinaTag: '',
            recieverName: '',
          }}
          validationSchema={RecieverSchema}
          onSubmit={() => {
            nextStep();
          }}>
          {() => (
            <Form>
              <div className="flex flex-col items-left gap-2">
                <label htmlFor="payinaTag" className="text-left font-md text-md">
                  Payina Tag
                </label>
                <Field
                  name="payinaTag"
                  type="text"
                  placeholder="Enter Recipient Payina Tag"
                  className="w-[700px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                />
                <ErrorMessage
                  name="payinaTag"
                  component="span"
                  className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                />
              </div>
              <div className="flex flex-col  w-full py-4 space-y-4">
                <label htmlFor="recieverName" className="text-left font-md text-md">
                  Confirm Reciever Name
                </label>
                <Field
                  name="recieverName"
                  type="text"
                  placeholder=""
                  className="w-[700px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                />
                <ErrorMessage
                  name="recieverName"
                  component="span"
                  className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-[5px] text-xs md:text-base  py-2 border border-lightBlue bg-lightBlue w-[300px] text-primary">
                  Next
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RecipientDetails;
