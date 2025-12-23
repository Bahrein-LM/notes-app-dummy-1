// this file is to handle any utility like format date function for specific or any other specific task function

export function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}