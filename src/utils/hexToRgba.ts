/**
 * Function that converts a hexadecimal color to RGBA
 * @param {string} hex - The hexadecimal color to be converted
 * @param {number} [opacity=1] - The opacity value (default is 1)
 * @returns {string|null} - The RGBA color or null if the hexadecimal color is invalid
 */
const hexToRgba = (hex: string, opacity?: number): string | null => {
    const convertedOpacity = typeof opacity === "number" ? opacity / 100 : 1;
    const rgbaColor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (rgbaColor) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, red, green, blue] = rgbaColor;

        return `rgba(${parseInt(red, 16)},${parseInt(green, 16)},${parseInt(blue, 16)},${
            convertedOpacity ?? 1
        })`;
    }

    return null;
};

export { hexToRgba };
