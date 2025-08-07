import { ProfileConfig } from '../types';

export const profileConfig: ProfileConfig = {
  name: "Namdapha House",
  bio: "Find all important links in one place",
  profileImage: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754390919/1000073005-modified_a0ou2c.png",

  backgroundType: "image",
  backgroundValue: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754394299/20250728_1415_Indian_Subcontinent_Trees_remix_01k1835p9df9a9pvr4h1dtftz4_xdzp1e.png",

  socialLinks: [
    { platform: "GitHub", url: "https://github.com", icon: "Github" },
    { platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
    { platform: "Twitter", url: "https://twitter.com", icon: "Twitter" },
    { platform: "Instagram", url: "https://instagram.com", icon: "Instagram" },
    { platform: "YouTube", url: "https://youtube.com", icon: "Youtube" },
  ],
  links: [
    {
      id: "whatsapp-community",
      title: "WhatsApp Community",
      url: "/whatsapp-verify", // This will navigate to your WhatsApp verification WhatsApp group link
      description: "Join Namdapha official Community",
      icon: "Whatsapp", // Use a WhatsApp icon in your UI
      featured: true,
     
    },
    {
      id: "blog",
      title: "Blog",
      url: "https://blog.example.com",
      description: "Read my latest articles and thoughts",
      icon: "BookOpen"
    },
    {
      id: "resume",
      title: "Resume",
      url: "https://resume.example.com",
      description: "Download my latest resume",
      icon: "FileText"
    },
    {
      id: "youtube",
      title: "YouTube Channel",
      url: "https://youtube.com/@example",
      description: "Subscribe to my channel",
      icon: "Play"
    },
    {
      id: "newsletter",
      title: "Newsletter",
      url: "https://newsletter.example.com",
      description: "Subscribe to my weekly newsletter",
      icon: "Mail"
    },
    {
      id: "shop",
      title: "Shop",
      url: "https://shop.example.com",
      description: "Check out my digital products",
      icon: "ShoppingBag"
    }
  ],
  contactEmail: "hello@alexjohnson.com",
  enableAnalytics: true,
  enableQRCode: true,
  contactInfo: [
    {
      name: "Devansh Malhotra",
      role: "House Secretary",
      email: "namdapha-sec@ds.study.iitm.ac.in",
      photo: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754402073/WhatsApp_Image_2025-08-05_at_19.18.21_lafgtv.jpg",
    },
    {
      name: "Sravya N",
      role: "Deputy Secretary",
      email: "namdapha-ds@ds.study.iitm.ac.in",
      photo: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754402834/srav2_ozsrmg.jpg",
    },
    {
      name: "Harshita Dudeja",
      role: "Web Admin",
      email: "namdapha-webad@ds.study.iitm.ac.in",
      photo: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754402074/IMG_20241013_185028_753_fa3olk.webp",
    },
    {
      name: "Support Team",
      role: "Technical Support",
      email: "support@namdapha.edu",
      photo: "https://ui-avatars.com/api/?name=Support+Team&background=0D8ABC&color=fff",
    },
    {
      name: "Admissions Office",
      role: "Admissions & Enrollment",
      email: "admissions@namdapha.edu",
      photo: "https://ui-avatars.com/api/?name=Admissions+Office&background=8BC34A&color=fff",
    },
    {
      name: "Events Coordinator",
      role: "Campus Events",
      email: "events@namdapha.edu",
      photo: "https://ui-avatars.com/api/?name=Events+Coordinator&background=FF9800&color=fff",
    }
  ],
};