import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "The AI detector helped me ensure my students' work is authentic. It's now an essential part of my academic integrity toolkit.",
      author: "Dr. Sarah Johnson",
      title: "University Professor",
      avatar: "SJ",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600"
    },
    {
      quote: "I use the grammar checker daily for my content agency. It's caught errors that other tools missed and significantly improved our output quality.",
      author: "Mark Williams",
      title: "Content Agency Owner",
      avatar: "MW",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600"
    },
    {
      quote: "The summarizer and translator combined have been game changers for analyzing international research papers quickly.",
      author: "Lisa Chen",
      title: "Technical Researcher",
      avatar: "LC",
      bgColor: "bg-rose-50",
      textColor: "text-rose-600"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium mb-6"
          >
            <div className="flex gap-1 mr-2 text-amber-400">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            Rated 4.9/5 by 10,000+ users
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6"
          >
            Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">Professionals</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="absolute top-1/2 left-0 w-full h-[300px] -translate-y-1/2 bg-gradient-to-r from-indigo-50/50 via-violet-50/50 to-pink-50/50 blur-3xl -z-10 rounded-full" />

          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/40 relative flex flex-col h-full hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex-grow">
                <div className="flex gap-1 mb-6 text-amber-400">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center mt-auto">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-4 ${testimonial.bgColor} ${testimonial.textColor}`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 flex items-center gap-1">
                    {testimonial.author}
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </h4>
                  <p className="text-sm text-slate-500">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
