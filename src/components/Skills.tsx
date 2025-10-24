import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Database, Cloud, Brain, Cpu, Palette, Users } from 'lucide-react'

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const skillCategories = [
    {
      title: "Core Programming",
      icon: <Code className="w-8 h-8 text-primary-400" />,
      skills: [
        { name: "Python", level: 95, color: "bg-blue-500" },
        { name: "SQL", level: 90, color: "bg-red-500" },
        { name: "Java", level: 85, color: "bg-orange-500" }
      ]
    },
    {
      title: "AI/ML & GenAI",
      icon: <Brain className="w-8 h-8 text-primary-400" />,
      skills: [
        { name: "OpenAI GPT-4", level: 95, color: "bg-green-500" },
        { name: "LangChain", level: 90, color: "bg-yellow-500" },
        { name: "RAG Pipelines", level: 95, color: "bg-purple-500" },
        { name: "TensorFlow/PyTorch", level: 80, color: "bg-red-600" }
      ]
    },
    {
      title: "Data & Knowledge Graphs",
      icon: <Database className="w-8 h-8 text-primary-400" />,
      skills: [
        { name: "Neo4j", level: 90, color: "bg-green-600" },
        { name: "ChromaDB", level: 85, color: "bg-purple-600" },
        { name: "PostgreSQL", level: 85, color: "bg-blue-800" }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="w-8 h-8 text-primary-400" />,
      skills: [
        { name: "AWS", level: 85, color: "bg-orange-500" },
        { name: "Docker", level: 85, color: "bg-blue-600" },
        { name: "FastAPI", level: 90, color: "bg-green-500" }
      ]
    }
  ]

  const softSkills = [
    { name: "Problem Solving", icon: "🔧" },
    { name: "Collaboration", icon: "🤝" },
    { name: "Communication", icon: "💬" },
    { name: "Analytical Thinking", icon: "🧠" },
    { name: "Adaptability", icon: "🔄" }
  ]

  return (
    <section id="skills" className="section-padding bg-dark-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive toolkit spanning AI/ML, data engineering, and full-stack development
          </p>
        </motion.div>

        {/* Technical Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              className="glass-effect rounded-xl p-4 sm:p-6 hover-lift"
            >
              <div className="flex items-center space-x-3 mb-6">
                {category.icon}
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-primary-400 text-sm font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-dark-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 0.3 }}
                        className={`h-2 rounded-full ${skill.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-effect rounded-xl p-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Users className="w-8 h-8 text-primary-400" />
            <h3 className="text-2xl font-bold text-white">Soft Skills & Professional Attributes</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {softSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + (index * 0.05) }}
                className="bg-dark-800/50 border border-dark-700/50 rounded-lg p-4 text-center hover:border-primary-500/30 transition-all duration-300 hover-lift"
              >
                <div className="text-2xl mb-2">{skill.icon}</div>
                <div className="text-gray-300 text-sm font-medium">{skill.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <div className="glass-effect rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary-400 mb-2">15+</div>
            <div className="text-gray-300">Core Technologies</div>
          </div>
          <div className="glass-effect rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary-400 mb-2">95%</div>
            <div className="text-gray-300">Expert in AI/ML Stack</div>
          </div>
          <div className="glass-effect rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary-400 mb-2">100%</div>
            <div className="text-gray-300">Continuous Learning</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
