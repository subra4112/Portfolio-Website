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
      title: "Programming Languages",
      icon: <Code className="w-8 h-8 text-primary-400" />,
      skills: [
        { name: "Python", level: 95, color: "bg-blue-500" },
        { name: "Java", level: 85, color: "bg-orange-500" },
        { name: "C++", level: 80, color: "bg-blue-600" },
        { name: "SQL", level: 90, color: "bg-red-500" },
        { name: "Flutter/Dart", level: 75, color: "bg-cyan-500" }
      ]
    },
    {
      title: "AI/ML & Data Science",
      icon: <Brain className="w-8 h-8 text-primary-400" />,
      skills: [
        { name: "OpenAI GPT-4", level: 95, color: "bg-green-500" },
        { name: "LangChain", level: 90, color: "bg-yellow-500" },
        { name: "Scikit-learn", level: 85, color: "bg-orange-600" },
        { name: "TensorFlow", level: 80, color: "bg-red-600" },
        { name: "PyTorch", level: 80, color: "bg-orange-700" },
        { name: "Streamlit", level: 90, color: "bg-red-400" },
        { name: "RAG Pipelines", level: 95, color: "bg-purple-500" },
        { name: "NLP", level: 85, color: "bg-indigo-500" }
      ]
    },
    {
      title: "Databases & Visualization",
      icon: <Database className="w-8 h-8 text-primary-400" />,
      skills: [
        { name: "Neo4j", level: 90, color: "bg-green-600" },
        { name: "Milvus", level: 75, color: "bg-blue-700" },
        { name: "ChromaDB", level: 85, color: "bg-purple-600" },
        { name: "PostgreSQL", level: 85, color: "bg-blue-800" },
        { name: "MongoDB", level: 80, color: "bg-green-700" },
        { name: "Power BI", level: 75, color: "bg-yellow-600" },
        { name: "Tableau", level: 70, color: "bg-orange-500" }
      ]
    },
    {
      title: "Cloud & Data Engineering",
      icon: <Cloud className="w-8 h-8 text-primary-400" />,
      skills: [
        { name: "PySpark", level: 80, color: "bg-orange-600" },
        { name: "Kafka", level: 75, color: "bg-red-500" },
        { name: "Airflow", level: 80, color: "bg-cyan-600" },
        { name: "AWS (SageMaker, Redshift)", level: 85, color: "bg-orange-500" },
        { name: "Snowflake", level: 75, color: "bg-blue-500" },
        { name: "Data Built Tool (dbt)", level: 70, color: "bg-pink-500" }
      ]
    },
    {
      title: "DevOps & APIs",
      icon: <Cpu className="w-8 h-8 text-primary-400" />,
      skills: [
        { name: "Git", level: 90, color: "bg-orange-600" },
        { name: "Docker", level: 85, color: "bg-blue-600" },
        { name: "Kubernetes", level: 70, color: "bg-blue-700" },
        { name: "Linux", level: 80, color: "bg-yellow-700" },
        { name: "FastAPI", level: 90, color: "bg-green-500" },
        { name: "CI/CD", level: 75, color: "bg-purple-600" }
      ]
    },
    {
      title: "Specialized Tools",
      icon: <Palette className="w-8 h-8 text-primary-400" />,
      skills: [
        { name: "PaddleOCR", level: 85, color: "bg-red-600" },
        { name: "LayoutLM", level: 80, color: "bg-green-600" },
        { name: "Text Detection & Parsing", level: 90, color: "bg-blue-600" },
        { name: "ROUGE/BLEU Evaluation", level: 85, color: "bg-purple-600" }
      ]
    }
  ]

  const softSkills = [
    { name: "Analytical Thinking", icon: "🧠" },
    { name: "Problem Solving", icon: "🔧" },
    { name: "Collaboration", icon: "🤝" },
    { name: "Communication", icon: "💬" },
    { name: "Initiative", icon: "🚀" },
    { name: "Adaptability", icon: "🔄" },
    { name: "Data-Driven Decision Making", icon: "📊" }
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
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              className="glass-effect rounded-xl p-6 hover-lift"
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
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
            <div className="text-3xl font-bold text-primary-400 mb-2">40+</div>
            <div className="text-gray-300">Technologies Mastered</div>
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
