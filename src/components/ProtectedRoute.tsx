import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { UserConsumer } from "../UserContext";

interface IProps extends RouteProps {
    component: any
}

const ProtectedRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
    return (
        <UserConsumer>
            {({ authenticated }) => (
                <Route {...rest} render={(props) => (
                    authenticated
                        ? <Component {...props} />
                        : <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }} />
                )} />
            )}
        </UserConsumer>
    )}

export default ProtectedRoute;
