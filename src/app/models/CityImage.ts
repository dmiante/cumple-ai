import z from 'zod'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CityImageSchema = z.object({
  id: z.number(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
  photographer: z.string(),
  src: z.object({
    original: z.string(),
    large2x: z.string(),
    large: z.string(),
    medium: z.string(),
    small: z.string(),
    portrait: z.string(),
    landscape: z.string(),
    tiny: z.string()
  }),
  alt: z.string()
})

export type CityImage = z.infer<typeof CityImageSchema>
