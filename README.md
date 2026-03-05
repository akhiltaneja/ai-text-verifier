# AI Text Verifier

A powerful AI-powered content analysis platform that helps detect AI-generated text, check grammar, paraphrase content, translate text, and summarize documents.

![AI Text Verifier](https://img.shields.io/badge/AI-Text%20Verifier-blue)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3FCF8E?logo=supabase)

## ✨ Features

### 🔍 AI Content Detection
- Analyze text to determine if it's AI-generated or human-written
- Sentence-by-sentence analysis with highlighting
- Confidence scores and detailed reports
- Support for multiple languages

### ✏️ Grammar Checker
- Advanced grammar and spelling correction
- Style and clarity suggestions
- Detailed error explanations
- Export reports as PDF

### 🔄 Paraphrasing Tool
- Rewrite content in different styles
- Maintain original meaning while improving clarity
- Multiple tone options (formal, casual, academic)

### 🌐 Translation Tool
- Translate text between multiple languages
- Preserve formatting and context
- High-quality AI-powered translations

### 📝 AI Summary Tool
- Summarize long documents quickly
- Extract key points and main ideas
- Adjustable summary length

### 💳 Premium Features
- Stripe payment integration
- PayPal checkout support
- Subscription management
- Credit-based usage system

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui
- **Backend:** Supabase (Edge Functions, Database, Auth)
- **Payments:** Stripe, PayPal
- **State Management:** React Context, TanStack Query
- **Animations:** Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (for backend features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd ai-text-verifier
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ai-detector/     # AI detection components
│   │   ├── ai-summary/      # Summarization components
│   │   ├── grammar-checker/ # Grammar checking components
│   │   ├── paraphrasing/    # Paraphrasing components
│   │   ├── translation/     # Translation components
│   │   ├── ui/              # shadcn/ui components
│   │   └── ...
│   ├── context/             # React context providers
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   ├── services/            # API service functions
│   ├── translations/        # i18n translation files
│   └── types/               # TypeScript type definitions
├── supabase/
│   └── functions/           # Supabase Edge Functions
│       ├── grammar-check/
│       ├── translate/
│       ├── zerogpt-detect/
│       ├── zerogpt-summarize/
│       └── ...
└── ...
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🌍 Supported Languages

The application supports multiple interface languages:
- 🇺🇸 English
- 🇪🇸 Spanish
- 🇫🇷 French
- 🇩🇪 German
- 🇨🇳 Chinese

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Supabase](https://supabase.com/) - Backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library

---

<p align="center">
  Made with ❤️ using <a href="https://lovable.dev">Lovable</a>
</p>
