import { IMAGE_COMPONENTS } from "../image.index";

export interface ApplicantProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  bio: string,
  totalJobs: number;
  rating: number;
  reviewCount: number;
  profileImg: any;
}

export interface JobPost {
  id: string;
  title: string;
  status: 'Open' | 'Assigned' | 'Completed' | 'Cancelled';
  price: number;
  date: string;
  time: string;
  img: any;
  location: string;
  contactNumber: string;
  details: string;
  payRate: number;
  totalDuration: string;
  totalAmount: number;
  applicants: ApplicantProfile[];
  // Assigned
  assignedTo?: ApplicantProfile;
  // Completed
  completedOn?: string;
  // Cancelled
  cancelledBy?: string;
  cancelledOn?: string;
}

export const jobPosts: JobPost[] = [
  // --- OPEN JOBS ---
  {
    id: "J1",
    title: "Private Birthday Party",
    status: "Open",
    price: 375,
    date: "22, 23 February 2026",
    time: "6:00 PM – 11:00 PM",
    img: IMAGE_COMPONENTS.profile1,
    location: "Austin, Texas, USA",
    contactNumber: "+1 (212) 555-0148",
    details: "Looking for an energetic bartender for a private rooftop birthday bash.",
    payRate: 25.00,
    totalDuration: "15 hours",
    totalAmount: 375,
    applicants: [
      {
        id: "A1",
        name: "Roberts Junior",
        email: "robert@canaletto.com",
        phone: "+1 (212) 555-0148",
        experience: "2 Years",
        bio: "Looking for an energetic bartender for a private rooftop birthday bash.",
        totalJobs: 256,
        rating: 4.4,
        reviewCount: 112,
        profileImg: IMAGE_COMPONENTS.profile1,
      },
      {
        id: "A2",
        name: "Sarah Jenkins",
        email: "sarah@events.com",
        phone: "+1 (602) 222-3333",
        experience: "4 Years",
        bio: "Looking for an energetic bartender for a private rooftop birthday bash.",
        totalJobs: 310,
        rating: 4.8,
        reviewCount: 150,
        profileImg: IMAGE_COMPONENTS.profile2,
      }
    ]
  },
  {
    id: "J2",
    title: "Corporate Mixer",
    status: "Open",
    price: 200,
    date: "15 March 2026",
    time: "7:00 PM – 10:00 PM",
    img: IMAGE_COMPONENTS.profile1,
    location: "Houston, TX",
    contactNumber: "+1 (713) 555-0000",
    details: "Mixologist needed for a tech startup networking event.",
    payRate: 30.00,
    totalDuration: "3 hours",
    totalAmount: 200,
    applicants: []
  },

  // --- ASSIGNED JOBS ---
  {
    id: "J3",
    title: "Wedding Reception",
    status: "Assigned",
    price: 500,
    date: "10 March 2026",
    time: "5:00 PM – 12:00 AM",
    img: IMAGE_COMPONENTS.profile1,
    location: "Manhattan, NY",
    contactNumber: "+1 (212) 999-0148",
    details: "Assigned to a senior mixologist for a high-end wedding.",
    payRate: 35.00,
    totalDuration: "7 hours",
    totalAmount: 500,
    applicants: [
      {
        id: "A3",
        name: "Sophia Miller",
        email: "sophia@example.com",
        phone: "+1 (212) 333-4444",
        experience: "5 Years",
        bio: "Mixologist needed for a tech startup networking event.",
        totalJobs: 412,
        rating: 4.9,
        reviewCount: 230,
        profileImg: IMAGE_COMPONENTS.profile3,
      }
    ],
    assignedTo: {
      id: "A3",
      name: "Sophia Miller",
      email: "sophia@example.com",
      phone: "+1 (212) 333-4444",
      experience: "5 Years",
      bio: "Mixologist needed for a tech startup networking event.",
      totalJobs: 412,
      rating: 4.9,
      reviewCount: 230,
      profileImg: IMAGE_COMPONENTS.profile3,
    },
  },
  {
    id: "J4",
    title: "Art Gallery Opening",
    status: "Assigned",
    price: 320,
    date: "12 March 2026",
    time: "5:00 PM – 9:00 PM",
    img: IMAGE_COMPONENTS.profile1,
    location: "Chicago, IL",
    contactNumber: "+1 (312) 555-7777",
    details: "Sophisticated art opening with light cocktails.",
    payRate: 40.00,
    totalDuration: "4 hours",
    totalAmount: 320,
    applicants: [
      {
        id: "A4",
        name: "David Chen",
        email: "david@techbar.com",
        phone: "+1 (713) 111-2222",
        experience: "3 Years",
        bio: "Mixologist needed for a tech startup networking event.",
        totalJobs: 120,
        rating: 4.7,
        reviewCount: 85,
        profileImg: IMAGE_COMPONENTS.profile2,
      }
    ],
    assignedTo: {
      id: "A4",
      name: "David Chen",
      email: "david@techbar.com",
      phone: "+1 (713) 111-2222",
      experience: "3 Years",
      bio: "Mixologist needed for a tech startup networking event.",
      totalJobs: 120,
      rating: 4.7,
      reviewCount: 85,
      profileImg: IMAGE_COMPONENTS.profile2,
    },
  },

  // --- COMPLETED JOBS ---
  {
    id: "J5",
    title: "New Year Bash",
    status: "Completed",
    price: 600,
    date: "31 Dec 2025",
    time: "9:00 PM – 3:00 AM",
    img: IMAGE_COMPONENTS.profile1,
    location: "Las Vegas, NV",
    contactNumber: "+1 (702) 555-1234",
    details: "Annual New Year's Eve party successfully completed.",
    payRate: 50.00,
    totalDuration: "6 hours",
    totalAmount: 600,
    applicants: [
      {
        id: "A5",
        name: "Marcus King",
        email: "marcus@vegasnights.com",
        phone: "+1 (702) 000-1111",
        experience: "8 Years",
        bio: "Annual New Year's Eve party successfully completed.",
        totalJobs: 950,
        rating: 5.0,
        reviewCount: 500,
        profileImg: IMAGE_COMPONENTS.profile1,
      }
    ],
    assignedTo: {
      id: "A5",
      name: "Marcus King",
      email: "marcus@vegasnights.com",
      phone: "+1 (702) 000-1111",
      experience: "8 Years",
      bio: "Annual New Year's Eve party successfully completed.",
      totalJobs: 950,
      rating: 5.0,
      reviewCount: 500,
      profileImg: IMAGE_COMPONENTS.profile1,
    },
    completedOn: "01 January 2026",
  },
  {
    id: "J6",
    title: "Anniversary Dinner",
    status: "Completed",
    price: 250,
    date: "02 Feb 2026",
    time: "6:30 PM – 9:30 PM",
    img: IMAGE_COMPONENTS.profile1,
    location: "Seattle, WA",
    contactNumber: "+1 (206) 555-8888",
    details: "Silver Jubilee family celebration.",
    payRate: 30.00,
    totalDuration: "3 hours",
    totalAmount: 250,
    applicants: [
      {
        id: "A6",
        name: "Liam Wilson",
        email: "liam@seattlemix.com",
        phone: "+1 (206) 444-5555",
        experience: "6 Years",
        bio: "Silver Jubilee family celebration.",
        totalJobs: 520,
        rating: 4.9,
        reviewCount: 310,
        profileImg: IMAGE_COMPONENTS.profile2,
      }
    ],
    assignedTo: {
      id: "A6",
      name: "Liam Wilson",
      email: "liam@seattlemix.com",
      phone: "+1 (206) 444-5555",
      bio: "Silver Jubilee family celebration.",
      experience: "6 Years",
      totalJobs: 520,
      rating: 4.9,
      reviewCount: 310,
      profileImg: IMAGE_COMPONENTS.profile2,
    },
    completedOn: "02 February 2026",
  },

  // --- CANCELLED JOBS ---
  {
    id: "J7",
    title: "Pool Side BBQ",
    status: "Cancelled",
    price: 150,
    date: "15 Jan 2026",
    time: "1:00 PM – 4:00 PM",
    img: IMAGE_COMPONENTS.profile1,
    location: "Phoenix, AZ",
    contactNumber: "+1 (602) 555-4321",
    details: "Cancelled due to bad weather conditions.",
    payRate: 25.00,
    totalDuration: "4 hours",
    totalAmount: 150,
    applicants: [],
    cancelledBy: "Provider",
    cancelledOn: "14 January 2026",
  },
  {
    id: "J8",
    title: "House Warming",
    status: "Cancelled",
    price: 150,
    date: "20 March 2026",
    time: "8:00 PM – 11:00 PM",
    img: IMAGE_COMPONENTS.profile1,
    location: "Miami, FL",
    contactNumber: "+1 (305) 555-9999",
    details: "Host decided to reschedule for a later date.",
    payRate: 20.00,
    totalDuration: "3 hours",
    totalAmount: 150,
    applicants: [
      {
        id: "A7",
        name: "Elena Rodriguez",
        email: "elena@miami.com",
        phone: "+1 (305) 888-7777",
        experience: "1.5 Years",
        bio: "Host decided to reschedule for a later date.",
        totalJobs: 89,
        rating: 4.5,
        reviewCount: 40,
        profileImg: IMAGE_COMPONENTS.profile3,
      }
    ],
    cancelledBy: "Me",
    cancelledOn: "19 March 2026",
  },
  {
    id: "J9",
    title: "Private Birthday Party",
    status: "Open",
    price: 375,
    date: "22, 23 February 2026",
    time: "6:00 PM – 11:00 PM",
    img: IMAGE_COMPONENTS.profile1,
    location: "Austin, Texas, USA",
    contactNumber: "+1 (212) 555-0148",
    details: "Looking for an energetic bartender for a private rooftop birthday bash.",
    payRate: 25.00,
    totalDuration: "15 hours",
    totalAmount: 375,
    applicants: [
      {
        id: "A9",
        name: "Roberts Junior",
        email: "robert@canaletto.com",
        phone: "+1 (212) 555-0148",
        experience: "2 Years",
        bio: "Looking for an energetic bartender for a private rooftop birthday bash.",
        totalJobs: 256,
        rating: 4.4,
        reviewCount: 112,
        profileImg: IMAGE_COMPONENTS.profile1,
      },
      {
        id: "A10",
        name: "Sarah Jenkins",
        email: "sarah@events.com",
        phone: "+1 (602) 222-3333",
        experience: "4 Years",
        bio: "Looking for an energetic bartender for a private rooftop birthday bash.",
        totalJobs: 310,
        rating: 4.8,
        reviewCount: 150,
        profileImg: IMAGE_COMPONENTS.profile2,
      }
    ]
  },
];