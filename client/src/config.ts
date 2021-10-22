/**
 * Application wide configuration.
 * The object are nested on basis of redux store
 */
const config = {
  baseURI: '/api', // http://localhost:5000/api since we config proxy = 5000
  endpoints: {
    auth: {
      login: '/users/login',
      createAccount: '/users/create-account',
      logout: '/users/logout',
      me: '/users/me',
      profile: '/users/profile',
    },
    users: {
      fetchMentors: '/users/mentors',
      fetchMentees: '/users/mentees',
      fetchRecommendedMentors: 'users/recommended-mentors',
    },
    profile: {
      fetchProfile: '/users',
      createProfile: '/users/create-profile',
    },
    mentorship: {
      sendMentorshipRequest: '/mentorships/apply',
      fetchMentorshipRequestsByStudent: '/mentorships/mentee-requests',
      fetchMentorshipRequestByStudent: '/mentorships/requests',
      fetchMentorshipRequestsOfMentor: '/mentorships/mentor-requests',
      fetchMentorshipRequestOfMentor: '/mentorships/requests',
      updateMentorshipRequestStatus: '/mentorships/update-status',
      createMentorshipResponse: '/mentorships/response',
    },
    room: {
      createRoom: '/room/create-room',
      joinRoom: '/room/join-room',
      getTURNCredentials: '/room/get-turn-credentials',
    },
  },
};

export default config;
