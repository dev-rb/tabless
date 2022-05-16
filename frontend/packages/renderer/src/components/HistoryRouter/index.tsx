import * as React from 'react';
import { History } from 'history';
import { HistoryRouterProps, Router } from 'react-router-dom';

export interface BrowserRouterProps extends Omit<HistoryRouterProps, "window"> {
    history: History;
}

const HistoryRouter = (props: BrowserRouterProps) => {
    const { history, ...restProps } = props;
    const [state, setState] = React.useState({
        action: history.action,
        location: history.location,
    });

    React.useLayoutEffect(() => history.listen(setState), [history]);
    return (
        <Router {...restProps} location={state.location} navigationType={state.action} navigator={history} />
    );
}

export default HistoryRouter;