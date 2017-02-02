import React from 'react';
import {Link} from 'react-router';

const Header = () => (
    <nav className="navbar navbar-default">
        <div className="container-fluid">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/">
                    Italist
                </Link>
            </div>
            <ul className="nav navbar-nav navbar-right">
                <li className="nav-item" key={1}>
                    <Link className="nav-link" to="/">
                        120x120 Thumbnails
                    </Link>
                </li>,
                <li className="nav-item" key={2}>
                    <Link className="nav-link" to="/big">
                        360x360 Thumbnails
                    </Link>
                </li>,
            </ul>
        </div>
    </nav>
);

export default Header;
