// Mapeo de assets del sitio original a ubicaciones locales

export const assetsMapping = {
  // Logos
  logos: {
    preloader: {
      original: "https://wordpress.oscgre.com/wp-content/uploads/2025/09/logo3.png",
      local: "/logos/logo3.png"
    },
    main: {
      original: "https://wordpress.pccs.edu.do/wp-content/uploads/2025/09/logo_land.png",
      local: "/logos/logo_land.png"
    },
    dark: {
      original: "https://wordpress.pccs.edu.do/wp-content/uploads/2025/08/logo-dark.png",
      local: "/logos/logo-dark.png"
    }
  },

  // Iconos de características
  featureIcons: {
    activeLearning: {
      original: "https://kidbawp.codebasket.xyz/wp-content/plugins/cb-core/assets/images/icons/feat-icon-1.png",
      local: "/icons/feat-icon-1.png"
    },
    parentsDay: {
      original: "https://kidbawp.codebasket.xyz/wp-content/plugins/cb-core/assets/images/icons/feat-icon-2.png",
      local: "/icons/feat-icon-2.png"
    },
    expertTeachers: {
      original: "https://kidbawp.codebasket.xyz/wp-content/plugins/cb-core/assets/images/icons/feat-icon-3.png",
      local: "/icons/feat-icon-3.png"
    },
    musicLessons: {
      original: "https://kidbawp.codebasket.xyz/wp-content/plugins/cb-core/assets/images/icons/feat-icon-4.png",
      local: "/icons/feat-icon-4.png"
    }
  },

  // Imágenes principales
  images: {
    heroBanner: {
      original: "https://wordpress.oscgre.com/wp-content/uploads/2025/09/CARRUSEL-01-scaled-e1758593644441.png",
      local: "/images/CARRUSEL-01-scaled-e1758593644441.png"
    },
    featureImage: {
      original: "https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/feature-img.jpg",
      local: "/images/feature-img.jpg"
    }
  },

  // Fonts principales
  fonts: {
    google: "https://fonts.googleapis.com/css2?family=Fredoka+One&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
  },

  // CSS principales a migrar (referencias para recrear con Tailwind)
  cssReferences: {
    bootstrap: "https://wordpress.pccs.edu.do/wp-content/themes/kidba/assets/css/bootstrap.min.css",
    animate: "https://wordpress.pccs.edu.do/wp-content/themes/kidba/assets/css/animate.min.css",
    icofont: "https://wordpress.pccs.edu.do/wp-content/themes/kidba/assets/css/icofont.min.css",
    owlCarousel: "https://wordpress.pccs.edu.do/wp-content/themes/kidba/assets/css/talim-css/owl.carousel.min.css",
    magnificPopup: "https://wordpress.pccs.edu.do/wp-content/themes/kidba/assets/css/magnific-popup.css"
  }
};

// Helper para obtener la ruta local de un asset
export const getAssetPath = (category: keyof typeof assetsMapping, key: string): string => {
  const categoryData = assetsMapping[category] as any;
  return categoryData[key]?.local || '';
};