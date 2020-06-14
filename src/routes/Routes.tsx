import React from 'react';
import {Route, Switch} from 'react-router';
import loadable from '@loadable/component';

const todo = loadable(() => import('../pages/Todo'))

function Routes() {

    return (
        <Switch>
            <Route path="/todo" component={todo} exact/>
        </Switch>
    );
};

export default Routes;


