export const Fonts = {
  // Font families
  primary: "GopherText",
  light: "GopherText-Light",
  lightItalic: "GopherText-LightItalic",
  medium: "GopherText-Medium",
  mediumItalic: "GopherText-MediumItalic",
  regular: "GopherText-Regular",
  regularItalic: "GopherText-RegularItalic",
  thin: "GopherText-Thin",
  thinItalic: "GopherText-ThinItalic",

  weights: {
    regular: "400",
    medium: "500",
    semiBold: "600",
    bold: "700",
  },

  sizes: {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },

  // Helper function to get the correct font styling
  style: (
    size: number = 16,
    weight: string = "regular",
    isItalic: boolean = false
  ) => {
    let fontFamily = "GopherText";

    if (weight === "400" || weight === "regular") {
      fontFamily = isItalic ? "GopherText-RegularItalic" : "GopherText-Regular";
    } else if (weight === "500" || weight === "medium") {
      fontFamily = isItalic ? "GopherText-MediumItalic" : "GopherText-Medium";
    } else if (weight === "300" || weight === "light") {
      fontFamily = isItalic ? "GopherText-LightItalic" : "GopherText-Light";
    } else if (weight === "200" || weight === "thin") {
      fontFamily = isItalic ? "GopherText-ThinItalic" : "GopherText-Thin";
    }

    return {
      fontFamily,
      fontSize: size,
    };
  },
};

// import { Fonts } from '@/constants/Fonts';

// // In your styles
// const styles = StyleSheet.create({
//   title: {
//     fontFamily: Fonts.regular,
//     fontSize: Fonts.sizes.xl,
//     fontWeight: Fonts.weights.bold,
//   },
//   bodyText: {
//     fontFamily: Fonts.regular,
//     fontSize: Fonts.sizes.md,
//     fontWeight: Fonts.weights.normal,
//   }
// });
