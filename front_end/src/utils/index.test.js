import {
	addEnrichedDescription,
	filterProductsList,
	findMatchedTerm,
	highlightMatchedTerm,
} from './index';

test('Return empty bold tag', () => {
	expect(highlightMatchedTerm('')).toBe(`<b></b>`);
});

test('Highlight matched term', () => {
	expect(highlightMatchedTerm('foo')).toBe(`<b>foo</b>`);
	expect(findMatchedTerm('foo boo', 'foo')).toBe(`<b>foo</b> boo`);
});

test('Return same string', () => {
	expect(findMatchedTerm('foo boo', '')).toBe(`foo boo`);
});

test('Highlight matched term, irrespective of characters case', () => {
	expect(findMatchedTerm('foo boo', 'FOO')).toBe(`<b>foo</b> boo`);
});
