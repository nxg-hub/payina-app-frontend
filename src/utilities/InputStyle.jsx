import React from 'react';
import PropTypes from 'prop-types';

const InputStyle = ({
  label,
  type,
  name,
  value,
  defaultValue,
  onChange,
  placeholder,
  error,
  onBlur,
  readOnly
}) => (
  <div className="flex flex-col w-[64%] mb-4">
    {label && <label className="py-2">{label}</label>}
    <input
      type={type}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className="border-2 border-slate-400 rounded-[5px] px-5 py-2 bg-black text-slate-600 w-full"
      readOnly={readOnly}
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);

InputStyle.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Used for controlled input
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Used for uncontrolled input
  onChange: PropTypes.func, // Required when value is used
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  readOnly: PropTypes.bool
};

export default InputStyle;
