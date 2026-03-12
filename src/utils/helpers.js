export const OPEC_COUNTRIES = ["SA", "IR", "IQ", "KW", "AE", "QA", "DZ", "LY", "NG", "AO", "GQ", "GA", "VE"];

export const isAnOPECCountry = (selectedCountryCode) => {
	return OPEC_COUNTRIES.some(country => country === selectedCountryCode)
}

export const getMinStartDate = () => {
	const date = new Date();
	date.setHours(0, 0, 0, 0);
	date.setDate(date.getDate() + 15);
	return date;
}