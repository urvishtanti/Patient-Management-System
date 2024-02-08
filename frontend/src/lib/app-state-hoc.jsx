import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, compose, createStore } from 'redux';
import ConnectedIntlProvider from './connected-intl-provider.jsx';

import localesReducer, { localesInitialState } from '../store/reducers/locales';
import store from "../store/store";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/*
 * Higher Order Component to provide redux state. If an `intl` prop is provided
 * it will override the internal `intl` redux state
 * @param {React.Component} WrappedComponent - component to provide state for
 * @param {boolean} localesOnly - only provide the locale state, not everything
 *                      required by the GUI. Used to exclude excess state when
                        only rendering modals, not the GUI.
 * @returns {React.Component} component with redux and intl state provided
 */
const AppStateHOC = function (WrappedComponent, localesOnly) {
    class AppStateWrapper extends React.Component {
        constructor (props) {
            super(props);

            if (localesOnly) {
                // Used for instantiating minimal state for the unsupported
                // browser modal
                let reducers = {locales: localesReducer};
                let initialState = {locales: localesInitialState};
                let enhancer = composeEnhancers();
                const reducer = combineReducers(reducers);
                this.store = createStore(
                    reducer,
                    initialState,
                    enhancer
                );
            } else {
                this.store = store;
            }
        }
        componentDidUpdate (prevProps) {
            if (localesOnly) return;
        }
        render () {
            return (
                <Provider store={this.store}>
                    <ConnectedIntlProvider>
                        <WrappedComponent
                            {...this.props}
                        />
                    </ConnectedIntlProvider>
                </Provider>
            );
        }
    }
    return AppStateWrapper;
};

export default AppStateHOC;
