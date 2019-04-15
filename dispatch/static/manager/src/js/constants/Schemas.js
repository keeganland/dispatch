import { Schema, arrayOf } from 'normalizr'

export const sectionSchema = new Schema('sections')
export const personSchema = new Schema('persons')
export const topicSchema = new Schema('topics')
export const tagSchema = new Schema('tags')
export const imageSchema = new Schema('images')
export const articleSchema = new Schema('articles')
export const pageSchema = new Schema('pages')
export const templateSchema = new Schema('templates')
export const fileSchema = new Schema('files')
export const issueSchema = new Schema('issues')
export const gallerySchema = new Schema('galleries')
export const zoneSchema = new Schema('zones')
export const widgetSchema = new Schema('widgets')
export const eventSchema = new Schema('events')
export const userSchema = new Schema('users')
export const videoSchema = new Schema('videos')
export const inviteSchema = new Schema('invites')
export const pollSchema = new Schema('polls')
export const subsectionSchema = new Schema('subsections')
export const podcastSchema = new Schema('podcasts')
export const podcastEpisodeSchema = new Schema('podcastEpisodes')
export const notificationSchema = new Schema('notifications')
export const subscriptionSchema = new Schema('subscriptions')

articleSchema.define({
  section: sectionSchema,
  authors: arrayOf({
    person: personSchema
  }),
  tags: arrayOf(tagSchema),
  subsection: subsectionSchema,
  topic: topicSchema,
  template: templateSchema,
  featured_image: {
    image: imageSchema,
  },
  featured_video: {
    video: videoSchema,
  }
})

subsectionSchema.define({
  authors: arrayOf({
    person: personSchema
  })
})

pageSchema.define({
  template: templateSchema,
  featured_image: {
    image: imageSchema,
  },
  featured_video: {
    video: videoSchema,
  }
})

imageSchema.define({
  authors: arrayOf({
    person: personSchema
  }),
  tags: arrayOf(tagSchema),
})

zoneSchema.define({
  widget: widgetSchema
})

userSchema.define({
  person: personSchema
})

podcastSchema.define({
  image: imageSchema,
})

podcastEpisodeSchema.define({
  image: imageSchema,
})
