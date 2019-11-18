import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header>
                <div id="header_bar">
                    <a href="/">
                        Reset
                    </a>{' '}
                    |{' '}
                    <a
                        href="https://www.geektrust.in/"
                        target="_blank"
                        rel="noopener noreferrer">
                        Geek Trust Home
                    </a>
                </div>
                <h1>Finding Falcone</h1>
            </header>
        );
    }
}

export default Header;
