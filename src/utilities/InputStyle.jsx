import React from 'react';
import PropTypes from 'prop-types';

const InputStyle = ({ label, type, name, value, onChange, placeholder, error, onBlur }) => (
  <div className="flex flex-col w-full mb-4">
    {label && <label className="py-2">{label}</label>}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className="border-2 border-slate-400 rounded-[5px] px-5 py-2 bg-black text-slate-600 w-full"
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
  // );
);
InputStyle.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string
};

export default InputStyle;
