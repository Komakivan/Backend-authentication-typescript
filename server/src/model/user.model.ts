import { DocumentType, Severity, getModelForClass, modelOptions, pre, prop } from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import argon2 from "argon2";
import { log } from "../utils/logger";



@pre<User>("save", async function() { // the arrow function can't be used because it cant access "this"
    if(!this.isModified("password")) {
        return;
    }
    const hash =await argon2.hash(this.password)
    this.password = hash
    return;
})
@modelOptions({
    schemaOptions: {
        timestamps: true
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
export class User {
    @prop({ lowercase: true, unique: true,required: true })
    email: string

    @prop({ required: true })
    firstName: string

    @prop({ required: true })
    lastName: string

    @prop({ required: true })
    password: string

    @prop({ required: true, default: () => nanoid() })
    verificationCode: string

    @prop()
    passwordResetCode: string | null

    @prop({ default: false })
    verified: boolean

    async validatePassword(this: DocumentType<User>, candidatePAssword: string) {
        try {
            return await argon2.verify(this.password, candidatePAssword)
        } catch (e) {
            log.error(e, "could not validate password")
        }
    }

}

const userModel = getModelForClass(User)

export { userModel }