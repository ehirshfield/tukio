import React from 'react';
import { connect } from 'react-redux';

export default function (AuthorizedComponent) {
    class Authorize extends React.Component {
        componentWillMount() {
            if (!this.props.isAuthenticated) {
                this.context.router.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this.context.router.push('/');
            }
        }
        render() {
            return (
                <AuthorizedComponent {...this.props } />
            )
        }
    }

    Authorize.propTypes = {
        isAuthenticated: React.PropTypes.bool.isRequired
    }

    Authorize.contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    }

    return connect(mapStateToProps)(Authorize);
}