import Typography from "typography"
const typography = new Typography({
  googleFonts: [
    {
      name: 'Source Code Pro',
      styles: [
        '400',
      ],
    },
  ],
})
export const { scale, rhythm, options } = typography
export default typography
