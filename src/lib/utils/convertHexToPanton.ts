/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import * as simpleColorConverter from "simple-color-converter";

export default function generatePantoneColor(hexColor: string) {
  // Default Pantone Color Object
  let pantoneColorObject = {
    pantone: "Unknown",
    hex: "000000",
    distance: "16", // Default distance
  };

  if (hexColor) {
    try {
      // Convert Hex to Pantone
      const pantoneColor = new simpleColorConverter({
        hex6: hexColor,
        to: "pantone",
      });

      // If pantone color conversion is successful
      if (pantoneColor) {
        // Convert Pantone back to Hex for visual consistency
        const pantoneToHex = new simpleColorConverter({
          pantone: `pantone ${pantoneColor?.color}`,
          to: "hex6",
        });

        // Select a random distance (16, 32, 48, etc.)
        const distances = [16, 32, 48, 64, 80, 96];
        const selectedDistanceIndex = Math.floor(Math.random() * distances.length);

        // Set the Pantone Color Object with Hex and Pantone values
        pantoneColorObject = {
          pantone: pantoneColor?.color || "Unknown",
          hex: pantoneToHex?.color || "000000",
          distance: distances[selectedDistanceIndex].toString(),
        };
      }
    } catch (error) {
      console.error("Pantone color conversion error:", error);
    }
  }

  // Return Pantone Color Object
  return pantoneColorObject;
}
