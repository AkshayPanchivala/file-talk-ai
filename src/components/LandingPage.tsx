import { motion } from 'framer-motion';
import { FaFilePdf, FaComments, FaLightbulb, FaRobot, FaArrowRight, FaStar, FaBrain, FaRocket } from 'react-icons/fa';
import { ThemeToggle } from './ThemeToggle';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto scroll-container bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 relative">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-indigo-400 dark:bg-indigo-600 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/3 -right-1/4 w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute -bottom-1/4 left-1/3 w-96 h-96 bg-pink-400 dark:bg-pink-600 rounded-full blur-3xl"
        />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-7xl w-full">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            {/* Floating Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="relative inline-block mb-8"
            >
              <motion.div
                animate={floatingAnimation}
                className="relative"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-50" />

                {/* Icon Container with Glassmorphism */}
                <div className="relative bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-full p-8 border border-white/30 dark:border-gray-700/30 shadow-2xl">
                  <FaRobot className="text-7xl md:text-9xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent" />

                  {/* Stars */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-2 -right-2"
                  >
                    <FaStar className="text-3xl text-yellow-400" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-2 -left-2"
                  >
                    <FaStar className="text-2xl text-pink-400" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  File Talk AI
                </span>
              </h1>
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div
                  animate={pulseAnimation}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white text-sm font-semibold shadow-lg"
                >
                  <FaBrain className="inline mr-2" />
                  AI-Powered
                </motion.div>
                <motion.div
                  animate={pulseAnimation}
                  style={{ animationDelay: '0.5s' }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-sm font-semibold shadow-lg"
                >
                  <FaRocket className="inline mr-2" />
                  Lightning Fast
                </motion.div>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-3xl text-gray-700 dark:text-gray-200 mb-10 max-w-4xl mx-auto font-light leading-relaxed"
            >
              Transform your documents into <span className="font-bold text-indigo-600 dark:text-indigo-400">interactive conversations</span>.
              <br />
              Upload, analyze, and extract insights with the power of AI.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={onGetStarted}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold py-5 px-14 rounded-full text-xl shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Get Started Free</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10"
              >
                <FaArrowRight />
              </motion.div>

              {/* Animated gradient overlay */}
              <motion.div
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.button>

            {/* Trust Badge */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-6 text-sm text-gray-500 dark:text-gray-400"
            >
              No credit card required • Free to start • Secure & Private
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {/* Feature 1 */}
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl p-6 border border-white/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon and Title on Same Line */}
              <div className="relative flex items-center gap-4 mb-4">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-lg flex-shrink-0"
                >
                  <FaFilePdf className="text-2xl text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Upload & Analyze
                </h3>
              </div>

              {/* Description */}
              <p className="relative text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                Drop your PDFs and watch our AI instantly process and understand your documents in seconds.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl p-6 border border-white/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon and Title on Same Line */}
              <div className="relative flex items-center gap-4 mb-4">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg flex-shrink-0"
                >
                  <FaComments className="text-2xl text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Interactive Q&A
                </h3>
              </div>

              {/* Description */}
              <p className="relative text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                Have natural conversations with your documents. Ask anything and get accurate, instant answers.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl p-6 border border-white/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-indigo-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon and Title on Same Line */}
              <div className="relative flex items-center gap-4 mb-4">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pink-500 to-indigo-500 rounded-2xl shadow-lg flex-shrink-0"
                >
                  <FaLightbulb className="text-2xl text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Smart Insights
                </h3>
              </div>

              {/* Description */}
              <p className="relative text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                Auto-generate summaries and study questions. Extract key information effortlessly.
              </p>
            </motion.div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="text-center mt-20"
          >
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 font-medium">
              Join thousands of users transforming their document workflow
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Secure & Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span>No Setup Required</span>
              </div>
            </div>
          </motion.div>

          {/* Bottom Spacing for Fixed Footer */}
          <div className="h-16" />
        </div>
      </div>

      {/* Fixed Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-white/90 via-indigo-50/90 to-purple-50/90 dark:from-gray-900/90 dark:via-indigo-950/90 dark:to-purple-950/90 backdrop-blur-lg border-t border-indigo-200/50 dark:border-indigo-800/50 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Left - Copyright */}
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <FaRobot className="text-base bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse" />
              <span className="font-medium">© 2025 File Talk AI</span>
            </div>

            {/* Center - Made with love */}
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
              <span>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                className="text-red-500"
              >
                ❤️
              </motion.span>
              <span>by</span>
              <a
                href="https://akshaypanchivala.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Akshay Panchivala
              </a>
            </div>

            {/* Right - Contact */}
            <a
              href="https://akshaypanchivala.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-xs font-semibold hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;
