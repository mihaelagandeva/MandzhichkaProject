import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

export function PrivateRoute({ component, ...rest }: RouteProps) {
    const user = document.cookie.includes('loggedUser');

    const Component = component!;

    return (
        <Route
            {...rest}
            render={props =>
                user ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{ pathname: '/', state: { returnTo: props.location } }} />
                    )
            }
        />
    );
}
