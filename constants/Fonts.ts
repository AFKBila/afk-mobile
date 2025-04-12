type Props = {
  regular: string;
  sizes: {
    vs: number;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  weights: {
    normal: string;
    medium: string;
    semiBold: string;
    bold: string;
  };
};

export const Fonts: Props = {
  regular: "System",
  sizes: {
    vs: 9,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  weights: {
    normal: "400",
    medium: "500",
    semiBold: "600",
    bold: "700",
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
