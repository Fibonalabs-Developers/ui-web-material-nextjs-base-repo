// @ts-nocheck
import MuiButton from '@mui/material/Button'
import MuiFormControl from '@mui/material/FormControl'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import MuiFormHelperText from '@mui/material/FormHelperText'
import MuiFormLabel from '@mui/material/FormLabel'
import MuiGrid from '@mui/material/Grid'
import MuiMenuItem from '@mui/material/MenuItem'
import MuiRadio from '@mui/material/Radio'
import MuiRadioGroup from '@mui/material/RadioGroup'
import MuiTextField from '@mui/material/TextField'
import { FormikHelpers, FormikProps, useFormik } from 'formik'
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
    onSubmit: (
        values: T,
        formikHelpers: FormikHelpers<T>
    ) => void | Promise<any>

    /**
     * Callback function t oreset form fields.
     */
    onReset?: ((values: T, formikHelpers: FormikHelpers<T>) => void) | undefined

    /**
     * Form labels.
     */
    labels?: {
        submitButton?: string | ReactNode
    }

    /**
     * Submit button.
     */
    submitButton?: {
        fullWidth?: boolean
    }
}

const FormBuilder = <T,>({
    fields,
    initialValues,
    onSubmit,
    onReset,
    labels,
    submitButton,
}: React.PropsWithChildren<FormBuilderProps<T>>) => {
    const formik: FormikProps<T> = useFormik<T>({
        initialValues,
        validationSchema: getValidationRules<T>({ fields }),
        onSubmit: onSubmit,
        onReset: onReset,
    })

    return (
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <MuiGrid container spacing={2}>
                {fields
                    .map(
                        ({
                            type,
                            validationType,
                            validations,
                            responsive: formResponsive,
                            ...formProps
                        }: FieldProps<T>) => {
                            const responsive = {
                                xs: 12,
                                sm: 12,
                                md: 12,
                                lg: 12,
                                xl: 12,
                                ...formResponsive,
                            }
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
                                        <MuiGrid
                                            item
                                            {...responsive}
                                            key={name.toString()}
                                        >
                                            <MuiTextField
                                                fullWidth
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
                                        </MuiGrid>
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
                                        <MuiGrid
                                            item
                                            {...responsive}
                                            key={name.toString()}
                                        >
                                            <MuiFormControl>
                                                <MuiFormLabel>
                                                    {label}
                                                </MuiFormLabel>
                                                <MuiRadioGroup
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
                                                            <MuiFormControlLabel
                                                                key={(
                                                                    value as string
                                                                ).toString()}
                                                                value={value}
                                                                control={
                                                                    control || (
                                                                        <MuiRadio />
                                                                    )
                                                                }
                                                                {...optionRest}
                                                            />
                                                        )
                                                    })}
                                                </MuiRadioGroup>
                                                <MuiFormHelperText
                                                    error={
                                                        formik.touched[name] &&
                                                        Boolean(
                                                            formik.errors[name]
                                                        )
                                                    }
                                                >
                                                    {formik.touched[name] &&
                                                        formik.errors[name]}
                                                </MuiFormHelperText>
                                            </MuiFormControl>
                                        </MuiGrid>
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
                                        <MuiGrid
                                            item
                                            {...responsive}
                                            key={name.toString()}
                                        >
                                            <MuiTextField
                                                select
                                                label={label}
                                                style={{ width: '100%' }}
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
                                                        <MuiMenuItem
                                                            key={(
                                                                value as string
                                                            ).toString()}
                                                            value={value}
                                                        >
                                                            {label}
                                                        </MuiMenuItem>
                                                    )
                                                })}
                                            </MuiTextField>
                                        </MuiGrid>
                                    )
                                }

                                default:
                                    return null
                            }
                        }
                    )
                    .filter((_) => _)}

                <MuiGrid item xs={12}>
                    <MuiButton
                        {...submitButton}
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={formik.isSubmitting}
                        onClick={() => {
                            formik.handleSubmit()
                        }}
                    >
                        {labels?.submitButton || 'Submit'}
                    </MuiButton>
                </MuiGrid>
            </MuiGrid>
        </form>
    )
}

export default FormBuilder
