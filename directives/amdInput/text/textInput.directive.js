import amdInputController from '../amdInput.controller.js';
import { amdInputDirective } from '../amdInput.directive.js';

export class amdInputTextController extends amdInputController {
    constructor ($filter) {
        // Inherit defaults.
        super();
        this.$filter = $filter;

        // Override inherited and define local properties.
        this.inputType = this.type || 'text';
        let options = this.config;

        // If label and placeholder are both defined, default to label value.
        if (options.label && options.placeholder) {
            delete options.placeholder;
        }
    }
}

export class amdInputTextDirective extends amdInputDirective {
    constructor () {
        // Inherit defaults.
        super();

        // Override inherited and define local properties.
        this.controller = amdInputTextController;
        this.template = require('./textInput.html');
    }

    /**
     * Responsible for registering DOM listeners as well as updating the DOM.
     * This is executed AFTER the template has been cloned.
     * @param {Object} scope - The scope to be used by the directive for registering watches.
     * @param {Object} element - The element where the directive is to be used. It is safe to
     * manipulate the children of the element only in postLink function since the children have
     * already been linked.
     */
    link (scope, element) {
        let config = scope.vm.config;
        let inputContainer = element.find('md-input-container');
        let input = inputContainer.find('input');
        let label = inputContainer.find('label');

        // Check for input attributes and add when necessary.
        let attributOptions = ['minlength', 'maxlength', 'pattern', 'min', 'step'];
        angular.forEach(attributOptions, (option) => {
            if (config && !config[option]) {
                input.removeAttr(option);
            }
        });

        // If label is defined and floatingLabel is set to false, set label to placeholder.
        if (config.label && !config.floatingLabel) {
            config.placeholder = config.placeholder || config.label;
            delete config.label;
            label.remove();
        }
    }
}

export default angular.module('amd-extras.directive.amdInputText', [
        require('./types/emailInput.directive.js').default.name,
        require('./types/phoneInput.directive.js').default.name,
        require('./types/numberInput.directive.js').default.name,
        require('./types/currencyInput.directive.js').default.name
    ])
    .directive('amdInputText', () => new amdInputTextDirective());
