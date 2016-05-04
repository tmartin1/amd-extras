import { amdInputDirective } from '../amdInput.directive.js';
import amdInputController from '../amdInput.controller.js';

export class amdInputDateController extends amdInputController {
    constructor () {
        // Inherit defaults.
        super();

        // Override inherited and define local properties.
        let mindate = moment(this.config.mindate).format('l');
        let maxdate = moment(this.config.maxdate).format('l');

        this.errorMessages.valid = 'Please enter a valid date.';
        this.errorMessages.mindate = `Must be after ${mindate}`;
        this.errorMessages.maxdate = `Must be before ${maxdate}`;
        this.errorMessages.filtered = this.config.dateFilterMsg || 'Please enter a valid date.';
    }
}

export class amdInputDateDirective extends amdInputDirective {
    constructor () {
        // Inherit defaults.
        super();

        // Override inherited and define local properties.
        this.controller = amdInputDateController;
        this.template = require('./dateInput.html');
    }

    prelink (scope, element) {
        let config = scope.vm.config;
        let datepicker = element.find('md-datepicker');

        // Add aria-label property to buttons.
        let buttons = datepicker.find('button');
        angular.forEach(buttons, (button) => {
            angular.element(button).attr('aria-label', config.label || 'Date');
        });

        // Set $touched and $untouched on fields when they lose focus for error messages.
        let input = datepicker.find('input');
        if (scope.vm.form) {
            input.on('blur', () => {
                scope.vm.form[config.name].$touched = true;
                scope.vm.form[config.name].$untouched = false;
            });
        }
    }
}

export default angular.module('amd-extras.directive.amdInputDate', [])
    .directive('amdInputDate', () => new amdInputDateDirective());
