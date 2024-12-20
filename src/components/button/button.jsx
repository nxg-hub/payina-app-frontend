import React from 'react';
import PropTypes from 'prop-types';

const CustomButton = ({
  width = '',
  border = '1px solid #00678F',
  backgroundColor = '#00678F',
  textColor = '#ffffff',
  borderRadius = '6px',
  onClick,
  children,
  padding = '10px 35px',
  className,
  type,
  loading,
}) => {
  const buttonStyle = {
    width,
    border,
    backgroundColor,
    color: textColor,
    borderRadius,
    padding,
    cursor: 'pointer',
  };

  return (
    <button
      disabled={loading}
      style={buttonStyle}
      type={type}
      onClick={onClick}
      className={className}>
      {loading ? 'loading...' : children}
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
  padding: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default CustomButton;
