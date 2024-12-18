// eslint-disable-next-line no-unused-vars
import React from 'react';
import propTypes from 'prop-types';

const Cards = ({ icon, title }) => {
  return (
    <div className=" container">
      <div
        className=" flex w-[358.72px] h-[115.9px]   bg-lightBlue hover:bg-neutral
    relative rounded-[5px] justify-center items-center
     before:content-[''] before:absolute before:w-[100%] before:h-[5px] before:top-0
             before:rounded-[50px] before:border-4 before:bg-primary hover:before:border-yellow
              before:cursor-pointer before:origin-right 
               before:transition-all before:duration-300">
        <div
          className=" w-[40px] h-[40px] border-2 rounded-full flex justify-center
       items-center bg-lightBlue">
          {icon}
        </div>

        <h3 className="font-bold p-10 text-primary-300">{title}</h3>
      </div>
    </div>
  );
};

export default Cards;

Cards.propTypes = {
  src: propTypes.string.isRequired,
  icon: propTypes.node.isRequired,
  title: propTypes.string.isRequired,
};
