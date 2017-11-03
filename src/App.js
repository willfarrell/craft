import React, { Component } from 'react';
import PropTypes from 'prop-types';

// theme
import { MuiThemeProvider, withStyles } from 'material-ui/styles';
import theme from './theme';

// i18n
import { IntlProvider } from 'react-intl';
import initLocale  from 'react-intl-locale';

// routing
import { HashRouter as Router } from 'react-router-dom';
import Routes from './Routes';

// Components
import Header from './containers/Header';
import Footer from './containers/Footer';

// Set locale
const defaultLocale = 'en-CA';
const locale = initLocale(defaultLocale, []);
const messages = require('./data/i18n/en-CA.global.json');

const styles = (theme) => ({
    // Be sure to include defaults listed here if planning to override
    // https://github.com/callemall/material-ui/blob/v1-beta/docs/src/modules/components/AppFrame.js
    '@global': {
        'html': {
            'background': theme.palette.background.default,
            'WebkitFontSmoothing': 'antialiased', // Antialiasing.
            'MozOsxFontSmoothing': 'grayscale', // Antialiasing.
            'boxSizing': 'border-box',
            '@media print': {
                background: theme.palette.common.white
            },
            // override
            //'fontSize': '62.5%',
            'scrollBehavior': 'smooth',
            'fontFamily': theme.typography.fontFamily
        },
        'body': {
            margin: 0,
            // override
            padding: 0,
        },
        // allows for sticky footer
        '#root': {
            minHeight: '100vh',
            position: 'relative '
        }
    },
    "root": {
        paddingBottom: '15.0rem'   // max height of footer w/ padding
    }
});

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isAuthenticated: false
        };
    }

    render () {
        const { locale, isAuthenticated } = this.state;
        const { classes } = this.props;

        const childProps = { isAuthenticated, locale };

        return (
            <MuiThemeProvider theme={theme}>
                <IntlProvider
                    locale={locale}
                    messages={messages}
                >
                    <Router className={classes.root}>
                        <div>
                            <Header/>
                            <Routes childProps={childProps}/>
                            <Footer/>
                        </div>
                    </Router>
                </IntlProvider>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
