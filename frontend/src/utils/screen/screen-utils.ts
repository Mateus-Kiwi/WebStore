const laptop = 1023

export function isMobile(): boolean {
    return window.innerWidth <= laptop
}