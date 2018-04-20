import { averageArray, unshiftArray } from "./arrayServices";
import moment from "moment-timezone";

export function calculateUserAvailability (lastUpdatedTime, availabilityArray, localTimezone, todayDay) {
    const lastUpdatedDateLocaly = moment.tz(lastUpdatedTime, localTimezone);
    const lastUpdateDayLocally = lastUpdatedDateLocaly.get('days');
    const todayArrayIndex = (todayDay - lastUpdateDayLocally + 7) % 7;
    const todaysAvailability = availabilityArray[todayArrayIndex];
    const normalizedWeekDaysArrayIndex = (lastUpdateDayLocally + 6) % 7;
    const weekDaysAvailability = unshiftArray(availabilityArray, normalizedWeekDaysArrayIndex).splice(0, 5);
    const averageAvailability = averageArray(weekDaysAvailability);

    return {
        todaysAvailability: todaysAvailability,
        averageAvailability: averageAvailability
    }
}