import { useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { createEnrichedDescription } from './utils';
const serverUrl = 'http://localhost:8000';
const kitsServerUrl = `${serverUrl}/kits`;

async function fetchKits(updatedText = '') {
	const queryUrl =
		updatedText.length > 0
			? `${kitsServerUrl}?filterBy=${updatedText}`
			: kitsServerUrl;
	const response = await fetch(queryUrl);

	if (response.ok) {
		const data = await response.json();
		return data;
	}

	return [];
}

function createMarkup(obj) {
	return { __html: obj.enrichedDescription };
}

export default function Autocomplete(props) {
	const [filteredKitsList, setFilterKitsList] = useState([]);
	const [, setText] = useState('');
	const [kitSelected, setKitSelected] = useState({});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const inputRef = useRef();

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const handleChange = async (event) => {
		const updatedText = event.target.value;
		setText(updatedText);
		setIsSubmitted(false);
		if (updatedText.length === 0) {
			setFilterKitsList([]);
		} else {
			const filteredKits = await fetchKits(updatedText);
			const filteredKitsWithEnrichedDescription = createEnrichedDescription(
				filteredKits,
				updatedText
			);
			setFilterKitsList(filteredKitsWithEnrichedDescription);

			if (filteredKits.length === 1) {
				setKitSelected(filteredKits[0]);
			}
		}
	};

	const debouncedHandleChange = useMemo(() => debounce(handleChange, 250), []);

	const handleKitSelect = (obj) => {
		setKitSelected(obj);
		setText(obj.label_id);
		setIsSubmitted(true);
		props.onKitSelected(obj);
		inputRef.current.value = obj.label_id;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('submit');
		setIsSubmitted(true);
		props.onKitSelected(kitSelected);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				placeholder="Search for a label"
				aria-label="Search for a label"
				onChange={debouncedHandleChange}
				ref={inputRef}
			/>
			<button type="submit" aria-label="Search">
				Search
			</button>
			{!isSubmitted && (
				<ul aria-label="Search for a label">
					{filteredKitsList.map((obj, index) => (
						<li
							key={obj.label_id}
							onClick={() => handleKitSelect(obj)}
							dangerouslySetInnerHTML={createMarkup(obj)}
						></li>
					))}
				</ul>
			)}
		</form>
	);
}
