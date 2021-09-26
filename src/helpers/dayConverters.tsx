
export function dayConverterNumToString(value: number) {
    let dayString
    switch (+value) {
        case 1:
            dayString = "Sunday";
            break;
        case 2:
            dayString = "Monday";
            break;
        case 3:
            dayString = "Tuesday";
            break;
        case 4:
            dayString = "Wednesday";
            break;
        case 5:
            dayString = "Thursday";
            break;
        case 6:
            dayString = "Friday";
            break;
        case 7:
            dayString = "Saturday";
            break;
        default: dayString = "No Date Assigned"
    }
    return dayString
}

export function dayConverterStringToNum(value: string) {
    let dayNum
    switch (value) {
        case "Sunday":
            dayNum = 1;
            break;
        case "Monday":
            dayNum = 2;
            break;
        case "Tuesday":
            dayNum = 3;
            break;
        case "Wednesday":
            dayNum = 4;
            break;
        case "Thursday":
            dayNum = 5;
            break;
        case "Friday":
            dayNum = 6;
            break;
        case "Saturday":
            dayNum = 7;
            break;
        default: dayNum = "No Date Assigned"
    }
    return dayNum
}