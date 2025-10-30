import {cquerySelector} from 'html-vision'
import {DEV} from './constants.js'
import {getThemeStore} from './imports.js'
import {store} from './store.js'

window.addEventListener('keydown', async (event: KeyboardEvent) => {
	if (DEV) {
		console.log(event)
	}
	if (event.altKey || event.ctrlKey) {
		return
	}

	const target = event.composedPath()[0] as Element
	if (['TEXTAREA', 'INPUT'].includes(target.tagName)) {
		return
	}

	const button = cquerySelector(`[key="${event.key}"]`)
	if (button) {
		button?.click()
		return
	}

	switch (event.key) {
		case 'a':
		case 'ArrowLeft':
			store.prev()
			break
		case 'd':
		case 'ArrowRight':
			store.next()
			break
	}
})

export {}
