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
      description: "MS Data Science @ ASU (2026) & BTech CSE @ SRMIST (2024)"
    },
    {
      icon: <Award className="w-8 h-8 text-primary-400" />,
      title: "Leadership Roles",
      description: "Director of Finance @ EISA & Operations Officer @ AI Society"
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
    <section id="about" className="section-padding bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A passionate AI/ML engineer with a strong foundation in data science and full-stack development
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">My Journey</h3>
              <p className="text-gray-300 leading-relaxed">
                Currently pursuing my Master's in Data Science at Arizona State University while working 
                as an AI/ML Engineer Intern at Vera AI and Software Engineer Trainee at Techavidity. 
                My passion lies in building intelligent systems that solve complex real-world problems.
              </p>
              <p className="text-gray-300 leading-relaxed">
                With expertise spanning from neural networks and knowledge graphs to full-stack development 
                and cloud infrastructure, I enjoy the intersection of AI research and practical implementation. 
                I'm particularly drawn to challenges involving large-scale data processing, real-time systems, 
                and innovative AI applications.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-effect rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-400">2+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="glass-effect rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-400">10+</div>
                <div className="text-sm text-gray-400">Projects Built</div>
              </div>
              <div className="glass-effect rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-400">5K+</div>
                <div className="text-sm text-gray-400">Users Served</div>
              </div>
              <div className="glass-effect rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-400">15+</div>
                <div className="text-sm text-gray-400">Technologies</div>
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
                className="glass-effect rounded-lg p-6 hover-lift"
              >
                <div className="flex items-start space-x-4">
                  {achievement.icon}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {achievement.title}
                    </h4>
                    <p className="text-gray-300">
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
