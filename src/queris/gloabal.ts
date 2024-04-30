import qs from 'qs'

export const globalquery = qs.stringify({
  populate: [
    'header.logoText',
    'header.ctaButton',
    'footer.logoText',
    'footer.socialLinks',
  ],
})

export const getMetadataQuery = qs.stringify({
  fields: ['title', 'description'],
})
