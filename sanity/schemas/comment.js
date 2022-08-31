export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'profileImg',
      title: 'Profile Image',
      type: 'string',
    },
    {
      name:"tweet",
      title:'Tweet',
      description: 'Comments which are here that reference to the tweet posted',
      type: "reference",
      to: {
        type: 'tweet'
      }
    }
  ],
}
