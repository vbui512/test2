import { Validation } from "@cbr/common";
import * as Yup from "yup";

export interface FormProps {
    isNewClient?: boolean;
    clientFormProps: ClientFormProps;
}

export interface ClientFormProps {
    id?: number;
    firstName?: string;
    lastName?: string;
    date?: Date;
    gender?: string;
    village?: string;
    zone?: number;
    phone?: string;
    caregiverPresent?: boolean;
    caregiverName?: string;
    caregiverEmail?: string;
    caregiverPhone?: string;
    clientDisability?: number[];
    otherDisability?: string;
    disabilityString?: string[];
    initialDisabilityArray?: string[];
}

export enum ClientFormFields {
    first_name = "firstName",
    last_name = "lastName",
    date = "date",
    phone = "phone",
    disability = "clientDisability",
    other_disability = "otherDisability",
    gender = "gender",
    village = "village",
    zone = "zone",
    caregiver_name = "caregiverName",
    caregiver_phone = "caregiverPhone",
    caregiver_email = "caregiverEmail",
}

export const ClientFormFieldLabels = {
    [ClientFormFields.first_name]: "First Name",
    [ClientFormFields.last_name]: "Last Name",
    [ClientFormFields.date]: "Birthdate",
    [ClientFormFields.phone]: "Phone Number",
    [ClientFormFields.disability]: "Disability",
    [ClientFormFields.other_disability]: "Other Disability",
    [ClientFormFields.gender]: "Gender",
    [ClientFormFields.village]: "Village",
    [ClientFormFields.zone]: "Zone",
    [ClientFormFields.caregiver_name]: "Caregiver Name",
    [ClientFormFields.caregiver_phone]: "Caregiver Phone",
    [ClientFormFields.caregiver_email]: "Caregiver Email",
};

export const InitialValues = {
    [ClientFormFields.first_name]: "",
    [ClientFormFields.last_name]: "",
    [ClientFormFields.date]: new Date(),
    [ClientFormFields.phone]: "",
    [ClientFormFields.disability]: [],
    [ClientFormFields.other_disability]: "",
    [ClientFormFields.gender]: "",
    [ClientFormFields.village]: "",
    [ClientFormFields.zone]: 0,
    [ClientFormFields.caregiver_name]: "",
    [ClientFormFields.caregiver_phone]: "",
    [ClientFormFields.caregiver_email]: "",
};

export interface FormValues {
    id?: number;
    firstName?: string;
    lastName?: string;
    date?: Date;
    gender?: string;
    village?: string;
    zone?: number;
    phone?: string;
    caregiverPresent?: boolean;
    caregiverName?: string;
    caregiverEmail?: string;
    caregiverPhone?: string;
    clientDisability?: number[];
    otherDisability?: string;
}

export const setFormInitialValues = (props: ClientFormProps, isNewClient?: boolean) => {
    if (isNewClient) {
        return InitialValues;
    } else {
        const loadedInitialValues: FormValues = {
            id: props.id,
            firstName: props.firstName,
            lastName: props.lastName,
            date: props.date,
            gender: props.gender,
            village: props.village,
            zone: props.zone,
            phone: props.phone,
            caregiverPresent: props.caregiverPresent,
            caregiverName: props.caregiverName,
            caregiverEmail: props.caregiverEmail,
            caregiverPhone: props.caregiverPhone,
            clientDisability: props.clientDisability,
            otherDisability: props.otherDisability,
        };
        return loadedInitialValues;
    }
};

export const validationSchema = () =>
    Yup.object().shape({
        [ClientFormFields.first_name]: Yup.string()
            .label(ClientFormFields.first_name)
            .required()
            .max(50)
            .min(1),
        [ClientFormFields.last_name]: Yup.string()
            .label(ClientFormFields.last_name)
            .required()
            .max(50)
            .min(1),
        [ClientFormFields.date]: Yup.date()
            .label(ClientFormFields.date)
            .max(new Date(), "Birthdate cannot be in the future")
            .required(),
        [ClientFormFields.phone]: Yup.string()
            .label(ClientFormFields.phone)
            .max(50)
            .matches(Validation.phoneRegExp, "Phone number is not valid."),
        [ClientFormFields.disability]: Yup.array().label(ClientFormFields.disability).required(),
        [ClientFormFields.gender]: Yup.string().label(ClientFormFields.gender).required(),
        [ClientFormFields.village]: Yup.string().label(ClientFormFields.village).required(),
        [ClientFormFields.zone]: Yup.string().label(ClientFormFields.zone).required(),
        [ClientFormFields.caregiver_name]: Yup.string()
            .label(ClientFormFields.caregiver_name)
            .max(101),
        [ClientFormFields.caregiver_phone]: Yup.string()
            .label(ClientFormFields.caregiver_phone)
            .max(50)
            .matches(Validation.phoneRegExp, "Phone number is not valid"),
        [ClientFormFields.caregiver_email]: Yup.string()
            .label(ClientFormFields.caregiver_email)
            .max(50)
            .matches(Validation.emailRegExp, "Email Address is not valid"),
    });
