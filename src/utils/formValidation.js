import {
    NAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX, NUMBER_REGEX, BIRTHDATE_REGEX,
    ERROR_NAME_REQUIRED, ERROR_NAME_INVALID, ERROR_NAME_LENGTH, ERROR_BIRTHDATE_REQUIRED,
    ERROR_GENDER_REQUIRED, ERROR_NUMBER_ONLY, ERROR_BIRTHDATE_FORMAT, ERROR_BIRTHDATE_MONTH,
    ERROR_BIRTHDATE_DAY, ERROR_EMAIL_REQUIRED, ERROR_EMAIL_INVALID, ERROR_EMAIL_EXISTS,
    ERROR_PASSWORD_REQUIRED, ERROR_PASSWORD_LENGTH, ERROR_PASSWORD_INVALID,
    ERROR_CONFIRM_PASSWORD_REQUIRED, ERROR_PASSWORD_MISMATCH, ERROR_CAMPUS_REQUIRED,
    ERROR_COURSE_REQUIRED, ERROR_VERIFICATION_CODE_REQUIRED
} from '../constants/index';

import { checkEmailExists } from "../services/api/findPassword";

export const validateName = (name) => {
    if (!name.trim()) return ERROR_NAME_REQUIRED;
    if (!NAME_REGEX.test(name)) return ERROR_NAME_INVALID;
    if (name.length < 2 || name.length > 5) return ERROR_NAME_LENGTH;
    return '';
};

function isLeapYear(year) {
    year += 1900;
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if (year % 400 === 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    } else {
        return false;
    }
}

export const validateBirthdate = (birthdate, gender) => {
    if (!birthdate) return ERROR_BIRTHDATE_REQUIRED;
    if (!gender) return ERROR_GENDER_REQUIRED;
    if (!NUMBER_REGEX.test(birthdate) || !NUMBER_REGEX.test(gender)) return ERROR_NUMBER_ONLY;
    if (!BIRTHDATE_REGEX.test(birthdate)) return ERROR_BIRTHDATE_FORMAT;

    const year = parseInt(birthdate.substring(0, 2), 10);
    const month = parseInt(birthdate.substring(2, 4), 10);
    const day = parseInt(birthdate.substring(4, 6), 10);

    if (month < 1 || month > 12) return ERROR_BIRTHDATE_MONTH;

    const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day < 1 || day > daysInMonth[month - 1]) return ERROR_BIRTHDATE_DAY(daysInMonth[month - 1]);

    return '';
};

export const validateEmail = async (email) => {
    if (!email) return ERROR_EMAIL_REQUIRED;
    if (!EMAIL_REGEX.test(email)) return ERROR_EMAIL_INVALID;

    const emailExists = await checkEmailExists(email);
    if (emailExists) return ERROR_EMAIL_EXISTS;

    return '';
};

export const validatePassword = (password) => {
    if (!password) return ERROR_PASSWORD_REQUIRED;
    if (password.length < 8 || password.length > 20) return ERROR_PASSWORD_LENGTH;
    if (!PASSWORD_REGEX.test(password)) return ERROR_PASSWORD_INVALID;
    return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) return ERROR_CONFIRM_PASSWORD_REQUIRED;
    if (password !== confirmPassword) return ERROR_PASSWORD_MISMATCH;
    return '';
};

export const validateCampus = (campus) => {
    return campus ? '' : ERROR_CAMPUS_REQUIRED;
};

export const validateCourse = (course) => {
    return course ? '' : ERROR_COURSE_REQUIRED;
};

export const validateFindPasswordForm = (formData, step) => {
    const errors = {};

    if (step === 'EMAIL') {
        if (!formData.email) {
            errors.email = ERROR_EMAIL_REQUIRED;
        }
    } else if (step === 'CODE') {
        if (!formData.verificationCode) {
            errors.verificationCode = ERROR_VERIFICATION_CODE_REQUIRED;
        }
    }

    return errors;
};

export const validateSignupForm = (formData, currentStep) => {
    let errors = {};

    if (currentStep === 'FIRST') {
        const nameError = validateName(formData.name);
        if (nameError) errors.name = nameError;

        const birthdateError = validateBirthdate(formData.birthdate, formData.gender);
        if (birthdateError) {
            errors.birthdate = birthdateError;
            errors.gender = '　';
        }

        const emailError = validateEmail(formData.email);
        if (emailError) errors.email = emailError;

        const passwordError = validatePassword(formData.password);
        if (passwordError) errors.password = passwordError;

        const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
        if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
    } else if (currentStep === 'SECOND') {
        const campusError = validateCampus(formData.campus);
        if (campusError) errors.campus = campusError;

        const courseError = validateCourse(formData.course);
        if (courseError) errors.course = courseError;
    }

    return errors;
};
