import z from 'zod'

export const CountryImageSchema = z.object({
  id: z.string(),
  slug: z.string(),
  alternative_slugs: z.object({
    en: z.string(),
    es: z.string(),
    ja: z.string(),
    fr: z.string(),
    it: z.string(),
    ko: z.string(),
    de: z.string(),
    pt: z.string(),
    id: z.string()
  }),
  created_at: z.string(),
  updated_at: z.string(),
  promoted_at: z.null(),
  width: z.number(),
  height: z.number(),
  color: z.string(),
  blur_hash: z.string(),
  description: z.string(),
  alt_description: z.string(),
  breadcrumbs: z.array(z.unknown()),
  urls: z.object({
    raw: z.string(),
    full: z.string(),
    regular: z.string(),
    small: z.string(),
    thumb: z.string(),
    small_s3: z.string()
  }),
  links: z.object({
    self: z.string(),
    html: z.string(),
    download: z.string(),
    download_location: z.string()
  }),
  likes: z.number(),
  liked_by_user: z.boolean(),
  current_user_collections: z.array(z.unknown()),
  sponsorship: z.null(),
  topic_submissions: z.object({}),
  asset_type: z.string(),
  user: z.object({
    id: z.string(),
    updated_at: z.string(),
    username: z.string(),
    name: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    twitter_username: z.string(),
    portfolio_url: z.null(),
    bio: z.string(),
    location: z.string(),
    links: z.object({
      self: z.string(),
      html: z.string(),
      photos: z.string(),
      likes: z.string(),
      portfolio: z.string()
    }),
    profile_image: z.object({
      small: z.string(),
      medium: z.string(),
      large: z.string()
    }),
    instagram_username: z.string(),
    total_collections: z.number(),
    total_likes: z.number(),
    total_photos: z.number(),
    total_promoted_photos: z.number(),
    total_illustrations: z.number(),
    total_promoted_illustrations: z.number(),
    accepted_tos: z.boolean(),
    for_hire: z.boolean(),
    social: z.object({
      instagram_username: z.string(),
      portfolio_url: z.null(),
      twitter_username: z.string(),
      paypal_email: z.null()
    })
  })
})

export type CountryImage = z.infer<typeof CountryImageSchema>
