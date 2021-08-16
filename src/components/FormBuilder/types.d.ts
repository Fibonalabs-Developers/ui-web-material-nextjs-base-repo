import { FormControlLabelProps } from '@material-ui/core/FormControlLabel'
import { SelectProps as MUISelectProps } from '@material-ui/core/Select'
import { MenuItemProps } from '@material-ui/core/MenuItem'
import { RadioGroupProps as MUIRadioGroupProps } from '@material-ui/core/RadioGroup'
import { TextFieldProps as MUITextFieldProps } from '@material-ui/core/TextField'

type CommonFieldProps<T> = {
    /**
     * Form Field unique name.
     */
    name: keyof T

    /**
     * Form Field label.
     */
    label: string
}

// Text Field
export type TextFieldProps<T> = {
    /**
     * Field component to render.
     */
    type: 'text' | 'number' | 'email' | 'password'
} & CommonFieldProps<T>

// Radio Field
type RadioGroupOptionProps = Omit<FormControlLabelProps, 'control'> & {
    /**
     * Field component to render.
     */
    control?: React.ReactElement<any, any>
}

export type RadioGroupProps<T> = {
    /**
     * Field component to render.
     */
    type: 'radio'

    /**
     * Form Radio Options.
     */
    options: RadioGroupOptionProps[]
} & CommonFieldProps<T>

// Select Field
type SelectOptionProps = MenuItemProps & {
    /**
     * Form select Label.
     */
    label: string
}

export type SelectProps<T> = {
    /**
     * Field component to render.
     */
    type: 'select'

    /**
     * Form select options.
     */
    options: SelectOptionProps[]
} & CommonFieldProps<T>
