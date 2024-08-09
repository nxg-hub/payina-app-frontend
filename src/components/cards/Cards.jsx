import React from 'react'
 import PropTypes from 'prop-types'




const Cards = ({ src, alt, icon, title}) => {
  return (
    
    <div className=" container">
    <div className=" flex w-[358.72px] hover:bg-yellow h-[115.9px]  bg-lightBlue  
    relative rounded-[5px] justify-center items-center
     before:content-[''] before:absolute before:w-[100%] before:h-[5px] before:top-0
             before:rounded-[50px] before:border-4 before:bg-primary hover:before:bg-yellow
              before:cursor-pointer before:origin-right before:duration-200 before:transition-colors">
     
     <div className=" w-[40px] h-[40px] border-2 rounded-full flex justify-center
       items-center bg-lightBlue">
        {icon}
      </div>
      
      <h3 className="font-bold p-10 text-primary-300">{title}</h3>
       </div>
   </div>
  );
};

export default Cards

Cards.PropTypes = {
  src: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

 


