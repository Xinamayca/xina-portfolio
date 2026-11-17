// TERRA: the map pins shown in the brand row, with the staff dashboard's pin click interaction.
// Clicking a pin deselects the previous one (removes .selected and its pulse div), then selects the new pin
// and injects a .pin-pulse div into it, coloured by status, the same way the dashboard does it on top of Leaflet.
const pinDemo = document.querySelector(".ed-pins");

if (pinDemo) {
    // The dashboard's own pin SVGs (Figma exports), one per status
    const PIN_SHAPE = '<path d="M11,1A10.029,10.029,0,0,0,1,11c0,7,10,20,10,20S21,18,21,11A10.029,10.029,0,0,0,11,1Z" fill="FILL"/>';
    const PINS = {
        approved: {
            label: "approved",
            pulse: "#4caf50",
            svg: PIN_SHAPE.replace("FILL", "#2e4a2a") +
                '<path d="M8,11l2,2,4-4" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>',
        },
        pending: {
            label: "pending review",
            pulse: "#E6A817",
            svg: PIN_SHAPE.replace("FILL", "#e6a817") +
                '<circle cx="11" cy="11" r="5" fill="none" stroke="#fff" stroke-width="1.4"/>' +
                '<line x1="11" y1="7.5" x2="11" y2="11" stroke="#fff" stroke-linecap="round" stroke-width="1.4"/>' +
                '<line x1="11" y1="11" x2="13.5" y2="12.5" stroke="#fff" stroke-linecap="round" stroke-width="1.4"/>',
        },
        flagged: {
            label: "flagged",
            pulse: "#c0392b",
            svg: PIN_SHAPE.replace("FILL", "#c0392b") +
                '<text x="11" y="16" text-anchor="middle" fill="#fff" font-size="13" font-family="\'DM Sans\', sans-serif" font-weight="700">!</text>',
        },
    };

    const pins = [...pinDemo.querySelectorAll(".pin")];

    pins.forEach((pin) => {
        const type = PINS[pin.dataset.status];
        pin.innerHTML = `<svg viewBox="1 1 20 30" width="20" height="30" aria-hidden="true">${type.svg}</svg>`;

        pin.addEventListener("click", () => {
            const wasSelected = pin.classList.contains("selected");

            // 1. Deselect whatever was selected before
            pins.forEach((other) => {
                other.classList.remove("selected");
                other.setAttribute("aria-pressed", "false");
                other.querySelector(".pin-pulse")?.remove();
            });

            // Clicking the selected pin again just unselects it
            if (wasSelected) return;

            // 2. Select this pin and inject a pulse in its status colour
            pin.classList.add("selected");
            pin.setAttribute("aria-pressed", "true");
            const pulse = document.createElement("div");
            pulse.className = "pin-pulse";
            pulse.style.setProperty("--pulse", type.pulse);
            pin.prepend(pulse);
        });
    });
}
