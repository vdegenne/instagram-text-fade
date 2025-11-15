/* vite only */
export const DEV = import.meta.env.DEV

export const availablePages = ['main', 'search'] as const
true as AllValuesPresent<Page, typeof availablePages>

export const availableFonts = [
	'Roboto',
	'Noto Serif JP',
	'Noto Sans JP',
	'Noto Sans KR',
] as const
