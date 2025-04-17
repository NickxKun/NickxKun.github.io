new Vue({
    el: '#gallery',
    data: {
        galleryItems: [],
        loading: true,
        error: null,
        currentCategory: 'all',
        categories: ['all'],
        currentModalItem: null,
        modal: null
    },
    computed: {
        filteredItems() {
            if (this.currentCategory === 'all') {
                return this.galleryItems;
            }
            return this.galleryItems.filter(item => item.category === this.currentCategory);
        },
        currentCategoryTitle() {
            return this.currentCategory.charAt(0).toUpperCase() + this.currentCategory.slice(1);
        }
    },
    methods: {
        async loadGalleryData() {
            try {
                const response = await fetch('assets/gallery/gallery.json');
                if (!response.ok) throw new Error('No gallery data found');
                const data = await response.json();
                this.galleryItems = data.items;
                
                // Extract categories
                const uniqueCategories = new Set(this.galleryItems.map(item => item.category));
                this.categories = ['all', ...Array.from(uniqueCategories).sort()];
                
            } catch (error) {
                console.error('Error loading gallery:', error);
                this.error = 'Gallery is currently empty';
            } finally {
                this.loading = false;
            }
        },
        
        setCategory(category) {
            this.currentCategory = category;
        },
        
        prevCategory() {
            const currentIndex = this.categories.indexOf(this.currentCategory);
            const newIndex = currentIndex > 0 ? currentIndex - 1 : this.categories.length - 1;
            this.setCategory(this.categories[newIndex]);
        },
        
        nextCategory() {
            const currentIndex = this.categories.indexOf(this.currentCategory);
            const newIndex = currentIndex < this.categories.length - 1 ? currentIndex + 1 : 0;
            this.setCategory(this.categories[newIndex]);
        },
        
        getMediaElement(item) {
            if (item.type === 'video') {
                return `<video class="img-fluid" autoplay loop muted playsinline>
                    <source src="assets/gallery/${item.filename}" type="video/mp4">
                </video>`;
            }
            return `<img src="assets/gallery/${item.filename}" 
                       class="img-fluid" 
                       alt="${item.title}"
                       loading="lazy">`;
        },

        isVideo(item) {
            return item.type === 'video';
        },

        openModal(item) {
            this.currentModalItem = item;
            if (!this.modal) {
                this.modal = new bootstrap.Modal(document.getElementById('mediaModal'));
            }
            this.modal.show();
        },

        nextModalItem() {
            const currentIndex = this.filteredItems.findIndex(item => item.id === this.currentModalItem.id);
            const nextIndex = (currentIndex + 1) % this.filteredItems.length;
            this.currentModalItem = this.filteredItems[nextIndex];
        },

        prevModalItem() {
            const currentIndex = this.filteredItems.findIndex(item => item.id === this.currentModalItem.id);
            const prevIndex = currentIndex === 0 ? this.filteredItems.length - 1 : currentIndex - 1;
            this.currentModalItem = this.filteredItems[prevIndex];
        }
    },
    mounted() {
        this.loadGalleryData();
        
        // Add keyboard navigation for modal
        document.addEventListener('keydown', (e) => {
            if (!this.currentModalItem) return;
            
            if (e.key === 'ArrowRight') {
                this.nextModalItem();
            } else if (e.key === 'ArrowLeft') {
                this.prevModalItem();
            } else if (e.key === 'Escape') {
                this.modal?.hide();
            }
        });
    }
}); 