import { amdInputDirective } from '../amdInput.directive.js';
import amdInputController from '../amdInput.controller.js';

export class amdInputTextareaController extends amdInputController {
    constructor () {
        // Inherit defaults.
        super();

        // Override inherited and define local properties.
        //
    }
}

export class amdInputTextareaDirective extends amdInputDirective {
    constructor () {
        // Inherit defaults.
        super();

        // Override inherited and define local properties.
        this.controller = amdInputTextareaController;
        this.template = require('./textareaInput.html');
    }
}

export default angular.module('amd-extras.directive.amdInputTextarea', [])
    .directive('amdInputTextarea', () => new amdInputTextareaDirective());
