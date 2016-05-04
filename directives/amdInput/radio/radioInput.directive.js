import { amdInputDirective } from '../amdInput.directive.js';
import amdInputController from '../amdInput.controller.js';

export class amdInputRadioController extends amdInputController {
    constructor () {
        // Inherit defaults.
        super();

        // Override inherited and define local properties.
        this._standardizeItems();
    }
}

export class amdInputRadioDirective extends amdInputDirective {
    constructor () {
        // Inherit defaults.
        super();

        // Override inherited and define local properties.
        this.controller = amdInputRadioController;
        this.template = require('./radioInput.html');
    }
}

export default angular.module('amd-extras.directive.amdInputRadio', [])
    .directive('amdInputRadio', () => new amdInputRadioDirective());
