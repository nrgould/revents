import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import AccountPage from '../../features/auth/AccountPage';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar';
import Sandbox from '../../features/sandbox/Sandbox';
import ErrorComponent from '../common/errors/ErrorComponent';
import ModalManager from '../common/modals/ModalManager';
import LoadingComponent from './LoadingComponent';

export default function App() {
    const { key } = useLocation();
    const { initialized } = useSelector((state) => state.async);

    if (!initialized) return <LoadingComponent content="Loading App..." />;

    return (
        <>
            <ModalManager />
            <ToastContainer position="bottom-right" hideProgressBar />
            <Route path="/" exact component={HomePage} />
            <Route
                path={'/(.+)'}
                render={() => (
                    <>
                        <NavBar />
                        <Container className="main">
                            <Route
                                path="/events"
                                exact
                                component={EventDashboard}
                            />
                            <Route path="/sandbox" exact component={Sandbox} />
                            <Route
                                path="/events/:id"
                                component={EventDetailedPage}
                            />
                            <Route
                                path={['/createEvent', '/manage/:id']}
                                component={EventForm}
                                key={key}
                            />
                            <Route path="/error" component={ErrorComponent} />
                            <Route path="/account" component={AccountPage} />
                        </Container>
                    </>
                )}
            />
        </>
    );
}
