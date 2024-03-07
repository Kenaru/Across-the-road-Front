// theme.js

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#e3f2fd",
      100: "#bbdefb",
      // Add more shades of primary color if needed
      // ...
      900: "#0d47a1",
    },
    // Define other colors such as secondary, accent, etc.
    // ...
  },
  fonts: {
    body: "Roboto, sans-serif",
    heading: "Montserrat, sans-serif",
  },
  // Define other theme properties like breakpoints, spacing, etc.
  // ...
});

export default theme;
