import React from 'react';
import PropTypes from 'prop-types';

const CustomButton = ({
  width,
  border,
  backgroundColor,
  textColor,
  borderRadius,
  onClick,
  children,
  padding,
  className,
  type
}) => {
  const buttonStyle = {
    width,
    border,
    backgroundColor,
    color: textColor,
    borderRadius,
    padding,
    cursor: 'pointer'
  };

  return (
    <button style={buttonStyle} type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

CustomButton.propTypes = {
  width: PropTypes.string,
  border: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  borderRadius: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  padding: PropTypes.string
};

CustomButton.defaultProps = {
  border: '1px solid #00678F',
  backgroundColor: '#00678F',
  textColor: '#ffffff',
  borderRadius: '6px',
  padding: '10px 35px',
  width: ''
};

export default CustomButton;
