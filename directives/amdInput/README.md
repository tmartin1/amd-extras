# amdInput

The purpose of the amdInput directive is to make it as easy as possible to implement input fields wherever they are needed in the project while maintaining consistent style and behavior of similar input fields.

## Implementation

This directive can be implemented in several different ways to maximize the flexibility of it use.

The directive can be implemented directly, e.g. `<amd-input-text></amd-input-text>` or it can be implemented indirectly, via the general amdInput directive as such: `<amd-input type="text"></amd-input>`. The former is the preferred way to implement this directive.

Other than the model attribute, all input configuration options can be defined as an object and passed to the directive via in the `options` attribute or they can be defined directly as attributes. If something is defined in `options` and as an attribute, the `options` value will be ignored. This can be helpful in cases where you need to apply a default set of options to many input fields and unique options to just some of them.

**NOTE** `editable`, `disabled`, and `required` MUST be assigned as attributes and cannot be defined in the options object. If they are, they will be ignored and the default behaviors will be applied.

Some examples of the differences discussed above are below (see `app/dashboards/myAccount` for more examples):

* **Direct Implementation with `options`**
    ```javascript
    // controller.js
    this.editing = true;
    this.someTextField.options = {
        label: 'Some Text',
        minlength: 4
    };
    ```

    ```HTML
    <amd-input-text model="vm.someModel.someText"
        options="vm.someTextField.options"
        editable="vm.editing"
        form="someForm">
    </amd-input-text>
    ```

* **Direct Implementation with specific attribute values**
    ```HTML
    <amd-input-text model="vm.someModel.someText"
        label="Some Text"
        minlength="4"
        editable="false"
        required="false"
        form="someForm">
    </amd-input-text>
    ```

* **Indirect Implementation with `options`**
    ```javascript
    // controller.js
    this.editing = true;
    this.someTextField.options = {
        label: 'Some Text',
        minlength: 4
    };
    ```

    ```HTML
    <amd-input type="text"
        model="vm.someModel.someText"
        options="vm.someTextField.options"
        editable="vm.editing"
        form="someForm">
    </amd-input>
    ```

* **Indirect Implementation with specific attribute values**
    ```HTML
    <amd-input type="text"
        model="vm.someModel.someText"
        label="Some Text"
        minlength="4"
        editable="false"
        required="false"
        form="someForm">
    </amd-input>
    ```

## amdInput Configuration Options

|               | text | phone | email | num | currency | switch | radio | checkbox | select | date | textarea |
|--------------:|:----:|:-----:|:-----:|:---:|:--------:|:------:| :---: |:--------:|:------:|:----:|:--------:|
| modelª        |   R  |   R   |   R   |  R  |     R    |    R   |   R   |     R    |    R   |   R  |     R    |
| editableª     |   O  |   O   |   O   |  O  |     O    |    -   |   -   |     -    |    O   |   O  |     O    |
| disabledª     |   O  |   O   |   O   |  O  |     O    |    O   |   O   |     O    |    O   |   O  |     O    |
| requiredª     |   O  |   O   |   O   |  O  |     O    |    -   |   O   |     O    |    O   |   O  |     O    |
| name          |   O  |   O   |   O   |  O  |     O    |    O   |   O   |     O    |    O   |   O  |     O    |
| label         |   O  |   O   |   O   |  O  |     O    |    O   |   O   |     R    |    O   |   O  |     O    |
| floatingLabel |   O  |   O   |   O   |  O  |     O    |    -   |   -   |     O    |    O   |   O  |     O    |
| placeholder   |   O  |   O   |   O   |  -  |     -    |    -   |   -   |     -    |    O   |   -  |     O    |
| minlength     |   O  |   O   |   O   |  -  |     -    |    -   |   -   |     -    |    -   |   -  |     O    |
| maxlength     |   O  |   O   |   O   |  -  |     -    |    -   |   -   |     -    |    -   |   -  |     O    |
| items         |   -  |   -   |   -   |  -  |     -    |    -   |   R   |     -    |    R   |   -  |     -    |
| onchange      |   O  |   O   |   O   |  O  |     O    |    O   |   O   |     O    |    O   |   O  |     O    |
| validations   |   O  |   -   |   -   |  O  |     O    |    -   |   -   |     -    |    -   |   O  |     O    |
| min           |   -  |   -   |   -   |  O  |     O    |    -   |   -   |     -    |    -   |   -  |     -    |
| step          |   -  |   -   |   -   |  O  |     O    |    -   |   -   |     -    |    -   |   -  |     -    |
| displayFilter |   O  |   -   |   O   |  O  |     -    |    -   |   -   |     O    |    O   |   O  |     O    |
| minDate       |   -  |   -   |   -   |  -  |     -    |    -   |   -   |     -    |    -   |   O  |     -    |
| maxDate       |   -  |   -   |   -   |  -  |     -    |    -   |   -   |     -    |    -   |   O  |     -    |
| dateFilter    |   -  |   -   |   -   |  -  |     -    |    -   |   -   |     -    |    -   |   O  |     -    |

* `R` = Required
* `O` = Optional
* `-` = Not required, ignored if provided
* `ª` = Must be defined as an attribute

### `model`
* Status: Complete
* Data Type: Object
* Special: This must be applied as an attribute of the directive. Defining this in the options object will have no effect on the behavior of the directive.
* Description: Object to be bound to the input field.

### `editable`
* Status: Implemented for text type fields
* Data Type: Boolean
* Default: True
* Special: This must be applied as an attribute of the directive. Defining this in the options object will have no effect on the behavior of the directive.
* Description: If field is editable or not. Functionally, this is the same as disabled, however, this overrides the disabled style to look like regular text.

### `disabled`
* Status: Complete
* Data Type: Boolean
* Default: False
* Special: This must be applied as an attribute of the directive. Defining this in the options object will have no effect on the behavior of the directive.
* Description: Determines disabled property for field.

### `required`
* Status: Complete
* Data Type: Boolean
* Default: False
* Special: This must be applied as an attribute of the directive. Defining this in the options object will have no effect on the behavior of the directive.
* Description: If field is required or not.

### `name`
* Status: Complete
* Data Type: String
* Description: Name property for the input field. If not provided, the name will default to the `$id` property of the input field.

### `label`
* Status: Complete
* Data Type: String
* Description: Label text. If label and placeholder are both defined, default to label value.

### `floatingLabel`
* Status: Complete
* Data Type: Boolean
* Default: True if label is defined, False if label is not defined.
* Description: If you want the placeholder/label to animate above the field.

### `placeholder`
* Status: Complete
* Data Type: String
* Description: Placeholder text. If label and placeholder are both defined, default to label value.

### `minlength`
* Status: Complete
* Data Type: Object
* Description: Define the minimum length for the input field.

### `maxlength`
* Status: Complete
* Data Type: Object
* Description: Define the maximum length for the input field.

### `items`
* Status: Complete
* Data Type: Object, Object[], String, or String[]
* Description: Options for a dropdown element. If objects, properties should be: `{ label: [LABEL], name: [NAME] }` or `{ [LABEL]: [VALUE] }`. If strings, each string will be used for the value and the label. If single string, this will set the list to one of the default options groups: states, frequency, etc.

### `onchange`
* Status: Not yet implemented
* Data Type: Function
* Description: Function called on the model data when onChange is triggered.

### `validations`
* Status: Not yet implemented
* Data Type: Object[]
* Description: Collection of rules to validate the value of the input.
* Example:

    ```javascript
    validations = [{
        test: (data) => someValidation(data),
        message: 'Display this message if validation fails.'
    }];
    ```

### `min`
* Status: Not yet implemented
* Data Type: Number
* Description: Define the minimum value for a number or currency field.

### `step`
* Status: Complete
* Data Type: Number
* Description: Define the smallest increment of a number or currency field.

### `displayFilter`
* Status: Implemented for text type inputs
* Data Type: String
* Description: The name of an angular filter, to be applied to the input display via Angular's `$filter` service.

### `minDate`
* Status: Complete (only applies to amdInputDate)
* Data Type: Date object
* Description: Expression representing a min date (inclusive).

### `maxDate`
* Status: Complete (only applies to amdInputDate)
* Data Type: Date object
* Description: Expression representing a max date (inclusive).

### `dateFilter`
* Status: Complete (only applies to amdInputDate)
* Data Type: Function
* Description: Function expecting a date and returning a boolean whether it can be selected or not.
