import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Calendar, ExternalLink } from 'lucide-react'

const Experience: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const experiences = [
    {
      title: "AI/ML Engineer Intern",
      company: "Vera AI",
      location: "St. Petersburg, Florida (Remote)",
      period: "July 2025 – August 2025",
      type: "Previous",
      description: [
        "Developed ML features, 3D visualizations, and full-stack modules for VeraAI's AI-driven SaaS platform",
        "Collaborated with cross-functional teams and CTO on QA, infrastructure tools, and agile product cycles",
        "Implemented advanced AI models for real-time data processing and visualization"
      ],
      technologies: ["Python", "ML", "3D Visualization", "SaaS", "Agile"]
    },
    {
      title: "Software Engineer - Trainee",
      company: "Techavidity Business Solutions",
      location: "Frisco, Texas (Remote)",
      period: "June 2025 – August 2025",
      type: "Previous",
      description: [
        "Built Neo4j-based knowledge graphs (10K+ entities) and Python data pipelines with Git and CrateDB for real-time graph operations",
        "Reduced query latency <200ms for 1K+ users via multithreaded graph resolution and entity linking",
        "Optimized database performance and implemented scalable data processing workflows"
      ],
      technologies: ["Neo4j", "Python", "CrateDB", "Knowledge Graphs", "Git"]
    },
    {
      title: "Research Intern",
      company: "Centre of Electric Mobility SRMIST",
      location: "Chennai, India",
      period: "September 2023 – February 2024",
      type: "Previous",
      description: [
        "Automated vehicle routing and backend logic optimization for 5,000+ users using Python, SQL, and distributed multi-threaded workflows",
        "Reduced latency by 18% and ensured high-load scalability with fault tolerance",
        "Developed efficient algorithms for real-time vehicle tracking and route optimization"
      ],
      technologies: ["Python", "SQL", "Multi-threading", "Vehicle Routing", "Optimization"]
    }
  ]

  return (
    <section id="experience" className="section-padding bg-dark-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Professional <span className="gradient-text text-glow">Experience</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Building intelligent systems and solving complex problems across AI, ML, and software engineering
          </motion.p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-dark-900 border border-gray-700 rounded-xl p-6 hover-lift"
            >
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Company Info */}
                <div className="lg:col-span-1">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      exp.type === 'Current' 
                        ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/50' 
                        : 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-400 border border-gray-500/50'
                    }`}>
                      {exp.type}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{exp.title}</h3>
                  <div className="flex items-center text-primary-400 font-semibold mb-2">
                    <span>{exp.company}</span>
                    <ExternalLink size={16} className="ml-2" />
                  </div>
                  <div className="flex items-center text-gray-400 mb-1">
                    <MapPin size={14} className="mr-2" />
                    <span className="text-sm">{exp.location}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Calendar size={14} className="mr-2" />
                    <span className="text-sm">{exp.period}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="lg:col-span-2">
                  <ul className="space-y-4 mb-8">
                    {exp.description.map((desc, descIndex) => (
                      <motion.li 
                        key={descIndex} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.2 + descIndex * 0.1 }}
                      >
                        <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 bg-primary-400"></div>
                        <span className="text-white leading-relaxed">{desc}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-3">
                    {exp.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="px-3 py-1 rounded-full text-sm bg-primary-600/20 text-primary-300 border border-primary-600/30"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.3, delay: index * 0.2 + techIndex * 0.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 glass-effect rounded-xl p-8 hover-lift border-glow"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-2">
              Education & <span className="gradient-text">Leadership</span>
            </h3>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-primary-400">Education</h4>
              </div>
              
              <div className="space-y-6">
                <div className="bg-black/30 rounded-lg p-6 border border-gray-800/50 hover:border-primary-500/30 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-white mb-1">Master of Science, Data Science, Analytics and Engineering</h5>
                      <p className="text-primary-400 font-semibold mb-2">Arizona State University</p>
                      <p className="text-gray-400 text-sm mb-3">Tempe, Arizona, USA</p>
                    </div>
                    <div className="bg-primary-500/20 text-primary-400 px-3 py-1 rounded-full text-sm font-medium">
                      Expected May 2026
                    </div>
                  </div>
                  <div className="text-gray-300 text-sm">
                    <p className="mb-2"><span className="text-primary-400 font-medium">Key Coursework:</span></p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-primary-500/20 text-primary-300 px-2 py-1 rounded text-xs">Data Processing at Scale</span>
                      <span className="bg-primary-500/20 text-primary-300 px-2 py-1 rounded text-xs">Statistical Machine Learning</span>
                      <span className="bg-primary-500/20 text-primary-300 px-2 py-1 rounded text-xs">Data Mining</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/30 rounded-lg p-6 border border-gray-800/50 hover:border-primary-500/30 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-white mb-1">Bachelor of Technology, Computer Science Engineering</h5>
                      <p className="text-primary-400 font-semibold mb-2">SRM Institute of Science and Technology</p>
                      <p className="text-gray-400 text-sm mb-3">Chennai, India</p>
                    </div>
                    <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                      Expected May 2024
                    </div>
                  </div>
                  <div className="text-gray-300 text-sm">
                    <p className="mb-2"><span className="text-primary-400 font-medium">Key Coursework:</span></p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-primary-500/20 text-primary-300 px-2 py-1 rounded text-xs">Artificial Intelligence</span>
                      <span className="bg-primary-500/20 text-primary-300 px-2 py-1 rounded text-xs">Information Visualization</span>
                      <span className="bg-primary-500/20 text-primary-300 px-2 py-1 rounded text-xs">Computer Architecture</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Leadership Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-primary-400">Leadership Experience</h4>
              </div>
              
              <div className="space-y-6">
                <div className="bg-black/30 rounded-lg p-6 border border-gray-800/50 hover:border-primary-500/30 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-white mb-1">Director of Finance</h5>
                      <p className="text-primary-400 font-semibold mb-2">Engineering International Student Association</p>
                      <p className="text-gray-400 text-sm mb-3">Arizona State University, Tempe, USA</p>
                    </div>
                    <div className="bg-primary-500/20 text-primary-400 px-3 py-1 rounded-full text-sm font-medium">
                      Current
                    </div>
                  </div>
                  <div className="text-gray-300 text-sm">
                    <p className="mb-2"><span className="text-primary-400 font-medium">Duration:</span> May 2025 – Present</p>
                    <p className="text-gray-400">Managing financial operations and budget planning for the largest international student organization at ASU, serving 5,000+ engineering students.</p>
                  </div>
                </div>
                
                <div className="bg-black/30 rounded-lg p-6 border border-gray-800/50 hover:border-primary-500/30 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-white mb-1">Operations Team Officer</h5>
                      <p className="text-primary-400 font-semibold mb-2">The AI Society at ASU</p>
                      <p className="text-gray-400 text-sm mb-3">Arizona State University, Tempe, USA</p>
                    </div>
                    <div className="bg-primary-500/20 text-primary-400 px-3 py-1 rounded-full text-sm font-medium">
                      Current
                    </div>
                  </div>
                  <div className="text-gray-300 text-sm">
                    <p className="mb-2"><span className="text-primary-400 font-medium">Duration:</span> July 2025 – Present</p>
                    <p className="text-gray-400">Coordinating operational activities and event management for ASU's premier AI research and development community.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
