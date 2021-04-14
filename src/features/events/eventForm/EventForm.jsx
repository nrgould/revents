import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Header, Icon, Modal, Segment } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { listenToEvents } from '../eventActions.js';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea.jsx';
import MySelectInput from '../../../app/common/form/MySelectInput.jsx';
import { categoryData } from '../../../app/api/categoryOptions.js';
import MyDateInput from '../../../app/common/form/MyDateInput.jsx';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc.js';
import {
    addEventToFirestore,
    cancelEventToggle,
    listenToEventFromFirestore,
    updateEventInFirestore,
} from '../../../app/firestore/firestoreService.js';
import LoadingComponent from '../../../app/layout/LoadingComponent.jsx';
import { toast } from 'react-toastify';

function EventForm({ match, history }) {
    const dispatch = useDispatch();

    const [loadingCancel, setLoadingCancel] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const selectedEvent = useSelector((state) =>
        state.event.events.find((e) => e.id === match.params.id)
    );

    const { error, loading } = useSelector((state) => state.async);

    const initialValues = selectedEvent ?? {
        title: '',
        category: '',
        city: '',
        description: '',
        venue: '',
        date: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('You must provide a title'),
        category: Yup.string().required('You must provide a category'),
        description: Yup.string().required(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
        date: Yup.string().required(),
    });

    async function handleCancelToggle(event) {
        setConfirmOpen(false);
        setLoadingCancel(true);
        try {
            await cancelEventToggle(event);
            setLoadingCancel(false);
        } catch (error) {
            setLoadingCancel(true);
            toast.error(error.message);
        }
    }

    useFirestoreDoc({
        shouldExecute: !!match.params.id,
        query: () => listenToEventFromFirestore(match.params.id),
        data: (event) => dispatch(listenToEvents([event])),
        deps: [match.params.id, dispatch],
    });

    if (loading) return <LoadingComponent content="Loading event..." />;

    if (error) return <Redirect to="/error" />;

    return (
        <Segment clearing>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        selectedEvent
                            ? await updateEventInFirestore(values)
                            : await addEventToFirestore(values);
                        setSubmitting(false);
                        history.push(`/events/${match.params.id}`);
                    } catch (error) {
                        toast.error(error.message);
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting, dirty, isValid }) => (
                    <Form className="ui form">
                        <Header sub color="teal" content="Event Details" />
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
                        <Header
                            sub
                            color="teal"
                            content="Event Location Details"
                        />
                        <MyTextInput
                            name="city"
                            placeholder="City"
                        ></MyTextInput>
                        <MyTextInput
                            name="venue"
                            placeholder="Venue"
                        ></MyTextInput>
                        <MyDateInput
                            name="date"
                            placeholder="Event date"
                            timeFormat="HH:mm"
                            showTimeSelect
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm a"
                        ></MyDateInput>
                        {selectedEvent && (
                            <Button
                                loading={loadingCancel}
                                type="button"
                                floated="left"
                                color={
                                    selectedEvent.isCancelled ? 'green' : 'red'
                                }
                                content={
                                    selectedEvent.isCancelled
                                        ? 'Reactivate Event'
                                        : 'Cancel Event'
                                }
                                onClick={() => setConfirmOpen(true)}
                            />
                        )}
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
                            to={'/events'}
                            type="submit"
                            floated="right"
                            content="Cancel"
                        />
                    </Form>
                )}
            </Formik>
            {/* <Confirm
                content={
                    selectedEvent?.isCancelled
                        ? "This will reactivate the event – are you sure?"
                        : "This will cancel the event for all attendees – are you sure?"
                }
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={() => handleCancelToggle(selectedEvent)}
            /> */}
            <Modal
                basic
                onClose={() => setConfirmOpen(false)}
                onOpen={() => setConfirmOpen(true)}
                open={confirmOpen}
                size="small"
            >
                <Header>
                    {selectedEvent?.isCancelled
                        ? 'Reactivate Event'
                        : 'Cancel Event'}
                </Header>
                <Modal.Content>
                    <p>
                        {selectedEvent?.isCancelled
                            ? 'This will reactivate the event – are you sure?'
                            : 'This will cancel the event for all attendees – are you sure?'}
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        basic
                        color="red"
                        inverted
                        onClick={() => setConfirmOpen(false)}
                    >
                        <Icon name="remove" /> No
                    </Button>
                    <Button
                        color="green"
                        inverted
                        onClick={() => handleCancelToggle(selectedEvent)}
                    >
                        <Icon name="checkmark" /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        </Segment>
    );
}

export default EventForm;
