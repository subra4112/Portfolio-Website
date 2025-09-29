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
      period: "July 2025 – Present",
      type: "Current",
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
      period: "June 2025 – Present",
      type: "Current",
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
    <section id="experience" className="section-padding bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Building intelligent systems and solving complex problems across AI, ML, and software engineering
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass-effect rounded-xl p-8 hover-lift"
            >
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Company Info */}
                <div className="lg:col-span-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      exp.type === 'Current' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}>
                      {exp.type}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                  <div className="flex items-center text-primary-400 font-semibold mb-3">
                    <span>{exp.company}</span>
                    <ExternalLink size={16} className="ml-2" />
                  </div>
                  <div className="flex items-center text-gray-400 mb-2">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">{exp.location}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Calendar size={16} className="mr-2" />
                    <span className="text-sm">{exp.period}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="lg:col-span-2">
                  <ul className="space-y-3 mb-6">
                    {exp.description.map((desc, descIndex) => (
                      <li key={descIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-300">{desc}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm border border-primary-500/30"
                      >
                        {tech}
                      </span>
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
          className="mt-16 glass-effect rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Education & <span className="gradient-text">Leadership</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-primary-400">Education</h4>
              <div className="space-y-4">
                <div>
                  <div className="font-semibold text-white">Master of Science, Data Science, Analytics and Engineering</div>
                  <div className="text-gray-400">Arizona State University, Tempe, USA</div>
                  <div className="text-sm text-gray-500">Expected Graduation: May 2026</div>
                  <div className="text-sm text-gray-400 mt-1">Coursework: Data Processing at Scale, Statistical Machine Learning, Data Mining</div>
                </div>
                <div>
                  <div className="font-semibold text-white">Bachelor of Technology, Computer Science Engineering</div>
                  <div className="text-gray-400">SRM Institute of Science and Technology, Chennai, India</div>
                  <div className="text-sm text-gray-500">Expected Graduation: May 2024</div>
                  <div className="text-sm text-gray-400 mt-1">Coursework: Artificial Intelligence, Information and Visualization, Computer Architecture</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-primary-400">Leadership Experience</h4>
              <div className="space-y-4">
                <div>
                  <div className="font-semibold text-white">Director of Finance</div>
                  <div className="text-gray-400">Engineering International Student Association, ASU</div>
                  <div className="text-sm text-gray-500">May 2025 – Present</div>
                </div>
                <div>
                  <div className="font-semibold text-white">Operations Team Officer</div>
                  <div className="text-gray-400">The AI Society at ASU</div>
                  <div className="text-sm text-gray-500">July 2025 – Present</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
