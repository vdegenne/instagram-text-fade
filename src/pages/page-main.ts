import '@material/web/iconbutton/icon-button.js'
import '@material/web/select/filled-select.js'
import '@material/web/select/select-option.js'
import '@material/web/slider/slider.js'
import '@material/web/textfield/filled-text-field.js'
import '@material/web/textfield/outlined-text-field.js'
import {withController} from '@snar/lit'
import {css, html} from 'lit'
import {withStyles} from 'lit-with-styles'
import {customElement, query} from 'lit/decorators.js'
import {availableFonts} from '../constants.js'
import {textEditDialog} from '../dialogs.js'
import {openSettingsDialog} from '../imports.js'
import {store} from '../store.js'
import {breakDownText} from '../utils.js'
import {PageElement} from './PageElement.js'

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
		background-color: var(
			--text-background-color,
			var(--md-sys-color-surface-container-lowest)
		);
		color: var(--text-color, var(--md-sys-color-on-surface));
		line-height: var(--line-height);
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

	@keyframes neon {
		0%,
		19%,
		21%,
		23%,
		25%,
		54%,
		56%,
		100% {
			text-shadow:
				0 0 5px currentColor,
				0 0 10px currentColor,
				0 0 20px currentColor,
				0 0 40px currentColor,
				0 0 80px currentColor;
		}
		20%,
		24%,
		55% {
			text-shadow: none;
		}
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
					<pre id="text" class="fade whitespace-pre-wrap">
${parts[store.sentenceIndex]}</pre
					>
				</div>

				<div class="flex flex-col flex-1 p-6 gap-10 justify-between">
					<div class="flex items-center gap-4">
						<md-elevated-button @click=${textEditDialog} class="flex-1">
							Edit text
						</md-elevated-button>
						<md-icon-button @click=${openSettingsDialog}>
							<md-icon>settings</md-icon>
						</md-icon-button>
					</div>

					<div class="flex flex-col gap-4">
						${store.F.TEXTFIELD('Font', 'font')}
						<md-chip-set
							>${availableFonts.map(
								(fontName) =>
									html`<!-- -->
										<md-suggestion-chip
											elevated
											@click=${() => {
												store.font = fontName
											}}
											>${fontName}</md-suggestion-chip
										>
										<!-- -->`,
							)}</md-chip-set
						>
					</div>

					<div>
						${store.F.SLIDER(
							html`<md-icon>format_size</md-icon>`,
							'fontSizePx',
							{
								min: 28,
								max: 100,
								style: {userSelect: 'none'},
							},
						)}
					</div>

					<div>
						${store.F.SLIDER(
							html`<md-icon>line_weight</md-icon>`,
							'fontWeigthPx',
							{min: 100, max: 900, style: {userSelect: 'none'}},
						)}
					</div>

					<div>
						${store.F.SLIDER(
							html`<md-icon>format_line_spacing</md-icon>`,
							'lineHeightPx',
							{
								min: 1,
								max: 900,
								style: {userSelect: 'none'},
							},
						)}
					</div>

					<div>
						${store.F.SLIDER(
							html`<md-icon>hourglass_top</md-icon>`,
							'fadeSpeedMs',
							{
								min: 1,
								max: 5000,
								style: {
									userSelect: 'none',
								},
							},
						)}
					</div>

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
