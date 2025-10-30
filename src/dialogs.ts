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
		content(dialog) {
			return html`<!---->
				<div class="flex">${store.F.TEXTAREA('', 'text', {rows: 12})}</div>
				<div class="flex gap-3">
					${renderColorPicker(store.textBackgroundColor, (value: string) => {
						store.textBackgroundColor = value
					})}
					${renderColorPicker(store.textColor, (value: string) => {
						store.textColor = value
					})}
				</div>
				<!----> `
		},
	})
}
