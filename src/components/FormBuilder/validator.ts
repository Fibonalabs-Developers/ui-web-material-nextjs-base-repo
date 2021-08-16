// @ts-nocheck
import * as yup from 'yup'
import { FormBuilderProps } from './Builder'

// TODO: More R&D
export type ValidationProps = {
    validationType?: 'string' | 'array' | 'number'
    validations?: {
        type: 'required' | 'min' | 'max'
        params: (string | number)[]
    }[]
}

function createYupSchema(schema, config: ValidationProps & { name: string }) {
    console.log('schema')
    console.log(schema)
    const { name, validationType, validations = [] } = config
    if (!yup[validationType]) {
        return schema
    }
    let validator = yup[validationType]()
    validations.forEach((validation) => {
        const { params, type } = validation
        if (!validator[type]) {
            return
        }
        console.log(type, params)
        validator = validator[type](...params)
    })
    schema[name] = validator

    return schema
}

export function getValidationRules<T>({
    fields,
}: Pick<FormBuilderProps<T>, 'fields'>) {
    const schema = fields.reduce(createYupSchema, {})
    return yup.object().shape(schema as any)
}

export function initialize<T>({ fields }: Pick<FormBuilderProps<T>, 'fields'>) {
    const values = {}
    fields.map((el) => {
        values[el.name] = el.initialValue || ''
    })
    return values
}
