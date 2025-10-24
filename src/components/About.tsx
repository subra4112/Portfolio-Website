import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Award, Target, Users } from 'lucide-react'

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const achievements = [
    {
      icon: <GraduationCap className="w-8 h-8 text-primary-400" />,
      title: "Dual Education",
      description: "MS Data Science @ ASU (Expected 2026) | BTech CSE @ SRMIST (2024)"
    },
    {
      icon: <Award className="w-8 h-8 text-primary-400" />,
      title: "Leadership Roles",
      description: "Director of Finance @ EISA | Operations Officer @ AI Society"
    },
    {
      icon: <Target className="w-8 h-8 text-primary-400" />,
      title: "Performance Impact",
      description: "Reduced latency by 18% and improved query performance <200ms"
    },
    {
      icon: <Users className="w-8 h-8 text-primary-400" />,
      title: "Scale Experience",
      description: "Built systems serving 5,000+ users with 10K+ knowledge graph entities"
    }
  ]

  return (
    <section id="about" className="section-padding bg-dark-900">
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
            About <span className="gradient-text text-glow">Me</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A passionate AI/ML engineer with expertise in data science, scalable data engineering, and full-stack development, exploring GenAI and agentic AI for real-world impact.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">My Journey</h3>
              <p className="text-white leading-relaxed text-justify">
              I am currently pursuing my Master's in Data Science at Arizona State University, where I focus on large-scale data processing, machine learning, and advanced AI systems. I have hands-on experience as an AI/ML Engineer Intern at Vera AI, where I built ML features, 3D visualizations, and full-stack modules for an AI-driven SaaS platform, and as a Software Engineer Trainee at Techavidity, where I developed Neo4j-based knowledge graphs and Python data pipelines that powered real-time graph operations for 1,000+ users.
              </p>
              <p className="text-white leading-relaxed text-justify">
              My passion lies in building intelligent, production-ready systems that bridge research and real-world implementation. I have worked on projects spanning GenAI, agentic AI, knowledge graphs, cyber defense, and large-scale data engineering pipelines. Whether it's developing LLM-powered mobile testing agents, AI-driven SaaS features, or hybrid RAG systems like AskNeo, I thrive at the intersection of AI innovation, scalability, and practical impact.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-dark-900 border border-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-400">2+</div>
                <div className="text-sm text-white">Years Experience</div>
              </div>
              <div className="bg-dark-900 border border-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-400">10+</div>
                <div className="text-sm text-white">Projects Built</div>
              </div>
              <div className="bg-dark-900 border border-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-400">15+</div>
                <div className="text-sm text-white">Technologies</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid gap-6"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-dark-900 border border-gray-700 rounded-lg p-6 hover-lift"
              >
                <div className="flex items-start space-x-4">
                  {achievement.icon}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {achievement.title}
                    </h4>
                    <p className="text-white">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
