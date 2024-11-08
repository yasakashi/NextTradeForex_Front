import InputError from "./InputError";

const RegisterInputFeild = ({
  label,
  name,
  type,
  placeholder,
  formik,
  touched,
  errors,
  errorMsg,
}) => {
  return (
    <label className="space-y-2">
      <span className="text-gray-400 text-sm">{label}</span>
      <input
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        type={type}
        className="formInputText"
        placeholder={placeholder}
      />
      {touched && errors ? <InputError title={errorMsg} /> : null}
    </label>
  );
};

export default RegisterInputFeild;
