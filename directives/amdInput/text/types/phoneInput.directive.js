import { amdInputTextDirective } from '../textInput.directive.js';
import { amdInputTextController } from '../textInput.directive.js';

class amdInputPhoneController extends amdInputTextController {
    constructor ($filter) {
        // Inherit defaults.
        super();
        this.$filter = $filter;

        // Override inherited and define local properties.
        this.inputVal = this.model;
        this.config.inputType = 'tel';
        this.config.displayFilter = 'phoneNumber';
        this.config.minlength = 14;
        this.config.maxlength = 14;

        this.errorMessages.valid = 'Please enter a valid phone number.';
        this.errorMessages.minlength = 'Please enter a valid phone number.';
        this.errorMessages.maxlength = 'Please enter a valid phone number.';

        if (this.config.pattern) {
            delete this.config.pattern;
        }

        this._format();
    }

    _format (val) {
        this.inputVal = val || this.model;
        if (val && (val === '' || val === '(' || val[0] === ')')) {
            this.model = '';
        } else {
            this.model = this.$filter('phoneNumber')(val || this.model);
        }
    }

    keyup (event, field) {
        let val = field.$viewValue;
        if (val === '' || val === '(' || val[0] === ')') {
            this.model = '';
            return;
        }

        this.model = this.model || '';
        let keyCode = event.keyCode;
        let numberKeys = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
        let validKeys = [8, 13, 37, 38, 39, 40, 46, ...numberKeys];

        if (keyCode === 8) {
            this.model = field.$viewValue || '';
        } else if (validKeys.indexOf(keyCode) < 0 && field.$viewValue.length <= 1) {
            this.model = '';
        } else {
            this._format(val);
        }
    }
}

class amdInputPhoneDirective extends amdInputTextDirective {
    constructor () {
        // Inherit defaults.
        super();

        // Override inherited and define local properties.
        this.controller = amdInputPhoneController;
    }
}

export default angular.module('amd-extras.directive.amdInputPhone', [])
    .directive('amdInputPhone', () => new amdInputPhoneDirective());
