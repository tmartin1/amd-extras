/**
 * Controller for amdInputDirective.
 * This class is extended by most (all?) specific input directives.
 * All validation logic should be held here.
 */
import {inputOptions} from './amdInput.directive.js';

class amdInputController {
    constructor ($filter, $q) {
        this.$filter = $filter;
        this.$q = $q;

        this.config = this.options || {};
        let config = this.config;

        // Check for attribute options and override the options property if defined.
        angular.forEach(inputOptions, (binding, attribute) => {
            if (angular.isDefined(this[attribute])) {
                this.config[attribute] = this[attribute];
            }
        });

        // Define default error messages.
        let defaultErrorMessages = {
            valid: 'Invalid input value.',
            required: 'This field is required.',
            minlength: `Must be at least ${config.minlength} characters.`,
            maxlength: `Must be fewer than ${config.maxlength} characters.`,
            pattern: 'Please match the requested format.'
        };

        this.errorMessages = {};
        angular.forEach(defaultErrorMessages, (message, name) => {
            if (config[name]) {
                this.errorMessages[name] = message;
            }
        });

        this.validations = {
            phone: new RegExp(/(\d{3}[\-]?\d{3}[\-]?\d{4}$)|(^[\(]\d{3}[\)][\s]?\d{3}[\-]?\d{4})/),
            email: new RegExp(),
            zipcode: new RegExp(),
            // etc.
        };
    }

    /**
     * Apply display filters to field labels.
     * Primarily used in text and textarea type inputs.
     * @return {String} - String of text with any displayFilters applied.
     */
    displayModel () {
        let options = this.config;
        let display = this.model;
        if (!display) {
            return display;
        }

        // If data is not a string or array, convert it to a string if possible.
        if (!angular.isString(display) && angular.isFunction(display.toString)) {
            display = this.model.toString();
        }

        // If displayFilters are provided, apply them to the data.
        if (options && options.displayFilter) {
            return this.$filter(options.displayFilter)(display);
        }

        return display;
    }

    /**
     * Standardize `items` property for dropdown options.
     * Currently, the standard format for the items object is as follows:
     * items = {
     *     name1: value1,
     *     name2: value2,
     *     name3: value3
     * };
     */
    _standardizeItems () {
        let initialItems = this.config.items;
        this.items = {};

        if (angular.isString(initialItems)) {
            // Preset options.
            this.items = this.presetItemCollection(initialItems);
        } else if (angular.isArray(initialItems)) {
            // Check each element and process as needed (can be string or object).
            angular.forEach(initialItems, (item) => {
                if (item) {
                    if (angular.isString(item)) {
                        this.items[item] = item;
                    } else if (item.name && item.value) {
                        // Object with name and value properties.
                        this.items[item.name] = item.value;
                    } else {
                        // Object where key is name and value is value.
                        let key = Object.keys(item)[0];
                        this.items[key] = item[key];
                    }
                }
            });
        } else {
            // Assumed to be an object formatted as either `{ name: [NAME], value: [VALUE] }` or
            // `{ [NAME]: [VALUE] }`.
            let first = Object.keys(initialItems)[0];
            if (first.name && first.value) {
                // Object with name and value properties.
                angular.forEach(initialItems, (item) => {
                    this.items[item.name] = item.value;
                });
            } else {
                this.items = initialItems;
            }
        }
    }

    /**
     * Returns a collection of commonly used list of [NAME]: [VALUE] pairs.
     * Currently used with amdInputSelect and amdInputRadio, but available to all amdInput types.
     * @param  {String} groupName - Name of the collection.
     * @return {Object} Collections of [NAME]: [VALUE] pairs.
     */
    presetItemCollection (groupName) {
        return {
            states: {
                Alabama: 'AL',
                Alaska: 'AK',
                Arizona: 'AZ',
                Arkansas: 'AR',
                California: 'CA',
                Colorado: 'CO',
                Connecticut: 'CT',
                Delaware: 'DE',
                'Washington D.C.': 'DC',
                Florida: 'FL',
                Georgia: 'GA',
                Hawaii: 'HI',
                Idaho: 'ID',
                Illinois: 'IL',
                Indiana: 'IN',
                Iowa: 'IA',
                Kansas: 'KS',
                Kentucky: 'KY',
                Louisiana: 'LA',
                Maine: 'ME',
                Maryland: 'MD',
                Massachusetts: 'MA',
                Michigan: 'MI',
                Mississippi: 'MS',
                Missouri: 'MO',
                Montana: 'MT',
                Nebraska: 'NE',
                Nevada: 'NV',
                'New Hampshire': 'NH',
                'New Mexico': 'NM',
                'New York': 'NY',
                'North Dakota': 'ND',
                Ohio: 'OH',
                Oklahoma: 'OK',
                Oregon: 'OR',
                Pennsylvania: 'PA',
                'Rhode Island': 'RI',
                'South Carolina': 'SC',
                'South Dakota': 'SD',
                Tennessee: 'TN',
                Texas: 'TX',
                Utah: 'UT',
                Vermont: 'VT',
                Virginia: 'VA',
                Washington: 'WA',
                'West Virginia': 'WV'
            },
            frequency: {
                Weekly: 'Weekly',
                'Bi-Weekly': 'Bi-Weekly',
                'Semi-Monthly': 'Semi-Monthly',
                Monthly: 'Monthly'
            }
        }[groupName];
    }
}

export default amdInputController;
