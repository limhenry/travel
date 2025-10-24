export default defineAppConfig({
  ui: {
    colors: {
      primary: 'sky',
      neutral: 'zinc'
    },
    pageCard: {
      slots: {
        description: 'text-3xl font-semibold'
      },
      variants: {
        variant: {
          outline: {
            title: 'text-muted',
            description: 'text-highlighted'
          }
        }
      }
    }
  }
})
