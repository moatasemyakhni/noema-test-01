export const OPEC_COUNTRIES = ["SA", "IR", "IQ", "KW", "AE", "QA", "DZ", "LY", "NG", "AO", "GQ", "GA", "VE"];

export const isAnOPECCountry = (selectedCountryCode) => {
	return OPEC_COUNTRIES.some(country => country === selectedCountryCode)
}