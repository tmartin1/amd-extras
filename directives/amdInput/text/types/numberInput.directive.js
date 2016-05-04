import { amdInputTextDirective } from '../textInput.directive.js';
import { amdInputTextController } from '../textInput.directive.js';

class amdInputNumberController extends amdInputTextController {
    constructor ($filter) {
        // Inherit defaults.
        super();
        this.$filter = $filter;

        // Override inherited and define local properties.
        this.config.inputType = 'number';

        this.errorMessages.valid = 'Please enter a valid number.';
        this.errorMessages.number = 'Please enter a valid number.';
        this.errorMessages.min = `Must be at least ${this.config.min}.`;
    }
}

class amdInputNumberDirective extends amdInputTextDirective {
    constructor () {
        // Inherit defaults.
        super();

        // Override inherited and define local properties.
        this.controller = amdInputNumberController;
    }
}

export default angular.module('amd-extras.directive.amdInputNumber', [])
    .directive('amdInputNumber', () => new amdInputNumberDirective());
