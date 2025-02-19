import { TextField } from '@mui/material';
import React, { useId } from 'react';

const CustomTextField = ({
  type,
  placeHolder,
  style,
  onChange,
  helper_text,
  value,
  helper_text_up_position,
  disable_key_down,
}) => {
  const classes = helper_text_up_position
    ? 'flex-col-reverse items-start'
    : 'items-center';

  return (
    <div className={`relative flex w-full ${classes}`}>
      <TextField
        size="small"
        value={value || ''}
        type={type || 'text'}
        style={{
          width: '100%',
          borderRadius: 4,
          ...style,
        }}
        placeholder={placeHolder}
        onChange={onChange}
      />
      <p
        style={{
          fontSize: 14,
          marginTop: 4,
          opacity: helper_text_up_position ? 1 : 0.8,
        }}
        className={`${helper_text_up_position ? 'mb-1' : 0}`}
      >
        {helper_text}
      </p>
      {/* <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Floating outlined</label> */}
    </div>
  );
};

export default CustomTextField;

export const CustomTextArea = ({ label, placeHolder, set_value, value }) => {
  const id = useId();

  return (
    <>
      {label && (
        <label
          htmlFor={`${id}`}
          style={{ fontWeight: 600, fontSize: 16 }}
          className="block text-sm font-medium text-gray-900 dark:text-black mb-3"
        >
          {label}
        </label>
      )}
      <textarea
        disabled={!set_value}
        value={value}
        style={{
          backgroundColor: !set_value ? 'rgba(0,0,0,0.1)' : undefined,
        }}
        onChange={(e) => set_value?.(e.target.value)}
        id={`${id}`}
        onKeyDown={(e) => e.stopPropagation()}
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-white-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeHolder}
      ></textarea>
    </>
  );
};
