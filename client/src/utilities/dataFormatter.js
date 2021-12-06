export const dateISOToFR = (date) => {
    return new Date(date).toLocaleString("fr-FR").split(",")[0]
}