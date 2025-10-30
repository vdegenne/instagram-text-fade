import '@material/web/select/filled-select.js'
import '@material/web/select/select-option.js'
import '@material/web/iconbutton/icon-button.js'
import '@material/web/slider/slider.js'
import '@material/web/textfield/filled-text-field.js'
import '@material/web/textfield/outlined-text-field.js'
import {withController} from '@snar/lit'
import {css, html} from 'lit'
import {withStyles} from 'lit-with-styles'
import {customElement, query} from 'lit/decorators.js'
import {store} from '../store.js'
import {PageElement} from './PageElement.js'
import {breakDownText} from '../utils.js'
import {textEditDialog} from '../dialogs.js'
import {availableFonts} from '../constants.js'

declare global {
	interface HTMLElementTagNameMap {
		'page-main': PageMain
	}
}

@customElement('page-main')
@withController(store)
@withStyles(css`
	:host {
	}

	#surface {
		background-color: var(--text-background-color, #000000);
		color: var(--text-color, #ffffff);
	}

	.fade {
		transition: opacity var(--fade-duration, 500ms) ease-in-out;
		opacity: 1;
	}
	.fade.hide {
		opacity: 0;
	}

	pre {
		font-family: var(--text-font-family, inherit);
	}
`)
export class PageMain extends PageElement {
	@query('#text') textElement!: HTMLElement

	render() {
		const parts = store.parts || breakDownText(store.text)
		return html`
			<div class="flex">
				<div
					id="surface"
					class="aspect-square h-screen flex items-center justify-center p-12 box-border text-center overflow-hidden"
					style="font-size:${store.fontSizePx}px;font-weight:${store.fontWeigthPx};"
				>
					<pre id="text" class="fade">${parts[store.sentenceIndex]}</pre>
				</div>
				<div class="flex flex-col flex-1 p-6 gap-10">
					<md-text-button @click=${textEditDialog}>Edit text</md-text-button>
					${store.F.SELECT('', 'font', availableFonts)}
					${store.F.SLIDER(html`<md-icon>format_size</md-icon>`, 'fontSizePx', {
						min: 28,
						max: 200,
					})}
					${store.F.SLIDER(
						html`<md-icon>line_weight</md-icon>`,
						'fontWeigthPx',
						{min: 100, max: 900},
					)}
					${store.F.SLIDER(
						html`<md-icon>hourglass_top</md-icon>`,
						'fadeSpeedMs',
						{min: 1, max: 1000},
					)}
					<div class="flex items-center justify-between">
						<md-elevated-button
							?disabled=${!store.hasPrevious()}
							@click=${() => store.prev()}
						>
							<md-icon slot="icon">arrow_back</md-icon>
							previous
						</md-elevated-button>

						<div>${store.sentenceIndex + 1}/${parts.length}</div>

						<md-elevated-button
							?disabled=${!store.hasNext()}
							@click=${() => store.next()}
							trailing-icon
						>
							next
							<md-icon slot="icon">arrow_forward</md-icon>
						</md-elevated-button>
					</div>
				</div>
			</div>
		`
	}
}

// export const pageMain = new PageMain();
