export const createEnrichedDescription = (list, searchText) => {
	return list.map((obj) => ({
		...obj,
		enrichedDescription: findMatchedTerm(obj.label_id, searchText),
	}));
};

export const findMatchedTerm = (text, searchText) => {
	if (searchText === '') {
		return text;
	}
	return text.replaceAll(new RegExp(searchText, 'ig'), highlightMatchedTerm);
};

export const highlightMatchedTerm = (text) => `<b>${text}</b>`;
