// Language types
export type Language = 'en' | 'es';

// Translation structure - organized by sections
export interface Translations {
  // Common translations
  common: {
    readMore: string;
    learnMore: string;
    contactUs: string;
    applyNow: string;
    donateNow: string;
    viewMore: string;
    loading: string;
    submit: string;
    cancel: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    search: string;
  };

  // Navigation
  navigation: {
    home: string;
    aboutUs: string;
    courses: string;
    admissions: string;
    gallery: string;
    contact: string;
    blog: string;
    donations: string;
    staff: string;
    mission: string;
    vision: string;
    values: string;
    purpose: string;
  };

  // Hero Section
  hero: {
    subtitle: string;
    title: {
      studyOf: string;
      kids: string;
      child: string;
      youth: string;
    };
    description: string;
    applyButton: string;
    coursesButton: string;
    studentServicesButton: string;
  };

  // Features Section
  features: {
    title: string;
    subtitle: string;
    description: string;
    activeLearning: {
      title: string;
      description: string;
    };
    parentsDay: {
      title: string;
      description: string;
    };
    expertTeachers: {
      title: string;
      description: string;
    };
    musicLessons: {
      title: string;
      description: string;
    };
  };

  // Mission Section
  mission: {
    title: string;
    content: string;
    description: string;
    points: string[];
    overlayTitle: string;
    overlaySubtitle: string;
  };

  // Vision Section
  vision: {
    title: string;
    content: string;
    description1: string;
    description2: string;
    qualityEducation: {
      title: string;
      description: string;
    };
    welcomingEnvironment: {
      title: string;
      description: string;
    };
    christianLeaders: {
      title: string;
      description: string;
    };
    trustIntegrity: {
      title: string;
      description: string;
    };
    ctaButton: string;
  };

  // Values Section
  values: {
    title: string;
    subtitle: string;
    description: string;
    overlayTitle: string;
    overlaySubtitle: string;
    faith: {
      title: string;
      description: string;
    };
    integrity: {
      title: string;
      description: string;
    };
    excellence: {
      title: string;
      description: string;
    };
    learning: {
      title: string;
      description: string;
    };
    love: {
      title: string;
      description: string;
    };
    compassion: {
      title: string;
      description: string;
    };
    service: {
      title: string;
      description: string;
    };
    gratitude: {
      title: string;
      description: string;
    };
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
  };

  // Purpose Section
  purpose: {
    title: string;
    content: string;
    description: string;
    academicExcellence: {
      title: string;
      description: string;
    };
    missionOriented: {
      title: string;
      description: string;
    };
    recognitionQuality: {
      title: string;
      description: string;
    };
    quote: string;
    quoteAuthor: string;
    ctaButton: string;
    statsCommitment: string;
    statsExcellence: string;
    statsQuality: string;
  };

  // Admissions Section
  admissions: {
    // Hero section
    heroTitle: string;
    heroSubtitle: string;
    viewForms: string;
    callNow: string;

    // Documents section
    title: string;
    subtitle: string;
    description: string;
    documentsTitle: string;
    requiredDocuments: string;
    documents: string[];

    // Forms section
    processesTitle: string;
    processesDescription: string;
    scheduleAppointment: string;
    admissionForm: string;
    scholarshipApplication: string;
    inquiries: string;

    // Quick contact
    needHelp: string;
  };

  // Gallery Section
  gallery: {
    title: string;
    subtitle: string;
    imageAlt: string;
    showMore: string;
    showLess: string;
  };

  // Donations Section
  donations: {
    // Hero
    title: string;
    subtitle: string;
    heroTitle: string;
    heroSubtitle: string;

    // Impact Section
    impactTitle: string;
    impactSubtitle: string;
    impactDescription: string;
    impactAreasTitle: string;

    // Impact Areas (4 areas)
    qualityBilingualEducation: string;
    qualityBilingualEducationDesc: string;
    scholarshipsNeeded: string;
    scholarshipsNeededDesc: string;
    familyCharacterDevelopment: string;
    familyCharacterDevelopmentDesc: string;
    futureEconomicOpportunity: string;
    futureEconomicOpportunityDesc: string;

    // Fund Distribution
    fundDistributionTitle: string;
    fundDistributionSubtitle: string;
    educationResources: string;
    scholarships: string;
    infrastructure: string;
    transparency: string;

    // Future Vision Panel
    futureVisionTitle: string;
    futureVisionSubtitle: string;
    futureVisionDescription: string;
    futureVisionItems: string[];

    // Sponsorship Impact Panel
    sponsorshipTitle: string;
    sponsorshipSubtitle: string;
    sponsorshipLevels: Array<{
      amount: string;
      description: string;
    }>;

    // DonationsSection
    howYouCanHelp: string;
    howYouCanHelpDescription: string;
    loadingDonationOptions: string;
    noDonationTypes: string;
    donateNow: string;

    // Donation Types (cards)
    donationTypes: {
      schoolSupplies: { title: string; amount: string; benefits: string[] };
      schoolMeals: { title: string; amount: string; benefits: string[] };
      englishTech: { title: string; amount: string; benefits: string[] };
      classroomMaterials: { title: string; amount: string; benefits: string[] };
      sponsorChild: { title: string; amount: string; benefits: string[] };
      sponsorTeacher: { title: string; amount: string; benefits: string[] };
      infrastructure: { title: string; amount: string; benefits: string[] };
      volunteering: {
        title: string;
        amount: string;
        benefits: string[];
        contactButton: string;
        contactOptions: {
          email: string;
          googleForm: string;
        };
      };
    };

    // Custom Donation Card
    customDonation: {
      title: string;
      badge: string;
      frequencyLabel: string;
      frequencies: {
        oneTime: string;
        weekly: string;
        monthly: string;
        everyTwoWeeks: string;
      };
      amountLabel: string;
      amountPlaceholder: string;
      commentLabel: string;
      commentPlaceholder: string;
      donateButton: string;
      minimumAmount: string;
      errorMinimum: string;
      errorInvalidAmount: string;
    };

    // CTA
    readyToMakeDifference: string;
    everyDonation: string;
  };

  // Contact Section
  contact: {
    // Hero
    title: string;
    subtitle: string;

    // Contact Cards
    callUs: string;
    callUsDesc: string;
    emailUs: string;
    emailUsDesc: string;
    visitUs: string;
    visitUsDesc: string;

    // Form
    sendMessage: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    sendButton: string;

    // Office Hours
    officeHours: string;
    mondayFriday: string;
    mondayFridayHours: string;
    saturdaySunday: string;
    closed: string;
    officeHoursNote: string;
  };

  // Footer
  footer: {
    description: string;
    followUs: string;
    navigation: string;
    explore: string;
    quickLinks: string;
    callUs: string;
    email: string;
    location: string;
  };

  // Payment pages
  payment: {
    approved: {
      title: string;
      validating: string;
      redirecting: string;
      returnHome: string;
      validationError: string;
    };
    declined: {
      title: string;
      subtitle: string;
      reason: string;
      transactionDetails: string;
      orderNumber: string;
      amount: string;
      date: string;
      responseCode: string;
      status: string;
      whatCanIDo: string;
      verifyCard: string;
      checkBalance: string;
      contactBank: string;
      tryDifferentMethod: string;
      tryAgain: string;
      returnHome: string;
      needHelp: string;
      needHelpDesc: string;
      contactSupport: string;
    };
    cancelled: {
      title: string;
      subtitle: string;
      noCharges: string;
      noChargesDesc: string;
      transactionDetails: string;
      orderNumber: string;
      amount: string;
      status: string;
      completeDonation: string;
      returnHome: string;
      whySupport: string;
      qualityEducation: string;
      qualityEducationDesc: string;
      studentSupport: string;
      studentSupportDesc: string;
      communityImpact: string;
      communityImpactDesc: string;
      quote: string;
    };
  };

  // About Page
  about: {
    title: string;
    subtitle: string;
  };

  // Courses Page
  courses: {
    title: string;
    subtitle: string;
    earlyChildhood: string;
    earlyChildhoodAge: string;
    earlyChildhoodDesc: string;
    elementary: string;
    elementaryAge: string;
    elementaryDesc: string;
    middleSchool: string;
    middleSchoolAge: string;
    middleSchoolDesc: string;
    programFeatures: string;
    playBased: string;
    socialDevelopment: string;
    basicConcepts: string;
    characterFormation: string;
    bilingualEducation: string;
    coreSubjects: string;
    criticalThinking: string;
    worldview: string;
    advancedCurriculum: string;
    leadership: string;
    technology: string;
    serviceLearning: string;
    readyToEnroll: string;
    readyToEnrollDesc: string;
  };

  // Staff Page
  staff: {
    title: string;
    subtitle: string;
    joinTeam: string;
    joinTeamDesc: string;
    contactAboutOpportunities: string;
  };

  // Blog Page
  blog: {
    title: string;
    subtitle: string;
    comingSoon: string;
    comingSoonDesc: string;
    returnHome: string;
    contactUs: string;
    stayInLoop: string;
    stayInLoopDesc: string;
    enterEmail: string;
    subscribe: string;
  };

  // Impact Section (Testimonials)
  impact: {
    title: string;
    subtitle: string;
    description: string;
    watchTestimonial: string;
    moreStories: string;
    ctaTitle: string;
    ctaDescription: string;
    donateButton: string;
  };

  // Student Services Section
  studentServices: {
    title: string;
    subtitle: string;
    description: string;
    tableHeaders: {
      description: string;
      frequency: string;
      amount: string;
      action: string;
    };
    services: {
      inscription: {
        name: string;
        frequency: string;
        amount: number;
      };
      reInscription: {
        name: string;
        frequency: string;
        amount: number;
      };
      monthlyTuition: {
        name: string;
        frequency: string;
        amount: number;
      };
    };
    // Mandatory English classes section
    englishClassesTitle: string;
    englishClassesNote: string;
    // Other optional services section
    otherServicesTitle: string;
    otherServices: {
      dayCare: {
        name: string;
      };
      salaDeTareas: {
        name: string;
      };
      claseDeIngles: {
        name: string;
      };
    };
    otherServicesCurrency: string;
    otherServicesNote: string;
    payButton: string;
    currency: string;
    note: string;
    paymentForm: {
      title: string;
      serviceLabel: string;
      amountLabel: string;
      amountUSD: string;
      amountDOP: string;
      exchangeRate: string;
      studentName: string;
      studentNamePlaceholder: string;
      parentName: string;
      parentNamePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      grade: string;
      gradePlaceholder: string;
      comment: string;
      commentPlaceholder: string;
      proceedToPayment: string;
      processing: string;
      close: string;
      requiredField: string;
      errors: {
        studentNameRequired: string;
        parentNameRequired: string;
        emailRequired: string;
        emailInvalid: string;
      };
    };
  };
}

// Context type
export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}
