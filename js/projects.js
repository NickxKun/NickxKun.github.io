const projects = [{
    id: 0,
    title: "Hybrid Adaptive Compression Algorithms for Energy-Efficient AI Inference",
    subtitle: "Leveraged hardware profiling for edge devices.",
    image: "assets/project1.jpg",
    sections: [
        "Abstract: This project implements a recommendation system for hardware-specific compression techniques.",
        "Methodology: Profiling edge devices to apply adaptive compression based on resource constraints.",
        "Results: Demonstrated improved energy efficiency with dynamic algorithm selection."
    ]
},
{
    id: 1,
    title: "Design and Simulation of a 4×4 Systolic Array",
    subtitle: "Architected for efficient matrix multiplication.",
    image: "assets/project2.jpg",
    sections: [
        "Abstract: A systolic array designed for high-performance, pipelined matrix multiplication.",
        "Methodology: Implemented using SystemVerilog with simulation in ModelSim.",
        "Results: Achieved increased throughput and energy efficiency."
    ]
},
{
    id: 2,
    title: "CPU Microarchitecture Verification Framework",
    subtitle: "A UVM-based verification environment.",
    image: "assets/project3.jpg",
    sections: [
        "Abstract: A framework for simulating and verifying advanced CPU microarchitecture features.",
        "Methodology: Developed testbenches to evaluate branch prediction, pipeline hazards, and more.",
        "Results: Enhanced simulation robustness and reduced verification time."
    ]
}
];

// Vue instance to manage project content
new Vue({
    el: '#app',
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