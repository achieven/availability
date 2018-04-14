import React from 'react';

class Column extends React.Component {

    propTypes: {
        columnType: React.propTypes.string,
        users: React.propTypes.object
    }

    constructor (props) {
         super(props);

    }

    render () {
        return (
            <div className={'column ' + this.props.columnType}>
                <div className="header">
                    {this.props.columnType}
                </div>
                {this.props.users}
            </div>
        );
    }

}

export default Column;