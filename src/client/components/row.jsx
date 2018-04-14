import React from 'react';

import { colorsMapping} from "../services/colorsMapping";

class Row extends React.Component {

    propTypes: {
        name                : React.propTypes.string,
        todaysAvailability  : React.propTypes.number,
        averageAvailability : React.propTypes.number
    }

    constructor(props) {
        super(props);
    }


    render() {
        return (
                <div className="row">
                    <div className="todays_availability L">
                        <div className={'circle ' + colorsMapping[this.props.todaysAvailability]}>
                            <div className="availability">
                                {this.props.todaysAvailability}
                            </div>
                        </div>
                    </div>
                    <div className="centralize_horizontaly_vertically name_container L">
                        {this.props.name}
                    </div>
                    <div className="average_availability L">
                        <div className={'circle ' + colorsMapping[this.props.averageAvailability]}>
                            <div className="availability">
                                {this.props.averageAvailability}
                            </div>
                        </div>
                    </div>
                </div>
        );
    }

}

export default Row;