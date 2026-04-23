/**
 * Global Election Data
 * Embedded directly to avoid CORS issues when running locally.
 */
window.ELECTION_DATA = {
  "voter": [
    {
      "id": 1,
      "title": "Register to Vote",
      "description": "Submit your registration form to the local election office or online portal to ensure your eligibility.",
      "deadline": "10 days before election",
      "missed": "You cannot vote in this election",
      "nextAction": "Wait for the next election cycle to register."
    },
    {
      "id": 2,
      "title": "Receive Poll Card",
      "description": "A poll card will be sent to your registered address with details of your assigned polling station.",
      "deadline": "5 days before election",
      "missed": "Check your polling station online",
      "nextAction": "Use the official online portal with your national ID to find your polling location."
    },
    {
      "id": 3,
      "title": "Cast Your Vote",
      "description": "Visit your assigned polling station on election day and cast your vote using your secret ballot.",
      "deadline": "Election Day (8 AM - 8 PM)",
      "missed": "Your voice will not be heard",
      "nextAction": "Monitor the results and prepare for future local advocacy."
    },
    {
      "id": 4,
      "title": "View Results",
      "description": "Monitor the official tallying process and view the declared winners of the election.",
      "deadline": "24 hours after polls close",
      "missed": "Delayed awareness of winners",
      "nextAction": "Check official government publications for the final gazetted results."
    }
  ],
  "candidate": [
    {
      "id": 1,
      "title": "File Nomination",
      "description": "Submit your nomination papers with the required number of supporting signatures and the security deposit.",
      "deadline": "30 days before election",
      "missed": "Cannot contest in this election",
      "nextAction": "Focus on community building and prepare for the next election cycle."
    },
    {
      "id": 2,
      "title": "Launch Campaign",
      "description": "Release your manifesto, conduct rallies, and engage with voters to communicate your vision.",
      "deadline": "Ends 48h before election",
      "missed": "Low voter awareness",
      "nextAction": "Leverage organic social media and grassroots word-of-mouth."
    },
    {
      "id": 3,
      "title": "Election Day Oversight",
      "description": "Deploy polling agents to monitor the voting process and ensure fairness at all stations.",
      "deadline": "Election Day",
      "missed": "Process integrity risks",
      "nextAction": "Rely on official observers and report any discrepancies after the fact."
    }
  ],
  "officer": [
    {
      "id": 1,
      "title": "Set Up Polling Stations",
      "description": "Identify, secure, and prepare physical locations to serve as polling stations for the community.",
      "deadline": "15 days before election",
      "missed": "Delay in voting process",
      "nextAction": "Implement emergency backup locations (schools/tents) immediately."
    },
    {
      "id": 2,
      "title": "Train Staff",
      "description": "Conduct training sessions for presiding officers and polling clerks on voting procedures.",
      "deadline": "7 days before election",
      "missed": "Operational errors on day-of",
      "nextAction": "Provide simplified digital guides and on-call support for all staff."
    },
    {
      "id": 3,
      "title": "Verify Ballots",
      "description": "Oversee the secure transport and counting of ballot boxes to ensure an accurate tally.",
      "deadline": "Immediately after polls close",
      "missed": "Delayed result declaration",
      "nextAction": "Request additional security and counting personnel to expedite the process."
    }
  ]
};

