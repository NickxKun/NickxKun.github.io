const projects = [
    {
      id: 0,
      title: "Hybrid Adaptive Compression Algorithms for Energy-Efficient AI Inference",
      subtitle: "Leveraged hardware profiling for edge devices.",
      image: "assets/project1.jpg",
      sections: [
        "This project is centered on developing hybrid adaptive compression algorithms to reduce the computational and energy overhead for AI inference on edge devices. By integrating hardware profiling, the system identifies device-specific performance bottlenecks and applies tailored quantization and pruning techniques to optimize deep neural networks, ensuring efficient processing without compromising accuracy.",
        "A custom reinforcement learning agent further enhances the solution by dynamically adjusting compression parameters based on real-time hardware feedback. This adaptive approach leverages advanced machine learning and edge computing principles to deliver significant energy savings and improved performance across diverse hardware architectures."
      ]
    },
    {
      id: 1,
      title: "Design and Simulation of a 4×4 Systolic Array",
      subtitle: "Architected for efficient matrix multiplication.",
      image: "assets/project2.jpg",
      sections: [
        "The 4×4 Systolic Array project focuses on designing a specialized hardware accelerator for matrix multiplication, a critical operation in high-performance computing and AI applications. The design, implemented in SystemVerilog, emphasizes parallel data processing and pipelined execution to achieve high throughput and efficient computation.",
        "Extensive simulation using ModelSim, along with synthesis and power estimation via Synopsys Design Compiler, validates the design’s functional correctness and energy efficiency. This project demonstrates the effective integration of digital design methodologies and simulation tools to create a scalable, high-performance hardware solution."
      ]
    },
    {
      id: 2,
      title: "CPU Microarchitecture Verification Framework",
      subtitle: "A UVM-based verification environment.",
      image: "assets/project3.jpg",
      sections: [
        "The CPU Microarchitecture Verification Framework is designed to provide a comprehensive environment for simulating and validating advanced CPU designs. Built on the Universal Verification Methodology (UVM), the framework enables thorough testing of critical microarchitectural features such as branch prediction, pipeline hazards, and clock domain crossing.",
        "By employing custom SystemVerilog testbenches and leveraging industry-standard simulation tools like QuestaSim and ModelSim, the framework ensures robust verification of design performance and functionality. This initiative significantly enhances design reliability and efficiency, effectively bridging the gap between schematic design and real-world performance."
      ]
    }
  ];
  

// Vue instance to manage project content
new Vue({
    el: '#projects',
    data: {
        projects: projects, // your project data array
        currentIndex: 0
    },
    computed: {
        currentProject() {
            return this.projects[this.currentIndex];
        }
    },
    methods: {
        goToProject(index) {
            if (index >= 0 && index < this.projects.length) {
                this.currentIndex = index;
                // Update the custom dropdown button text
                document.getElementById('currentProjectTitle').textContent = this.projects[index].title;
            }
        },
        nextProject() {
            let next = this.currentIndex + 1;
            if (next >= this.projects.length) next = 0;
            this.goToProject(next);
        },
        prevProject() {
            let prev = this.currentIndex - 1;
            if (prev < 0) prev = this.projects.length - 1;
            this.goToProject(prev);
        }
    },
    mounted() {
        // Set initial project title
        document.getElementById('currentProjectTitle').textContent = this.currentProject.title;
  
        // Populate the dropdown menu
        const dropdownMenu = document.getElementById('projectDropdownMenu');
        this.projects.forEach((project, index) => {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.classList.add('dropdown-item');
            a.href = "#";
            a.textContent = project.title;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToProject(index);
            });
            li.appendChild(a);
            dropdownMenu.appendChild(li);
        });
  
        // Arrow key navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevProject();
            } else if (e.key === 'ArrowRight') {
                this.nextProject();
            }
        });
  
        // Button events for arrows
        document.getElementById('prevProject').addEventListener('click', () => {
            this.prevProject();
        });
        document.getElementById('nextProject').addEventListener('click', () => {
            this.nextProject();
        });
    }
  });