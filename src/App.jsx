import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Linkedin, Github, Twitter, ExternalLink } from "lucide-react"; // Import social icons

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set()); // Tracks which sections are currently visible
  // Competitive Programming Profiles (DECLARED INSIDE THE COMPONENT)
  const cpProfiles = [
    {
      name: "LeetCode",
      url: "https://leetcode.com/u/227r1a66e1/",
      rating: "1,417",
      icon: Github,
      color: "text-gray-400",
    }, // Replace with actual rating/icon if available
    {
      name: "Codeforces",
      url: "https://codeforces.com/profile/chetanpdf",
      rating: "780",
      icon: Github,
      color: "text-yellow-400",
    }, // Replace with actual rating/icon if available
    {
      name: "CodeChef",
      url: "https://www.codechef.com/users/chetanphp",
      rating: "1085",
      icon: Github,
      color: "text-blue-400",
    }, // Replace with actual rating/icon if available
  ];
  const texts = [
    "Web Developer",
    "AI & ML Enthusiast",
    "Learner",
    "Problem Solver",
  ]; // More concise and professional titles
  const observerRef = useRef();
  const sectionRefs = useRef({}); // To store refs for each section

  // Scroll tracking for parallax effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for section visibility and animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(sectionId)); // Add section ID to state
          } else {
            // Optional: Remove section from state if you want animations to re-trigger
            // setVisibleSections(prev => { const next = new Set(prev); next.delete(sectionId); return next; });
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    // Observe all sections with an ID
    Object.keys(sectionRefs.current).forEach((id) => {
      if (sectionRefs.current[id]) {
        observerRef.current.observe(sectionRefs.current[id]);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []); // Run only once on mount

  // Typing animation
  useEffect(() => {
    const typeText = () => {
      if (charIndex < texts[currentIndex].length) {
        setDisplayText((prev) => prev + texts[currentIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        // Pause before clearing and moving to the next text
        setTimeout(() => {
          setDisplayText("");
          setCharIndex(0);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }, 1500); // Pause for 1.5 seconds
      }
    };

    // Only start the timeout if we are actually typing
    if (texts[currentIndex].length > 0) {
      const timer = setTimeout(typeText, 70); // Slightly faster typing
      return () => clearTimeout(timer);
    }
  }, [charIndex, currentIndex, texts]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); // Close menu after clicking a link
  };

  const projects = [
    {
      title: "Chatbot using Gemini API",
      image: "chatbot.png",
      tech: "Gemini API, React JS, Node.js, Express Js",
      github: "https://github.com/CodeHalcyon/gemini_chatbot",
      demo: "https://gemini-chatbot-two-red.vercel.app/",
      description:
        "A website for the CodeOholics community to manage their events and their online presence.",
    },
    {
      title: "Chatbot using Deep Learning",
      image: "deeplearning.png",
      tech: "Python, Deep learning, Neural Networks, NLP",
      github: "https://github.com/CodeHalcyon/Deep-Learning-Chatbot",
      description:
        "A chatbot for an university answering queries related to the university. Helpful for Professor and Students.",
    },
    {
      title: "CodeOholics Website",
      image: "community.png",
      tech: "React JS, Node.js, Supabase",
      github: "https://github.com/CodeHalcyon/CodeOholics",
      demo: "https://codeoholics-ten.vercel.app/",
      description:
        "A website for the CodeOholics community to manage their events and their online presence.",
    },
    {
      title: "Coders Portal",
      image: "portal.png",
      tech: "React JS, Node.js, Express",
      github: "https://github.com/CodeHalcyon/coders-portal2",
      demo: "https://coders-portal.vercel.app/",
      description:
        "A comprehensive platform for coders to collaborate and learn, featuring real-time chat and code sharing.",
    },
    {
      title: "Chaturmasya React Native App",
      image: "chaturmasaya.jpg",
      tech: "React Native",
      github: "https://github.com/CodeHalcyon/CHATURMASYA_APP",
      demo: "",
      description: "A simple freelance project for a temple community.",
    },
    {
      title: "Guess The Number",
      tech: "HTML, CSS, JavaScript",
      image: "guess_num.jpg",
      github: "https://github.com/CodeHalcyon/Guess_The_number_web",
      demo: "https://codehalcyon.github.io/Guess_The_number_web/",
      description:
        "An interactive and visually appealing number guessing game with a modern UI.",
    },
    {
      title: "Chotta Vakil",
      tech: "React JS, Tailwind CSS",
      image: "company_logo.jpg",
      github: "https://github.com/CodeHalcyon/ChottaVakil",
      demo: "https://chotta-vakil.vercel.app/home",
      description:
        "A clean and responsive frontend design for a legal services platform.",
    },
    {
      title: "CP Tracker",
      tech: "React JS, Tailwind CSS, Codeforces API",
      image: "cptracker.png",
      github: "https://github.com/CodeHalcyon/cpTracker",
      demo: "https://cp-tracker-rho.vercel.app/",
      description:
        "A tool to track competitive programming progress and performance across Codeforces platform.",
    },
    {
      title: "Password Generator",
      tech: "React JS",
      image: "pwd.png",
      github: "https://github.com/CodeHalcyon/PasswordGenerator",
      demo: "https://password-generator-five-dusky.vercel.app/",
      description:
        "A secure password generator with customizable options for length, characters, and complexity.",
    },
    {
      title: "ToDo List",
      tech: "React JS, Tailwind CSS",
      image: "todo.png",
      github: "https://github.com/CodeHalcyon/Todo-Tailwind",
      demo: "https://todo-list-ivory-one-19.vercel.app/",
      description:
        "A feature-rich to-do list application with intuitive Tailwind CSS styling.",
    },
  ];

  // Helper to determine if a section should have its animation applied
  const getSectionAnimationClass = (sectionId, baseClass = "") => {
    const isVisible = visibleSections.has(sectionId);
    return `${baseClass} ${isVisible ? "animate-in" : ""}`;
  };

  return (
    <div className="min-h-screen overflow-x-hidden font-sans text-white bg-black">
      <style jsx>{`
        /* --- Base Styles & Typography --- */
        body {
          font-family: "Inter", sans-serif; /* Using a modern sans-serif font */
          scroll-behavior: smooth;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: "Poppins", sans-serif; /* A slightly more prominent font for headings */
          font-weight: 700;
        }

        /* --- Animation Keyframes --- */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes float {
          /* Subtle floating for background elements */
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes blink {
          /* For typing cursor */
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        /* --- Animation Utilities --- */
        .animate-in {
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(
            0.25,
            0.8,
            0.25,
            1
          ); /* Smooth ease-out */
        }
        .animate-in.slide-up {
          animation-name: slideInUp, fadeIn;
          animation-duration: 0.8s;
        }
        .animate-in.slide-left {
          animation-name: slideInLeft, fadeIn;
          animation-duration: 0.8s;
        }
        .animate-in.slide-right {
          animation-name: slideInRight, fadeIn;
          animation-duration: 0.8s;
        }
        .animate-in.scale-in {
          animation-name: scaleIn, fadeIn;
          animation-duration: 0.7s;
        }
        .animate-in.floating {
          animation-name: float, fadeIn;
          animation-duration: 6s;
        }

        /* Staggered animations - applied via JS */
        .stagger-1 {
          animation-delay: 0.1s;
        }
        .stagger-2 {
          animation-delay: 0.2s;
        }
        .stagger-3 {
          animation-delay: 0.3s;
        }
        .stagger-4 {
          animation-delay: 0.4s;
        }
        .stagger-5 {
          animation-delay: 0.5s;
        }
        .stagger-6 {
          animation-delay: 0.6s;
        }

        /* --- Hero Section Specific Styles --- */
        .hero-background-gradient {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(17, 17, 17, 0.7) 100%
          );
          filter: blur(80px);
        }
        .hero-background-element-1 {
          transform: translateY(${scrollY * 0.15}px); /* Slower parallax */
        }
        .hero-background-element-2 {
          transform: translateY(
            ${scrollY * -0.1}px
          ); /* Opposite direction parallax */
        }
        .hero-title-line {
          width: 2px;
          background: linear-gradient(
            to bottom,
            transparent,
            white,
            transparent
          );
          animation: pulse 2s infinite ease-in-out;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        .text-gradient {
          background: linear-gradient(90deg, #ffffff, #cccccc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .social-link {
          transition: transform 0.3s ease, color 0.3s ease;
        }
        .social-link:hover {
          transform: scale(1.2);
          color: #ffffff; /* Or a specific highlight color */
        }

        .project-card {
          transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
        }
        .project-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        .project-card-image-wrapper {
          position: relative;
          overflow: hidden;
        }
        .project-card-image-wrapper img {
          transition: transform 0.5s ease;
        }
        .project-card:hover .project-card-image-wrapper img {
          transform: scale(1.1);
        }
        .project-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.8)
          );
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .project-card:hover .project-card-overlay {
          opacity: 1;
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-lg">
        <nav className="flex items-center justify-between p-4 mx-auto max-w-7xl">
          <div className="text-2xl font-black tracking-wide">
            <a
              href="#"
              className="transition-colors text-gradient hover:text-white"
            >
              Chetan Sirigiri
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="items-center hidden space-x-8 md:flex">
            <nav className="flex space-x-6">
              <button
                onClick={() => scrollToSection("home")}
                className="text-lg font-medium transition-colors hover:text-gray-300"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-lg font-medium transition-colors hover:text-gray-300"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-lg font-medium transition-colors hover:text-gray-300"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-lg font-medium transition-colors hover:text-gray-300"
              >
                Contact
              </button>
            </nav>
            <a
              href="https://leetcode.com/u/227r1a66e1/" // Example: Link to LeetCode or similar
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 text-sm font-semibold transition-all duration-300 border border-gray-600 rounded-md hover:bg-white hover:text-black"
            >
              My Stats
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 transition-colors rounded hover:bg-white/10"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-white/10 bg-black/95 backdrop-blur-lg md:hidden">
            <nav className="flex flex-col p-4 space-y-2">
              <button
                onClick={() => scrollToSection("home")}
                className="block w-full p-3 text-lg font-medium text-left transition-colors rounded hover:text-gray-300 hover:bg-white/10"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full p-3 text-lg font-medium text-left transition-colors rounded hover:text-gray-300 hover:bg-white/10"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="block w-full p-3 text-lg font-medium text-left transition-colors rounded hover:text-gray-300 hover:bg-white/10"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full p-3 text-lg font-medium text-left transition-colors rounded hover:text-gray-300 hover:bg-white/10"
              >
                Contact
              </button>
            </nav>
            <div className="p-4">
              <a
                href="https://leetcode.com/u/Chetan_Sirigiri/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 text-sm font-semibold transition-all duration-300 border border-gray-600 rounded-md hover:bg-white hover:text-black"
              >
                My Stats
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - Redesigned */}
      <section
        id="home"
        ref={(el) => (sectionRefs.current.home = el)}
        className="relative flex items-center justify-center min-h-screen px-4 py-32 overflow-hidden"
      >
        {/* Animated background elements with parallax */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute inset-0 hero-background-gradient opacity-70"></div>
          <div className="absolute rounded-full w-72 h-72 top-1/4 left-1/4 bg-blue-500/15 blur-xl hero-background-element-1"></div>
          <div className="absolute rounded-full bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/15 blur-2xl hero-background-element-2"></div>
          <div
            className="absolute w-56 h-56 rounded-full -bottom-10 -left-10 bg-cyan-400/10 blur-xl hero-background-element-1"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute w-40 h-40 rounded-full -top-5 right-1/3 bg-pink-500/10 blur-lg hero-background-element-2"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="relative z-10 text-center max-w-7xl">
          <h1 className="mb-4 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            <span className="text-gradient">Hello, I'm Chetan Sirigiri</span>
          </h1>
          <div className="flex items-center justify-center mt-6 mb-8 space-x-4">
            <div className="w-16 h-0.5 bg-gray-400 rounded-full"></div>{" "}
            {/* Subtle separator line */}
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
              <span className="pr-4 border-r-2 border-white/50 blinking-cursor">
                {displayText}
              </span>
            </h2>
            <div className="w-16 h-0.5 bg-gray-400 rounded-full"></div>{" "}
            {/* Subtle separator line */}
          </div>
          <p
            data-animate="true"
            id="hero-subtitle"
            ref={(el) => (sectionRefs.current.hero_subtitle = el)}
            className={`${getSectionAnimationClass(
              "hero-subtitle",
              "slide-up stagger-3"
            )} mt-4 text-xl text-gray-300 max-w-2xl mx-auto`}
          >
            Passionate about building modern, efficient, and user-friendly web
            experiences.
          </p>
          <div
            data-animate="true"
            id="hero-button"
            ref={(el) => (sectionRefs.current.hero_button = el)}
            className={`${getSectionAnimationClass(
              "hero-button",
              "slide-up stagger-4"
            )} mt-12`}
          >
            <a
              href="#projects"
              className="px-8 py-4 text-lg font-semibold transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Explore My Work
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={(el) => (sectionRefs.current.about = el)}
        className="relative px-4 py-24"
      >
        <div className="flex flex-col items-center justify-between gap-16 mx-auto max-w-7xl lg:flex-row">
          <div
            className={`lg:w-1/2 ${getSectionAnimationClass(
              "about-image",
              "slide-left"
            )}`}
            data-animate="true"
            id="about-image"
          >
            <img
              src="pic.jpg" // Ensure this image is in your public folder
              alt="Chetan Sirigiri"
              className="rounded-lg shadow-2xl object-cover w-full h-[450px] border-2 border-gray-700"
              loading="lazy"
            />
          </div>
          <div
            className={`lg:w-1/2 ${getSectionAnimationClass(
              "about-content",
              "slide-right"
            )}`}
            data-animate="true"
            id="about-content"
          >
            <h2 className="mb-6 text-5xl font-bold">About Me</h2>
            <p className="mb-4 text-lg leading-relaxed text-gray-300">
              Hey there! I'm Chetan Sirigiri, a highly motivated and
              enthusiastic 20-year-old web developer and an aspiring ML
              Developer. I'm passionate about transforming creative ideas into
              functional and visually appealing digital realities.
            </p>
            <p className="mb-4 text-lg leading-relaxed text-gray-300">
              My journey into web development is fueled by a constant desire to
              learn and build. I enjoy the process of problem-solving and
              crafting clean, efficient code. Beyond coding, I also share my
              learning experiences and insights through my YouTube channel,
              aiming to contribute positively to the developer community.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-gray-300">
              I'm always eager to take on new challenges and collaborate on
              exciting projects. Let's connect and build something amazing
              together!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/chetan-sirigiri/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 social-link hover:text-white"
                data-animate="true"
                id="about-social-linkedin"
                ref={(el) => (sectionRefs.current.about_social_linkedin = el)}
              >
                <Linkedin size={36} />
              </a>
              <a
                href="https://github.com/CodeHalcyon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 social-link hover:text-white"
                data-animate="true"
                id="about-social-github"
                ref={(el) => (sectionRefs.current.about_social_github = el)}
              >
                <Github size={36} />
              </a>
              <a
                href="https://x.com/ChetanSiri78325"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 social-link hover:text-white"
                data-animate="true"
                id="about-social-twitter"
                ref={(el) => (sectionRefs.current.about_social_twitter = el)}
              >
                <Twitter size={36} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={(el) => (sectionRefs.current.projects = el)}
        className="relative px-4 py-24 bg-gradient-to-b from-black via-gray-950/50 to-black"
      >
        <div className="mx-auto max-w-7xl">
          <h2
            data-animate="true"
            id="projects-heading"
            ref={(el) => (sectionRefs.current.projects_heading = el)}
            className={`${getSectionAnimationClass(
              "projects-heading",
              "slide-up"
            )} text-5xl font-bold text-center mb-16`}
          >
            My Projects
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <div
                key={index}
                data-animate="true"
                id={`project-${index}`}
                ref={(el) => (sectionRefs.current[`project-${index}`] = el)}
                className={`${getSectionAnimationClass(
                  `project-${index}`,
                  "scale-in"
                )}${
                  index > 0 ? ` stagger-${(index % 3) + 1}` : ""
                } project-card relative rounded-xl shadow-lg overflow-hidden cursor-pointer border border-white/10 bg-white/[0.02]`}
              >
                {project.image && (
                  <div className="project-card-image-wrapper">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-56"
                      loading="lazy"
                    />
                    <div className="project-card-overlay"></div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="mb-2 text-2xl font-bold">{project.title}</h3>
                  <p className="mb-3 text-sm font-medium text-blue-400">
                    {project.tech}
                  </p>
                  <p className="mb-6 text-sm leading-relaxed text-gray-300">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white"
                      >
                        <Github size={24} />
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-white"
                        >
                          <ExternalLink size={24} />{" "}
                          {/* Using ExternalLink icon */}
                        </a>
                      )}
                    </div>
                    {!project.image && ( // Only show description if no image for cleaner look
                      <a
                        href={project.github} // Link to GitHub if no demo
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-blue-400 hover:text-blue-300"
                      >
                        Learn More
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Competitive Programming Profiles Section */}
      <section
        id="cp"
        ref={(el) => (sectionRefs.current.cp = el)}
        className="relative px-4 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <h2
            data-animate="true"
            id="cp-heading"
            ref={(el) => (sectionRefs.current.cp_heading = el)}
            className={`${getSectionAnimationClass(
              "cp-heading",
              "slide-up"
            )} text-5xl font-bold text-center mb-16`}
          >
            Coding Profiles
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {cpProfiles.map((profile, index) => (
              <a
                key={index}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                data-animate="true"
                id={`cp-profile-${index}`}
                ref={(el) => (sectionRefs.current[`cp-profile-${index}`] = el)}
                className={`${getSectionAnimationClass(
                  `cp-profile-${index}`,
                  "scale-in"
                )}${
                  index > 0 ? ` stagger-${(index % 3) + 1}` : ""
                } cp-profile-card flex items-center p-6 gap-4`}
              >
                {profile.icon && (
                  <profile.icon size={40} className={`icon ${profile.color}`} />
                )}{" "}
                {/* Use the icon and color from data */}
                <div className="flex-1">
                  <h3 className="mb-1 text-2xl font-bold">{profile.name}</h3>
                  <p className={`text-lg font-semibold ${profile.color}`}>
                    {profile.rating}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={(el) => (sectionRefs.current.contact = el)}
        className="relative px-4 py-24"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            data-animate="true"
            id="contact-heading"
            ref={(el) => (sectionRefs.current.contact_heading = el)}
            className={`${getSectionAnimationClass(
              "contact-heading",
              "slide-up"
            )} text-5xl font-bold mb-12`}
          >
            Let's Connect!
          </h2>
          <p
            data-animate="true"
            id="contact-intro"
            ref={(el) => (sectionRefs.current.contact_intro = el)}
            className={`${getSectionAnimationClass(
              "contact-intro",
              "fade-in stagger-1"
            )} text-xl text-gray-300 mb-8`}
          >
            Have a project in mind or just want to say hello? Feel free to reach
            out!
          </p>
          <div className="flex justify-center gap-8">
            <a
              href="https://www.linkedin.com/in/chetan-sirigiri/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 social-link hover:text-white"
              data-animate="true"
              id="contact-social-linkedin"
              ref={(el) => (sectionRefs.current.contact_social_linkedin = el)}
            >
              <Linkedin size={48} />
            </a>
            <a
              href="https://github.com/CodeHalcyon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 social-link hover:text-white"
              data-animate="true"
              id="contact-social-github"
              ref={(el) => (sectionRefs.current.contact_social_github = el)}
            >
              <Github size={48} />
            </a>
            <a
              href="https://x.com/ChetanSiri78325"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 social-link hover:text-white"
              data-animate="true"
              id="contact-social-twitter"
              ref={(el) => (sectionRefs.current.contact_social_twitter = el)}
            >
              <Twitter size={48} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} Chetan Sirigiri. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
