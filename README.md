# 🤖 AI Resume & Cover Letter Builder

An intelligent web application that generates ATS-optimized resumes and tailored cover letters using Claude AI.

![Resume Builder Demo](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🌟 Features

- **AI-Powered Generation**: Uses Claude Sonnet 4 to create professional, ATS-optimized content
- **Multi-Step Form**: Intuitive wizard guides users through personal info, experience, education, and skills
- **Job Matching**: Tailors resumes based on specific job descriptions
- **4 Tone Styles**: Professional, Modern, Confident, and Minimal
- **PDF Export**: High-quality PDF generation for both resume and cover letter
- **Firebase Authentication**: Secure user accounts and data storage
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🚀 Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- Firebase Authentication & Firestore

### Backend
- Node.js + Express
- Claude AI API (Anthropic)
- Puppeteer for PDF generation
- Firebase Admin SDK

## 📸 Screenshots

### Login Page
Clean authentication interface with sign up/sign in functionality.

### Multi-Step Form
Guides users through personal information, work experience, education, skills, and job description.

### AI Generation
Real-time generation of tailored resume and cover letter based on job requirements.

### Export Options
One-click export to professional PDF format.

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Anthropic API key
- Firebase project

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
NODE_ENV=development
PORT=3001
ANTHROPIC_API_KEY=your_anthropic_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="your_private_key"
FRONTEND_URL=http://localhost:5173
```

Start backend:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:3001
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Start frontend:
```bash
npm run dev
```

Open http://localhost:5173

## 🎯 How It Works

1. **User Input**: Collect personal information, work history, education, and skills
2. **Job Analysis**: Parse job description to identify key requirements
3. **AI Generation**: Claude AI creates tailored content matching job requirements
4. **ATS Optimization**: Ensures resume passes Applicant Tracking Systems
5. **Export**: Generate professional PDF documents

## 🔑 Key Features Explained

### ATS Optimization
- Keyword matching from job descriptions
- Clean, parseable formatting
- Industry-standard section headers
- Metric-focused achievements

### Tone Customization
- **Professional**: Formal, corporate language
- **Modern**: Contemporary, balanced approach
- **Confident**: Strong action verbs and leadership focus
- **Minimal**: Concise, direct communication

### Smart Generation
- Analyzes job requirements
- Matches user experience to role needs
- Generates relevant bullet points
- Creates personalized cover letters

## 📊 Project Structure
```
resume-builder/
├── backend/              # Express API server
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # Business logic
│   │   ├── prompts/     # AI prompt templates
│   │   └── utils/       # Helper functions
│   └── package.json
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API & Firebase
│   │   ├── hooks/       # Custom React hooks
│   │   └── styles/      # Tailwind CSS
│   └── package.json
└── README.md
```

## 🔐 Security

- Firebase Authentication for secure user management
- Environment variables for sensitive data
- Rate limiting on API endpoints
- CORS protection
- Input validation and sanitization

## 🚧 Future Enhancements

- [ ] Multiple resume templates
- [ ] LinkedIn profile import
- [ ] ATS compatibility score
- [ ] Resume history and versioning
- [ ] Job tracking dashboard
- [ ] Interview preparation tips
- [ ] Collaborative editing
- [ ] Premium features (payment integration)

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

Ilf Ali Momin
- GitHub: [@yourusername](https://github.com/Ilf-Ali-Momin)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/ilfali-momin/)

## 🙏 Acknowledgments

- [Anthropic](https://anthropic.com) for Claude AI API
- [Firebase](https://firebase.google.com) for backend services
- [Tailwind CSS](https://tailwindcss.com) for styling
- [React](https://react.dev) for the frontend framework

---

**Built with ❤️ for job seekers everywhere**
