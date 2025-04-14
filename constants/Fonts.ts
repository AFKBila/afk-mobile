export const Fonts = {
  primary: "GopherText",

  weights: {
    regular: "400",
    medium: "500",
    semiBold: "600",
    bold: "700",
  },

  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },

  // Helper function to get the correct font styling
  style: (size: number = 16, weight: string = "400") => {
    return {
      fontFamily: "GopherText",
      fontSize: size,
      fontWeight: weight,
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
