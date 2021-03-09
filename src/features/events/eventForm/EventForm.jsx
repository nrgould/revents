import cuid from "cuid";

import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { updateEvent, createEvent } from "../eventActions.js";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea.jsx";
import MySelectInput from "../../../app/common/form/MySelectInput.jsx";
import { categoryData } from "../../../app/api/categoryOptions.js";
import MyDateInput from "../../../app/common/form/MyDateInput.jsx";

function EventForm({ match, history }) {
    const dispatch = useDispatch();

    const selectedEvent = useSelector((state) =>
        state.event.events.find((e) => e.id === match.params.id)
    );

    const initialValues = selectedEvent ?? {
        title: "",
        category: "",
        city: "",
        description: "",
        venue: "",
        date: "",
    };

    const validationSchema = Yup.object({
        title: Yup.string().required("You must provide a title"),
        category: Yup.string().required("You must provide a category"),
        description: Yup.string().required(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
        date: Yup.string().required(),
    });

    return (
        <Segment clearing>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    selectedEvent
                        ? dispatch(updateEvent({ ...selectedEvent, ...values }))
                        : dispatch(
                              createEvent({
                                  ...values,
                                  id: cuid(),
                                  hostedBy: "Bob",
                                  attendees: [],
                                  hostPhotoURL: "/assets/user.png",
                              })
                          );
                    history.push("/events");
                }}
            >
                {({ isSubmitting, dirty, isValid }) => (
                    <Form className="ui form">
                    <Header sub color="teal" content="Event d=Details" />
                    <MyTextInput
                        name="title"
                        placeholder="Event title"
                    ></MyTextInput>
                    <MySelectInput
                        name="category"
                        placeholder="Category"
                        options={categoryData}
                    ></MySelectInput>
                    <MyTextArea
                        name="description"
                        placeholder="Description"
                        rows="3"
                    ></MyTextArea>
                    <Header sub color="teal" content="Event Location Details" />
                    <MyTextInput name="city" placeholder="City"></MyTextInput>
                    <MyTextInput name="venue" placeholder="Venue"></MyTextInput>
                    <MyDateInput
                        name="date"
                        placeholder="Event date"
                        timeFormat='HH:mm'
                        showTimeSelect
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy h:mm a'
                    ></MyDateInput>
                    <Button
                        loading={isSubmitting}
                        disabled={!isValid || !dirty || isSubmitting}
                        type="submit"
                        floated="right"
                        positive
                        content="Submit"
                    />
                    <Button
                        disabled={isSubmitting}
                        as={Link}
                        to={"/events"}
                        type="submit"
                        floated="right"
                        content="Cancel"
                    />
                </Form>
                )}
                
            </Formik>
        </Segment>
    );
}

export default EventForm;
