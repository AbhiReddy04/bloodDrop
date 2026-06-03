export const mockDonors = [
  {
    id: 'donor1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 9876543210',
    age: 28,
    bloodGroup: 'O+',
    country: 'India',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    town: 'Narasaraopet',
    address: 'MIG-45, Housing Board Colony, Narasaraopet',
    isActive: true,
    isDonor: true,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    lastDonation: '2024-08-15',
    registeredAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'donor2',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 9876543211',
    age: 25,
    bloodGroup: 'A+',
    country: 'India',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    town: 'Guntur City',
    address: 'Flat 203, Green Valley Apartments, Guntur',
    isActive: true,
    isDonor: true,
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=200&h=200&fit=crop&crop=face',
    lastDonation: '2024-09-10',
    registeredAt: '2024-02-20T14:30:00Z'
  },
  {
    id: 'donor3',
    name: 'Vikram Reddy',
    email: 'vikram.reddy@email.com',
    phone: '+91 9876543212',
    age: 32,
    bloodGroup: 'B+',
    country: 'India',
    state: 'Andhra Pradesh',
    district: 'Krishna',
    town: 'Vijayawada',
    address: 'H.No: 12-34-567, Labbipet, Vijayawada',
    isActive: false,
    isDonor: true,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    lastDonation: '2024-07-20',
    registeredAt: '2024-01-10T09:15:00Z'
  },
  {
    id: 'donor4',
    name: 'Kavya Patel',
    email: 'kavya.patel@email.com',
    phone: '+91 9876543213',
    age: 29,
    bloodGroup: 'AB+',
    country: 'India',
    state: 'Telangana',
    district: 'Hyderabad',
    town: 'Hyderabad',
    address: '8-2-293/82/A/765, Road No. 45, Jubilee Hills, Hyderabad',
    isActive: true,
    isDonor: true,
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    lastDonation: '2024-06-05',
    registeredAt: '2024-03-05T16:45:00Z'
  },
  {
    id: 'donor5',
    name: 'Arjun Singh',
    email: 'arjun.singh@email.com',
    phone: '+91 9876543214',
    age: 26,
    bloodGroup: 'O-',
    country: 'India',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    town: 'Visakhapatnam',
    address: 'Door No: 47-11-28, MVP Colony, Visakhapatnam',
    isActive: true,
    isDonor: true,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    lastDonation: '2024-08-30',
    registeredAt: '2024-02-28T11:20:00Z'
  },
  {
    id: 'donor6',
    name: 'Meera Rao',
    email: 'meera.rao@email.com',
    phone: '+91 9876543215',
    age: 31,
    bloodGroup: 'A-',
    country: 'India',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    town: 'Tenali',
    address: 'Plot No: 156, Srinivasa Nagar, Tenali',
    isActive: true,
    isDonor: true,
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face',
    lastDonation: '2024-09-15',
    registeredAt: '2024-01-25T13:10:00Z'
  }
];

export const mockStories = [
  {
    id: 'story1',
    title: 'A Second Chance at Life',
    category: 'Recipient Story',
    author: 'Anonymous Recipient',
    date: '2024-11-15',
    readTime: '3 min read',
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    excerpt: 'How a timely blood donation saved my life during a critical emergency surgery...',
    content: `
      I never thought I would be in a situation where someone else's generosity would literally save my life. But that's exactly what happened during what was supposed to be a routine surgery.

      During the procedure, complications arose that no one had anticipated. I was losing blood rapidly, and the surgical team needed immediate access to O-negative blood - the universal donor type that could help anyone.

      Thanks to donors like those in our community, the blood bank had the supply they needed. Within minutes, I was receiving life-saving transfusions that allowed the doctors to stabilize me and complete the surgery successfully.

      Today, I'm healthy and back to living my normal life. Every day I'm reminded that someone's selfless act of donating blood gave me a second chance. That's why I'm now a regular donor myself - because I understand firsthand how powerful this simple act of kindness can be.

      To anyone considering becoming a blood donor: please do it. You never know whose life you might save.
    `,
    tags: ['Emergency', 'Surgery', 'O-negative', 'Life-saving']
  },
  {
    id: 'story2',
    title: 'Why I Donate Every 8 Weeks',
    category: 'Donor Story',
    author: 'Rajesh Kumar',
    date: '2024-11-10',
    readTime: '4 min read',
    thumbnail: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop',
    excerpt: 'My journey from being afraid of needles to becoming a regular blood donor...',
    content: `
      I'll be honest - I used to be terrified of needles. The thought of voluntarily getting poked with one for blood donation seemed impossible. But sometimes life has a way of changing your perspective.

      Three years ago, my younger sister was diagnosed with leukemia. Suddenly, blood donations weren't just statistics or feel-good stories - they were literally keeping my sister alive during her treatment.

      Watching the impact that anonymous donors had on her recovery made me realize how selfish my fear was. If strangers were willing to help my family in our darkest hour, how could I not do the same for others?

      My first donation was terrifying. I was shaking, sweating, and probably making the nurses' job much harder than it needed to be. But you know what? It wasn't that bad. The actual needle insertion was over in seconds, and the whole process took less than an hour.

      Now, I donate every 8 weeks like clockwork. It's become a routine that I actually look forward to. The staff at the donation center know me by name, and I've made friends with other regular donors.

      My sister is now in remission and doing great. She often jokes that I've probably donated enough blood to fill a small swimming pool by now. But knowing that my donations might be helping someone else's sister, brother, parent, or child makes every single poke worth it.

      If you're on the fence about donating because of fear - I get it. But I promise you, the brief discomfort is nothing compared to the satisfaction of knowing you're making a real difference in the world.
    `,
    tags: ['Regular Donor', 'Leukemia', 'Family', 'Overcoming Fear']
  },
  {
    id: 'story3',
    title: 'The Blood Drive That Changed Everything',
    category: 'Community Story',
    author: 'Narasaraopet Engineering College',
    date: '2024-11-05',
    readTime: '5 min read',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
    excerpt: 'How our college blood drive exceeded all expectations and created a movement...',
    content: `
      What started as a small blood drive at our college has grown into something we never imagined possible.

      It began when we learned that local hospitals were facing a critical blood shortage. Our student council decided to organize a one-day blood donation camp, hoping to collect maybe 50-60 units of blood.

      We put up posters around campus, made announcements in classes, and used social media to spread the word. The response was incredible - students, faculty, and even local community members started showing interest.

      On the day of the drive, we were overwhelmed. People started lining up before we even opened, and the queue stretched across the entire campus. We had to call in additional medical staff and equipment to handle the volume.

      By the end of the day, we had collected 347 units of blood - nearly six times our original target! But more importantly, we had created awareness about the constant need for blood donations.

      Many first-time donors told us they had never realized how simple and important the process was. Several signed up to become regular donors, and some even started organizing drives in their own communities.

      The impact was immediate. The local blood bank contacted us to say that our drive had helped them replenish their reserves just in time for a major emergency that occurred the following week.

      Since then, we've made blood donation drives a regular event at our college. We've partnered with other educational institutions, and what started as a one-day initiative has become a quarterly tradition that consistently helps maintain blood supply in our region.

      The most rewarding part isn't the numbers - it's the stories. We've heard from recipients who received blood collected during our drives, from family members whose loved ones were saved, and from donors who've made it a part of their lives.

      This experience taught us that sometimes small actions can create ripple effects that go far beyond what we initially intended. Every person who rolls up their sleeve is not just donating blood - they're joining a community of people who believe in helping others.
    `,
    tags: ['College Drive', 'Community Impact', 'Student Initiative', 'Blood Shortage']
  }
];

export const mockAwarenessData = {
  benefits: [
    {
      title: 'Health Screening',
      description: 'Free health checkup including blood pressure, pulse, temperature, and hemoglobin testing.',
      icon: 'Activity'
    },
    {
      title: 'Reduced Heart Disease Risk',
      description: 'Regular donation helps maintain healthy iron levels, reducing cardiovascular disease risk.',
      icon: 'Heart'
    },
    {
      title: 'Cancer Risk Reduction',
      description: 'Studies suggest regular blood donation may lower risk of certain cancers.',
      icon: 'Shield'
    },
    {
      title: 'Mental Wellness',
      description: 'The act of helping others releases endorphins, contributing to mental well-being.',
      icon: 'Smile'
    }
  ],
  myths: [
    {
      myth: 'Blood donation makes you weak and tired',
      fact: 'Your body replaces the donated plasma within 24-48 hours and red blood cells within 4-6 weeks. Most donors feel fine immediately after donation.'
    },
    {
      myth: 'You can get diseases from donating blood',
      fact: 'All equipment is sterile and single-use. There is absolutely no risk of infection when donating blood at certified centers.'
    },
    {
      myth: 'Vegetarians cannot donate blood',
      fact: 'Vegetarians can donate blood as long as they meet other eligibility criteria. Iron levels, not diet type, are what matter.'
    },
    {
      myth: 'People with tattoos cannot donate',
      fact: 'You can donate blood if your tattoo was done at a licensed facility with sterile needles, usually after a 3-month waiting period.'
    }
  ],
  statistics: [
    { label: 'Blood Units Needed Daily', value: '38,000', description: 'Units needed across India every day' },
    { label: 'Donation Frequency', value: '3%', description: 'Percentage of eligible population that donates' },
    { label: 'Lives Saved', value: '3', description: 'Lives that can be saved by one donation' },
    { label: 'Replacement Time', value: '24-48h', description: 'Time to replace donated plasma' }
  ],
  faqs: [
    {
      question: 'How often can I donate blood?',
      answer: 'You can donate whole blood every 56 days (8 weeks). Platelet donations can be made every 7 days, up to 24 times per year.'
    },
    {
      question: 'What are the eligibility criteria?',
      answer: 'You must be 18-65 years old, weigh at least 45kg, be in good health, and meet hemoglobin requirements (12.5g/dl for women, 13.0g/dl for men).'
    },
    {
      question: 'How long does the donation process take?',
      answer: 'The entire process takes about 30-45 minutes, but the actual blood collection only takes 8-10 minutes.'
    },
    {
      question: 'What should I do before donating?',
      answer: 'Eat a healthy meal, stay hydrated, get adequate sleep, and avoid alcohol for 24 hours before donation.'
    }
  ]
};