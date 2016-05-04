/**
 * Base input directive and input directive class.
 * This class is extended to all of the input directives. As such, anything defined in this class
 * will be available to all input directives.
 *
 * ***** See the README.md for detailed information about this directive *****
 */

import amdInputController from './amdInput.controller.js';

// Collection of amdInput configuration options.
export const inputOptions = {
    editable: '<',
    disabled: '<',
    required: '<',
    name: '<',
    label: '<',
    floatingLabel: '<',
    placeholder: '<',
    minlength: '<',
    maxlength: '<',
    items: '<',
    text: '<',
    onchange: '<',
    validations: '<',
    min: '<',
    step: '<',
    displayFilter: '<',
    minDate: '<',
    maxDate: '<',
    dateFilter: '<'
};

export class amdInputDirective {
    constructor () {
        this.restrict = 'EA';
        this.scope = {
            type: '@',
            form: '=',
            model: '=',
            options: '<'
        };
        // The following are attributes that can be defined in the `scope.options` or directly as
        // an attribute. If an option is defined as an attribute and in the `scope.options`, the
        // attribute will overwrite the property defined in options.
        angular.forEach(inputOptions, (binding, attribute) => {
            this.scope[attribute] = binding;
        });

        this.controller = amdInputController;
        this.controllerAs = 'vm';
        this.template = require('./amdInput.html');
        this.bindToController = true;
    }

    /**
     * Default compile function for the amdInput directive.
     * The compile function deals with transforming the template DOM.
     * @param  {Object} tElement - The template element. The element where the directive has been
     * declared. It is safe to do template transformation on the element and child elements only.
     * @param  {Object} tAttributes - The template attributes. Normalized list of attributes
     * declared on this element shared between all directive compile functions.
     * @return {Object} A compile function can have a return value which can be either a function
     * or an object. Returning an object allows you to define the pre- and post- link functions
     * Returning a function will define the post-link function.
     */
    compile (tElement, tAttributes) {
        tElement = tElement;
        tAttributes = tAttributes;

        /**
         * Do stuff. Then call the parent class prelink function, if defined.
         * Executed before the child elements are linked. Not safe to do DOM transformation since
         * the compiler linking function will fail to locate the correct elements for linking.
         * @param {Object} scope - The scope to be used by the directive for registering watches.
         * @param {Object} element - The element where the directive is to be used. It is safe to
         * manipulate the children of the element only in postLink function since the children have
         * already been linked.
         * @param {Object} attrs - A hash object with key-value pairs of normalized attribute names
         * and their corresponding attribute values.
         * @param {Object} ctrl - The directive's required controller instance(s) - Instances are
         * shared among all directives, which allows the directives to use the controllers as a
         * communication channel.
         */
        let pre = (scope, element, attrs, ctrl) => {
            // Do stuff (if needed).
            // Call the parent class prelink function, if defined.
            (this.prelink || angular.noop)(scope, element, attrs, ctrl);
        };

        /**
         * Do stuff. Then call the parent class link function, if defined.
         * This is executed AFTER the template has been cloned. It is safe to do DOM transformation
         * in the post-linking function on elements that are not waiting for their async templates
         * to be resolved.
         * @param {Object} scope - see notes for pre (above).
         * @param {Object} element - see notes for pre (above).
         * @param {Object} attrs - see notes for pre (above).
         * @param {Object} ctrl - see notes for pre (above).
         */
        let post = (scope, element, attrs, ctrl) => {
            let config = scope.vm.config || {};
            let inputContainer = element.find('md-input-container');
            let label = inputContainer.find('label');

            // Floating label defaults to true if a label is defined, false otherwise.
            if (angular.isUndefined(config.floatingLabel)) {
                config.floatingLabel = Boolean(config.label);
            }

            if (config.floatingLabel) {
                inputContainer.removeAttr('md-no-float');
            } else {
                label.remove();
            }

            // Attach custom validations if provided.
            if (scope.vm.form) {
                let formField = scope.vm.form[config.name];
                if (formField && config.validations) {
                    angular.forEach(config.validations, (validation, index) => {
                        let errName = 'customValidation' + index;

                        // Attach event listener to the input field.
                        formField.$validators[errName] = (modelValue, viewValue) => {
                            return Boolean(validation.test(viewValue));
                        };

                        // Add error message to errorMessages for ng-messages to display.
                        scope.vm.errorMessages[errName] = validation.message;
                    });
                }
            }

            // Call the parent class link function, if defined.
            (this.link || angular.noop)(scope, element, attrs, ctrl);
        };

        return {
            pre: pre,
            post: post
        };
    }
}

export default angular.module('amd-extras.directive.amdInput', [
        require('./text/textInput.directive.js').default.name,
        require('./select/selectInput.directive.js').default.name,
        require('./switch/switchInput.directive.js').default.name,
        require('./radio/radioInput.directive.js').default.name,
        require('./checkbox/checkboxInput.directive.js').default.name,
        require('./date/dateInput.directive.js').default.name,
        require('./textarea/textareaInput.directive.js').default.name
    ])
    .directive('amdInput', () => new amdInputDirective());
