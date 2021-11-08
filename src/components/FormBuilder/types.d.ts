import { FormControlLabelProps } from '@mui/material/FormControlLabel'
import { SelectProps as MUISelectProps } from '@mui/material/Select'
import { MenuItemProps } from '@mui/material/MenuItem'
import { RadioGroupProps as MUIRadioGroupProps } from '@mui/material/RadioGroup'
import { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField'

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
