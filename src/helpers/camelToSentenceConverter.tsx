export function camelToSentenceConverter (keyValue: string) {
    let changeCase = keyValue.replace(/([A-Z\d])/g, " $1");
    return changeCase.charAt(0).toUpperCase() + changeCase.slice(1);
};