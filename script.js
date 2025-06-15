document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu toggle
            const mobileMenu = document.querySelector('.mobile-menu');
            const nav = document.querySelector('.data-navbar nav');
            
            mobileMenu.addEventListener('click', function() {
                nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
                this.classList.toggle('active');
            });
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    // Close mobile menu if open
                    if (nav.style.display === 'block') {
                        nav.style.display = 'none';
                        mobileMenu.classList.remove('active');
                    }
                });
            });
            
            // Project filter functionality
            const filterBtns = document.querySelectorAll('.filter-btn');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterBtns.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    const projectCards = document.querySelectorAll('.project-card');
                    
                    projectCards.forEach(card => {
                        if (filter === 'all' || card.classList.contains(filter)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
            
            // Project modal functionality
            const modal = document.getElementById('projectModal');
            const modalContent = document.getElementById('modalProjectContent');
            const closeBtn = document.querySelector('.close-modal');
            
            // Sample project data (in a real scenario, you'd fetch this from projects.json)
            const projects = [
                {
                    id: 1,
                    title: "Sales Data Analysis",
                    category: ["analysis"],
                    tools: ["Python", "Pandas", "Matplotlib"],
                    description: "Analyzed 2 years of sales data to identify trends, seasonal patterns, and customer buying behaviors. Created interactive visualizations that helped the sales team focus on high-potential products and customer segments, resulting in a 15% increase in quarterly sales.",
                    image: "https://via.placeholder.com/800x400?text=Sales+Analysis",
                    link: "#",
                    date: "2023-03-15"
                },
                {
                    id: 2,
                    title: "COVID-19 Dashboard",
                    category: ["visualization"],
                    tools: ["Tableau", "D3.js"],
                    description: "Developed an interactive dashboard tracking COVID-19 cases, vaccinations, and mortality rates across Southeast Asia. The dashboard was used by local health authorities to allocate resources more effectively during peak infection periods.",
                    image: "https://via.placeholder.com/800x400?text=COVID+Dashboard",
                    link: "#",
                    date: "2022-08-22"
                },
                {
                    id: 3,
                    title: "Customer Segmentation",
                    category: ["machine-learning", "analysis"],
                    tools: ["Python", "Scikit-learn", "K-means"],
                    description: "Built a customer segmentation model using unsupervised learning techniques that identified 5 distinct customer groups based on purchasing behavior. The marketing team used these segments to personalize campaigns, resulting in a 25% higher conversion rate.",
                    image: "https://via.placeholder.com/800x400?text=Customer+Segmentation",
                    link: "#",
                    date: "2023-01-10"
                }
            ];
            
            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('view-project')) {
                    const projectId = parseInt(e.target.getAttribute('data-id'));
                    const project = projects.find(p => p.id === projectId);
                    
                    if (project) {
                        modalContent.innerHTML = `
                            <h2>${project.title}</h2>
                            <div class="project-meta">
                                <span class="project-date">${new Date(project.date).toLocaleDateString()}</span>
                                <span class="project-tools">${project.tools.join(', ')}</span>
                            </div>
                            <img src="${project.image}" alt="${project.title}" class="project-modal-image">
                            <p class="project-description">${project.description}</p>
                            ${project.link ? `<a href="${project.link}" class="project-link" target="_blank">View Project</a>` : ''}
                        `;
                        modal.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                    }
                }
            });
            
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            window.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            
            // Update active nav link on scroll
            window.addEventListener('scroll', function() {
                const scrollPosition = window.scrollY;
                
                document.querySelectorAll('section').forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        document.querySelectorAll('.nav-link').forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${sectionId}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            });
            // Animasi Scroll
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            // Delay berbeda untuk setiap elemen dalam section
            const elements = section.querySelectorAll('.container > *');
            
            elements.forEach((el, i) => {
                // Alternasikan animasi kiri/kanan untuk section genap/ganjil
                if (index % 2 === 0) {
                    if (i % 2 === 0) {
                        el.classList.add('animate-left');
                    } else {
                        el.classList.add('animate-right');
                    }
                } else {
                    if (i % 2 === 0) {
                        el.classList.add('animate-right');
                    } else {
                        el.classList.add('animate-left');
                    }
                }
                
                // Tambahkan delay bertahap
                el.style.animationDelay = `${i * 0.2}s`;
            });
        }
    });
}

// Jalankan saat load dan scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);
        });