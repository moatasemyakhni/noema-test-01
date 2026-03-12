import { faFlag, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react"

const Countries = ({ register, watch, errors }) => {
	const [countries, setCountries] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const abortControl = new AbortController();

		const fetchCountries = async (signal) => {
			try {
				setLoading(true);
				const response = await axios.get(
					"https://restcountries.com/v3.1/all?fields=name,cca2",
					{ signal }
				);
				setCountries(response.data);
				setLoading(false);
			} catch (error) {
				if (error.code === "ERR_CANCELED") return;

				console.log("Error fetching countries:", error);
				setLoading(false);
			}
		};

		fetchCountries(abortControl.signal);

		return () => {
			abortControl.abort();
		}
	}, []);

	return (
		<div className="w-full md:w-[27%] px-3 mb-6 md:mb-0">
			<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
				Countries
			</label>
			<div className="flex">
				<span className="w-10	flex justify-center items-center px-3 text-sm text-white border border-r-0 border-gray-300 rounded-l-md bg-gray-600 text-gray-400 border-gray-600">
					<FontAwesomeIcon icon={faFlag} />
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
						{...register("country")}
						className={` appearance-none text-center rounded-r-lg border border-gray-300 ${watch("country") ? "text-gray" : "text-gray-400"
							} disabled:bg-gray-300 block  min-w-0 w-full text-sm p-2.5 border-gray-600 outline-0 outline-black`}
						disabled={false}
					>
						<option value="">Select Country</option>
						{countries.map((country) => {
							const nativeNames = country.name.nativeName
								? Object.values(country.name.nativeName)
								: [];

							const native = nativeNames.length ? nativeNames[0].common : null;

							return (
								<option key={country.cca2} value={country.cca2}>
									{country.name.common} {native && native !== country.name.common ? ` (${native})` : ""}
								</option>
							)
						})}
					</select>
				</div>
			</div>
			{errors.country && (
				<p className="text-red-500 text-xs italic">{errors.country.message}</p>
			)}
		</div>
	)
}

export default Countries