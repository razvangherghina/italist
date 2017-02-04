import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions';

class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">
                            Italist
                        </Link>
                    </div>
                    <ul className="nav navbar-nav navbar-left">
                        <li
                            className={`nav-item ${this.props.thType === '120'
                            ? 'active'
                            : ''}`}>
                            <Link className="nav-link" to="/">
                                120x120 Thumbnails
                            </Link>
                        </li>
                        <li
                            className={`nav-item ${this.props.thType === '360'
                            ? 'active'
                            : ''}`}>
                            <Link className="nav-link" to="/big">
                                360x360 Thumbnails
                            </Link>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item">
                            <button
                                onClick={() => !this.props.disabled
                                ? this.props.actions.upload()
                                : null}
                                type="button"
                                className={`btn ${this.props.disabled} btn-${this.props.color} navbar-btn`}>
                                {`Upload ${this.props.thType}x${this.props.thType}`}
                            </button>
                        </li>
                    </ul>

                </div>
            </nav>
        );
    }

}

Header.propTypes = {
    disabled: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    thType: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        disabled: state.thumbnails.uploading
            ? 'disabled'
            : '',
        color: state.thumbnails.uploading
            ? 'default'
            : (state.thumbnails.errorUpload
                ? 'danger'
                : 'success'),
        thType: state.routing && state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.pathname === '/big'
            ? '360'
            : '120'
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
