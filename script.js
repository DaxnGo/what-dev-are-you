// Quiz data
const quizData = [
  {
    question: "What's your favorite part of coding?",
    answers: [
      { text: "Fixing tricky bugs", type: "bugSquasher" },
      { text: "Designing beautiful UIs", type: "pixelPerfectionist" },
      { text: "Solving logic puzzles", type: "algorithmArchitect" },
      { text: "Setting up deployment pipelines", type: "cloudWhisperer" },
      { text: "Learning new frameworks", type: "frameworkFanatic" },
    ],
  },
  {
    question: "Your go-to coffee coding fuel?",
    answers: [
      { text: "Black coffee", type: "bugSquasher" },
      { text: "Matcha latte", type: "pixelPerfectionist" },
      { text: "Bubble tea", type: "algorithmArchitect" },
      { text: "Energy drink", type: "cloudWhisperer" },
      { text: "Cold brew with fancy add-ins", type: "frameworkFanatic" },
    ],
  },
  {
    question: "When a project is due tomorrow, you're focused on:",
    answers: [
      { text: "Making sure there are no errors", type: "bugSquasher" },
      {
        text: "Ensuring the UI looks exactly right",
        type: "pixelPerfectionist",
      },
      { text: "Optimizing for performance", type: "algorithmArchitect" },
      { text: "Making sure it's deployed properly", type: "cloudWhisperer" },
      { text: "Adding just one more feature", type: "frameworkFanatic" },
    ],
  },
  {
    question: "Your desk is usually:",
    answers: [
      { text: "Organized chaos with notes about bugs", type: "bugSquasher" },
      {
        text: "Minimalist with color coordinated accessories",
        type: "pixelPerfectionist",
      },
      { text: "Whiteboard nearby with diagrams", type: "algorithmArchitect" },
      { text: "Multiple monitors showing dashboards", type: "cloudWhisperer" },
      { text: "Surrounded by gadgets and new tech", type: "frameworkFanatic" },
    ],
  },
  {
    question: "In a team project, you naturally take on the role of:",
    answers: [
      { text: "Quality assurance and testing", type: "bugSquasher" },
      { text: "UI/UX implementation", type: "pixelPerfectionist" },
      { text: "Data structures and algorithms", type: "algorithmArchitect" },
      { text: "DevOps and infrastructure", type: "cloudWhisperer" },
      {
        text: "Researching and integrating new tech",
        type: "frameworkFanatic",
      },
    ],
  },
  {
    question: "Your browser usually has tabs open for:",
    answers: [
      { text: "Stack Overflow and documentation", type: "bugSquasher" },
      { text: "Dribbble and design inspiration", type: "pixelPerfectionist" },
      {
        text: "LeetCode and algorithm visualizers",
        type: "algorithmArchitect",
      },
      { text: "AWS console and monitoring tools", type: "cloudWhisperer" },
      { text: "GitHub repos and new framework docs", type: "frameworkFanatic" },
    ],
  },
  {
    question: "When you dream about code, it's usually about:",
    answers: [
      { text: "Finally fixing that mysterious bug", type: "bugSquasher" },
      { text: "Creating a beautiful animation", type: "pixelPerfectionist" },
      { text: "Elegant data structures", type: "algorithmArchitect" },
      { text: "Perfectly scaled infrastructure", type: "cloudWhisperer" },
      {
        text: "Building something with the newest tech",
        type: "frameworkFanatic",
      },
    ],
  },
];

// Personality types and descriptions
const personalityTypes = {
  bugSquasher: {
    title: "The Bug Squasher",
    emoji: "🐞",
    description:
      "You have an uncanny ability to track down and eliminate bugs. Your attention to detail is unmatched, and your tenacity in solving problems makes you the go-to person when things aren't working as expected. You're patient, methodical, and secretly enjoy the thrill of hunting down elusive errors.",
    icon: "fa-bug",
    bgColor: "rgba(240, 240, 255, 0.7)",
  },
  pixelPerfectionist: {
    title: "The Pixel Perfectionist",
    emoji: "🎨",
    description:
      "You have an eye for design and won't rest until every element is pixel-perfect. Your work combines aesthetics with functionality, creating interfaces that are both beautiful and intuitive. You care deeply about user experience and believe that good design is invisible.",
    icon: "fa-palette",
    bgColor: "rgba(235, 245, 255, 0.7)",
  },
  algorithmArchitect: {
    title: "The Algorithm Architect",
    emoji: "🧠",
    description:
      "You see the world as a series of puzzles waiting to be solved. Your logical mind excels at creating efficient algorithms and elegant data structures. You can simplify complex problems into manageable solutions and find satisfaction in optimizing code for performance.",
    icon: "fa-microchip",
    bgColor: "rgba(235, 235, 255, 0.7)",
  },
  cloudWhisperer: {
    title: "The Cloud Whisperer",
    emoji: "☁️",
    description:
      "You thrive in the world of infrastructure and deployment. Your skills keep applications running smoothly in the cloud, and you have a knack for setting up reliable CI/CD pipelines. You're forward-thinking, preparing for scaling and potential issues before they arise.",
    icon: "fa-cloud",
    bgColor: "rgba(240, 245, 255, 0.7)",
  },
  frameworkFanatic: {
    title: "The Framework Fanatic",
    emoji: "🚀",
    description:
      "You're always on the cutting edge of technology, eager to learn and implement the latest frameworks and libraries. Your enthusiasm for new tools is contagious, and you're quick to see how they can be applied to solve problems. You're adaptable and love staying ahead of the curve.",
    icon: "fa-rocket",
    bgColor: "rgba(235, 240, 255, 0.7)",
  },
};

// DOM elements
const introSection = document.getElementById("intro");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");
const startBtn = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const progressFill = document.getElementById("progress-fill");
const restartBtn = document.getElementById("restart-btn");
const shareBtn = document.getElementById("share-btn");
const personalityEmoji = document.getElementById("personality-emoji");
const personalityTitle = document.getElementById("personality-title");
const personalityDescription = document.getElementById(
  "personality-description"
);
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");

// Variables to track quiz state
let currentQuestionIndex = 0;
let userAnswers = {
  bugSquasher: 0,
  pixelPerfectionist: 0,
  algorithmArchitect: 0,
  cloudWhisperer: 0,
  frameworkFanatic: 0,
};

// Initialize quiz
function startQuiz() {
  // Add animation class to transition out intro
  introSection.classList.add("fade-out");

  setTimeout(() => {
    introSection.classList.remove("active", "fade-out");
    quizSection.classList.add("active");

    // Set total questions
    totalQuestionsSpan.textContent = quizData.length;

    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = {
      bugSquasher: 0,
      pixelPerfectionist: 0,
      algorithmArchitect: 0,
      cloudWhisperer: 0,
      frameworkFanatic: 0,
    };

    showQuestion();
  }, 300);
}

// Display current question
function showQuestion() {
  // Update question counter
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  // Update progress bar
  const progressPercentage = (currentQuestionIndex / quizData.length) * 100;
  progressFill.style.width = `${progressPercentage}%`;

  // Show question text
  const currentQuestion = quizData[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  // Clear previous answers
  answersContainer.innerHTML = "";

  // Generate answer buttons
  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.classList.add("answer-btn");

    // Add some personality-based styling
    const type = answer.type;
    const icon = personalityTypes[type].icon;

    // Check if we're on mobile
    const isMobile = window.innerWidth <= 576;

    // Create more compact buttons for mobile
    if (isMobile) {
      button.innerHTML = `
        <span class="answer-icon"><i class="fas ${icon}"></i></span>
        <span class="answer-text">${answer.text}</span>
      `;
    } else {
      button.innerHTML = `
        <span class="answer-icon"><i class="fas ${icon}"></i></span>
        <span class="answer-text">${answer.text}</span>
      `;
    }

    // Add delay for staggered animation
    setTimeout(() => {
      button.classList.add("appear");
    }, index * 100);

    button.addEventListener("click", () => selectAnswer(answer.type));

    answersContainer.appendChild(button);
  });
}

// Handle answer selection
function selectAnswer(answerType) {
  // Increment counter for the selected personality type
  userAnswers[answerType]++;

  // Add transition effect
  quizSection.classList.add("fade-out");

  setTimeout(() => {
    // Move to next question or show results
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
      showQuestion();
      quizSection.classList.remove("fade-out");
    } else {
      showResults();
      quizSection.classList.remove("active", "fade-out");
    }
  }, 300);
}

// Calculate and show results
function showResults() {
  resultSection.classList.add("active");

  // Find personality type with highest score
  let maxScore = 0;
  let personalityResult = "";

  for (const type in userAnswers) {
    if (userAnswers[type] > maxScore) {
      maxScore = userAnswers[type];
      personalityResult = type;
    }
  }

  // Display result
  const result = personalityTypes[personalityResult];
  result.type = personalityResult; // Add the type to the result object

  personalityEmoji.textContent = result.emoji;
  personalityTitle.textContent = result.title;
  personalityDescription.textContent = result.description;

  // Apply custom background color to result card
  const personalityResultCard = document.getElementById("personality-result");
  personalityResultCard.style.backgroundColor = result.bgColor;

  // Add icon to emoji display for extra visual appeal
  personalityEmoji.innerHTML = `${result.emoji} <i class="fas ${result.icon}"></i>`;

  // Update progress bar to 100%
  progressFill.style.width = "100%";

  // Update all metadata for sharing
  updateAllMetadata(result);

  // Apply confetti effect
  applyConfetti();
}

// Restart quiz
function restartQuiz() {
  resultSection.classList.add("fade-out");

  setTimeout(() => {
    resultSection.classList.remove("active", "fade-out");
    introSection.classList.add("active");
    progressFill.style.width = "0%";
  }, 300);
}

// Share result
function shareResult() {
  // Get the personality title from the DOM
  const title = personalityTitle.textContent;
  const emoji = personalityEmoji.textContent.split(" ")[0]; // Just get the emoji, not the icon
  const description = personalityDescription.textContent;

  // Get current URL which should have the result parameter
  const shareUrl = window.location.href;

  // Create share text
  const shareText = `I'm ${emoji} ${title} according to the Dev Personality Quiz! Find out your type!`;

  // Create sharing data with metadata
  const shareData = {
    title: "Dev Personality Quiz Result",
    text: shareText,
    url: shareUrl,
  };

  // Show visual feedback for button press
  shareBtn.classList.add("clicked");
  setTimeout(() => shareBtn.classList.remove("clicked"), 200);

  // Check if Web Share API is available
  if (navigator.share) {
    navigator
      .share(shareData)
      .then(() => {
        showNotification("Shared successfully!");
      })
      .catch((error) => {
        console.error("Error sharing:", error);
        fallbackShare(shareData);
      });
  } else {
    fallbackShare(shareData);
  }
}

// Update URL with the result
function updateUrlWithResult(resultType) {
  if (window.history && window.history.pushState) {
    // Create a new URL with the result parameter
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("result", resultType);

    // Update the URL in the browser
    window.history.pushState({ result: resultType }, "", newUrl);

    // Update meta tags with the new URL
    updateMetaTag("og:url", newUrl.href);
    updateMetaTag("twitter:url", newUrl.href);

    // Update canonical link
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute("href", newUrl.href);
    }
  }
}

// Check for result in URL when page loads
function checkUrlForResult() {
  const urlParams = new URLSearchParams(window.location.search);
  const resultType = urlParams.get("result");

  if (resultType && personalityTypes[resultType]) {
    // Skip intro and show the result directly
    introSection.classList.remove("active");

    // Set all scores to 0 except for the result type
    for (const type in userAnswers) {
      userAnswers[type] = 0;
    }
    userAnswers[resultType] = 1;

    // Show the result
    showResults();
  }
}

// Helper function to update meta tags
function updateMetaTag(property, content) {
  let metaTag = document.querySelector(`meta[property="${property}"]`);
  if (!metaTag) {
    metaTag = document.querySelector(`meta[name="${property}"]`);
  }

  if (metaTag) {
    metaTag.setAttribute("content", content);
  }
}

// Update all metadata after getting a result
function updateAllMetadata(result) {
  // Update URL first
  updateUrlWithResult(result.type);

  // Create personalized description
  const description = `I took the Dev Personality Quiz and discovered I'm ${result.emoji} ${result.title}! ${result.description.substring(0, 100)}...`;

  // Update title
  document.title = `${result.title} - Dev Personality Quiz Result`;

  // Update Open Graph meta tags
  updateMetaTag("og:title", `${result.title} - Dev Personality Quiz Result`);
  updateMetaTag("og:description", description);

  // Update Twitter meta tags
  updateMetaTag(
    "twitter:title",
    `${result.title} - Dev Personality Quiz Result`
  );
  updateMetaTag("twitter:description", description);

  // Update image with actual image
  const imageUrl = window.location.origin + "/Images/DevQuiz.png";
  updateMetaTag("og:image", imageUrl);
  updateMetaTag("twitter:image", imageUrl);

  // Update structured data
  updateStructuredData(result);
}

// Update structured data for rich results
function updateStructuredData(result) {
  // Find the existing script tag
  const scriptTag = document.querySelector(
    'script[type="application/ld+json"]'
  );
  if (scriptTag) {
    // Parse the existing JSON
    let structuredData = JSON.parse(scriptTag.textContent);

    // Update with the result
    structuredData.about.name = result.title;
    structuredData.about.description = result.description;

    // Add the result type
    structuredData.result = {
      "@type": "Thing",
      name: result.title,
      description: result.description,
    };

    // Update the script tag
    scriptTag.textContent = JSON.stringify(structuredData, null, 2);
  }
}

// Initialize metadata on page load
function initializeMetadata() {
  // Get the base URL without query parameters
  const baseUrl = window.location.href.split("?")[0];

  // Update URL-based meta tags
  updateMetaTag("og:url", baseUrl);
  updateMetaTag("twitter:url", baseUrl);

  // Update canonical link
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    canonicalLink.setAttribute("href", baseUrl);
  }
}

// Enhanced fallback sharing options
function fallbackShare(shareData) {
  // Create fallback sharing options container
  const shareOptions = document.createElement("div");
  shareOptions.className = "share-options";

  // Close button
  const closeBtn = document.createElement("button");
  closeBtn.className = "share-close-btn";
  closeBtn.innerHTML = '<i class="fas fa-times"></i>';
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(shareOptions);
  });

  // Create heading
  const heading = document.createElement("h3");
  heading.textContent = "Share your result:";

  // Create options container
  const optionsGrid = document.createElement("div");
  optionsGrid.className = "share-grid";

  // Share options
  const options = [
    {
      name: "Copy Link",
      icon: "fa-copy",
      handler: () => copyToClipboard(shareData.url),
    },
    {
      name: "Twitter",
      icon: "fa-twitter",
      handler: () => openTwitterShare(shareData),
    },
    {
      name: "Facebook",
      icon: "fa-facebook",
      handler: () => openFacebookShare(shareData),
    },
    {
      name: "WhatsApp",
      icon: "fa-whatsapp",
      handler: () => openWhatsAppShare(shareData),
    },
    {
      name: "LinkedIn",
      icon: "fa-linkedin",
      handler: () => openLinkedInShare(shareData),
    },
    {
      name: "Email",
      icon: "fa-envelope",
      handler: () => openEmailShare(shareData),
    },
  ];

  // Create buttons for each option
  options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "share-option-btn";
    button.innerHTML = `<i class="fab ${option.icon}"></i><span>${option.name}</span>`;
    button.addEventListener("click", () => {
      option.handler();
      document.body.removeChild(shareOptions);
    });
    optionsGrid.appendChild(button);
  });

  // Assemble the share options modal
  shareOptions.appendChild(closeBtn);
  shareOptions.appendChild(heading);
  shareOptions.appendChild(optionsGrid);

  // Add to body
  document.body.appendChild(shareOptions);

  // Add styles for the share options if not already added
  addShareStyles();
}

// Add styles for share options
function addShareStyles() {
  if (!document.getElementById("share-styles")) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "share-styles";
    styleSheet.textContent = `
      .share-options {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        width: 90%;
        max-width: 400px;
        text-align: center;
      }
      
      .share-close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: #6a11cb;
      }
      
      .share-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-top: 15px;
      }
      
      .share-option-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 15px 10px;
        border-radius: 8px;
        border: 1px solid #eee;
        background: white;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .share-option-btn:hover {
        background: #f5f8ff;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(106, 17, 203, 0.1);
      }
      
      .share-option-btn i {
        font-size: 1.5rem;
        margin-bottom: 8px;
        color: #6a11cb;
      }
      
      .share-option-btn span {
        font-size: 0.8rem;
      }
      
      @media (max-width: 480px) {
        .share-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `;
    document.head.appendChild(styleSheet);
  }
}

// Copy to clipboard
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showNotification("Link copied to clipboard! 📋");
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
      showNotification("Failed to copy link", true);
    });
}

// Open Twitter share
function openTwitterShare(shareData) {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
  window.open(url, "_blank");
}

// Open Facebook share
function openFacebookShare(shareData) {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
  window.open(url, "_blank");
}

// Open WhatsApp share
function openWhatsAppShare(shareData) {
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareData.text + " " + shareData.url)}`;
  window.open(url, "_blank");
}

// Open LinkedIn share
function openLinkedInShare(shareData) {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`;
  window.open(url, "_blank");
}

// Open Email share
function openEmailShare(shareData) {
  const url = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(shareData.text + "\n\n" + shareData.url)}`;
  window.open(url, "_blank");
}

// Show a custom toast notification
function showNotification(message, isError = false) {
  const notification = document.createElement("div");
  notification.className = "notification";

  // Add error class if it's an error notification
  if (isError) {
    notification.classList.add("notification-error");
  }

  // Add icon based on notification type
  const icon = isError
    ? '<i class="fas fa-exclamation-circle"></i>'
    : '<i class="fas fa-check-circle"></i>';

  notification.innerHTML = `${icon} <span>${message}</span>`;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => notification.classList.add("visible"), 10);

  // Remove after a few seconds
  setTimeout(() => {
    notification.classList.remove("visible");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add notification styles
function addNotificationStyles() {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    .notification {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background-color: rgba(42, 50, 75, 0.9);
      color: white;
      padding: 12px 24px;
      border-radius: 50px;
      font-size: 0.9rem;
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .notification i {
      font-size: 1.2rem;
      color: #4e54c8;
    }
    
    .notification-error i {
      color: #ff6b6b;
    }
    
    .notification.visible {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    
    .notification-error {
      background-color: rgba(75, 42, 42, 0.9);
    }
  `;

  document.head.appendChild(styleSheet);
}

// Add CSS for new elements
function addDynamicStyles() {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    .fade-out {
      opacity: 0 !important;
      transform: translateY(-20px) !important;
    }
    
    .answer-btn {
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.4s ease, transform 0.4s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    .answer-btn.appear {
      opacity: 1;
      transform: translateY(0);
    }
    
    .answer-icon {
      margin-right: 10px;
      color: #6a11cb;
      display: inline-block;
      width: 20px;
    }
    
    .btn.clicked {
      transform: scale(0.95);
    }
    
    .confetti {
      position: fixed;
      width: 10px;
      height: 10px;
      top: -10px;
      opacity: 0;
      animation: fall linear forwards;
    }
    
    @keyframes fall {
      0% {
        opacity: 1;
        top: -10px;
        transform: translateX(0) rotate(0deg);
      }
      100% {
        opacity: 0;
        top: 100vh;
        transform: translateX(100px) rotate(360deg);
      }
    }
  `;
  document.head.appendChild(styleSheet);
}

// Confetti effect for results
function applyConfetti() {
  // Create confetti elements
  for (let i = 0; i < 50; i++) {
    // Stagger confetti creation for more natural effect
    setTimeout(() => {
      createConfettiPiece(i);
    }, i * 50);
  }
}

function createConfettiPiece(index) {
  const colors = ["#6a11cb", "#2575fc", "#00c6fb", "#4e54c8", "#8f94fb"];
  const confetti = document.createElement("div");
  confetti.className = "confetti";

  // Random position, color, and animation duration
  const left = Math.random() * 100 + "vw";
  const color = colors[Math.floor(Math.random() * colors.length)];
  const animationDuration = Math.random() * 3 + 2 + "s";

  confetti.style.left = left;
  confetti.style.backgroundColor = color;
  confetti.style.animationDuration = animationDuration;

  document.body.appendChild(confetti);

  // Remove confetti after animation completes
  setTimeout(() => confetti.remove(), 5000);
}

// Initialize all necessary elements on page load
document.addEventListener("DOMContentLoaded", function () {
  // Initialize metadata
  initializeMetadata();

  // Check if there's a result in the URL to show
  checkUrlForResult();

  // Set event listeners
  startBtn.addEventListener("click", startQuiz);
  restartBtn.addEventListener("click", restartQuiz);
  shareBtn.addEventListener("click", shareResult);

  // Add window resize listener to adjust layout for mobile
  window.addEventListener("resize", function () {
    if (quizSection.classList.contains("active")) {
      showQuestion(); // Redraw answers when window size changes
    }
  });

  // Set total questions
  totalQuestionsSpan.textContent = quizData.length;

  // Add dynamic styles
  addDynamicStyles();

  // Add notification styles
  addNotificationStyles();
});
