import { useState } from 'react';
import Autocomplete from './Autocomplete';
import isEmpty from 'lodash/isEmpty';
function App() {
	const [kitSelected, setKitSelected] = useState({});

	const handleSelectKit = (obj) => {
		setKitSelected(obj);
	};

	return (
		<div className="container">
			<h1>Search Kits</h1>
			<Autocomplete onKitSelected={handleSelectKit} />
			{!isEmpty(kitSelected) && (
				<div className="selected-kit-container">
					<h2>Selected Kit Details</h2>
					<div className="selected-kit"></div>
					<div> Label ID: {kitSelected.label_id}</div>
					<div>
						Shipping Tracking Code:{' '}
						<a
							href={`https://www.fedex.com/fedextrack/?trknbr=${kitSelected.shipping_tracking_code}`}
							target="_blank"
							rel="noreferrer"
						>
							{kitSelected.shipping_tracking_code}
						</a>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
