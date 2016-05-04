import { amdInputTextDirective } from '../textInput.directive.js';
import { amdInputTextController } from '../textInput.directive.js';

class amdInputEmailController extends amdInputTextController {
    constructor ($filter) {
        // Inherit defaults.
        super();
        this.$filter = $filter;

        // Override inherited and define local properties.
        this.config.inputType = 'email';

        this.errorMessages.valid = 'Please enter a valid email address.';
        this.errorMessages.email = 'Please enter a valid email address.';
    }
}

class amdInputEmailDirective extends amdInputTextDirective {
    constructor () {
        // Inherit defaults.
        super();

        // Override inherited and define local properties.
        this.controller = amdInputEmailController;
    }
}

export default angular.module('amd-extras.directive.amdInputEmail', [])
    .directive('amdInputEmail', () => new amdInputEmailDirective());
