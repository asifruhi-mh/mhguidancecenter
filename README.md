# MH Guidance Center Website

A complete professional static website for a 501(c)(3) non-profit organization providing comprehensive guidance and support services to the community.

## 🌟 Features

- **Complete Website**: 7 fully functional pages including Home, About, Programs, Events, Volunteer, Contact, and Donate
- **Responsive Design**: Mobile-first approach with full responsiveness across all devices
- **Accessibility**: WCAG 2.1 compliant with proper semantic HTML, ARIA labels, and keyboard navigation
- **SEO Optimized**: Proper meta tags, semantic structure, and performance optimization
- **Modern UI/UX**: Clean, professional design suitable for a non-profit organization
- **Interactive Elements**: Event filtering, volunteer application forms, contact forms, and smooth animations
- **Event Management**: Events page with filtering, registration, and calendar integration
- **Volunteer System**: Comprehensive volunteer opportunities with detailed application forms
- **Donation Integration**: Ready for payment processor integration (PayPal, Stripe, etc.)

## 📁 Project Structure

```
mhguidancecenter.org/
├── index.html              # Homepage with hero, services, and impact
├── about.html              # About us, mission, team, and impact stories
├── programs.html           # Detailed programs and services by category
├── events.html             # Events listing with filtering and registration
├── volunteer.html          # Volunteer opportunities and application
├── contact.html            # Contact information, form, and FAQ
├── donate.html             # Donation page with impact examples
├── css/
│   ├── styles.css          # Main stylesheet with comprehensive component system
│   └── responsive.css      # Responsive design styles for all devices
├── js/
│   ├── main.js             # Core JavaScript functionality
│   ├── animations.js       # Animation and interactive effects
│   ├── contact-form.js     # Contact form validation and handling
│   ├── events.js           # Events page filtering and functionality
│   └── volunteer-form.js   # Volunteer application form with validation
├── assets/
│   ├── README.md           # Asset requirements and guidelines
│   ├── hero-image.png      # Homepage hero image
│   ├── logo.jpg            # Organization logo
│   └── team/               # Team member photos directory
└── .github/
    └── copilot-instructions.md
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser
- Local web server (for development and testing)

### Installation

1. Clone or download the project files
2. Open `index.html` in a web browser, or
3. Serve the files using a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

4. Navigate to `http://localhost:8000` in your browser

## 🎨 Customization

### Colors and Branding

The website uses CSS custom properties (variables) for easy customization. Update the `:root` section in `css/styles.css`:

```css
:root {
    --primary-color: #2563eb;    /* Main brand color */
    --accent-color: #f59e0b;     /* Accent color */
    --gray-900: #0f172a;         /* Dark text */
    /* ... other variables */
}
```

### Content Updates

1. **Organization Information**: Update contact details, addresses, and phone numbers in all HTML files
2. **Mission and Services**: Modify the content in `about.html` and `programs.html`
3. **Team Members**: Replace placeholder team information in `about.html`
4. **Images**: Add actual images to the `assets/` folder (see `assets/README.md` for guidelines)

### Logo and Favicon

- Replace `assets/logo.png` with your organization's logo
- Replace `assets/favicon.ico` with your organization's favicon

## 📱 Features by Page

### Homepage (`index.html`)
- Hero section with call-to-action
- Mission statement
- Services overview with icons
- Impact statistics with animations
- Newsletter signup

### About (`about.html`)
- Mission, vision, and values
- Organization story
- Team member profiles
- Board of directors
- Community impact metrics

### Programs (`programs.html`)
- Detailed program descriptions
- Service categories
- Application process
- Contact information for each program

### Contact (`contact.html`)
- Contact form with validation
- Office hours and location
- Interactive FAQ section
- Emergency contact information
- Map placeholder (ready for integration)

### Donate (`donate.html`)
- Donation impact examples
- Multiple giving options
- Financial transparency
- Tax-deductible information
- Placeholder for payment integration

## 🛠 Technical Details

### Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with flexbox and grid layouts
- **Vanilla JavaScript**: No framework dependencies
- **Font Awesome**: Icon library
- **Google Fonts**: Inter font family

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+ (with graceful degradation)

### Performance Features

- Optimized images and assets
- CSS and JavaScript minification ready
- Lazy loading for images
- Efficient animations with reduced motion support

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences
- Focus management
- Alt text for all images

## 🔧 Development

### File Organization

- CSS follows BEM-like naming conventions
- JavaScript is modular and well-commented
- HTML uses semantic elements throughout
- Assets are organized by type and purpose

### Adding New Pages

1. Create new HTML file following the existing structure
2. Update navigation in all existing files
3. Add page-specific styles to `css/styles.css`
4. Update sitemap and meta information

## 📞 Integration Requirements

### Payment Processing

The donate page includes placeholders for payment integration. Consider:

- PayPal Donations
- Stripe
- Network for Good
- DonorBox
- Square

### Contact Form

The contact form requires backend integration for:

- Form submission handling
- Email notifications
- Data storage (optional)
- Spam protection

### Analytics

Add tracking codes for:

- Google Analytics
- Facebook Pixel (if applicable)
- Other marketing platforms

## 🤝 Contributing

When making updates:

1. Test across multiple browsers and devices
2. Validate HTML and CSS
3. Check accessibility with screen readers
4. Optimize images before adding
5. Update documentation as needed

## 📄 License

This project is designed for use by non-profit organizations. Please ensure all images and content are properly licensed for your use case.

## 📞 Support

For questions about customization or implementation, please refer to the code comments or contact the development team.

---

**Note**: This is a template website. Replace all placeholder content, images, and contact information with actual organization details before going live.