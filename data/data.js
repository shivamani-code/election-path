/**
 * Global Election Data
 * Embedded directly to avoid CORS issues when running locally.
 */
window.ELECTION_DATA = {
  "voter": [
    {
      "id": 1,
      "title": "Register to Vote",
      "description": "Submit your registration form to the local election office or online portal.",
      "deadline": "10 days before election",
      "missed": "You cannot vote in this election",
      "nextAction": "Wait for the next election cycle to register."
    },
    {
      "id": 2,
      "title": "Receive Poll Card",
      "description": "A poll card will be sent to your registered address with details of your polling station.",
      "deadline": "5 days before election",
      "missed": "Check your polling station online",
      "nextAction": "Use the online portal with your ID to find your polling location."
    }
  ],
  "candidate": [
    {
      "id": 1,
      "title": "File Nomination",
      "description": "Submit your nomination papers with the required signatures and deposit.",
      "deadline": "30 days before election",
      "missed": "Cannot contest in this election",
      "nextAction": "Prepare early for the next election cycle."
    }
  ],
  "officer": [
    {
      "id": 1,
      "title": "Set Up Polling Stations",
      "description": "Identify and prepare locations for polling stations.",
      "deadline": "15 days before election",
      "missed": "Delay in voting process",
      "nextAction": "Implement emergency backup locations immediately."
    }
  ]
};

