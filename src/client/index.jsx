import React from 'react';
import moment from 'moment-timezone';
import { render } from 'react-dom';

import { unshiftArray, averageArray } from "./services/arrayServices";

import './css/styles.scss'

import { safeFetch, methods} from "./api/safeFetch";

import Column from './components/column.jsx';
import Row from './components/row.jsx';

class App extends React.Component {

    async componentDidMount() {
        const users = (await safeFetch('users', methods.get)).users;
        this.setState({
            users: users
        });
    }

    render () {
        if (this.state && this.state.users) {
            const localTimezone = moment.tz.guess();
            const nowLocally = moment.tz(localTimezone);
            const todayDay = nowLocally.get('days');
            const rows = [];
            for (const key in this.state.users) {
                const user = this.state.users[key];
                const lastUpdatedDateLocaly = moment.tz(user.lastUpdated, localTimezone);
                const lastUpdateDayLocally = lastUpdatedDateLocaly.get('days');
                const todayArrayIndex = todayDay - lastUpdateDayLocally;
                const todaysAvailability = user.availabilityArray[todayArrayIndex];
                const normalizedWeekDaysArrayIndex = (lastUpdateDayLocally + 6) % 7;
                const weekDaysAvailability = unshiftArray(user.availabilityArray, normalizedWeekDaysArrayIndex).splice(0, 5);
                const averageAvailability = Math.round(averageArray(weekDaysAvailability));

                rows.push(
                    <Row key={key} name={user.name} todaysAvailability={todaysAvailability} averageAvailability={averageAvailability}></Row>
                )
            }

            return (
                <div>
                    <Column columnType={'heute'}></Column>
                    <Column columnType={'wochen'}></Column>
                    <div className="rows_container">
                        {rows}
                    </div>
                </div>
            );
        }

        return (
            <div></div>
        );

    }
}

render(<App/>, document.getElementById('app'));