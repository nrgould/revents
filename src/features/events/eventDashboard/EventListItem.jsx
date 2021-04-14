import React from 'react';
import { Link } from 'react-router-dom';
import { Item, Segment, Icon, List, Button, Label } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { format } from 'date-fns';
import { deleteEventInFirestore } from '../../../app/firestore/firestoreService';

function EventListItem({ event }) {
    return (
        <div>
            <Segment.Group style={{ marginBottom: 20 }}>
                <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Image
                                size="tiny"
                                circuluar="true"
                                src={event.hostPhotoURL}
                            />
                            <Item.Content>
                                <Item.Header content={event.title} />
                                <Item.Description>
                                    Hosted by {event.hostedBy}
                                </Item.Description>
                                {event.isCancelled && (
                                    <Label
                                        style={{ top: '-40px' }}
                                        ribbon="right"
                                        color="red"
                                        content="This event has been cancelled"
                                    />
                                )}
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
                <Segment>
                    <span>
                        <Icon name="clock" />{' '}
                        {format(event.date, 'MMMM d, yyyy h:mm a')}
                        <Icon name="marker" /> {event.venue}
                    </span>
                </Segment>
                <Segment secondary>
                    <List horizontal>
                        {event.attendees.map((attendee) => (
                            <EventListAttendee
                                key={attendee.id}
                                attendee={attendee}
                            />
                        ))}
                    </List>
                </Segment>
                <Segment clearing>
                    <div>{event.description}</div>
                    <Button
                        as={Link}
                        to={`/events/${event.id}`}
                        color="teal"
                        floated="right"
                        icon="arrow right"
                    />
                    <Button
                        onClick={() => deleteEventInFirestore(event.id)}
                        color="red"
                        floated="right"
                        icon="trash"
                    />
                </Segment>
            </Segment.Group>
        </div>
    );
}

export default EventListItem;
