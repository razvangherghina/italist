import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class Thumbnails extends React.Component {

    render() {
        return this.props.message
            ? <h3>{this.props.message}</h3>
            : (
                <div className="row">
                   <div className="col-xs-12 text-center">
                    <h3>{this.props.uploadMessage}</h3>
                    </div>
                    {this
                        .props[this.props.thType]
                        .map(image => (
                            <div
                                key={Math
                                .random()
                                .toString(36)
                                .substring(5, 15)}
                                className="col-sm-6 col-md-3">
                                <img className="thumbnail" src={image} role="presentation"/>
                            </div>
                        ))}
                </div>
            );
    };
}

Thumbnails.propTypes = {
    message: PropTypes.string,
    uploadMessage: PropTypes.string,
    t120: PropTypes
        .arrayOf(PropTypes.string)
        .isRequired,
    t360: PropTypes
        .arrayOf(PropTypes.string)
        .isRequired,
    thType: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        message: state.thumbnails.fetching
            ? 'Fetching'
            : state.thumbnails.error
                ? 'Error: ' + (state.thumbnails.error && state.thumbnails.error.message) || ''
                : '',
        uploadMessage: state.thumbnails.uploading
            ? 'Uploading image'
            : state.thumbnails.errorUpload
                ? 'Error: ' + state.thumbnails.errorUpload || ''
                : '',
        t120: state.thumbnails.t120,
        t360: state.thumbnails.t360,
        thType: state.routing && state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.pathname === '/big'
            ? 't360'
            : 't120'
    };
}

export default connect(mapStateToProps)(Thumbnails);
