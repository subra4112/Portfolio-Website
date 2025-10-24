import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, Calendar, Code, Brain, Shield, Cloud, Smartphone } from 'lucide-react'

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const projects = [
    {
      title: "ArcDefense",
      subtitle: "AI Powered Cyber Defense and Threat Detection System",
      date: "August 2025",
      description: "Orchestrated an ML workflow with LSTMs and BERT to detect malware C2 beaconing in DNS/HTTPS traffic, improving identification of stealthy command-and-control activity. Implemented a FastAPI + Streamlit system with real-time log ingestion and model inference, enabling AI-driven cyber defense.",
      technologies: ["Python", "LSTM", "BERT", "FastAPI", "Streamlit", "ML", "Cyber Security"],
      icon: <Shield className="w-8 h-8 text-primary-400" />,
      category: "AI/ML & Security",
      githubUrl: "https://github.com/subra4112/ArcDefender",
      highlights: [
        "Advanced threat detection using deep learning",
        "Real-time log processing and analysis",
        "FastAPI backend with Streamlit frontend"
      ]
    },
    {
      title: "CloudSage",
      subtitle: "AI Mentor for Infrastructure-as-Code",
      date: "August 2025",
      description: "Designed a Streamlit-based tool to analyze Terraform configs using CodeBERT and NLP for detecting IaC anti-patterns and optimization opportunities. Planned features include real-time static analysis, AWS integration, and rule-based best practice recommendations.",
      technologies: ["Python", "CodeBERT", "NLP", "Streamlit", "Terraform", "AWS", "Static Analysis"],
      icon: <Cloud className="w-8 h-8 text-primary-400" />,
      category: "DevOps & AI",
      githubUrl: "https://github.com/subra4112/CloudSage",
      highlights: [
        "CodeBERT integration for config analysis",
        "IaC anti-pattern detection",
        "AWS integration and best practices"
      ]
    },
    {
      title: "EDITH-QA",
      subtitle: "LLM-Powered Mobile App Testing System",
      date: "July 2025",
      description: "Developed a multi-agent testing system using Agent-S and android_world, enabling LLM-powered Planner, Executor, Verifier, and Supervisor agents to simulate and verify mobile UI tasks. Successfully tested tasks like toggling Wi-Fi and enabling Airplane Mode, with structured output logs for QA audit.",
      technologies: ["Python", "LLM", "Multi-Agent", "Mobile Testing", "QA", "Agent-S", "Android"],
      icon: <Smartphone className="w-8 h-8 text-primary-400" />,
      category: "AI & Testing",
      githubUrl: "https://github.com/subra4112/EDITH-QA",
      highlights: [
        "Multi-agent LLM system architecture",
        "Automated mobile UI testing",
        "Structured QA audit logging"
      ]
    },
    {
      title: "AskNeo",
      subtitle: "AI Query Engine with Knowledge Graphs and Semantic Search",
      date: "June 2025",
      description: "Engineered a hybrid RAG system using Neo4j (3K+ nodes, 12K+ edges), ChromaDB, and GPT-4 via LangChain to enable multi-hop semantic and graph-based question answering. Designed a Streamlit UI with voice input and prompt tuning, benchmarking LLM output using ROUGE, BLEU, and cosine similarity.",
      technologies: ["Neo4j", "ChromaDB", "GPT-4", "LangChain", "RAG", "Streamlit", "NLP"],
      icon: <Brain className="w-8 h-8 text-primary-400" />,
      category: "AI & Knowledge Graphs",
      githubUrl: "https://github.com/subra4112/AskNeo-Smart-Health-Assistant",
      highlights: [
        "Hybrid RAG system with graph databases",
        "Multi-hop semantic question answering",
        "Voice input and comprehensive evaluation metrics"
      ]
    }
  ]

  const getCategoryColor = (category: string) => {
    const colors = {
      "AI/ML & Security": "bg-red-500/20 text-red-400 border-red-500/30",
      "DevOps & AI": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "AI & Testing": "bg-green-500/20 text-green-400 border-green-500/30",
      "AI & Knowledge Graphs": "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "Mobile & AI": "bg-orange-500/20 text-orange-400 border-orange-500/30"
    }
    return colors[category as keyof typeof colors] || "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }

  return (
    <section id="projects" className="section-padding bg-dark-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Innovative AI/ML solutions and full-stack applications solving real-world problems
          </p>
        </motion.div>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="glass-effect rounded-xl p-4 sm:p-6 lg:p-8 hover-lift group"
            >
              <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
                {/* Project Header */}
                <div className="lg:col-span-1">
                  <div className="flex items-center space-x-3 mb-4">
                    {project.icon}
                    <div className="flex-1">
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <h4 className="text-lg text-primary-400 mb-3">{project.subtitle}</h4>
                  <div className="flex items-center text-gray-400 mb-4">
                    <Calendar size={16} className="mr-2" />
                    <span className="text-sm">{project.date}</span>
                  </div>
                  <div className="flex space-x-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 hover:text-primary-200 px-3 py-2 rounded-lg border border-primary-500/30 hover:border-primary-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20"
                    >
                      <Github size={18} />
                      <span className="text-sm font-medium">Code</span>
                    </a>
                  </div>
                </div>

                {/* Project Description */}
                <div className="lg:col-span-2">
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Key Highlights */}
                  <div className="mb-6">
                    <h5 className="text-sm font-semibold text-white mb-3 flex items-center">
                      <Code size={16} className="mr-2" />
                      Key Highlights
                    </h5>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-300 text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm border border-primary-500/30 hover:bg-primary-500/30 transition-colors"
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

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="glass-effect rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Interested in collaborating?
            </h3>
            <p className="text-gray-400 mb-6">
              I'm always excited to work on new projects and explore innovative solutions
            </p>
            <a
              href="https://github.com/subra4112"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover-lift"
            >
              <Github size={20} />
              <span>View All Projects</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
