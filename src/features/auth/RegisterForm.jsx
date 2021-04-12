import { Form, Formik } from 'formik';
import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button, Divider, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/common/modals/modalReducer';
import { toast } from 'react-toastify';
import { registerInFirebase } from '../../app/firestore/firebaseService';
import SocialLogin from './SocialLogin';

function RegisterForm() {
    const dispatch = useDispatch();

    return (
        <ModalWrapper size="tiny" header="Sign up to Re-vents">
            <Formik
                initialValues={{
                    displayName: '',
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object({
                    displayName: Yup.string().required(),
                    email: Yup.string().required().email(),
                    password: Yup.string().required(),
                })}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    try {
                        await registerInFirebase(values);
                        setSubmitting(false);
                        dispatch(closeModal());
                    } catch (error) {
                        setErrors({
                            auth: error.message,
                        });
                        setSubmitting(false);
                        toast.error(error.message);
                    }
                }}>
                {({ isSubmitting, isValid, dirty, errors }) => (
                    <Form className="ui form">
                        <MyTextInput
                            name="displayName"
                            placeholder="Username"
                        />
                        <MyTextInput name="email" placeholder="Email Address" />
                        <MyTextInput
                            name="password"
                            placeholder="Password"
                            type="password"
                        />
                        {errors.auth && (
                            <Label
                                basic
                                color="red"
                                style={{ marginBottom: '10px', width: '100%' }}
                                content={errors.auth}
                            />
                        )}
                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type="submit"
                            fluid={true}
                            size="large"
                            color="teal"
                            content="Sign Up"
                        />
                        <Divider horizontal>Or</Divider>
                        <SocialLogin />
                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    );
}

export default RegisterForm;
