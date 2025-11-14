# PCCS Landing - Documentation

Welcome to the PCCS Landing website documentation. This directory contains comprehensive technical documentation for developers, designers, and stakeholders.

---

## 📖 Documentation Index

### Quick Start
- **[SUMMARY.md](SUMMARY.md)** - Executive summary and quick reference

### Technical Documentation
- **[sitemap.md](sitemap.md)** - Complete sitemap with component relationships
- **[navigation-flow.md](navigation-flow.md)** - Navigation diagrams and user journeys
- **[components-guide.md](components-guide.md)** - Reusable components reference
- **[api-documentation.md](api-documentation.md)** - API endpoints and integration guide

---

## 🎯 Who Should Read What?

### For Developers
1. Start with [SUMMARY.md](SUMMARY.md) for overview
2. Read [components-guide.md](components-guide.md) for component usage
3. Review [api-documentation.md](api-documentation.md) for backend integration
4. Check [sitemap.md](sitemap.md) for detailed relationships

### For Designers/UX
1. Review [navigation-flow.md](navigation-flow.md) for user flows
2. Check [SUMMARY.md](SUMMARY.md) for design system
3. Reference [sitemap.md](sitemap.md) for page structure

### For Project Managers
1. Read [SUMMARY.md](SUMMARY.md) for project overview
2. Check [sitemap.md](sitemap.md) for feature completeness
3. Review [navigation-flow.md](navigation-flow.md) for user experience

### For Stakeholders
1. Start with [SUMMARY.md](SUMMARY.md)
2. Review [sitemap.md](sitemap.md) for site structure
3. Check future enhancements in [SUMMARY.md](SUMMARY.md)

---

## 🚀 Recent Updates (v2.0)

### November 14, 2025
- Migrated all routes to English
- Created 5 new pages: About, Courses, Staff, Contact, Blog
- Updated navigation across all components
- Standardized contact information
- Created comprehensive documentation suite

See [SUMMARY.md](SUMMARY.md) for complete changelog.

---

## 📂 Project Structure

```
docs/
├── README.md                 # This file
├── SUMMARY.md               # Executive summary
├── sitemap.md               # Complete sitemap
├── navigation-flow.md       # Navigation diagrams
├── components-guide.md      # Components reference
└── api-documentation.md     # API documentation
```

---

## 🔍 Finding Information

### Need to know about...

**Routes and URLs?**
→ See [sitemap.md](sitemap.md) - Sistema de Rutas section

**Components?**
→ See [components-guide.md](components-guide.md)

**API Integration?**
→ See [api-documentation.md](api-documentation.md)

**User Flows?**
→ See [navigation-flow.md](navigation-flow.md)

**Project Overview?**
→ See [SUMMARY.md](SUMMARY.md)

**External Links?**
→ See [sitemap.md](sitemap.md) - Links Externos section

**Payment Process?**
→ See [navigation-flow.md](navigation-flow.md) - Payment Flow section
→ See [api-documentation.md](api-documentation.md) - Payment Gateway section

---

## 💡 Quick Tips

### For New Developers

1. **Start Here**:
   ```bash
   # Read the summary first
   cat docs/SUMMARY.md

   # Clone and setup
   npm install
   npx prisma generate
   npm run dev
   ```

2. **Key Files to Understand**:
   - `src/app/layout.tsx` - Main layout
   - `src/components/layout/Header.tsx` - Global header
   - `src/components/layout/Footer.tsx` - Global footer
   - `src/app/page.tsx` - Homepage

3. **Important Commands**:
   ```bash
   npm run dev          # Start development server
   npm run build        # Build for production
   npm run type-check   # Check TypeScript
   npx prisma studio    # Open database GUI
   ```

### For Updating Documentation

When making changes to the website:
1. Update relevant documentation file
2. Update Last Updated date at bottom
3. Add entry to SUMMARY.md changelog if significant
4. Keep diagrams in sync with actual implementation

---

## 🎨 Documentation Standards

### Formatting
- Use Markdown for all documentation
- Include code examples where applicable
- Use tables for structured data
- Include diagrams for complex flows

### File Naming
- Use kebab-case: `api-documentation.md`
- Be descriptive: `navigation-flow.md` not `nav.md`
- Use .md extension for Markdown

### Updates
- Always include "Last Updated" date
- Version documentation when making major changes
- Keep changelog in SUMMARY.md

---

## 🤝 Contributing

### Adding New Documentation

1. Create new .md file in `/docs`
2. Add link in this README
3. Add entry in SUMMARY.md
4. Follow existing format and style

### Updating Existing Docs

1. Make your changes
2. Update "Last Updated" date
3. If major change, update version number
4. Update SUMMARY.md if needed

---

## 📞 Questions?

If you can't find what you're looking for:

1. Check the [SUMMARY.md](SUMMARY.md) index
2. Use GitHub search across documentation
3. Contact the development team
4. Email: dev@pccs.edu.do

---

## 🔗 External Resources

- [Project Repository](https://github.com/pccs/pccs_landing)
- [Production Site](https://pccs.edu.do)
- [Staging Site](https://staging.pccs.edu.do)
- [Design System](https://figma.com/...)

---

## 📋 Documentation Checklist

When releasing new features, ensure:

- [ ] Code is documented
- [ ] API changes reflected in api-documentation.md
- [ ] New components added to components-guide.md
- [ ] New routes added to sitemap.md
- [ ] User flows updated in navigation-flow.md
- [ ] SUMMARY.md updated
- [ ] README.md links updated if needed

---

## 📊 Documentation Statistics

- **Total Documents**: 6
- **Total Pages**: ~150 (estimated)
- **Components Documented**: 26+
- **API Endpoints Documented**: 5
- **Last Major Update**: 2025-11-14

---

## 🌟 Best Practices

1. **Keep documentation close to code**: Update docs when you update code
2. **Be specific**: Use concrete examples, not abstract descriptions
3. **Stay current**: Review and update quarterly at minimum
4. **Be consistent**: Follow established patterns and formats
5. **Think about the reader**: Write for someone new to the project

---

**Documentation Maintained By**: Development Team
**Last Updated**: 2025-11-14
**Version**: 2.0

---

_For the main project README, see [../README.md](../README.md)_
