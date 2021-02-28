import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";

function SignedOutMenu({ setAuthenticated }) {
    return (
        <>
            <Menu.Item as={NavLink} to="/" position="right">
                <Button
                    onClick={() => setAuthenticated(true)}
                    basic
                    inverted
                    content="Login"
                />
                <Button
                    basic
                    inverted
                    content="Register"
                    style={{ marginLeft: "0.5em" }}
                />
            </Menu.Item>
        </>
    );
}

export default SignedOutMenu;
