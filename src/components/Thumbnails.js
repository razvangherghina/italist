import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class Thumbnails extends React.Component {

    render() {
        return this.props.message
            ? <h3>{this.props.message}</h3>
            : (
                <div className="row">
                    {this
                        .props[this.props.thType]
                        .map(image => (
                            <div key={image} className="col-sm-6 col-md-4">
                                <img className="thumbnail" src={image} role="presentation"/>
                            </div>
                        ))}
                </div>
            );
    };
}

Thumbnails.propTypes = {
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
        t120: state.thumbnails.t120,
        t360: state.thumbnails.t360,
        thType: state.routing && state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.pathname === '/big'
            ? 't360'
            : 't120'
    };
}

export default connect(mapStateToProps)(Thumbnails);
