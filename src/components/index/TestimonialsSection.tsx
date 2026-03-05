
import React from 'react';
import { MessageCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "The AI detector helped me ensure my students' work is authentic. It's now an essential part of my academic integrity toolkit.",
      author: "Dr. Sarah Johnson",
      title: "University Professor",
      avatar: "SJ",
      gradient: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      border: "border-blue-200 dark:border-blue-800"
    },
    {
      quote: "I use the grammar checker daily for my content agency. It's caught errors that other tools missed and significantly improved our output quality.",
      author: "Mark Williams",
      title: "Content Agency Owner",
      avatar: "MW",
      gradient: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
      border: "border-purple-200 dark:border-purple-800"
    },
    {
      quote: "The paraphrasing tool has been a game changer for updating our knowledge base articles quickly while maintaining their meaning.",
      author: "Lisa Chen",
      title: "Technical Writer",
      avatar: "LC",
      gradient: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
      border: "border-green-200 dark:border-green-800"
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See why content professionals choose our tools for their writing workflow
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-xl border shadow-sm ${testimonial.border} ${testimonial.gradient} relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
            >
              <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
              <MessageCircle className="absolute right-6 top-6 h-6 w-6 text-primary/20" />
              <div className="relative z-10">
                <p className="mb-6 text-foreground/90">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
