import { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, FileText, ChevronDown, Download, Eye, Award, Trophy, Star } from 'lucide-react';
import emailjs from 'emailjs-com';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showResumePreview, setShowResumePreview] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY;

      // Handle nav background
      setIsScrolled(window.scrollY > 20);

      // Handle section visibility
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }

        // Add fade-up animation
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          section.querySelectorAll('.fade-up').forEach(el => {
            el.classList.add('visible');
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_a5pfldw", // Replace with your EmailJS service ID
        "template_amz9klh", // Replace with your EmailJS template ID
        e.target as HTMLFormElement,
        "4KpJKUikTlYUS7Tkc" // Replace with your EmailJS user ID
      )
      .then(
        (result) => {
          console.log("Message sent successfully:", result.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.error("Error sending message:", error.text);
          alert("Failed to send message. Please try again.");
        }
      );

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navigationItems = ['home', 'about', 'education', 'experience', 'projects', 'publications', 'achievements', 'resume', 'contact'];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ease-apple ${
        isScrolled ? 'apple-blur shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-xl font-semibold tracking-tight">Soumyajit Maity</span>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 ease-apple ${
                    activeSection === item ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden rounded-lg p-2 hover:bg-gray-100 transition-colors duration-300 ease-apple"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden apple-blur border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-300 ease-apple"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-24 md:pt-48 md:pb-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 fade-up">
            <img
              src="https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=62CJkKEAAAAJ&citpid=4"
              alt="Soumyajit Maity"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-gray-900 mb-6 fade-up">
            Hi! I am Soumyajit
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 fade-up">
            Software Engineer | Machine Learning Engineer
          </p>
          <div className="flex justify-center space-x-4 fade-up">
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-apple"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 ease-apple"
            >
              View Projects
            </a>
          </div>
          <div className="mt-16 fade-up">
            <ChevronDown className="w-6 h-6 mx-auto text-gray-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-8 fade-up">About Me</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-6 fade-up">
            I am Soumyajit Maity, a aspiring software engineer dedicated to advancing AI for real-world impact. 
            Currently pursuing my Masters in Computer Science at the University of Texas at Arlington, I 
            specialize in machine learning, computer vision, and AI interpretability, particularly in the 
            medical domain. My research focuses on enhancing the robustness and interpretability of Vision-Language 
            Models (VLMs) for medical imaging, integrating deep learning with domain-specific knowledge to improve 
            diagnostic accuracy and trustworthiness.
            </p>
            <p className="mb-6 fade-up">
              With expertise in machine learning, deep learning, and software development, I specialize
              in frameworks like TensorFlow, PyTorch, and OpenCV. My research encompasses multimodal
              learning, transfer learning, domain adaptation, and explainable AI, ensuring that our
              models are both powerful and trustworthy in clinical settings. I am also actively involved in 
              open-source contributions, hackathons, and collaborative projects that push the boundaries of AI innovation.
            </p>
            <p className="fade-up">
              Beyond research, I bring hands-on experience in developing software applications,
              including mobile apps and cloud solutions. I thrive on interdisciplinary collaboration,
              merging AI, healthcare, and software engineering to create meaningful impact.
            </p>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Education</h2>
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-8 transform hover:scale-105 transition-transform">
              <div className="flex items-start space-x-6">
                <div className="w-32 h-32 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                  <img
                    src="https://resources.uta.edu/mme/identity/_images/new-logos/new-initials-logo.jpg"
                    alt="UTA Logo"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Master of Science in Computer Science</h3>
                      <a 
                        href="https://www.uta.edu/academics/schools-colleges/engineering/academics/departments/cse"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        University of Texas at Arlington
                      </a>
                      <p className="fade-up">
                      Specialization in Machine Learning and Software Engineering.
                    </p>
                    </div>
                    <p className="text-gray-600">Aug 2023 - May 2025</p>
                  </div>
                  <ul className="mt-4 text-gray-600 list-disc list-inside space-y-2">
                    <li>GPA: 3.9/4.0</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 transform hover:scale-105 transition-transform">
              <div className="flex items-start space-x-6">
                <div className="w-32 h-32 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                    <img
                      src="https://uem.edu.in/app/themes/iem-group-new-wp-theme/resources/images/UEM-Logo.png"
                      alt="UEM Kolkata"
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Bachelor of Technology in Computer Science</h3>
                      <a 
                        href="https://uem.edu.in/uem-kolkata/department-of-cse/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        University of Engineering and Management, Kolkata
                      </a>
                    </div>
                    <p className="text-gray-600">Jul 2019 - Jun 2023</p>
                  </div>
                  <ul className="mt-4 text-gray-600 list-disc list-inside space-y-2">
                    <li>GPA: 9.57/10</li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Professional Experience</h2>
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-xl shadow-md p-8 transform hover:scale-105 transition-transform">
              <div className="flex items-start space-x-6">
                <img
                  src="https://luberlab.org/images/activities/23.jpg"
                  alt="UTA AI Lab"
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Student Researcher</h3>
                      <a 
                          href="https://cihi.uta.edu/about/student-research-assistants/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 block"
                        >
                          Luber Lab - University of Texas at Arlington
                        </a>
                        <p className="text-sm text-gray-600">
                          Supervisor: <a 
                            href="https://www.uta.edu/academics/faculty/profile?user=jacob.luber"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Dr. Jacob Luber
                          </a>
                          </p>
                    </div>
                    <p className="text-gray-600">Jun 2024 - May 2025</p>
                  </div>
                  <ul className="mt-4 text-gray-600 list-disc list-inside space-y-2">
                    <li>Designing KAN-based architectures to replace traditional MLP layers in VLMs(PaliGemma2, Gemma3) for better feature representation.</li>
                    <li>Improving interpretability and trustworthiness of AI models by enabling clearer decision pathways.</li>
                    <li>Conducting extensive experiments and validation to assess performance improvements across various pathological datasets.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl shadow-md p-8 transform hover:scale-105 transition-transform">
              <div className="flex items-start space-x-6">
                <img
                  src="https://uem.edu.in/app/themes/iem-group-new-wp-theme/resources/images/UEM-Logo.png"
                  alt="UEM"
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Undergraduate Student Researcher</h3>
                      <p className="text-blue-600">University of Engineering and Management, Kolkata</p>
                      <p className="text-sm text-gray-600">
                          Supervisor: <a 
                            href="https://www.linkedin.com/in/sankhadeep-chatterjee-7393b384"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Dr. Sankhadeep Chatterjee
                          </a>
                          </p>
                    </div>
                    
                    <p className="text-gray-600">Jun 2021 - Jun 2023</p>
                  </div>
                  <ul className="mt-4 text-gray-600 list-disc list-inside space-y-2">
                    <li>Resolved imbalanced classification challenges in machine learning, boosting model performance 
                      from 70% to 98%.</li>
                    <li>Spearheaded bioinformatics research, developing COVID-19 detection models from chest 
                      X-ray images and Alzheimer’s detection models from brain MRI images, achieving almost 
                      99% detection accuracy.</li>
                    <li>Fine-tuning deep learning architectures (CNNs, Transformers, Autoencoders) to improve feature extraction 
                      and representation in skewed datasets.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Abnormality detection in pathological images by fine-tuning Paligemma2 using Kolmogorov-Arnold Networks (KAN). ",
                description: ["Fine-tuned Google PaliGemma2 using Kolmogorov-Arnold Networks (KAN) to enhance abnormality detection in pathological images, improving model interpretability and diagnostic precision. ",
                "Replaced MLP layers with KAN within PaliGemma2, enabling a more transparent and interpretable model, reducing radiologist review time by 20%. ",
                "Improved feature extraction and robustness in medical imaging by leveraging KAN, leading to more precise and reliable abnormality detection. ",
                "Utilized Python, PyTorch, and KAN to fine-tune the model, optimizing it for real-world clinical applications."],
                image: "https://9to5google.com/wp-content/uploads/sites/4/2024/12/PaliGemma-2-cover.jpg?quality=82&strip=all",
              },
              {
                title: "Analyzed interpretability of Gemma3 using Kolmogorov-Arnold Networks (KAN).",
                description: [
                  "Analyzed interpretability of Google Gemma3 using Kolmogorov-Arnold Networks (KAN). ",
                  "Applied advanced interpretability methods to standard ImageNet-1K dataset, improving insights for model predictions.",
                  "Streamlined VLM fine-tuning processes with Kolmogorov-Arnold Networks (KAN), enhancing interpretability. ",
                  "Utilized Python, PyTorch, KAN, and Google Gemma3 to optimize model transparency and decision-making. "
                ],
                image: "https://the-decoder.com/wp-content/uploads/2025/03/google_gemma_logo.png",
              },
              {
                title: "Mav Wallet - E-Wallet App",
                description: [
                  "MAV Wallet is a secure and user-friendly Android-based e-wallet application designed to streamline digital transactions with enhanced security and convenience.",
                  "Built using Android Studio and Firebase, it offers seamless payment solutions, transaction tracking, and robust authentication measures.",
                  "Supports real-time balance updates, peer-to-peer transfers, and integrated financial management tools to simplify personal and business transactions.",
                  "Implemented with JUnit and Espresso for rigorous testing, ensuring a smooth and reliable user experience."
                ],
                
                image: "https://raw.githubusercontent.com/Soumyajit2709/Mav-Wallet/refs/heads/master/app/src/main/ic_launcher-playstore.png",
                github: "https://github.com/Soumyajit2709/Mav-Wallet"
              },
              {
                title: "An Approach to Classify Astronomical Objects Using Imbalanced Sloan Digital Sky Survey Data",
                description: [
                  "Developed a classification model for astronomical objects—stars, galaxies, and quasars—using data from the Sloan Digital Sky Survey Data Release 16 (SDSS DR16).",
                  "Addressed class imbalance in the dataset by applying resampling techniques, including SMOTE-ENN, to improve classification performance.",
                  "Evaluated multiple classifiers such as K-Nearest Neighbors, Logistic Regression, Naive Bayes, and AdaBoost, determining AdaBoost as the best-performing model.",
                  "Emphasized the importance of performance metrics beyond accuracy, ensuring reliable classification results for imbalanced datasets.",
                  "Utilized Python, Scikit-learn, and data preprocessing techniques to optimize the model for real-world astronomical data analysis."
                ],
                
                image: "https://skyserver.sdss.org/dr16/en/proj/basic/asteroids/images/meteor.gif",
                github: "https://github.com/Soumyajit2709/AN-APPROACH-TO-CLASSIFY-ASTRONOMICAL-OBJECT-USING-IMBALANCED-SLOAN-DIGITAL-SKY-SURVEY-DATA"
              },
              {
                title: "Autoencoder Based Abnormality Detection in Bone X-Ray images Using MURA Dataset",
                description: [
                  "Developed an autoencoder-based model to detect abnormalities in bone X-ray images using the MURA dataset, achieving a 94% accuracy rate to aid radiologists in diagnosis.",
                  "Preprocessed images to 96×96 resolution and extracted features using ResNet50, enhancing the model's ability to identify anomalies.",
                  "Addressed class imbalance in the dataset by implementing SMOTETomek, improving the model's performance on underrepresented classes.",
                  "Utilized Python and PyTorch for model development and training, ensuring a robust and efficient implementation.",
                  "Conducted comprehensive testing and validation to confirm the model's reliability in clinical applications."
                ],
                
                image: "https://camo.githubusercontent.com/e4b241fb0143b74bb8044d9d3ae64e5b3081329cbbc6b0c86868b6543f0207ec/68747470733a2f2f692e6962622e636f2f5970746d346b372f6d7572612e6a7067",
                github: "https://github.com/Soumyajit2709/Autoencoder-Based-Abnormality-Detection-in-Bone-X-Ray-images-Using-MURA-Dataset"
              },
              {
                title: "Drug Detection using Graph Embedding",
                description: [
                  "Developed a machine learning model to obtain latent vectors of molecular structures from datasets, facilitating enhanced drug detection and analysis.",
                  "Addressed class imbalance in the dataset by implementing various resampling techniques, improving model performance on underrepresented classes.",
                  "Evaluated multiple classifiers to assess the effectiveness of the graph embedding approach in accurately detecting and classifying drug molecules.",
                  "Utilized Python and Jupyter Notebook for model development and experimentation, ensuring a robust and reproducible implementation.",
                  "Conducted comprehensive testing and validation to confirm the model's reliability in real-world drug detection scenarios."
                ],
                
                image: "https://pubs.acs.org/cms/10.1021/acs.jcim.9b00387/asset/images/medium/ci9b00387_0004.gif",
                github: "https://github.com/Soumyajit2709/Drug-Detection-using-Graph-Embedding"
              },
            ].map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    View on GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Publications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Variational Autoencoder Based Imbalanced COVID-19 Detection Using Chest X-Ray Images",
                conference: "Journal: New Generation Computing, Springer, 2022",
                link: "https://doi.org/10.1007/s00354-022-00194-y",
                image: "https://media.springernature.com/w316/springer-static/cover-hires/journal/354?as=webp",
              },
              {
                title: "Majority biased facial emotion recognition using residual variational autoencoders",
                conference: "Journal: Multimedia Tools and Applications, Springer, 2023",
                link: "https://doi.org/10.1007/s11042-023-15888-8",
                image: "https://media.springernature.com/w316/springer-static/cover-hires/journal/11042?as=webp",
              },
              {
                title: "Variational Autoencoder-Based Imbalanced Alzheimer Detection Using Brain MRI Images",
                conference: "Conference: IEM-ICDC 2021",
                link: "https://doi.org/10.1007/978-981-19-1657-1_14",
                image: "https://media.springernature.com/w316/springer-static/cover-hires/book/978-981-19-1657-1?as=webp",
              },
              {
                title: "Class Biased Sarcasm Detection Using Variational LSTM Autoencoder",
                conference: "Conference: IEM-ICDC 2021",
                link: "https://doi.org/10.1007/978-981-19-1657-1_24",
                image: "https://media.springernature.com/w316/springer-static/cover-hires/book/978-981-19-1657-1?as=webp",
              },
              {
                title: "MEDNet-Based Imbalanced Cataract Detection Using Ophthalmic Images",
                conference: "Conference: CIPR 2023",
                link: "https://doi.org/10.1007/978-981-99-3734-9_36",
                image: "https://media.springernature.com/w316/springer-static/cover-hires/book/978-981-99-3734-9?as=webp",
              },
              {
                title: "Addressing Class Imbalance in Fake News Detection with Latent Space Resampling",
                conference: "Conference: CIPR 2023",
                link: "https://doi.org/10.1007/978-981-99-3734-9_35",
                image: "https://media.springernature.com/w316/springer-static/cover-hires/book/978-981-99-3734-9?as=webp",
              },
            ].map((publications, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105"
              >
                <img
                  src={publications.image}
                  alt={publications.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{publications.title}</h3>
                  <p className="text-gray-600 mb-4">{publications.conference}</p>
                  <a
                    href={publications.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700"
                  >
                  DOI link
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Achievements Section */}
      <section id="achievements" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Key Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-6 mx-auto">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Winner</h3>
              <p className="text-gray-600 text-center">
              Awarded first place in UTA DATATHON 24 for pioneering an innovative image classification model, showcasing advanced expertise
              in the Vision Quest Challenge
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8 transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-6 mx-auto">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Paper Featured in W.H.O.</h3>
              <p className="text-gray-600 text-center">
              Authored research article ”Variational Autoencoder Based Imbalanced COVID-19 Detection Using Chest X-Ray Images,”
              featured in MEDLINE database and contributing significant findings to global health research efforts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Resume</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Preview Resume</h3>
              <div className="aspect-[8.5/11] bg-gray-100 rounded-lg overflow-hidden mb-4">
                {showResumePreview ? (
                  <iframe src="https://drive.google.com/file/d/1ITHI-kvcIngD81YPiiWO_VIZLdEitSuR/preview" 
                  width="480" height="640" allow="autoplay"></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <button
                      onClick={() => setShowResumePreview(true)}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                    >
                      <Eye className="w-5 h-5" />
                      <span>Click to Preview</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Download Options</h3>
              <div className="space-y-4">
                <a
                  href="https://drive.google.com/uc?export=download&id=1ITHI-kvcIngD81YPiiWO_VIZLdEitSuR"
                  download="Soumyajit_Maity_Resume.pdf"
                  className="flex items-center justify-center space-x-2 w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>Download PDF</span>
                </a>
                <p className="text-sm text-gray-600 text-center mt-4">
                  Download the latest version of my resume in PDF format
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href="mailto:soumyajitmaity2709@gmail.com"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Mail className="w-5 h-5 mr-3"/>
                  soumyajitmaity2709@gmail.com
                </a>
                <a
                  href="https://github.com/soumyajit2709"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Github className="w-5 h-5 mr-3"/>
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/soumyajit2709/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Linkedin className="w-5 h-5 mr-3"/>
                  LinkedIn
                </a>
                <a
                  href="https://drive.google.com/uc?export=download&id=1ITHI-kvcIngD81YPiiWO_VIZLdEitSuR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <FileText className="w-5 h-5 mr-3"/>
                  Download Resume
                </a>
              </div>
            </div>
            {/* Contact Form */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Send a Message</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    {/* Footer */}
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-300">© 2025 Soumyajit Maity. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
  );
}
export default App;