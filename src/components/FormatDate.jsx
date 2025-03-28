export const FormatDate = (utcDate) => {
    return new Date(utcDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
