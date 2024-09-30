// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../components/navbar/navbar';
import tansIcon from '../assets/images/tansIcon.png';
import Footer from '../components/footer/footer';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, title, message }) => {
  if (isOpen) return null;
  return (
    <section>
      <Navbar />

      <div
        className="w-[80%] h-1 border-none mr-auto ml-auto
            mt-[-2px] mb-20 bg-yellow"></div>
      <div className=" flex flex-col text-white justify-center items-center">
        <img src={tansIcon} alt="tansIcon" className="" />
        <p className=" text-sm font-bold">{title}</p>
        <p className=" text-xs">{message}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Close
        </button>
        <button
          className="text-primary mb-5 mt-7 text-left px-16 py-4
                    border-none rounded-[5px] bg-lightBlue cursor-pointer
                     hover:bg-neutral transition-all duration-200 ">
          Register
        </button>
        <p className="text-sm">
          {' '}
          Or<span className="text-lightBlue ">Login</span>
        </p>
      </div>
      <div className=" mt-10">
        <Footer />
      </div>
    </section>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

export default Modal;
