import {html} from 'lit'
import {materialDialog} from 'material-3-dialog'
import {store} from './store.js'
import {renderColorPicker} from './styles/theme-elements.js'

export function textEditDialog() {
	materialDialog({
		headline: 'Edit Text',
		style: {
			width: '600px',
		},
		content() {
			return html`<!---->
				<div class="flex">${store.F.TEXTAREA('', 'text', {rows: 4})}</div>
				<div class="m-4 flex items-center gap-4">
					${store.F.SWITCH('Custom colors', 'colors', {})}
					<div class="flex gap-3">
						${renderColorPicker(store.textBackgroundColor, (value: string) => {
							store.textBackgroundColor = value
						})}
						${renderColorPicker(store.textColor, (value: string) => {
							store.textColor = value
						})}
					</div>
				</div>
				<!----> `
		},
	})
}

export function importFonts() {
	materialDialog({
		headline: 'Import fonts',
		style: {
			width: '600px',
		},
		content() {
			return html`<!-- -->
				<!-- -->`
		},
	})
}
