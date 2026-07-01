import * as React from "react";
import * as User from "@/lib/user/user"

type AuthState = "idle" | "error" | "success";
type AuthMessage = {
    state: AuthState,
    message: string,
}
type AuthSetState = React.Dispatch<React.SetStateAction<AuthMessage>>;
type AuthError = boolean;

function setError(setState: AuthSetState, message: string) {
    setState({state: "error", message: message});
}

function isStringAlphanumeric(str: string): boolean {
    for (const c of str) {
        const code = c.charCodeAt(0);
        if (!(code > 47 && code < 58) &&
            !(code > 64 && code < 91) &&
            !(code > 96 && code < 123)) return false;
    }
    return true;
}

function getAgeFromDateString(date: string): number {
    return Math.floor(
        Math.abs(((new Date()) as any as number) - ((new Date(date)) as any as number)) /
            (1000 * 60 * 60 * 24 * 365)
    );
}

function isFirstLetterUppercase(str: string): boolean {
    return str[0] === str[0].toUpperCase();
}

function isStringRangeLowerCase(str: string, l: number, r: number): boolean {
    for (let i = l; i <= r; i += 1)
        if (str[i] === str[i].toUpperCase()) return false;
    return true;
}

function validateNames(firstName: string, lastName: string, setState: AuthSetState)
    : AuthError {
    if (firstName.length === 0 || lastName.length === 0) {
        setError(setState, "Please provide your first & last names.");
        return true;
    }
    if (firstName === lastName) {
        setError(setState, "First & last names match.");
        return true;
    }
    if (!isStringAlphanumeric(firstName) || !isStringAlphanumeric(lastName)) {
        setError(setState, "Name cannot contain symbols. Example: @ ! $ % ^ <space> \
            etc.");
        return true;
    }
    if (!isFirstLetterUppercase(firstName) || !isFirstLetterUppercase(lastName)) {
        setError(setState, "First letter of first & last names must be capitalized.");
        return true;
    }
    if (!isStringRangeLowerCase(firstName, 1, firstName.length - 1) ||
        !isStringRangeLowerCase(lastName, 1, lastName.length - 1)) {
        setError(setState, "All letters except the first must be lowercase in first & \
                 last names.");
        return true;
    }
    return false;
}

function validateDateOfBirthFields(form: FormData, setState: AuthSetState)
    : AuthError {
    if (
        (form.get("year")! as string).length === 0 ||
        (form.get("month")! as string).length === 0 ||
        (form.get("day")! as string).length === 0
    ) {
        setError(setState, "Please provide your date of birth.");
        return true;
    }
    return false;
}

function validateDateOfBirth(birthDate: string, setState: AuthSetState): AuthError {
    if (getAgeFromDateString(birthDate) < 18) {
        setError(setState, "User must be at least 18 year old.");
        return true;
    }
    return false;
}

function validateDistrict(district: number, setState: AuthSetState): AuthError {
    if (district == -1) {
        setError(setState, "Please provide your district.");
        return true;
    }
    return false;
}

function validateBloodGroup(bloodGroup: number, setState: AuthSetState): AuthError {
    if (bloodGroup == -1) {
        setError(setState, "Please provide your blood group.");
        return true;
    }
    return false;
}

function validatePhoneNumber(phoneNumber: string, setState: AuthSetState): AuthError {
    if (phoneNumber.length != 11) {
        setError(setState, "Phone number does not contain 11 digits");
        return true;
    }
    const prefix: string = phoneNumber.substring(0, 3);
    if (
        prefix !== "013" &&
        prefix !== "015" &&
        prefix !== "017" &&
        prefix !== "019" &&
        prefix !== "014" &&
        prefix !== "018" &&
        prefix !== "016"
    ) {
        setError(setState, "Provided number is not a valid Bangladeshi phone number.");
        return true;
    }
    return false;
}

function validatePasswordEquality(
    password: string,
    confirmPassword: string,
    setState: AuthSetState
): AuthError {
    if (password !== confirmPassword) {
        setError(setState, "Password and confirm password doesn't match.");
        return true;
    }
    return false;
}

function validateTermsAndConditions(checkbox: any, setState: AuthSetState)
    : AuthError {
    if (checkbox === null) {
        setError(setState, "Please agree with Plasma's Terms & Conditions.");
        return true;
    }
    return false;
}

export type {
    AuthState,
    AuthMessage,
    AuthError,
};

export {
    validateNames,
    validateDateOfBirthFields,
    validateDateOfBirth,
    validateDistrict,
    validateBloodGroup,
    validatePhoneNumber,
    validatePasswordEquality,
    validateTermsAndConditions,
};
