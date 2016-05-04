import { amdInputDirective } from '../amdInput.directive.js';
import amdInputController from '../amdInput.controller.js';

export class amdInputCheckboxDirective extends amdInputDirective {
    constructor () {
        // Inherit defaults.
        super();

        // Override inherited and define local properties.
        this.controller = amdInputCheckboxController;
        this.template = require('./checkboxInput.html');
    }
}

export class amdInputCheckboxController extends amdInputController {
    constructor () {
        // Inherit defaults.
        super();

        // Override inherited and define local properties.
        //
    }
}

export default angular.module('amd-extras.directive.amdInputCheckbox', [])
    .directive('amdInputCheckbox', () => new amdInputCheckboxDirective());
