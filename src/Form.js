import React, { useState, useContext, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import InputMask from "react-input-mask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSackDollar,
  faSpinner,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

import Currency from "./component/currency";
import Countries from "./component/countries";
import { Schema } from "./shared/validation";
import { isAnOPECCountry } from "./utils/helpers";

let maxLength = 150;

const Form = () => {
  const MIN_DATE = useMemo(() => new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), []);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // UseForm
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
    setError,
    setFocus,
    clearErrors,
  } = useForm({
    resolver: yupResolver(Schema()),
  });

  // Submit Button
  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(JSON.stringify(data));
      reset();
      setValue("projectCode", "");
      setCount(0);
    }, 2000);

    console.log(data);
  };

  // on Description Change
  const handleDescriptionChange = (event) => {
    const { name, value } = event.target;
    setCount(value.length);
    setValue(name, value, { shouldValidate: true });
  };

  const selectedCountry = watch("country")

  useEffect(() => {
    if (isAnOPECCountry(selectedCountry)) {
      setError("currency", {
        message: "OPEC countries can only use USD"
      })
      setValue("currency", "USD")
      setFocus("currency", { shouldSelect: false });
    } else {
      clearErrors("currency")
    }


  }, [selectedCountry]);

  return (
    <div className="flex flex-col items-start mb-6 px-4 md:px-10 py-6 shadow-md rounded-lg border border-gray-100 max-w-[34rem]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name
            </label>

            <div className="flex">
              <span className="w-10	flex justify-center items-center px-3 text-sm text-white border border-r-0 rounded-l-md bg-gray-600 text-gray-400 border-gray-600">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                className="placeholder-gray-400 appearance-none rounded-none rounded-r-lg  border text-gray-900  block flex-1 min-w-0 w-full text-sm p-2.5   border-gray-600 placeholder-gray-400   outline-0"
                id="grid-first-name"
                type="text"
                placeholder="Enter First Name"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Sur Name
            </label>

            <div className="flex">
              <span className="w-10 flex justify-center items-center px-3 text-sm text-white border border-r-0 rounded-l-md bg-gray-600 text-gray-400 border-gray-600">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                className="placeholder-gray-400 appearance-none rounded-none rounded-r-lg  border text-gray-900  block flex-1 min-w-0 w-full text-sm p-2.5   border-gray-600 placeholder-gray-400   outline-0 outline-black"
                id="grid-last-name"
                type="text"
                placeholder="Enter Sur Name"
                {...register("surname")}
              />
            </div>
            {errors.surname && (
              <p className="text-red-500 text-xs italic">
                {errors.surname.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Description
          </label>
          <textarea
            className="placeholder-gray-400 appearance-none rounded-lg  border text-gray-900  block flex-1 min-w-0 w-full text-sm p-2.5   border-gray-600 placeholder-gray-400   outline-0 outline-black"
            {...register("description")}
            maxLength={maxLength}
            rows={4}
            onChange={handleDescriptionChange}
            placeholder="Enter maximum 150 characters."
          />
          <span className="text-gray-500 text-xs float-right">
            {count}/{maxLength}
          </span>
          {errors.description && (
            <p className="text-red-500 text-xs italic">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex flex-wrap -mx-3">#Country Select#</div>

        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Code
          </label>
          <InputMask
            mask="****-****"
            placeholder="ABCD-1234"
            className="placeholder-gray-400 appearance-none  rounded-lg  border text-gray-900  block flex-1 min-w-0 w-full text-sm p-2.5   border-gray-600 placeholder-gray-400   outline-0 outline-black"
            {...register("projectCode")}
          />
          <p className="text-gray-500 text-xs ">
            *Note: example code is like pattern “HSLD-3465”
          </p>
          {errors.projectCode && (
            <p className="text-red-500 text-xs italic">
              {errors.projectCode.message}
            </p>
          )}
        </div>

        <div className="flex flex-wrap -mx-3">
          <Countries errors={errors} watch={watch} register={register} />
          <Currency isSubmitting={isSubmitting} errors={errors} watch={watch} register={register} />
          <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Payment Amount
            </label>
            <div className="flex">
              <span className="w-10	flex justify-center items-center px-3 text-sm text-white border border-r-0 rounded-l-md bg-gray-600 text-gray-400 border-gray-600">
                <FontAwesomeIcon icon={faSackDollar} />
              </span>
              <input
                className="placeholder-gray-400 appearance-none rounded-r-lg  border text-gray-900  block flex-1 min-w-0 w-full text-sm p-2.5   border-gray-600 placeholder-gray-400   outline-0 outline-black"
                {...register("paymentAmount")}
                type="number"
                placeholder="Enter Payment Amount"
              />
            </div>
            {errors.paymentAmount && (
              <p className="text-red-500 text-xs italic">
                {errors.paymentAmount.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Validity Period (years)
            </label>
            <select
              className={`placeholder-gray-400 appearance-none rounded-lg ${watch("validityPeriod") ? "text-gray" : "text-gray-400"
                } border block flex-1 min-w-0 w-full text-sm p-2.5   border-gray-600 placeholder-gray-400   outline-0 outline-black`}
              {...register("validityPeriod")}
            >
              <option value="">Select Year</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            {errors.validityPeriod && (
              <p className="text-red-500 text-xs italic">
                {errors.validityPeriod.message}
              </p>
            )}
          </div>
          <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
            <label className="flex justify-between items-center  tracking-wide text-gray-700 text-xs font-bold mb-2">
              <span className="uppercase">Start Date</span>

              <div className="hidden md:flex group relative  justify-center">
                <button className="flex w-5 h-5 justify-center items-center rounded-full bg-[#ffc605] py-1 text-sm text-white shadow-sm">
                  {" "}
                  <FontAwesomeIcon icon={faQuestion} className="text-xs" />
                </button>
                <span className="absolute -top-2 left-8 w-[200px] scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                  Note: The date should not start earlier than 15 days from
                  today date
                </span>
              </div>
            </label>

            <DatePicker
              className="placeholder-gray-400 appearance-none rounded-lg  border text-gray-900  block flex-1 min-w-0 w-full text-sm p-2.5   border-gray-600 placeholder-gray-400   outline-0 outline-black"
              name="startDate"
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/MM/yyyy"
              onChange={(date) =>
                setValue("startDate", date, { shouldValidate: true })
              }
              selected={watch("startDate")}
              minDate={MIN_DATE}
            />
            {errors.startDate && (
              <p className="text-red-500 text-xs italic">
                {errors.startDate.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`text-sm text-center appearance-none rounded-full  transition duration-300 w-full mt-4 py-3 bg-[#ffc605] text-gray text-base font-semibold ${loading ? "disabled:opacity-50 disabled:cursor-not-allowed" : ""
            }`}
        >
          {loading ? "Loading..." : "Submit"}

          {loading && (
            <FontAwesomeIcon icon={faSpinner} spin className="mx-1" />
          )}
        </button>
      </form>
    </div>
  );
};

export default Form;
