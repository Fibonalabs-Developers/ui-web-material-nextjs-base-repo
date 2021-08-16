import Forms, { FieldProps } from '@/src/components/FormBuilder'

type FormType = {
    name: string
    email: string
    age: string
    password: string
    gender: string
    place: string
}
const Home = () => {
    const formElement: FieldProps<FormType>[] = [
        {
            type: 'text',
            label: 'Name',
            name: 'name',
            validationType: 'string',
            validations: [
                {
                    type: 'required',
                    params: ['Name field is required'],
                },
                {
                    type: 'min',
                    params: [4, 'Name cannot be less than 5 characters'],
                },
                {
                    type: 'max',
                    params: [10, 'Name cannot be more than 10 characters'],
                },
            ],
        },
        {
            type: 'number',
            label: 'Age',
            name: 'age',
            validationType: 'number',
            validations: [
                {
                    type: 'required',
                    params: ['Age field is required'],
                },
                {
                    type: 'min',
                    params: [5, 'Age cannot be less than 5'],
                },
                {
                    type: 'max',
                    params: [10, 'Age cannot be more than 10'],
                },
            ],
        },
        {
            type: 'email',
            name: 'email',
            label: 'Email',
        },
        {
            type: 'password',
            name: 'password',
            label: 'Password',
            validationType: 'string',
            validations: [
                {
                    type: 'required',
                    params: ['Password field is required'],
                },
                {
                    type: 'min',
                    params: [6, 'Password cannot be less than 6 characters'],
                },
            ],
        },
        {
            type: 'radio',
            label: 'Gender',
            name: 'gender',
            options: [
                {
                    value: 'male',
                    label: 'Male',
                },
                {
                    value: 'female',
                    label: 'Female',
                },
            ],
            validationType: 'string',
            validations: [
                {
                    type: 'required',
                    params: ['Gender is required'],
                },
            ],
        },
        {
            type: 'select',
            label: 'Place',
            name: 'place',
            options: [
                {
                    value: 'kolkata',
                    label: 'Kolkata',
                },
                {
                    value: 'bangalore',
                    label: 'Bangalore',
                },
            ],
            validationType: 'string',
            validations: [
                {
                    type: 'required',
                    params: ['Place field is required'],
                },
            ],
        },
    ]

    return (
        <>
            <h1>{'ASD'}</h1>

            <Forms<FormType>
                fields={formElement}
                initialValues={{
                    name: '',
                    age: '',
                    email: '',
                    password: '',
                    gender: '',
                    place: '',
                }}
                onSubmit={(data) => {
                    console.log(data)

                    console.log('PArent Submit')
                }}
            />
        </>
    )
}

export default Home
