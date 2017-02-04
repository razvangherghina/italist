import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import './Thumbnails.css';

class Thumbnails extends React.Component {

    render() {
        return (
            <div className="gif-list">
                {this
                    .props[this.props.thType]
                    .map(image => (
                        <div key={image} className="gif-item">
                            <img className={this.props.thType} src={image} role="presentation"/>
                        </div>
                    ))}
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        t120: state.thumbnails.t120,
        t360: state.thumbnails.t360,
        thType: state.routing && state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.pathname === '/big'
            ? 't360'
            : 't120'
    };
}
Thumbnails.propTypes = {
    t120: PropTypes.arrayOf(PropTypes.string).isRequired,
    t360: PropTypes.arrayOf(PropTypes.string).isRequired,
    thType: PropTypes.string.isRequired
};
export default connect(mapStateToProps)(Thumbnails);
