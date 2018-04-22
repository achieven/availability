const moment = require('moment-timezone');

const weekLength = 7;

function unshiftArray (array, offset) {
    let arrayCopy = array.slice();
    for (let i = 0; i < offset; i++) {
        const lastElement = arrayCopy.pop();
        arrayCopy.unshift(lastElement);
    }

    return arrayCopy;
}

function averageArray (array) {
    if (0 === array.length) {
        return 0;
    }
    const sum = array.reduce(
        (elem1, elem2) => {
            return elem1 + elem2
        }
        , 0
    );

    return sum / array.length;
}

function calculateUserAvailability (lastUpdatedTime, availabilityArray, localTimezone, todayDay) {
    const lastUpdatedDateLocaly = moment.tz(lastUpdatedTime, localTimezone);
    const lastUpdateDayLocally = lastUpdatedDateLocaly.get('days');
    const todayArrayIndex = (todayDay - lastUpdateDayLocally + weekLength) % weekLength;
    const availabilityStartingToday = unshiftArray(availabilityArray, weekLength - todayArrayIndex);
    const todaysAvailability = availabilityStartingToday[0];
    const averageWeekDaysAvailability = availabilityStartingToday.filter(
        (availability, index) => {
            const isWeekDay = [1, 2, 3, 4, 5].includes((index + todayDay) % 7);
            const isWithinKnownRange = lastUpdateDayLocally === todayDay || (lastUpdateDayLocally - todayDay + 7) % 7 > index;
            return isWeekDay && isWithinKnownRange;
        }
    );

    const averageAvailability = averageArray(averageWeekDaysAvailability);

    return {
        todaysAvailability: todaysAvailability,
        averageAvailability: averageAvailability
    }
}

it('should shift the array 6 times, when timezone changes date to one week earlier', () => {
    const localTimezone = 'America/New_York';
    const mondayBod = {year: 2018, month: 3, date: 16, hour: 0, minute: 0, second: 0, millisecond: 0};
    const dateNow = moment().set(mondayBod);
    const nowLocally = moment.tz(dateNow, localTimezone);
    const todayDay = nowLocally.get('days');

    const lastUpdatedTime = dateNow.valueOf();
    const availabilityArray = [1, 2, 3, 4, 5 ,6, 7];

    const basicAvailability = calculateUserAvailability(lastUpdatedTime, availabilityArray, localTimezone, todayDay);
    expect(basicAvailability.todaysAvailability).toEqual(1);
    expect(basicAvailability.averageAvailability).toEqual(4);
});

it('should not shift the array at all, when timezone changes date to one week later', () => {
    const localTimezone = 'Asia/Tokyo';
    const sundayEod = {year: 2018, month: 3, date: 22, hour: 23, minute: 59, second: 59, millisecond: 999};
    const dateNow = moment().set(sundayEod);
    const nowLocally = moment.tz(dateNow, localTimezone);
    const todayDay = nowLocally.get('days');

    const lastUpdatedTime = dateNow.valueOf();
    const availabilityArray = [1, 2, 3, 4, 5 ,6, 7];

    const basicAvailability = calculateUserAvailability(lastUpdatedTime, availabilityArray, localTimezone, todayDay);
    expect(basicAvailability.todaysAvailability).toEqual(1);
    expect(basicAvailability.averageAvailability).toEqual(3);
});

it('should shift the array by (today minus lastUpdatedDay) when today day is earlier than last updated day and ignore weekends', () => {
    const localTimezone = 'Etc/UTC';
    const mondayBod = {year: 2018, month: 3, date: 16, hour: 0, minute: 0, second: 0, millisecond: 0};
    const dateNow = moment().set(mondayBod);
    const nowLocally = moment.tz(dateNow, localTimezone);
    const todayDay = nowLocally.get('days');

    const lastUpdatedTime = moment(dateNow).subtract(1, 'days').valueOf();
    const availabilityArray = [1, 2, 3, 4, 5 ,6, 7];

    const basicAvailability = calculateUserAvailability(lastUpdatedTime, availabilityArray, localTimezone, todayDay);
    expect(basicAvailability.todaysAvailability).toEqual(2);
    expect(basicAvailability.averageAvailability).toEqual(4);

});

it('should shift the array by (7 minus (today minus lastUpdatedDay)) when today day is later than last updated day and ignore weekends', () => {
    const localTimezone = 'Etc/UTC';
    const dateNow = moment().set({year: 2018, month: 3, date: 22, hour: 23, minute: 59, second: 59, millisecond: 999});
    const nowLocally = moment.tz(dateNow, localTimezone);
    const todayDay = nowLocally.get('days');

    const lastUpdatedTime = moment(dateNow).add(1, 'days').valueOf();
    const availabilityArray = [1, 2, 3, 4, 5 ,6, 7];

    const basicAvailability = calculateUserAvailability(lastUpdatedTime, availabilityArray, localTimezone, todayDay);
    expect(basicAvailability.todaysAvailability).toEqual(7);
    expect(basicAvailability.averageAvailability).toEqual(0);
});

