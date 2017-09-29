import React, { Component } from 'react';

class NoMatch extends Component {
    render() {
        return (
            <section className="mainContent">
             <div className="no-match">
                 <span>404</span>
                 <p>Page not found</p>
                 </div>
            </section>
        )
    }
}

export default NoMatch