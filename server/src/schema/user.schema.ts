import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
    body: object({
        firstName: string({
            required_error: "First Name is Required"
        }),
        lastName: string({
            required_error: "Last Name is Required"
        }),
        password: string({
            required_error: "password is Required"
        }).min(6, "password is too short -- should be at least 6 characters"),
        passwordConfirmation: string({
            required_error: "password confirmation is Required"
        }),
        email: string({
            required_error: "First Name is Required"
        }).email("Not a valid email address"),
    }).refine(data => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"]
    })
})

export type createUserInput = TypeOf<typeof createUserSchema>["body"];