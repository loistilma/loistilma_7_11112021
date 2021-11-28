export const dateISOToFR = (date) => {
    return new Date(date).toLocaleString("fr-FR").replace(",", " à")
}

export const nameToInitials = (name) => {
    let initials = name.split(' ');

    if (initials.length > 1) {
        initials = initials.shift().charAt(0) + initials.pop().charAt(0);
    } else {
        initials = name.substring(0, 2);
    }

    return initials.toUpperCase()
}