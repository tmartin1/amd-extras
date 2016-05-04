import { amdInputTextDirective } from '../textInput.directive.js';
import { amdInputTextController } from '../textInput.directive.js';

let _sigFigs = 1;

class amdInputCurrencyController extends amdInputTextController {
    constructor ($filter) {
        // Inherit defaults.
        super();
        this.$filter = $filter;

        // Override inherited and define local properties.
        this.config.inputType = 'number';
        this.config.displayFilter = 'currency';

        this.errorMessages.valid = 'Please enter a valid dollar amount.';
        this.errorMessages.number = 'Please enter a valid dollar amount.';
        this.errorMessages.min = `Must be at least ${this.config.min}.`;

        this.config.step = this.config.step  || 0.01;
        for (let i = 0, n = this.config.step.toString().split('.')[1].length; i < n; i++) {
            _sigFigs *= 10;
        }
    }

    _format () {
        this.model = Math.round(this.model * _sigFigs) / _sigFigs;
    }

    keyup (event) {
        let invalid = ([43, 69, 101]).indexOf(event.keyCode) >= 0;
        if (invalid) {
            event.preventDefault();
        }
        this._format();
    }

    blur () {
        this._format();
        if (isNaN(this.model)) {
            this.model = 0;
        }
    }
}

class amdInputCurrencyDirective extends amdInputTextDirective {
    constructor () {
        // Inherit defaults.
        super();

        // Override inherited and define local properties.
        this.controller = amdInputCurrencyController;
    }
}

export default angular.module('amd-extras.directive.amdInputCurrency', [])
    .directive('amdInputCurrency', () => new amdInputCurrencyDirective());
