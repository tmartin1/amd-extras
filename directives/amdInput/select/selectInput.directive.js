import { amdInputDirective } from '../amdInput.directive.js';
import amdInputController from '../amdInput.controller.js';

export class amdInputSelectController extends amdInputController {
    constructor ($filter, $q) {
        // Inherit defaults.
        super();

        // Override inherited and define local properties.
        $q.when(this.config.items).then(() => {
            this._standardizeItems();

            // If initial value is defined, determine the label value.
            if (angular.isDefined(this.model)) {
                angular.forEach(this.items, (value, label) => {
                    if (value === this.model) {
                        this.displayValue = label;
                    }
                });
            }
        });
    }

    /**
     * Triggered when an option is clicked. Sets the display value and invokes the onchange function
     * (if defined) from the amdInput config.
     * @param {*} value - The value of the option that was clicked.
     * @param {String} label - The label of the option that was clicked.
     */
    optionClick (value, label) {
        this.displayValue = label;
        (this.config.onchange || angular.noop)(value, label);
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

        if (angular.isString(initialItems)) {
            // Preset options.
            this.items = this.preset(initialItems);
        } else if (angular.isArray(initialItems)) {
            this.items = {};
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
            this.items = {};
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

    preset (groupName) {
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

export class amdInputSelectDirective extends amdInputDirective {
    constructor () {
        // Inherit defaults.
        super();

        // Override inherited and define local properties.
        this.controller = amdInputSelectController;
        this.template = require('./selectInput.html');
    }
}

export default angular.module('amd-extras.directive.amdInputSelect', [])
    .directive('amdInputSelect', () => new amdInputSelectDirective());
