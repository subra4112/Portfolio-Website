import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Github, Heart, ArrowUp } from 'lucide-react'

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const footerLinks = {
    quick: [
      { name: 'About', href: '#about' },
      { name: 'Experience', href: '#experience' },
      { name: 'Projects', href: '#projects' },
      { name: 'Skills', href: '#skills' },
      { name: 'Contact', href: '#contact' }
    ],
    social: [
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/subraraj', icon: <Linkedin size={20} /> },
      { name: 'GitHub', href: 'https://github.com/subra4112', icon: <Github size={20} /> },
      { name: 'Email', href: 'mailto:rvanush3@gmail.com', icon: <Mail size={20} /> }
    ]
  }

  return (
    <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-primary-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold gradient-text mb-4">
                  Subramanian Raj Narayanan
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                  AI/ML Engineer & Data Scientist passionate about building intelligent systems 
                  that solve real-world problems. Currently pursuing MS in Data Science at ASU.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail size={18} className="text-primary-400" />
                  <a href="mailto:rvanush3@gmail.com" className="hover:text-primary-400 transition-colors">
                    rvanush3@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Phone size={18} className="text-primary-400" />
                  <a href="tel:+16027679281" className="hover:text-primary-400 transition-colors">
                    (602) 767-9281
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin size={18} className="text-primary-400" />
                  <span>Tempe, Arizona, USA</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-3">
                {footerLinks.quick.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h4 className="text-lg font-semibold text-white">Connect</h4>
              <div className="space-y-3">
                {footerLinks.social.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-400 hover:text-primary-400 transition-colors duration-200 group"
                  >
                    <div className="group-hover:scale-110 transition-transform duration-200">
                      {social.icon}
                    </div>
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 py-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2 text-gray-500 text-sm"
            >
              <span>© {currentYear} Made with</span>
              <Heart size={14} className="text-red-500 animate-pulse" />
              <span>by Subramanian Raj Narayanan</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 text-sm"
            >
              <span className="text-gray-500">
                Built with React, TypeScript & Tailwind CSS
              </span>
              <motion.button
                onClick={scrollToTop}
                className="flex items-center space-x-1 text-gray-500 hover:text-primary-400 transition-colors duration-200 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Back to top</span>
                <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform duration-200" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-xl hover:shadow-primary-500/40 transition-all duration-300 z-50 flex items-center justify-center border border-primary-500/30"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  )
}

export default Footer
