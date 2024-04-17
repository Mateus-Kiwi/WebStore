const laptop = 1024;
let starterIsMobile: boolean = isMobile();

export function isMobile(): boolean {
  return window.innerWidth < laptop;
}

export function refreshScreenSize(): void {
  let currentIsMobile = isMobile();

  if (currentIsMobile !== starterIsMobile) {
    starterIsMobile = currentIsMobile;
    location.reload();
  }
}

window.addEventListener('resize', refreshScreenSize);
