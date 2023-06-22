
export function formatSpots(spots) {
    return spots === 0
        ? "no spots remaining"
        : spots === 1
            ? "1 spot remaining"
            : `${spots} spots remaining`;
}