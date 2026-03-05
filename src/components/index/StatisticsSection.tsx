
import React from 'react';
import { Users, FileText, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const StatisticsSection: React.FC = () => {
  const stats = [
    { icon: <Users className="h-8 w-8 text-primary" />, value: "75,000+", label: "Professional Writers" },
    { icon: <FileText className="h-8 w-8 text-primary" />, value: "3.2 Million", label: "Words Analyzed Daily" },
    { icon: <Clock className="h-8 w-8 text-primary" />, value: "112,000+", label: "Hours Saved" },
    { icon: <Star className="h-8 w-8 text-primary" />, value: "4.8/5", label: "Average User Rating" }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">Trusted by Content Professionals</span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full"></div>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            Join thousands of writers, marketers, and publishers who rely on our tools every day
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center text-center p-6 rounded-xl border bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-3 p-3 rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">{stat.value}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
