export const GetStatusClass = (status) => {
    switch (status) {
        case "published":
            return "bg-success"; // Green
        case "rejected":
            return "bg-danger"; // Red
        case "inProgress":
            return "bg-warning"; // Blue
        case "pending":
            return "bg-warning"; // Yellow
        case "approved":
            return "bg-success"; // Green
        case "journalist":
            return "bg-info"; // Green
        case "reader":
            return "bg-success"; // Green
        case "citizen journalist":
            return "bg-warning"; // Green
        default:
            return "bg-secondary"; // Gray for unknown statuses
    }
};