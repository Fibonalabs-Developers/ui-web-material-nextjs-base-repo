// @ts-nocheck
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import { FormikProps, useFormik } from 'formik'
import React, { ReactNode } from 'react'
import { RadioGroupProps, SelectProps, TextFieldProps } from './types'
import { getValidationRules, ValidationProps } from './validator'

// <input type="checkbox">
// <input type="color">
// <input type="date">
// <input type="datetime-local">
// <input type="file">
// <input type="hidden">
// <input type="image">
// <input type="month">
// <input type="range">
// <input type="search">
// <input type="tel">
// <input type="time">
// <input type="url">
// <input type="week">

export type FieldProps<T> = (
    | TextFieldProps<T>
    | RadioGroupProps<T>
    | SelectProps<T>
) &
    ValidationProps

export type FormBuilderProps<T> = {
    /**
     * Field component to render.
     */
    fields: FieldProps<T>[]

    /**
     * Form Initial Values.
     */
    initialValues: T

    /**
     * Callback function for form submit.
     */
    onSubmit: (value: T) => void

    /**
     * Callback function t oreset form fields.
     */
    onReset?: (value: T) => void

    /**
     * Form labels.
     */
    labels?: {
        submitButton?: string | ReactNode
    }
}

const FormBuilder = <T,>({
    fields,
    initialValues,
    onSubmit,
    onReset,
    labels,
}: React.PropsWithChildren<FormBuilderProps<T>>) => {
    const formik: FormikProps<T> = useFormik<T>({
        initialValues,
        validationSchema: getValidationRules<T>({ fields }),
        onSubmit: (value) => {
            console.log('On Submit')
            onSubmit(value)
        },
        onReset: (value) => {
            console.log('On Reset')
            if (onReset) onReset(value)
        },
    })

    return (
        <div>
            <h1>Form</h1>
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                {fields
                    .map(
                        ({
                            type,
                            validationType,
                            validations,
                            ...formProps
                        }: FieldProps<T>) => {
                            switch (type) {
                                case 'email':
                                case 'number':
                                case 'password':
                                case 'text': {
                                    const {
                                        name,
                                        ...rest
                                    }: Omit<
                                        TextFieldProps<T>,
                                        'type'
                                    > = formProps as TextFieldProps<T>
                                    return (
                                        <div key={name.toString()}>
                                            <TextField
                                                type={type}
                                                name={name.toString()}
                                                value={formik.values[name]}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={
                                                    formik.touched[name] &&
                                                    Boolean(formik.errors[name])
                                                }
                                                helperText={
                                                    formik.touched[name] &&
                                                    formik.errors[name]
                                                }
                                                {...rest}
                                            />
                                        </div>
                                    )
                                }
                                case 'radio': {
                                    const {
                                        name,
                                        label,
                                        options,
                                        ...rest
                                    }: Omit<
                                        RadioGroupProps<T>,
                                        'type'
                                    > = formProps as RadioGroupProps<T>
                                    return (
                                        <div key={name.toString()}>
                                            <FormControl>
                                                <FormLabel>{label}</FormLabel>
                                                <RadioGroup
                                                    name={name.toString()}
                                                    value={formik.values[name]}
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    {...rest}
                                                >
                                                    {options.map((option) => {
                                                        const {
                                                            value,
                                                            control,
                                                            ...optionRest
                                                        } = option
                                                        return (
                                                            <FormControlLabel
                                                                key={(
                                                                    value as string
                                                                ).toString()}
                                                                value={value}
                                                                control={
                                                                    control || (
                                                                        <Radio />
                                                                    )
                                                                }
                                                                {...optionRest}
                                                            />
                                                        )
                                                    })}
                                                </RadioGroup>
                                                <FormHelperText
                                                    error={
                                                        formik.touched[name] &&
                                                        Boolean(
                                                            formik.errors[name]
                                                        )
                                                    }
                                                >
                                                    {formik.touched[name] &&
                                                        formik.errors[name]}
                                                </FormHelperText>
                                            </FormControl>
                                        </div>
                                    )
                                }
                                case 'select': {
                                    const {
                                        name,
                                        label,
                                        options,
                                        ...rest
                                    }: Omit<
                                        SelectProps<T>,
                                        'type'
                                    > = formProps as SelectProps<T>
                                    return (
                                        <div key={name.toString()}>
                                            <TextField
                                                select
                                                label={label}
                                                style={{ width: '100px' }}
                                                type={type}
                                                name={name.toString()}
                                                value={formik.values[name]}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={
                                                    formik.touched[name] &&
                                                    Boolean(formik.errors[name])
                                                }
                                                helperText={
                                                    formik.touched[name] &&
                                                    formik.errors[name]
                                                }
                                                {...rest}
                                            >
                                                {options.map((option) => {
                                                    const { value, label } =
                                                        option
                                                    return (
                                                        <MenuItem
                                                            key={(
                                                                value as string
                                                            ).toString()}
                                                            value={value}
                                                        >
                                                            {label}
                                                        </MenuItem>
                                                    )
                                                })}
                                            </TextField>
                                        </div>
                                    )
                                }

                                default:
                                    return null
                            }
                        }
                    )
                    .filter((_) => _)}
            </form>
            <div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        formik.handleSubmit()
                    }}
                >
                    {labels?.submitButton || 'Submit'}
                </Button>
            </div>
        </div>
    )
}

export default FormBuilder
