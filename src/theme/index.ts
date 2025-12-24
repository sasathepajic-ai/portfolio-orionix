import { createTheme, rem, MantineColorsTuple } from "@mantine/core";

const brandPurple: MantineColorsTuple = [
  "#f3e8ff", // 0
  "#e9d5ff", // 1
  "#d8b4fe", // 2
  "#c084fc", // 3
  "#9333ea", // 4
  "#7e22ce", // 5
  "#6b21a8", // 6 - Primary
  "#581c87", // 7
  "#3b0764", // 8
  "#2e1065", // 9
];

const brandEmerald: MantineColorsTuple = [
  "#ecfdf5", // 0
  "#d1fae5", // 1
  "#a7f3d0", // 2
  "#6ee7b7", // 3
  "#34d399", // 4
  "#10b981", // 5
  "#10b981", // 6 - Primary (Updated to Laser Green)
  "#047857", // 7
  "#065f46", // 8
  "#064e3b", // 9
];

export const buttonGradient =
  "linear-gradient(105deg, var(--mantine-color-brandPurple-9) 0%, var(--mantine-color-brandEmerald-9) 100%)";
export const textGradient =
  "linear-gradient(105deg, var(--mantine-color-brandPurple-6) 0%, var(--mantine-color-brandEmerald-6) 100%)";

export const theme = createTheme({
  primaryColor: "brandEmerald",
  colors: {
    brandPurple,
    brandEmerald,
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5C5F66",
      "#373A40",
      "#2C2E33",
      "#25262B",
      "#1A1B1E",
      "#141517",
      "#101113",
    ],
  },
  fontFamily: "Inter, sans-serif",
  headings: {
    fontFamily: "Space Grotesk, sans-serif",
    sizes: {
      h1: { fontSize: rem(64), lineHeight: "1.1" },
      h2: { fontSize: rem(48), lineHeight: "1.2" },
      h3: { fontSize: rem(32), lineHeight: "1.3" },
      h4: { fontSize: rem(24), lineHeight: "1.4" },
    },
  },
  components: {
    Button: {
      defaultProps: {
        size: "md",
        radius: "md",
      },
      styles: {
        root: {
          fontWeight: 600,
        },
      },
    },
    Container: {
      defaultProps: {
        size: "xl",
      },
    },
    Card: {
      defaultProps: {
        radius: "lg",
      },
    },
  },
  other: {
    gradients: {
      primary: "linear-gradient(135deg, #4338ca 0%, #10b981 100%)",
    },
  },
});
