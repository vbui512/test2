import React, { useState } from "react";
import { useStyles } from "../NewClient/ClientForm.styles";

import { Field, Form, Formik } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";

import { fieldLabels, FormField, validationSchema } from "./formFields";

import {
    Button,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    FormControl,
    Grid,
    MenuItem,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { handleSubmit, handleCancel } from "./formHandler";
import { IClient, genders } from "util/clients";
import { useZones } from "util/hooks/zones";
import { getOtherDisabilityId, useDisabilities } from "util/hooks/disabilities";
import history from "util/history";
import { ProfilePicCard } from "components/PhotoViewUpload/PhotoViewUpload";

interface IProps {
    clientInfo: IClient;
}

const ClientInfoForm = (props: IProps) => {
    const styles = useStyles();
    const zones = useZones();
    const disabilities = useDisabilities();
    const [initialPicture] = useState<string>(props.clientInfo.picture);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    return (
        <Formik
            initialValues={props.clientInfo}
            validationSchema={validationSchema}
            onSubmit={(values, setSubmitting) => {
                handleSubmit(values, setSubmitting, setIsEditing);
            }}
        >
            {({ values, isSubmitting, resetForm, setFieldValue }) => (
                <Grid container direction="row" justify="flex-start" spacing={2}>
                    <Grid item md={2} xs={12}>
                        <ProfilePicCard
                            isEditing={isEditing}
                            setFieldValue={setFieldValue}
                            picture={values.picture}
                        />
                        <Grid container direction="row" spacing={1}>
                            <Grid className={styles.sideFormButtonWrapper} item md={10} xs={12}>
                                <Button
                                    className={styles.sideFormButton}
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    onClick={() =>
                                        history.push(`/client/${props.clientInfo.id}/visits/new`)
                                    }
                                    disabled={isSubmitting}
                                >
                                    New Visit
                                </Button>
                            </Grid>
                            <Grid className={styles.sideFormButtonWrapper} item md={10} xs={12}>
                                <Button
                                    className={styles.sideFormButton}
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    onClick={() =>
                                        history.push(`/client/${props.clientInfo.id}/referrals/new`)
                                    }
                                    disabled={isSubmitting}
                                >
                                    New Referral
                                </Button>
                            </Grid>
                            <Grid className={styles.sideFormButtonWrapper} item md={10} xs={12}>
                                <Button
                                    className={styles.sideFormButton}
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    onClick={() =>
                                        history.push(`/client/${props.clientInfo.id}/surveys/new`)
                                    }
                                    disabled={isSubmitting}
                                >
                                    Baseline Survey
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={10} xs={12}>
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <Field
                                        className={styles.disabledTextField}
                                        component={TextField}
                                        name={FormField.first_name}
                                        variant="outlined"
                                        disabled={!isEditing}
                                        label={fieldLabels[FormField.first_name]}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Field
                                        component={TextField}
                                        className={styles.disabledTextField}
                                        name={FormField.last_name}
                                        variant="outlined"
                                        disabled={!isEditing}
                                        label={fieldLabels[FormField.last_name]}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Field
                                        component={TextField}
                                        fullWidth
                                        required
                                        type="date"
                                        className={styles.disabledTextField}
                                        disabled={!isEditing}
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        label={fieldLabels[FormField.birth_date]}
                                        name={FormField.birth_date}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <FormControl
                                        className={styles.disabledTextField}
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <Field
                                            component={TextField}
                                            fullWidth
                                            select
                                            disabled={!isEditing}
                                            required
                                            variant="outlined"
                                            label={fieldLabels[FormField.gender]}
                                            name={FormField.gender}
                                        >
                                            {Object.entries(genders).map(([value, name]) => (
                                                <MenuItem key={value} value={value}>
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Field
                                        component={TextField}
                                        variant="outlined"
                                        disabled={!isEditing}
                                        className={styles.disabledTextField}
                                        name={FormField.village}
                                        label={fieldLabels[FormField.village]}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <FormControl fullWidth variant="outlined">
                                        <Field
                                            component={TextField}
                                            fullWidth
                                            disabled={!isEditing}
                                            select
                                            className={styles.disabledTextField}
                                            variant="outlined"
                                            required
                                            label={fieldLabels[FormField.zone]}
                                            name={FormField.zone}
                                        >
                                            {Array.from(zones).map(([id, name]) => (
                                                <MenuItem key={id} value={id}>
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Field
                                        component={TextField}
                                        disabled={!isEditing}
                                        className={styles.disabledTextField}
                                        name={FormField.phone_number}
                                        variant="outlined"
                                        label={fieldLabels[FormField.phone_number]}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Field
                                        component={TextField}
                                        fullWidth
                                        select
                                        SelectProps={{
                                            multiple: true,
                                        }}
                                        className={styles.disabledTextField}
                                        disabled={!isEditing}
                                        label={fieldLabels[FormField.disability]}
                                        required
                                        name={FormField.disability}
                                        variant="outlined"
                                    >
                                        {Array.from(disabilities).map(([id, name]) => (
                                            <MenuItem key={id} value={id}>
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                    {(values[FormField.disability] as number[]).includes(
                                        getOtherDisabilityId(disabilities)
                                    ) && (
                                        <div>
                                            <br />
                                            <Field
                                                component={TextField}
                                                className={styles.disabledTextField}
                                                fullWidth
                                                label={fieldLabels[FormField.other_disability]}
                                                disabled={!isEditing}
                                                required
                                                name={FormField.other_disability}
                                                variant="outlined"
                                            />
                                        </div>
                                    )}
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <Field
                                        component={CheckboxWithLabel}
                                        type="checkbox"
                                        disabled={!isEditing}
                                        className={styles.disabledTextField}
                                        name={FormField.caregiver_present}
                                        Label={{
                                            label: fieldLabels[FormField.caregiver_present],
                                        }}
                                    />
                                </Grid>
                                {values.caregiver_present ? (
                                    <Grid item md={7} xs={12}>
                                        <Accordion
                                            className={styles.caregiverAccordion}
                                            defaultExpanded
                                        >
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                Caregiver Details:
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Grid container direction="column" spacing={1}>
                                                    <Grid item md={8} xs={12}>
                                                        <Field
                                                            className={`${styles.caregiverInputField} ${styles.disabledTextField}`}
                                                            component={TextField}
                                                            disabled={!isEditing}
                                                            name={FormField.caregiver_name}
                                                            variant="outlined"
                                                            label={
                                                                fieldLabels[
                                                                    FormField.caregiver_name
                                                                ]
                                                            }
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item md={8} xs={12}>
                                                        <Field
                                                            className={`${styles.caregiverInputField} ${styles.disabledTextField}`}
                                                            component={TextField}
                                                            name={FormField.caregiver_email}
                                                            disabled={!isEditing}
                                                            variant="outlined"
                                                            label={
                                                                fieldLabels[
                                                                    FormField.caregiver_email
                                                                ]
                                                            }
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item md={8} xs={12}>
                                                        <Field
                                                            className={`${styles.caregiverInputField} ${styles.disabledTextField}`}
                                                            component={TextField}
                                                            name={FormField.caregiver_phone}
                                                            disabled={!isEditing}
                                                            variant="outlined"
                                                            label={
                                                                fieldLabels[
                                                                    FormField.caregiver_phone
                                                                ]
                                                            }
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Grid>
                                ) : (
                                    <></>
                                )}
                            </Grid>

                            <br />
                            <Grid justify="flex-end" container spacing={2}>
                                {isEditing ? (
                                    <>
                                        <Grid item>
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                Save
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => {
                                                    handleCancel(resetForm, setIsEditing);
                                                    props.clientInfo.picture = initialPicture;
                                                }}
                                                disabled={isSubmitting}
                                            >
                                                Cancel
                                            </Button>
                                        </Grid>
                                    </>
                                ) : (
                                    <Grid item>
                                        <></>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => {
                                                setIsEditing(true);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </Form>
                    </Grid>
                </Grid>
            )}
        </Formik>
    );
};

export default ClientInfoForm;