import { amdInputDirective } from '../amdInput.directive.js';
import amdInputController from '../amdInput.controller.js';

export class amdInputSwitchController extends amdInputController {
    constructor () {
        // Inherit defaults.
        super();

        // Override inherited and define local properties.
        //
    }
}

export class amdInputSwitchDirective extends amdInputDirective {
    constructor () {
        // Inherit defaults.
        super();

        // Override inherited and define local properties.
        this.controller = amdInputSwitchController;
        this.template = require('./switchInput.html');
    }
}

export default angular.module('amd-extras.directive.amdInputSwitch', [])
    .directive('amdInputSwitch', () => new amdInputSwitchDirective());
