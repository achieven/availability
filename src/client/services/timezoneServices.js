import { averageArray, unshiftArray } from "./arrayServices";
import moment from "moment-timezone";

const weekLength = 7;

export function calculateUserAvailability (lastUpdatedTime, availabilityArray, localTimezone, todayDay) {
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