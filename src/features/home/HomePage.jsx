import React from "react";
import { Container, Header, Segment, Image, Icon, Button } from "semantic-ui-react";

function HomePage({ history }) {
    return (
        <div>
            <Segment inverted textAlign="center" vertical className="masthead">
                <Container>
                    <Header as="h1" inverted>
                        <Image
                            size="massive"
                            src="/assets/logo.png"
                            style={{ marginBottom: 12 }}
                        />
                        Re-vents
                    </Header>
                    <Button
                        onClick={() => history.push("/events")}
                        size="huge"
                        inverted
                    >
                        Get started
                        <Icon name="right arrow" inverted />
                    </Button>
                </Container>
            </Segment>
        </div>
    );
}

export default HomePage;
