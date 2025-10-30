import {withController} from '@snar/lit'
import {css, html} from 'lit'
import {withStyles} from 'lit-with-styles'
import {customElement} from 'lit/decorators.js'
import {store} from '../store.js'
import {PageElement} from './PageElement.js'

@customElement('page-404')
@withController(store)
@withStyles(css`
	:host {
	}
`)
export class Page404 extends PageElement {
	render() {
		return html`WTF`
	}
}

// export const page404 = new Page404();
