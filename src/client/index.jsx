import React from 'react';
import moment from 'moment-timezone';
import { render } from 'react-dom';

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
            const rows = [];
            for (const key in this.state.users) {
                const user = this.state.users[key];
                const localTimezone = moment.tz.guess();
                const lastUpdatedDateLocaly = moment.tz(user.lastUpdated, localTimezone);
                const lastUpdateDayLocally = lastUpdatedDateLocaly.get('days');
                const nowLocally = moment.tz(localTimezone);
                const todayDay = nowLocally.get('days');
                const arrayIndex = todayDay - lastUpdateDayLocally - 1;
                const todaysAvailability = user.availabilityArray[arrayIndex];
                rows.push(
                    <Row key={key} name={user.name} todaysAvailability={todaysAvailability} averageAvailability={0}></Row>
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