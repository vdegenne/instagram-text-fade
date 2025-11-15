import {PropertyValues, ReactiveController, state} from '@snar/lit'
import {FormBuilder} from '@vdegenne/forms/FormBuilder.js'
import {cquerySelector} from 'html-vision'
import {saveToLocalStorage} from 'snar-save-to-local-storage'
import {availableFonts, availablePages} from './constants.js'
import {breakDownText} from './utils.js'
import toast from 'toastit'

@saveToLocalStorage('instagram-text-fade:store')
export class AppStore extends ReactiveController {
	F = new FormBuilder(this)

	@state() page: Page = 'main'
	@state() text = 'test'
	@state() fontSizePx = 48
	@state() fontWeigthPx = 100
	@state() lineHeightPx = 12
	@state() sentenceIndex = 0
	@state() font: (typeof availableFonts)[number] = 'Roboto'
	@state() fadeSpeedMs = 200

	@state() colors = false
	@state() textBackgroundColor = '#000000'
	@state() textColor = '#FFFFFF'

	@state() fontImports = ''

	parts: string[] | null = null

	update(_changed: PropertyValues<this>) {
		const parts = (this.parts = breakDownText(this.text))
		if (this.sentenceIndex > parts.length - 1) {
			this.sentenceIndex = parts.length - 1
		}
	}
	protected updated(changed: PropertyValues<this>) {
		if (changed.has('page')) {
			// import('./router.js').then(({router}) => {
			// 	router.hash.$('page', this.page)
			// })
			const page = availablePages.includes(this.page) ? this.page : '404'
			import(`./pages/page-${page}.ts`)
				.then(() => {
					console.log(`Page ${page} loaded.`)
				})
				.catch(() => {})
		}

		// if (changed.has('font')) {
		document.documentElement.style.setProperty('--text-font-family', this.font)
		// }

		// if (changed.has('fadeSpeedMs')) {
		document.documentElement.style.setProperty(
			'--fade-duration',
			`${this.fadeSpeedMs}ms`,
		)
		// }

		// if (changed.has('textBackgroundColor')) {
		document.documentElement.style.setProperty(
			'--text-background-color',
			this.colors ? this.textBackgroundColor : 'unset',
		)
		// }

		// if (changed.has('textColor')) {
		document.documentElement.style.setProperty(
			'--text-color',
			this.colors ? this.textColor : 'unset',
		)
		// }

		// if (changed.has('lineHeightPx')) {
		document.documentElement.style.setProperty(
			'--line-height',
			`${this.lineHeightPx}px`,
		)
		// }
	}

	protected firstUpdated(_changedProperties: PropertyValues): void {
		if (this.fontImports) {
			document.head.insertAdjacentHTML('beforeend', this.fontImports)
		}
	}

	fadeAndChange(element: HTMLElement, changeIndex: () => void) {
		element.classList.add('hide') // fade out
		element.addEventListener('transitionend', function handler() {
			element.removeEventListener('transitionend', handler)

			changeIndex() // update sentenceIndex
			// optionally update element.textContent here based on sentenceIndex

			requestAnimationFrame(() => {
				element.classList.remove('hide') // fade in
			})
		})
	}
	prev() {
		if (!this.hasPrevious()) {
			return
		}
		const element = cquerySelector('page-main')!.textElement
		this.fadeAndChange(element, () => {
			if (--this.sentenceIndex < 0) {
				this.sentenceIndex = 0
			}
		})
	}

	next() {
		if (!this.hasNext()) {
			return
		}
		const element = cquerySelector('page-main')!.textElement
		this.fadeAndChange(element, () => {
			this.sentenceIndex++
		})
	}
	hasNext() {
		const parts = breakDownText(this.text)
		return this.sentenceIndex + 1 <= parts.length - 1
	}
	hasPrevious() {
		return this.sentenceIndex - 1 >= 0
	}
}

export const store = new AppStore()
