import React, { useState, useEffect } from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { isAnOPECCountry } from "../utils/helpers";

const Currency = ({ register, watch, errors, isSubmitting }) => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortControl = new AbortController();

    const fetchCurrencies = async (signal) => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/USD",
          { signal }
        );
        const data = response.data;
        const availableCurrencies = Object.keys(data.rates);
        setCurrencies(availableCurrencies);
        setLoading(false);
      } catch (error) {
        if (error.code === "ERR_CANCELED") return;

        console.log("Error fetching currencies:", error);
        setLoading(false);
      }
    };

    fetchCurrencies(abortControl.signal);

    return () => {
      abortControl.abort();
    }
  }, []);

  return (
    <div className="w-full md:w-[27%] px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Currency
      </label>
      <div className="flex">
        <span className="w-10	flex justify-center items-center px-3 text-sm text-white border border-r-0 border-gray-300 rounded-l-md bg-gray-600 text-gray-400 border-gray-600">
          <FontAwesomeIcon icon={faDollarSign} />
        </span>
        <div className="relative flex-1">
          {loading && (
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="absolute right-4 top-3"
            />
          )}
          <select
            {...register("currency")}
            className={` appearance-none text-center rounded-r-lg border border-gray-300 ${watch("currency") ? "text-gray" : "text-gray-400"
              } disabled:bg-gray-300 block  min-w-0 w-full text-sm p-2.5 border-gray-600 outline-0 outline-black`}
            disabled={isAnOPECCountry(watch("country"))}
          >
            <option value="">Select Currency</option>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
      {errors.currency && (
        <p className="text-red-500 text-xs italic">{errors.currency.message}</p>
      )}
    </div>
  );
};

export default Currency;
