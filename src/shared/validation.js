import * as yup from "yup";
import { isAnOPECCountry } from "../utils/helpers";

export const Schema = () => {
  const minDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

  return yup
    .object({
      name: yup.string().required("First name is required"),
      surname: yup.string().required("Surname is required"),
      description: yup.string().max(150, "Characters should not exceeds 150").notRequired(),
      country: yup.string().required("Country is required").length(2, "It should be a valid country"),
      currency: yup.string().required("Currency is required"),
      projectCode: yup.string().transform(v => v?.toUpperCase?.()).notRequired().matches(/^[A-Z]{4}-[0-9]{4}$/, { message: "Code must be in format ABCD-1234", excludeEmptyString: true, }).notRequired(),
      validityPeriod: yup.string().transform((value, originalValue) => {
        return originalValue === "" ? undefined : value;
      }).oneOf(["1", "2", "3"], "Value must be 1, 2, or 3").notRequired(),
      startDate: yup.date().min(minDate, "Start date must be at least 15 days from today").notRequired(),
      paymentAmount: yup.number("Payment amount is required").transform((value, originalValue) => {
        return originalValue === "" ? undefined : value;
      }).positive("Payment amount should be positive").integer("Payment amount should be integer").notRequired()
    })
    .test(
      "opec-currency-check",
      "OPEC countries can only use USD",
      ({ currency: selectedCurrency, country: selectedCountry }) => {
        if (isAnOPECCountry(selectedCountry)) {
          return selectedCurrency === "USD";
        }

        return true
      },
    );
};
