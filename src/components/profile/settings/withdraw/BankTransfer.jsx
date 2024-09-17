import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "tailwindcss/tailwind.css";

const BankTransfer = () => {
  const formik = useFormik({
    initialValues: {
      accountName: "",
      accountNumber: "",
      bankName: "",
      iban: "",
      bicSwift: "",
    },
    validationSchema: Yup.object({
      accountName: Yup.string().required("Account Name is required"),
      accountNumber: Yup.string().required("Account Number is required"),
      bankName: Yup.string().required("Bank Name is required"),
      iban: Yup.string().required("IBAN is required"),
      bicSwift: Yup.string().required("BIC/SWIFT is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="mt-14">
      <form onSubmit={formik.handleSubmit} className="w-full ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="mb-4">
            <label className="text-white text-sm font-semibold">
              Account Name
            </label>
            <input
              type="text"
              name="accountName"
              className="mt-1 w-full p-2 border border-gray-300 rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.accountName}
            />
            {formik.touched.accountName && formik.errors.accountName ? (
              <div className="text-red-500">{formik.errors.accountName}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label className="text-white text-sm font-semibold">
              Account Number
            </label>
            <input
              type="text"
              name="accountNumber"
              className="mt-1 w-full p-2 border border-gray-300 rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.accountNumber}
            />
            {formik.touched.accountNumber && formik.errors.accountNumber ? (
              <div className="text-red-500">{formik.errors.accountNumber}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label className="text-white text-sm font-semibold">
              Bank Name
            </label>
            <input
              type="text"
              name="bankName"
              className="mt-1 w-full p-2 border border-gray-300 rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bankName}
            />
            {formik.touched.bankName && formik.errors.bankName ? (
              <div className="text-red-500">{formik.errors.bankName}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label className="text-white text-sm font-semibold">IBAN</label>
            <input
              type="text"
              name="iban"
              className="mt-1 w-full p-2 border border-gray-300 rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.iban}
            />
            {formik.touched.iban && formik.errors.iban ? (
              <div className="text-red-500">{formik.errors.iban}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label className="text-white text-sm font-semibold">
              BIC / SWIFT
            </label>
            <input
              type="text"
              name="bicSwift"
              className="mt-1 w-full p-2 border border-gray-300 rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bicSwift}
            />
            {formik.touched.bicSwift && formik.errors.bicSwift ? (
              <div className="text-red-500">{formik.errors.bicSwift}</div>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          className="bg-gold-light_400 block mt-8 rounded-lg font-semibold text-base shadow-lg text-blue-dark py-2 px-4 w-max"
        >
          Save Withdrawal Account
        </button>
      </form>
    </div>
  );
};

export default BankTransfer;
