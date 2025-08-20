// document.addEventListener('DOMContentLoaded', async () => {
//   try {
//     // Load blogs data
//     const response = await fetch('../data/blogs.json');
//     const allBlogs = await response.json();

//     // ===== 1. FEATURED BLOGS (Top Section) =====
//     const featuredBlogs = allBlogs.filter(blog => blog.featured);
//     const featuredContainer = document.querySelector('.content .cards');

//     if (featuredBlogs.length > 0) {
//       featuredContainer.innerHTML = `
//         <div class="card highlight">
//           <div class="highlight-content">
//             <h2>${featuredBlogs[0].title}</h2>
//             <p>${featuredBlogs[0].subtitle}</p>
//             <a href="blog-detail.html?slug=${featuredBlogs[0].slug}">Read more →</a>
//           </div>
//         </div>
//         <div class="card info">
//           <p>${featuredBlogs[1]?.category || 'Featured'} · ${featuredBlogs[1]?.date || ''}</p>
//           <h2>${featuredBlogs[1]?.title || 'Featured Blog'}</h2>
//           <p>${featuredBlogs[1]?.subtitle || ''}</p>
//           <a href="blog-detail.html?slug=${featuredBlogs[1]?.slug || ''}">Read more →</a>
//         </div>
//       `;
//     }

//     // ===== 2. FEATURE INSIGHTS (Main Grid) =====
//     const insightsContainer = document.querySelector('#second-page .cards');
//     const showMoreBtn = document.querySelector('.show-more-btn');
//     let visibleCount = 6;

//     function renderInsights(blogs) {
//       insightsContainer.innerHTML = blogs.slice(0, visibleCount).map(blog => `
//         <div class="card">
//           <div class="card-header" style="background-color: #635e5e;">
//             <h2>${blog.title}</h2>
//           </div>
//           <div class="card-body">
//             <p class="category">${blog.category}</p>
//             <h3>${blog.subtitle}</h3>
//             <p>${blog.content.substring(0, 100)}...</p>
//             <div class="author">
//               <img src="../blogs/assets/${blog.image}" alt="${blog.author}">
//               <span>${blog.author}<br>${blog.position}</span>
//             </div>
//             <p class="date">${blog.date}</p>
//             <a href="blog-detail.html?slug=${blog.slug}" class="read-more">Read more →</a>
//           </div>
//         </div>
//       `).join('');

//       showMoreBtn.style.display = visibleCount >= blogs.length ? 'none' : 'block';
//     }

//     // Initial render
//     renderInsights(allBlogs);

//     // Show More button
//     showMoreBtn.addEventListener('click', () => {
//       visibleCount += 3;
//       renderInsights(allBlogs);
//     });

//     // ===== 3. CATEGORY FILTERS =====
//     document.querySelectorAll('.category-buttons button').forEach(button => {
//       button.addEventListener('click', () => {
//         document.querySelectorAll('.category-buttons button').forEach(btn => 
//           btn.classList.remove('active'));
//         button.classList.add('active');
        
//         const category = button.textContent;
//         const filtered = category === 'All Insight' 
//           ? allBlogs 
//           : allBlogs.filter(blog => blog.category === category);
        
//         visibleCount = 6;
//         renderInsights(filtered);
//       });
//     });

//   } catch (error) {
//     console.error("Error loading blogs:", error);
//   }
// });

// document.addEventListener('DOMContentLoaded', async () => {
//   // Debugging container
//   const debugContainer = document.createElement('div');
//   debugContainer.style.cssText = `
//     position: fixed;
//     bottom: 10px;
//     right: 10px;
//     background: rgba(0,0,0,0.8);
//     color: white;
//     padding: 15px;
//     z-index: 9999;
//     font-family: monospace;
//     max-width: 400px;
//     max-height: 200px;
//     overflow: auto;
//   `;
//   document.body.appendChild(debugContainer);

//   function debugLog(message) {
//     debugContainer.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
//     console.log(message);
//   }

//   try {
//     debugLog('Starting blog loading process...');

//     // 1. Attempt to load from server
//     const API_URL = 'http://localhost:3001/api/blogs?_=' + Date.now();
//     let allBlogs = [];
    
//     debugLog(`Fetching from: ${API_URL}`);
//     const response = await fetch(API_URL);
    
//     if (!response.ok) {
//       throw new Error(`Server responded with ${response.status}`);
//     }
    
//     allBlogs = await response.json();
//     debugLog(`Success! Received ${allBlogs.length} blogs`);
    
//     // 2. Verify data structure
//     if (!Array.isArray(allBlogs)) {
//       throw new Error('Invalid data format - expected array');
//     }
    
//     // 3. Forcefully render blogs (even if empty)
//     debugLog('Rendering blogs...');
//     renderBlogs(allBlogs);
//     debugLog('Render complete!');

//   } catch (error) {
//     debugLog(`ERROR: ${error.message}`);
//     showError(error);
//   }

//   function renderBlogs(blogs) {
//     // Clear existing content
//     const featuredContainer = document.querySelector('.content .cards');
//     const insightsContainer = document.querySelector('#second-page .cards');
    
//     // 1. Render featured blogs
//     const featuredBlogs = blogs.filter(blog => blog.featured);
//     if (featuredBlogs.length > 0) {
//       featuredContainer.innerHTML = `
//         <div class="card highlight">
//           <div class="highlight-content">
//             <h2>${featuredBlogs[0].title}</h2>
//             <p>${featuredBlogs[0].subtitle || ''}</p>
//             <a href="blog-detail.html?slug=${featuredBlogs[0].slug}">Read more →</a>
//           </div>
//         </div>
//         <div class="card info">
//           <p>${featuredBlogs[1]?.category || 'Featured'} · ${featuredBlogs[1]?.date || ''}</p>
//           <h2>${featuredBlogs[1]?.title || 'Featured Blog'}</h2>
//           <p>${featuredBlogs[1]?.subtitle || ''}</p>
//           <a href="blog-detail.html?slug=${featuredBlogs[1]?.slug || ''}">Read more →</a>
//         </div>
//       `;
//     }

//     // 2. Render main grid
//     insightsContainer.innerHTML = blogs.slice(0, 6).map(blog => `
//       <div class="card">
//         <div class="card-header" style="background-color: #635e5e;">
//           <h2>${blog.title}</h2>
//         </div>
//         <div class="card-body">
//           <p class="category">${blog.category}</p>
//           <h3>${blog.subtitle || ''}</h3>
//           <p>${blog.content?.substring(0, 100) || ''}...</p>
//           <div class="author">
//             <img src="/uploads/${blog.image || 'default.jpg'}" 
//                  alt="${blog.author || 'Author'}">
//             <span>${blog.author || 'Anonymous'}<br>${blog.position || 'Writer'}</span>
//           </div>
//           <p class="date">${blog.date || new Date().toLocaleDateString()}</p>
//           <a href="blog-detail.html?slug=${blog.slug}" class="read-more">Read more →</a>
//         </div>
//       </div>
//     `).join('');

//     // 3. Add "Show More" functionality
//     const showMoreBtn = document.querySelector('.show-more-btn');
//     let visibleCount = 6;
    
//     showMoreBtn.style.display = blogs.length <= 6 ? 'none' : 'block';
//     showMoreBtn.onclick = () => {
//       visibleCount += 3;
//       insightsContainer.innerHTML = blogs.slice(0, visibleCount).map(blog => `
//         <!-- Same card template as above -->
//       `).join('');
//       showMoreBtn.style.display = visibleCount >= blogs.length ? 'none' : 'block';
//     };
//   }

//   function showError(error) {
//     const errorDiv = document.createElement('div');
//     errorDiv.style.cssText = `
//       background: #ffebee;
//       color: #c62828;
//       padding: 20px;
//       margin: 20px;
//       border-radius: 8px;
//     `;
//     errorDiv.innerHTML = `
//       <h3>Blog Loading Failed</h3>
//       <p>${error.message}</p>
//       <button onclick="location.reload()" style="
//         background: #c62828;
//         color: white;
//         border: none;
//         padding: 8px 16px;
//         border-radius: 4px;
//         cursor: pointer;
//       ">Retry</button>
//     `;
//     document.querySelector('#second-page .container').prepend(errorDiv);
//   }
// });

// document.addEventListener('DOMContentLoaded', async () => {
//   // Debugging setup
//   const debugContainer = document.createElement('div');
//   debugContainer.style.cssText = `
//     position: fixed;
//     bottom: 10px;
//     right: 10px;
//     background: rgba(0,0,0,0.8);
//     color: white;
//     padding: 15px;
//     z-index: 9999;
//     font-family: monospace;
//     max-width: 400px;
//     max-height: 200px;
//     overflow: auto;
//     display: none; /* Hide by default */
//   `;
//   document.body.appendChild(debugContainer);

//   function debugLog(message) {
//     debugContainer.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
//     console.log(message);
//   }

//   try {
//     debugLog('Starting blog loading...');
    
//     // Try Node server first, then fallback to local JSON
//     let allBlogs = [];
//     let dataSource = 'server';
    
//     try {
//       debugLog('Attempting to fetch from server...');
//       const response = await fetch('http://localhost:3001/api/blogs?_=' + Date.now());
      
//       if (!response.ok) throw new Error(`Server error: ${response.status}`);
      
//       allBlogs = await response.json();
//       debugLog(`Loaded ${allBlogs.length} blogs from server`);
//     } catch (serverError) {
//       debugLog(`Server fetch failed: ${serverError.message}`);
//       dataSource = 'fallback';
      
//       try {
//         debugLog('Attempting fallback to local JSON...');
//         const fallbackResponse = await fetch('../data/blogs.json');
//         allBlogs = await fallbackResponse.json();
//         debugLog(`Loaded ${allBlogs.length} blogs from fallback`);
//       } catch (fallbackError) {
//         throw new Error(`Both server and fallback failed: ${fallbackError.message}`);
//       }
//     }

//     // ===== 1. FEATURED BLOGS (Top Section) =====
//     // debugLog('Rendering featured blogs...');
//     // const featuredBlogs = allBlogs.filter(blog => blog.featured);
//     // const featuredContainer = document.querySelector('.content .cards');

//     // if (featuredBlogs.length > 0) {
//     //   featuredContainer.innerHTML = `
//     //     <div class="card highlight">
//     //       <div class="highlight-content">
//     //         <h2>${featuredBlogs[0].title}</h2>
//     //         <p>${featuredBlogs[0].subtitle || ''}</p>
//     //         <a href="blog-detail.html?slug=${featuredBlogs[0].slug}">Read more →</a>
//     //       </div>
//     //     </div>
//     //     <div class="card info">
//     //       <p>${featuredBlogs[1]?.category || 'Featured'} · ${featuredBlogs[1]?.date || ''}</p>
//     //       <h2>${featuredBlogs[1]?.title || 'Featured Blog'}</h2>
//     //       <p>${featuredBlogs[1]?.subtitle || ''}</p>
//     //       <a href="blog-detail.html?slug=${featuredBlogs[1]?.slug || ''}">Read more →</a>
//     //     </div>
//     //   `;
//     // }

//     // ===== 2. FEATURE INSIGHTS (Main Grid) =====
//     debugLog('Rendering main blog grid...');
//     const insightsContainer = document.querySelector('#second-page .cards');
//     const showMoreBtn = document.querySelector('.show-more-btn');
//     let visibleCount = 6;

//     function renderInsights(blogs) {
//   insightsContainer.innerHTML = blogs.slice(0, visibleCount).map(blog => {
//     const imageFile = blog.image || 'default-author.jpg';
//     const imagePath = `${dataSource === 'server' ? 'http://localhost:3001/uploads/' : './assets/'}${imageFile}`;
//     console.log(`Loading image: ${imagePath}`); // Debug log
//     return `
//       <div class="card">
//         <div class="card-header" style="background-color: #19529a;">
//           <h2>${blog.title}</h2>
//         </div>
//         <div class="card-body">
//           <p class="category">${blog.category}</p>
//           <h3>${blog.subtitle || ''}</h3>
//           <p>${blog.content?.substring(0, 100) || ''}...</p>
//           <div class="author">
//             <img src="${imagePath}" 
//                  alt="${blog.author || 'Author'}"
//                  onerror="this.src='./assets/default-author.jpg'; console.error('Failed to load image: ${imagePath}');">
//             <span>${blog.author || 'Anonymous'}<br>${blog.position || 'Writer'}</span>
//           </div>
//           <p class="date">${blog.date || new Date().toLocaleDateString()}</p>
//           <a href="blog-detail.html?slug=${blog.slug}" class="read-more">Read more →</a>
//         </div>
//       </div>
//     `;
//   }).join('');
//   showMoreBtn.style.display = visibleCount >= blogs.length ? 'none' : 'block';
// }
//     // Initial render
//     renderInsights(allBlogs);

//     // Show More button
//     showMoreBtn.addEventListener('click', () => {
//       visibleCount += 3;
//       renderInsights(allBlogs);
//     });

//     // ===== 3. CATEGORY FILTERS =====
//     document.querySelectorAll('.category-buttons button').forEach(button => {
//       button.addEventListener('click', () => {
//         document.querySelectorAll('.category-buttons button').forEach(btn => 
//           btn.classList.remove('active'));
//         button.classList.add('active');
        
//         const category = button.textContent;
//         const filtered = category === 'All Insight' 
//           ? allBlogs 
//           : allBlogs.filter(blog => blog.category === category);
        
//         visibleCount = 6;
//         renderInsights(filtered);
//       });
//     });

//     debugLog('Blog rendering complete!');

//   } catch (error) {
//     debugLog(`Fatal error: ${error.message}`);
//     console.error("Error loading blogs:", error);
    
//     // Show error message in the UI
//     const errorContainer = document.createElement('div');
//     errorContainer.className = 'blog-error';
//     errorContainer.style.cssText = `
//       background: #ffebee;
//       color: #c62828;
//       padding: 20px;
//       margin: 20px;
//       border-radius: 8px;
//     `;
//     errorContainer.innerHTML = `
//       <h3>⚠️ Blog Loading Error</h3>
//       <p>${error.message}</p>
//       <button onclick="location.reload()" style="
//         background: #c62828;
//         color: white;
//         border: none;
//         padding: 8px 16px;
//         border-radius: 4px;
//         cursor: pointer;
//       ">Retry</button>
//     `;
//     document.querySelector('#second-page .container').prepend(errorContainer);
//   }

//   // Toggle debug view with Ctrl+Shift+D
//   document.addEventListener('keydown', (e) => {
//     if (e.ctrlKey && e.shiftKey && e.key === 'D') {
//       debugContainer.style.display = debugContainer.style.display === 'none' ? 'block' : 'none';
//     }
//   });
// }); main code Aug 12
//........................................................................................................................................................
//........................................................................................................................................................

// document.addEventListener('DOMContentLoaded', async () => {
//   // Debugging setup
//   const debugContainer = document.createElement('div');
//   debugContainer.style.cssText = `
//     position: fixed;
//     bottom: 10px;
//     right: 10px;
//     background: rgba(0,0,0,0.8);
//     color: white;
//     padding: 15px;
//     z-index: 9999;
//     font-family: monospace;
//     max-width: 400px;
//     max-height: 200px;
//     overflow: auto;
//     display: none; /* Hide by default */
//   `;
//   document.body.appendChild(debugContainer);

//   function debugLog(message) {
//     debugContainer.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
//     console.log(message);
//   }

//   try {
//     debugLog('Starting blog loading...');
    
//     // Try Node server first, then fallback to local JSON
//     let allBlogs = [];
//     let dataSource = 'server';
    
//     try {
//       debugLog('Attempting to fetch from server...');
//       const response = await fetch('http://localhost:3001/api/blogs?_=' + Date.now());
      
//       if (!response.ok) throw new Error(`Server error: ${response.status}`);
      
//       allBlogs = await response.json();
//       debugLog(`Loaded ${allBlogs.length} blogs from server`);
//     } catch (serverError) {
//       debugLog(`Server fetch failed: ${serverError.message}`);
//       dataSource = 'fallback';
      
//       try {
//         debugLog('Attempting fallback to local JSON...');
//         const fallbackResponse = await fetch('../data/blogs.json');
//         allBlogs = await fallbackResponse.json();
//         debugLog(`Loaded ${allBlogs.length} blogs from fallback`);
//       } catch (fallbackError) {
//         throw new Error(`Both server and fallback failed: ${fallbackError.message}`);
//       }
//     }

//     // ===== 1. FEATURED BLOGS (Top Section) =====
//     // Uncomment and adjust if you want to enable featured blogs
//     // debugLog('Rendering featured blogs...');
//     // const featuredBlogs = allBlogs.filter(blog => blog.featured);
//     // const featuredContainer = document.querySelector('.content .cards');

//     // if (featuredBlogs.length > 0) {
//     //   featuredContainer.innerHTML = `
//     //     <div class="card highlight">
//     //       <div class="highlight-content">
//     //         <h2>${featuredBlogs[0].title}</h2>
//     //         <p>${featuredBlogs[0].subtitle || ''}</p>
//     //         <a href="blog-detail.html?slug=${featuredBlogs[0].slug}">Read more →</a>
//     //       </div>
//     //     </div>
//     //     <div class="card info">
//     //       <p>${featuredBlogs[1]?.category || 'Featured'} · ${featuredBlogs[1]?.date || ''}</p>
//     //       <h2>${featuredBlogs[1]?.title || 'Featured Blog'}</h2>
//     //       <p>${featuredBlogs[1]?.subtitle || ''}</p>
//     //       <a href="blog-detail.html?slug=${featuredBlogs[1]?.slug || ''}">Read more →</a>
//     //     </div>
//     //   `;
//     // }

//     // ===== 2. FEATURE INSIGHTS (Main Grid) =====
//     debugLog('Rendering main blog grid...');
//     const insightsContainer = document.querySelector('#second-page .cards');
//     const showMoreBtn = document.querySelector('.show-more-btn');
//     const searchInput = document.querySelector('.search-input');
//     const searchButton = document.querySelector('.search-button');
//     let visibleCount = 6;
//     let currentCategory = 'All Insight';
//     let searchQuery = '';
//     let currentDisplayedBlogs = allBlogs;

//     function getFilteredBlogs() {
//       let blogs = allBlogs;
      
//       // Apply category filter if not All
//       if (currentCategory !== 'All Insight') {
//         blogs = blogs.filter(blog => blog.category === currentCategory);
//       }
      
//       // Apply search filter if query exists
//       if (searchQuery) {
//         blogs = blogs.filter(blog => 
//           (blog.title?.toLowerCase().includes(searchQuery) ?? false) ||
//           (blog.subtitle?.toLowerCase().includes(searchQuery) ?? false) ||
//           (blog.content?.toLowerCase().includes(searchQuery) ?? false) ||
//           (blog.category?.toLowerCase().includes(searchQuery) ?? false) ||
//           (blog.author?.toLowerCase().includes(searchQuery) ?? false)
//         );
//       }
      
//       return blogs;
//     }

//     function renderInsights(blogs) {
//     insightsContainer.innerHTML = blogs.slice(0, visibleCount).map(blog => {
//         const imageFile = blog.image || 'default-author.jpg';
//         const imagePath = `${dataSource === 'server' ? 'http://localhost:3001/uploads/' : './assets/'}${imageFile}`;
        
//         return `
//             <div class="card">
//                 <div class="card-header" style="background-color: #19529a;">
//                     <h2>${blog.title}</h2>
//                 </div>
//                 <div class="card-body">
//                     <p class="category">${blog.category}</p>
//                     <h3>${blog.subtitle || ''}</h3>
//                     <p>${blog.content?.substring(0, 100) || ''}...</p>
//                     <div class="author">
//                         <img src="${imagePath}" 
//                              alt="${blog.author || 'Author'}"
//                              onerror="this.src='./assets/default-author.jpg'; console.error('Failed to load image: ${imagePath}');">
//                         <span>${blog.author || 'Anonymous'}<br>${blog.position || 'Writer'}</span>
//                     </div>
//                     <p class="date">${blog.date || new Date().toLocaleDateString()}</p>
//                     <a href="#" class="read-more" data-blog-id="${blog.id || blog.slug}">Read more →</a>
//                 </div>
//             </div>
//         `;
//     }).join('');

//     // Add click handlers to all "Read more" buttons
//     document.querySelectorAll('.read-more').forEach(button => {
//         button.addEventListener('click', (e) => {
//             e.preventDefault();
//             const blogId = button.getAttribute('data-blog-id');
//             const blog = allBlogs.find(b => b.id === blogId || b.slug === blogId);
//             if (blog) {
//                 showBlogPopup(blog);
//             }
//         });
//     });

//     showMoreBtn.style.display = visibleCount >= blogs.length ? 'none' : 'block';
// }

// // Function to show the blog popup
// function showBlogPopup(blog) {
//     const popup = document.getElementById('blog-popup');
//     const imageFile = blog.image || 'default-author.jpg';
//     const imagePath = `${dataSource === 'server' ? 'http://localhost:3001/uploads/' : './assets/'}${imageFile}`;
    
//     // Set the blog content
//     document.getElementById('blog-title').textContent = blog.title;
//     document.getElementById('blog-subtitle').textContent = blog.subtitle || '';
//     document.getElementById('blog-author-img').src = imagePath;
//     document.getElementById('blog-author').textContent = `${blog.author || 'Anonymous'}, ${blog.position || 'Writer'}`;
//     document.getElementById('blog-date').textContent = blog.date || new Date().toLocaleDateString();
    
//     // Format the content with proper paragraphs and dashes
//     const contentElement = document.getElementById('blog-content');
//     contentElement.innerHTML = formatBlogContent(blog.content || '');
    
//     // Show the popup
//     popup.style.display = 'block';
    
//     // Close button handler
//     document.querySelector('.close-btn').onclick = () => {
//         popup.style.display = 'none';
//     };
    
//     // Close when clicking outside content
//     popup.addEventListener('click', (e) => {
//         if (e.target === popup) {
//             popup.style.display = 'none';
//         }
//     });
    
//     // Close with Escape key
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'Escape') {
//             popup.style.display = 'none';
//         }
//     });
// }

// // New function to format blog content
// function formatBlogContent(content) {
//     // Add dashes to the start if they're not already there
//     if (!content.startsWith('')) {
//         content = '- ' + content;
//     }
    
//     // Replace line breaks with paragraph breaks
//     content = content.replace(/\n/g, '</p><p>');
    
//     // Ensure each dash starts a new paragraph
//     content = content.replace(/- /g, '</p><p>- ');
    
//     // Wrap in paragraphs and add proper spacing
//     return `<p>${content}</p>`;
// }

//     // Initial render
//     currentDisplayedBlogs = getFilteredBlogs();
//     renderInsights(currentDisplayedBlogs);

//     // Show More button
//     showMoreBtn.addEventListener('click', () => {
//       visibleCount += 3;
//       renderInsights(currentDisplayedBlogs);
//     });

//     // ===== 3. CATEGORY FILTERS =====
//     document.querySelectorAll('.category-buttons button').forEach(button => {
//       button.addEventListener('click', () => {
//         document.querySelectorAll('.category-buttons button').forEach(btn => 
//           btn.classList.remove('active'));
//         button.classList.add('active');
        
//         currentCategory = button.textContent;
//         currentDisplayedBlogs = getFilteredBlogs();
//         visibleCount = 6;
//         renderInsights(currentDisplayedBlogs);
//       });
//     });

//     // ===== 4. SEARCH FUNCTIONALITY =====
//     function performSearch() {
//       searchQuery = searchInput.value.trim().toLowerCase();
//       currentDisplayedBlogs = getFilteredBlogs();
//       visibleCount = 6;
//       renderInsights(currentDisplayedBlogs);
//     }

//     // Search on button click
//     searchButton.addEventListener('click', performSearch);

//     // Search on Enter key
//     searchInput.addEventListener('keyup', (e) => {
//       if (e.key === 'Enter') {
//         performSearch();
//       }
//     });

//     debugLog('Blog rendering complete!');

//   } catch (error) {
//     debugLog(`Fatal error: ${error.message}`);
//     console.error("Error loading blogs:", error);
    
//     // Show error message in the UI
//     const errorContainer = document.createElement('div');
//     errorContainer.className = 'blog-error';
//     errorContainer.style.cssText = `
//       background: #ffebee;
//       color: #c62828;
//       padding: 20px;
//       margin: 20px;
//       border-radius: 8px;
//     `;
//     errorContainer.innerHTML = `
//       <h3>⚠️ Blog Loading Error</h3>
//       <p>${error.message}</p>
//       <button onclick="location.reload()" style="
//         background: #c62828;
//         color: white;
//         border: none;
//         padding: 8px 16px;
//         border-radius: 4px;
//         cursor: pointer;
//       ">Retry</button>
//     `;
//     document.querySelector('#second-page .container').prepend(errorContainer);
//   }

//   // Toggle debug view with Ctrl+Shift+D
//   document.addEventListener('keydown', (e) => {
//     if (e.ctrlKey && e.shiftKey && e.key === 'D') {
//       debugContainer.style.display = debugContainer.style.display === 'none' ? 'block' : 'none';
//     }
//   });
// });



// document.addEventListener('DOMContentLoaded', function () {
//     // Hamburger Menu Functionality
//     function initializeHamburgerMenu() {
//         const hamburger = document.getElementById('hamburger');
//         const navList = document.querySelector('#navbar ul');

//         if (!hamburger || !navList) {
//             console.warn('Hamburger or navList not found!');
//             return;
//         }

//         hamburger.addEventListener('click', function () {
//             navList.classList.toggle('active');
//             this.classList.toggle('open');

//             const navItems = document.querySelectorAll('#navbar ul li');
//             navItems.forEach((item, index) => {
//                 if (navList.classList.contains('active')) {
//                     setTimeout(() => {
//                         item.style.opacity = '1';
//                         item.style.transform = 'translateY(0)';
//                     }, index * 100);
//                 } else {
//                     item.style.opacity = '0';
//                     item.style.transform = 'translateY(-10px)';
//                 }
//             });
//         });

//         const navLinks = document.querySelectorAll('#navbar a');
//         navLinks.forEach(link => {
//             link.addEventListener('click', function () {
//                 navList.classList.remove('active');
//                 hamburger.classList.remove('open');
//                 const navItems = document.querySelectorAll('#navbar ul li');
//                 navItems.forEach(item => {
//                     item.style.opacity = '0';
//                     item.style.transform = 'translateY(-10px)';
//                 });
//             });
//         });
//     }

    

//    // Video Pause on End and Remove Controls
// function initializeVideo() {
//     const video = document.getElementById('electron-video');
//     if (video) {
//         // Disable video controls to remove play button and other UI
//         video.controls = false;

//         // Existing functionality to pause on end and stay on last frame
//         video.addEventListener('ended', () => {
//             video.pause();
//             video.currentTime = video.duration; // Stay on last frame
//         });
//     } else {
//         console.warn('Video element not found!');
//     }
// }
// // Popup Functionality with Email Validation
//     function initializePopup() {
//         const buyButtons = document.querySelectorAll('.buy-button');
//         const comingSoonButton = document.querySelector('.price-button');
//         const popup = document.getElementById('subscription-popup');
//         const subscribeButton = document.getElementById('subscribe-button');
//         const emailInput = document.getElementById('email-input');
//         const popupContent = document.querySelector('.popup-content');

//         if (!popup || !subscribeButton || !emailInput || !popupContent) {
//             console.warn('Popup elements not found!');
//             return;
//         }

//         // Show popup on button clicks
//         buyButtons.forEach(button => {
//             button.addEventListener('click', () => {
//                 popup.classList.add('active');
//                 emailInput.focus(); // Improve accessibility
//             });
//         });

//         if (comingSoonButton) {
//             comingSoonButton.addEventListener('click', () => {
//                 popup.classList.add('active');
//                 emailInput.focus();
//             });
//         }

//         // Hide popup when clicking outside
//         popup.addEventListener('click', (e) => {
//             if (e.target === popup) {
//                 popup.classList.remove('active');
//                 clearMessages();
//             }
//         });

//         // Email validation on subscribe
//         subscribeButton.addEventListener('click', () => {
//             const email = emailInput.value.trim();
//             const emailRegex = /^[a-z0-9]+([.][a-z0-9]+)*@gmail\.in$/;

//             clearMessages();

//             if (!email) {
//                 showError('Please enter an email address.');
//             } else if (email !== email.toLowerCase()) {
//                 showError('Email must be in lowercase.');
//             } else if (!emailRegex.test(email)) {
//                 showError('Please enter a valid email address (e.g., xyz@gmail.in).');
//             } else {
//                 showSuccess('Subscribed successfully!');
//                 emailInput.value = '';
//                 // Optional: Add backend integration here
//                 /*
//                 fetch('/api/subscribe', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ email })
//                 })
//                 .then(response => response.json())
//                 .then(data => console.log('Subscription successful:', data))
//                 .catch(error => showError('Subscription failed. Please try again.'));
//                 */
//                 setTimeout(() => {
//                     popup.classList.remove('active');
//                     clearMessages();
//                 }, 2000);
//             }
//         });

//         // Clear existing error/success messages
//         function clearMessages() {
//             const existingMessage = popupContent.querySelector('.error-message, .success-message');
//             if (existingMessage) existingMessage.remove();
//         }

//         // Show error message
//         function showError(message) {
//             const errorDiv = document.createElement('div');
//             errorDiv.className = 'error-message';
//             errorDiv.style.color = 'red';
//             errorDiv.style.marginTop = '10px';
//             errorDiv.style.textAlign = 'center';
//             errorDiv.style.fontSize = '14px';
//             errorDiv.textContent = message;
//             errorDiv.setAttribute('role', 'alert');
//             popupContent.appendChild(errorDiv);

//             setTimeout(() => {
//                 errorDiv.remove();
//             }, 3000);
//         }

//         // Show success message
//         function showSuccess(message) {
//             const successDiv = document.createElement('div');
//             successDiv.className = 'success-message';
//             successDiv.style.color = 'green';
//             successDiv.style.marginTop = '10px';
//             successDiv.style.textAlign = 'center';
//             successDiv.style.fontSize = '14px';
//             successDiv.textContent = message;
//             successDiv.setAttribute('role', 'alert');
//             popupContent.appendChild(successDiv);

//             setTimeout(() => {
//                 successDiv.remove();
//             }, 3000);
//         }
//     }

//     // Second Page Slider with Touch Functionality
//     function initializeSecondPageSlider() {
//         const slider = document.querySelector('#slidesContainer');
//         const prevBtn = document.querySelector('#second-page .prev-slide');
//         const nextBtn = document.querySelector('#second-page .next-slide');
//         const secondPageSection = document.querySelector('#second-page');

//         if (!slider || !prevBtn || !nextBtn || !secondPageSection) {
//             console.warn('Slider elements not found:', { slider, prevBtn, nextBtn, secondPageSection });
//             return;
//         }

//         let currentIndex = 0;
//         const autoSlideInterval = 10000; // 10 seconds
//         const restartDelay = 1000; // 1 second
//         let autoSlideTimer = null;
//         let isAutoSliding = false;
//         let touchStartX = 0;
//         let touchCurrentX = 0;
//         let isSwiping = false;
//         const swipeThreshold = 50; // Minimum swipe distance in pixels

//         // Slide data
//         const slidesData = [
//             {
//                 image: '/electron_page/Frame.svg',
//                 title: 'What Is Electron?',
//                 description: 'Atomo Innovation’s Electron is a powerful edge computing platform for industries, offering real-time intelligence, faster processing, and seamless automation at the edge.'
//             },
//             {
//                 image: '/electron_page/Frame.svg',
//                 title: 'Why It Exists?',
//                 description: 'With Electron, industries can run AI locally - no cloud needed. This means faster, secure, and reliable operations, even offline or in remote locations.'
//             },
//             {
//                 image: '/electron_page/Frame.svg',
//                 title: "Who It's For?",
//                 description: 'Ideal for system integrators and IoT providers, enabling intelligent edge systems with enhanced performance, reliability, and scalability for industrial applications.'
//             },
//             {
//                 image: '/electron_page/Frame.svg',
//                 title: 'Built for Harsh Realities!',
//                 description: 'Electron excels in real-world environments - from remote farms to factory floors and power stations - delivering reliable edge intelligence wherever its needed most.'
//             },
//             {
//                 image: '/electron_page/Frame.svg',
//                 title: 'Beyond a Device.',
//                 description: 'Electron is built to perform in the toughest environments-be it remote farms, factory floors, or power stations-ensuring dependable edge computing wherever its deployed.'
//             },
//             {
//                 image: '/electron_page/Frame.svg',
//                 title: 'Drives Smarter Ops.',
//                 description: 'It empowers machines to communicate, predict potential issues, and optimize performance autonomously-directly at the edge, without relying on the cloud.'
//             },
//             {
//                 image: '/electron_page/Frame.svg',
//                 title: 'Step into Industry 4.0.',
//                 description: 'Electron serves as a gateway to modern industrial practices, seamlessly bridging legacy systems with future-ready, intelligent infrastructure.'
//             },
//             {
//                 image: '/electron_page/Frame.svg',
//                 title: 'Easy In, Irreplaceable Out.', 
//                 description: 'Electron integrates effortlessly into existing systems-and once its there, it becomes an indispensable part of operations, redefining efficiency and control.'
//             },
//             {
//                 image: '/electron_page/Frame.svg',
//                 title: 'Part of a Bigger Family.',
//                 description: 'Electron integrates seamlessly with Neutron and Proton, creating a unified ecosystem for smart environments across both residential and industrial settings.'
//             },
//             {
//                 image: '/electron_page/Frame.svg',
//                 title: 'India-Born, World-Ready.',
//                 description: 'A proudly Indian innovation, Electron is designed to empower industries both locally and globally, combining robust engineering with a vision for worldwide impact.'
//             }
//         ];

//         // Create slides
//         slidesData.forEach((slide, index) => {
//             const slideElement = document.createElement('div');
//             slideElement.className = 'slide';
//             slideElement.innerHTML = `
//                 <img src="${slide.image}" alt="${slide.title}" class="slide-img">
//                 <div class="slide-content">
//                     <h3 class="text-xl font-bold mb-2">${slide.title}</h3>
//                     <p class="text-sm">${slide.description}</p>
//                 </div>
//             `;
//             slider.appendChild(slideElement);
//         });

//         const slides = document.querySelectorAll('#second-page .slide');

//         if (slides.length === 0) {
//             console.warn('No slides found in #slidesContainer');
//             return;
//         }

//         function updateSlidesToShow() {
//             if (window.innerWidth <= 480) return 1;
//             if (window.innerWidth <= 768) return 2;
//             if (window.innerWidth <= 1024) return 3;
//             return 4;
//         }

//         function updateSlider() {
//             const slidesToShow = updateSlidesToShow();
//             const slideWidth = slides[0].offsetWidth + 10; // Include margin (5px each side)
//             const containerWidth = slider.parentElement.offsetWidth;
//             let translateX = -currentIndex * slideWidth;

//             // Center single slide on mobile
//             if (slidesToShow === 1) {
//                 const offset = (containerWidth - slideWidth) / 2;
//                 translateX += offset;
//             }

//             slider.style.transition = isSwiping ? 'none' : 'transform 0.3s ease';
//             slider.style.transform = `translateX(${translateX}px)`;

//             // Update button states
//             prevBtn.disabled = currentIndex === 0;
//             nextBtn.disabled = currentIndex >= slides.length - slidesToShow;
//         }

//         function goToNextSlide() {
//             clearTimeout(autoSlideTimer);
//             const slidesToShow = updateSlidesToShow();
//             if (currentIndex < slides.length - slidesToShow) {
//                 currentIndex++;
//                 updateSlider();
//             } else {
//                 setTimeout(() => {
//                     currentIndex = 0;
//                     updateSlider();
//                     if (isAutoSliding) {
//                         autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
//                     }
//                 }, restartDelay);
//             }
//         }

//         function goToPrevSlide() {
//             clearTimeout(autoSlideTimer);
//             if (currentIndex > 0) {
//                 currentIndex--;
//                 updateSlider();
//             }
//             if (isAutoSliding) {
//                 autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
//             }
//         }

//         function autoSlide() {
//             const slidesToShow = updateSlidesToShow();
//             if (currentIndex >= slides.length - slidesToShow) {
//                 setTimeout(() => {
//                     currentIndex = 0;
//                     updateSlider();
//                     if (isAutoSliding) {
//                         autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
//                     }
//                 }, restartDelay);
//             } else {
//                 currentIndex++;
//                 updateSlider();
//                 if (isAutoSliding) {
//                     autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
//                 }
//             }
//         }

//         // Touch event handlers
//         function handleTouchStart(e) {
//             touchStartX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
//             touchCurrentX = touchStartX;
//             isSwiping = true;
//             clearTimeout(autoSlideTimer); // Pause auto-slide during touch
//         }

//         function handleTouchMove(e) {
//             if (!isSwiping) return;
//             touchCurrentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
//             const deltaX = touchCurrentX - touchStartX;
//             const slideWidth = slides[0].offsetWidth + 10;
//             const slidesToShow = updateSlidesToShow();
//             let translateX = -currentIndex * slideWidth + deltaX;

//             // Center single slide on mobile
//             if (slidesToShow === 1) {
//                 const containerWidth = slider.parentElement.offsetWidth;
//                 const offset = (containerWidth - slideWidth) / 2;
//                 translateX += offset;
//             }

//             // Bound the swipe to prevent sliding too far
//             const maxTranslate = 0;
//             const minTranslate = -((slides.length - slidesToShow) * slideWidth);
//             translateX = Math.max(minTranslate, Math.min(maxTranslate, translateX));

//             slider.style.transition = 'none';
//             slider.style.transform = `translateX(${translateX}px)`;
//         }

//         function handleTouchEnd() {
//             if (!isSwiping) return;
//             isSwiping = false;
//             const deltaX = touchCurrentX - touchStartX;

//             if (Math.abs(deltaX) > swipeThreshold) {
//                 if (deltaX < 0) {
//                     // Swipe left - next slide
//                     goToNextSlide();
//                 } else {
//                     // Swipe right - previous slide
//                     goToPrevSlide();
//                 }
//             } else {
//                 // Snap back to current slide
//                 updateSlider();
//             }

//             // Resume auto-slide if enabled
//             if (isAutoSliding) {
//                 autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
//             }
//         }

//         // Add touch and mouse event listeners for both mobile and desktop
//         slider.addEventListener('touchstart', handleTouchStart, { passive: false });
//         slider.addEventListener('touchmove', handleTouchMove, { passive: false });
//         slider.addEventListener('touchend', handleTouchEnd, { passive: false });
//         slider.addEventListener('mousedown', handleTouchStart);
//         slider.addEventListener('mousemove', handleTouchMove);
//         slider.addEventListener('mouseup', handleTouchEnd);
//         slider.addEventListener('mouseleave', handleTouchEnd); // Handle case when mouse leaves slider

//         // Prevent default drag behavior
//         slider.addEventListener('dragstart', (e) => e.preventDefault());

//         // IntersectionObserver for auto-sliding
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         if (!isAutoSliding) {
//                             isAutoSliding = true;
//                             autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
//                         }
//                     } else {
//                         if (isAutoSliding) {
//                             isAutoSliding = false;
//                             clearTimeout(autoSlideTimer);
//                         }
//                     }
//                 });
//             },
//             { threshold: 0.3 }
//         );

//         observer.observe(secondPageSection);

//         // Button event listeners
//         prevBtn.addEventListener('click', goToPrevSlide);
//         nextBtn.addEventListener('click', goToNextSlide);

//         // Handle window resize
//         window.addEventListener('resize', () => {
//             const slidesToShow = updateSlidesToShow();
//             currentIndex = Math.min(currentIndex, slides.length - slidesToShow);
//             updateSlider();
//         });

//         // Initial update
//         updateSlider();
//     }

//     // Fourth Page Slider
//     function initializeFourthPageSlider() {
//         const featureSlider = document.querySelector('.features-slider');
//         const featureSlides = document.querySelectorAll('.feature-slide');
//         const prevFeatureBtn = document.querySelector('#fourth-page .prev-feature');
//         const nextFeatureBtn = document.querySelector('#fourth-page .next-feature');
//         const fourthPageSection = document.querySelector('#fourth-page');

//         let currentFeatureIndex = 0;
//         const autoSlideinterval = 10000; // 10 seconds
//         const restartDelay = 1000; // 1 second
//         let autoSlideTimer = null;
//         let isAutoSliding = false;

//         function updateSlidesToShow() {
//             if (window.innerWidth <= 480) return 1;
//             if (window.innerWidth <= 768) return 2;
//             if (window.innerWidth <= 1024) return 3;
//             return 4;
//         }

//         function updateFeatureSlider() {
//             const slidesToShow = updateSlidesToShow();
//             const slideWidth = featureSlides[0].offsetWidth + 10; // Width + margin (5px on each side)
//             const containerWidth = featureSlider.parentElement.offsetWidth;
//             const totalWidthPerSlide = slideWidth;
//             const translateX = -currentFeatureIndex * totalWidthPerSlide;

//             // Center the slides on mobile
//             if (slidesToShow === 1) {
//                 const offset = (containerWidth - slideWidth) / 2;
//                 featureSlider.style.transform = `translateX(calc(${translateX}px + ${offset}px))`;
//             } else {
//                 featureSlider.style.transform = `translateX(${translateX}px)`;
//             }

//             // Disable buttons at boundaries
//             prevFeatureBtn.disabled = currentFeatureIndex === 0;
//             nextFeatureBtn.disabled = currentFeatureIndex >= featureSlides.length - slidesToShow;
//         }

//         function autoSlide() {
//             const slidesToShow = updateSlidesToShow();
//             if (currentFeatureIndex >= featureSlides.length - slidesToShow) {
//                 setTimeout(() => {
//                     currentFeatureIndex = 0;
//                     updateFeatureSlider();
//                     if (isAutoSliding) {
//                         autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
//                     }
//                 }, restartDelay);
//             } else {
//                 currentFeatureIndex++;
//                 updateFeatureSlider();
//                 if (isAutoSliding) {
//                     autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
//                 }
//             }
//         }

//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         if (!isAutoSliding) {
//                             isAutoSliding = true;
//                             autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
//                         }
//                     } else {
//                         if (isAutoSliding) {
//                             isAutoSliding = false;
//                             clearTimeout(autoSlideTimer);
//                         }
//                     }
//                 });
//             },
//             { threshold: 0.3 }
//         );

//         observer.observe(fourthPageSection);

//         prevFeatureBtn.addEventListener('click', () => {
//             clearTimeout(autoSlideTimer);
//             if (currentFeatureIndex > 0) {
//                 currentFeatureIndex--;
//                 updateFeatureSlider();
//             }
//             if (isAutoSliding) {
//                 autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
//             }
//         });

//         nextFeatureBtn.addEventListener('click', () => {
//             clearTimeout(autoSlideTimer);
//             const slidesToShow = updateSlidesToShow();
//             if (currentFeatureIndex < featureSlides.length - slidesToShow) {
//                 currentFeatureIndex++;
//                 updateFeatureSlider();
//             } else {
//                 setTimeout(() => {
//                     currentFeatureIndex = 0;
//                     updateFeatureSlider();
//                     if (isAutoSliding) {
//                         autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
//                     }
//                 }, restartDelay);
//             }
//         });

//         window.addEventListener('resize', () => {
//             const slidesToShow = updateSlidesToShow();
//             currentFeatureIndex = Math.min(currentFeatureIndex, featureSlides.length - slidesToShow);
//             updateFeatureSlider();
//         });

//         updateFeatureSlider();
//     }

//     // Initialize all components
//     initializeHamburgerMenu();
//     initializeVideo();
//     initializePopup();
//     initializeFourthPageSlider();
//     initializeSecondPageSlider();
// }); aug 19
//.........................................................................................................................................................

// document.addEventListener('DOMContentLoaded', async () => {
//   // Debugging setup
//   const debugContainer = document.createElement('div');
//   debugContainer.style.cssText = `
//     position: fixed;
//     bottom: 10px;
//     right: 10px;
//     background: rgba(0,0,0,0.8);
//     color: white;
//     padding: 15px;
//     z-index: 9999;
//     font-family: monospace;
//     max-width: 400px;
//     max-height: 200px;
//     overflow: auto;
//     display: none;
//   `;
//   document.body.appendChild(debugContainer);

//   function debugLog(message) {
//     debugContainer.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
//     console.log(message);
//   }

//   try {
//     debugLog('Starting blog loading...');
    
//     // Try Node server first, then fallback to local JSON
//     let allBlogs = [];
//     let dataSource = 'server';
    
//     try {
//       debugLog('Attempting to fetch from server...');
//       const response = await fetch('http://localhost:3001/api/blogs?_=' + Date.now());
      
//       if (!response.ok) throw new Error(`Server error: ${response.status}`);
      
//       allBlogs = await response.json();
//       debugLog(`Loaded ${allBlogs.length} blogs from server`);
//     } catch (serverError) {
//       debugLog(`Server fetch failed: ${serverError.message}`);
//       dataSource = 'fallback';
      
//       try {
//         debugLog('Attempting fallback to local JSON...');
//         const fallbackResponse = await fetch('../data/blogs.json');
//         allBlogs = await fallbackResponse.json();
//         debugLog(`Loaded ${allBlogs.length} blogs from fallback`);
//       } catch (fallbackError) {
//         throw new Error(`Both server and fallback failed: ${fallbackError.message}`);
//       }
//     }

//     // ===== 2. FEATURE INSIGHTS (Main Grid) =====
//     debugLog('Rendering main blog grid...');
//     const insightsContainer = document.querySelector('#second-page .cards');
//     const showMoreBtn = document.querySelector('.show-more-btn');
//     const searchInput = document.querySelector('.search-input');
//     const searchButton = document.querySelector('.search-button');
//     let visibleCount = 6;
//     let currentCategory = 'All Insight';
//     let searchQuery = '';
//     let currentDisplayedBlogs = allBlogs;

//     function getFilteredBlogs() {
//       let blogs = allBlogs;
      
//       // Apply category filter if not All
//       if (currentCategory !== 'All Insight') {
//         blogs = blogs.filter(blog => blog.category === currentCategory);
//       }
      
//       // Apply search filter if query exists
//       if (searchQuery) {
//         blogs = blogs.filter(blog => 
//           (blog.title?.toLowerCase().includes(searchQuery) ?? false) ||
//           (blog.subtitle?.toLowerCase().includes(searchQuery) ?? false) ||
//           (blog.content?.toLowerCase().includes(searchQuery) ?? false) ||
//           (blog.category?.toLowerCase().includes(searchQuery) ?? false) ||
//           (blog.author?.toLowerCase().includes(searchQuery) ?? false)
//         );
//       }
      
//       return blogs;
//     }

//     function stripHTML(html) {
//       const div = document.createElement('div');
//       div.innerHTML = html;
//       return div.textContent || div.innerText || '';
//     }

//     function renderInsights(blogs) {
//       const blogDetailPath = './blog-detail.html'; // Fixed path
//       insightsContainer.innerHTML = blogs.slice(0, visibleCount).map(blog => {
//         const imageFile = blog.image || 'default-author.jpg';
//         const imagePath = `${dataSource === 'server' ? 'http://localhost:3001/uploads/' : './assets/'}${imageFile}`;
//         const previewText = stripHTML(blog.content || '').substring(0, 100) + '...';
        
//         return `
//             <div class="card">
//                 <div class="card-header" style="background-color: #19529a;">
//                     <h2>${blog.title}</h2>
//                 </div>
//                 <div class="card-body">
//                     <p class="category">${blog.category}</p>
//                     <h3>${blog.subtitle || ''}</h3>
//                     <p>${previewText}</p>
//                     <div class="author">
//                         <img src="${imagePath}" 
//                              alt="${blog.author || 'Author'}"
//                              onerror="this.src='./assets/default-author.jpg'; console.error('Failed to load image: ${imagePath}');">
//                         <span>${blog.author || 'Anonymous'}<br>${blog.position || 'Writer'}</span>
//                     </div>
//                     <p class="date">${blog.date || new Date().toLocaleDateString()}</p>
//                     <a href="${blogDetailPath}?id=${blog.id || blog.slug}" class="read-more">Read more →</a>
//                 </div>
//             </div>
//         `;
//       }).join('');
//       showMoreBtn.style.display = visibleCount >= blogs.length ? 'none' : 'block';
//     }

//     // Initial render
//     currentDisplayedBlogs = getFilteredBlogs();
//     renderInsights(currentDisplayedBlogs);

//     // Show More button
//     showMoreBtn.addEventListener('click', () => {
//       visibleCount += 3;
//       renderInsights(currentDisplayedBlogs);
//     });

//     // ===== 3. CATEGORY FILTERS =====
//     document.querySelectorAll('.category-buttons button').forEach(button => {
//       button.addEventListener('click', () => {
//         document.querySelectorAll('.category-buttons button').forEach(btn => 
//           btn.classList.remove('active'));
//         button.classList.add('active');
        
//         currentCategory = button.textContent;
//         currentDisplayedBlogs = getFilteredBlogs();
//         visibleCount = 6;
//         renderInsights(currentDisplayedBlogs);
//       });
//     });

//     // ===== 4. SEARCH FUNCTIONALITY =====
//     function performSearch() {
//       searchQuery = searchInput.value.trim().toLowerCase();
//       currentDisplayedBlogs = getFilteredBlogs();
//       visibleCount = 6;
//       renderInsights(currentDisplayedBlogs);
//     }

//     // Search on button click
//     searchButton.addEventListener('click', performSearch);

//     // Search on Enter key
//     searchInput.addEventListener('keyup', (e) => {
//       if (e.key === 'Enter') {
//         performSearch();
//       }
//     });

//     debugLog('Blog rendering complete!');

//   } catch (error) {
//     debugLog(`Fatal error: ${error.message}`);
//     console.error("Error loading blogs:", error);
    
//     // Show error message in the UI
//     const errorContainer = document.createElement('div');
//     errorContainer.className = 'blog-error';
//     errorContainer.style.cssText = `
//       background: #ffebee;
//       color: #c62828;
//       padding: 20px;
//       margin: 20px;
//       border-radius: 8px;
//     `;
//     errorContainer.innerHTML = `
//       <h3>⚠️ Blog Loading Error</h3>
//       <p>${error.message}</p>
//       <button onclick="location.reload()" style="
//         background: #c62828;
//         color: white;
//         border: none;
//         padding: 8px 16px;
//         border-radius: 4px;
//         cursor: pointer;
//       ">Retry</button>
//     `;
//     document.querySelector('#second-page .container').prepend(errorContainer);
//   }

//   // Toggle debug view with Ctrl+Shift+D
//   document.addEventListener('keydown', (e) => {
//     if (e.ctrlKey && e.shiftKey && e.key === 'D') {
//       debugContainer.style.display = debugContainer.style.display === 'none' ? 'block' : 'none';
//     }
//   });
// });  aug 20 working code

document.addEventListener('DOMContentLoaded', async () => {
  const debugContainer = document.createElement('div');
  debugContainer.style.cssText = `
    position: fixed;
    bottom: 10px;
    right: 10px;
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 15px;
    z-index: 9999;
    font-family: monospace;
    max-width: 400px;
    max-height: 200px;
    overflow: auto;
    display: none;
  `;
  document.body.appendChild(debugContainer);

  function debugLog(message) {
    debugContainer.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
    console.log(message);
  }

  try {
    debugLog('Starting blog loading...');
    
    let allBlogs = [];
    let dataSource = 'server';
    
    try {
      debugLog('Attempting to fetch from server...');
      const response = await fetch('http://localhost:3001/api/blogs?_=' + Date.now());
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      allBlogs = await response.json();
      debugLog(`Loaded ${allBlogs.length} blogs from server`);
    } catch (serverError) {
      debugLog(`Server fetch failed: ${serverError.message}`);
      dataSource = 'fallback';
      try {
        debugLog('Attempting fallback to local JSON...');
        const fallbackResponse = await fetch('../data/blogs.json');
        allBlogs = await fallbackResponse.json();
        debugLog(`Loaded ${allBlogs.length} blogs from fallback`);
      } catch (fallbackError) {
        throw new Error(`Both server and fallback failed: ${fallbackError.message}`);
      }
    }

    const insightsContainer = document.querySelector('#second-page .cards');
    const header = document.createElement('h2');
    header.textContent = 'Featured Insights';
    header.style.cssText = 'font-size: 1.8rem; color: #19529a; margin-bottom: 20px;';
    const parentContainer = insightsContainer.parentElement;
    if (!parentContainer.querySelector('h2')) {
      parentContainer.insertBefore(header, insightsContainer);
    }

    const showMoreBtn = document.querySelector('.show-more-btn');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    let visibleCount = 6;
    let currentCategory = 'All Insight';
    let searchQuery = '';
    let currentDisplayedBlogs = allBlogs;

    function getFilteredBlogs() {
      let blogs = allBlogs;
      if (currentCategory !== 'All Insight') {
        blogs = blogs.filter(blog => blog.category === currentCategory);
      }
      if (searchQuery) {
        blogs = blogs.filter(blog => 
          (blog.title?.toLowerCase().includes(searchQuery) ?? false) ||
          (blog.subtitle?.toLowerCase().includes(searchQuery) ?? false) ||
          (blog.content?.toLowerCase().includes(searchQuery) ?? false) ||
          (blog.category?.toLowerCase().includes(searchQuery) ?? false) ||
          (blog.author?.toLowerCase().includes(searchQuery) ?? false)
        );
      }
      return blogs;
    }

    function getPreviewHTML(html) {
      const div = document.createElement('div');
      div.innerHTML = html || '';
      const text = div.textContent || div.innerText || '';
      const preview = text.substring(0, 100) + (text.length > 100 ? '...' : '');
      // Wrap in a span to preserve inline styles
      return `<span>${preview}</span>`;
    }

    function renderInsights(blogs) {
      const blogDetailPath = './blog-detail.html';
      insightsContainer.innerHTML = blogs.slice(0, visibleCount).map(blog => {
        const imageFile = blog.image || 'default-author.jpg';
        const imagePath = `${dataSource === 'server' ? 'http://localhost:3001/uploads/' : './assets/'}${imageFile}`;
        const previewText = getPreviewHTML(blog.content);
        const subtitle = blog.subtitle || 'No subtitle available';
        const author = blog.author || 'Anonymous';
        const position = blog.position || 'Writer';
        const date = blog.date || new Date().toLocaleDateString();
        
        return `
            <div class="card">
                <div class="card-header">
                    <h2>${blog.title || 'Untitled'}</h2>
                </div>
                <div class="card-body">
                    <p class="category">${blog.category || 'Uncategorized'}</p>
                    <h3>${subtitle}</h3>
                    <p class="preview-text">${previewText}</p>
                    <div class="author">
                        <img src="${imagePath}" 
                             alt="${author}"
                             onerror="this.src='./assets/default-author.jpg';">
                        <span>${author}<br>${position}</span>
                    </div>
                    <p class="date">${date}</p>
                    <a href="${blogDetailPath}?id=${blog.id || blog.slug || 'unknown'}" class="read-more">Read more →</a>
                </div>
            </div>
        `;
      }).join('');
      showMoreBtn.style.display = visibleCount >= blogs.length ? 'none' : 'block';
    }

    currentDisplayedBlogs = getFilteredBlogs();
    renderInsights(currentDisplayedBlogs);

    showMoreBtn.addEventListener('click', () => {
      visibleCount += 3;
      renderInsights(currentDisplayedBlogs);
    });

    document.querySelectorAll('.category-buttons button').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.category-buttons button').forEach(btn => 
          btn.classList.remove('active'));
        button.classList.add('active');
        currentCategory = button.textContent;
        currentDisplayedBlogs = getFilteredBlogs();
        visibleCount = 6;
        renderInsights(currentDisplayedBlogs);
      });
    });

    function performSearch() {
      searchQuery = searchInput.value.trim().toLowerCase();
      currentDisplayedBlogs = getFilteredBlogs();
      visibleCount = 6;
      renderInsights(currentDisplayedBlogs);
    }

    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });

    debugLog('Blog rendering complete!');

  } catch (error) {
    debugLog(`Fatal error: ${error.message}`);
    console.error("Error loading blogs:", error);
    const errorContainer = document.createElement('div');
    errorContainer.className = 'blog-error';
    errorContainer.style.cssText = `
      background: #ffebee;
      color: #c62828;
      padding: 20px;
      margin: 20px;
      border-radius: 8px;
    `;
    errorContainer.innerHTML = `
      <h3>⚠️ Blog Loading Error</h3>
      <p>${error.message}</p>
      <button onclick="location.reload()" style="
        background: #08204dff;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
      ">Retry</button>
    `;
    document.querySelector('#second-page .container').prepend(errorContainer);
  }

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      debugContainer.style.display = debugContainer.style.display === 'none' ? 'block' : 'none';
    }
  });
});


document.addEventListener('DOMContentLoaded', function () {
    // Hamburger Menu Functionality
    function initializeHamburgerMenu() {
        const hamburger = document.getElementById('hamburger');
        const navList = document.querySelector('#navbar ul');

        if (!hamburger || !navList) {
            console.warn('Hamburger or navList not found!');
            return;
        }

        hamburger.addEventListener('click', function () {
            navList.classList.toggle('active');
            this.classList.toggle('open');

            const navItems = document.querySelectorAll('#navbar ul li');
            navItems.forEach((item, index) => {
                if (navList.classList.contains('active')) {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';
                }
            });
        });

        const navLinks = document.querySelectorAll('#navbar a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navList.classList.remove('active');
                hamburger.classList.remove('open');
                const navItems = document.querySelectorAll('#navbar ul li');
                navItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';
                });
            });
        });
    }

    

   // Video Pause on End and Remove Controls
function initializeVideo() {
    const video = document.getElementById('electron-video');
    if (video) {
        // Disable video controls to remove play button and other UI
        video.controls = false;

        // Existing functionality to pause on end and stay on last frame
        video.addEventListener('ended', () => {
            video.pause();
            video.currentTime = video.duration; // Stay on last frame
        });
    } else {
        console.warn('Video element not found!');
    }
}
// Popup Functionality with Email Validation
    function initializePopup() {
        const buyButtons = document.querySelectorAll('.buy-button');
        const comingSoonButton = document.querySelector('.price-button');
        const popup = document.getElementById('subscription-popup');
        const subscribeButton = document.getElementById('subscribe-button');
        const emailInput = document.getElementById('email-input');
        const popupContent = document.querySelector('.popup-content');

        if (!popup || !subscribeButton || !emailInput || !popupContent) {
            console.warn('Popup elements not found!');
            return;
        }

        // Show popup on button clicks
        buyButtons.forEach(button => {
            button.addEventListener('click', () => {
                popup.classList.add('active');
                emailInput.focus(); // Improve accessibility
            });
        });

        if (comingSoonButton) {
            comingSoonButton.addEventListener('click', () => {
                popup.classList.add('active');
                emailInput.focus();
            });
        }

        // Hide popup when clicking outside
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
                clearMessages();
            }
        });

        // Email validation on subscribe
        subscribeButton.addEventListener('click', () => {
            const email = emailInput.value.trim();
            const emailRegex = /^[a-z0-9]+([.][a-z0-9]+)*@gmail\.in$/;

            clearMessages();

            if (!email) {
                showError('Please enter an email address.');
            } else if (email !== email.toLowerCase()) {
                showError('Email must be in lowercase.');
            } else if (!emailRegex.test(email)) {
                showError('Please enter a valid email address (e.g., xyz@gmail.in).');
            } else {
                showSuccess('Subscribed successfully!');
                emailInput.value = '';
                // Optional: Add backend integration here
                /*
                fetch('/api/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                })
                .then(response => response.json())
                .then(data => console.log('Subscription successful:', data))
                .catch(error => showError('Subscription failed. Please try again.'));
                */
                setTimeout(() => {
                    popup.classList.remove('active');
                    clearMessages();
                }, 2000);
            }
        });

        // Clear existing error/success messages
        function clearMessages() {
            const existingMessage = popupContent.querySelector('.error-message, .success-message');
            if (existingMessage) existingMessage.remove();
        }

        // Show error message
        function showError(message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = 'red';
            errorDiv.style.marginTop = '10px';
            errorDiv.style.textAlign = 'center';
            errorDiv.style.fontSize = '14px';
            errorDiv.textContent = message;
            errorDiv.setAttribute('role', 'alert');
            popupContent.appendChild(errorDiv);

            setTimeout(() => {
                errorDiv.remove();
            }, 3000);
        }

        // Show success message
        function showSuccess(message) {
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.style.color = 'green';
            successDiv.style.marginTop = '10px';
            successDiv.style.textAlign = 'center';
            successDiv.style.fontSize = '14px';
            successDiv.textContent = message;
            successDiv.setAttribute('role', 'alert');
            popupContent.appendChild(successDiv);

            setTimeout(() => {
                successDiv.remove();
            }, 3000);
        }
    }

    // Second Page Slider with Touch Functionality
    function initializeSecondPageSlider() {
        const slider = document.querySelector('#slidesContainer');
        const prevBtn = document.querySelector('#second-page .prev-slide');
        const nextBtn = document.querySelector('#second-page .next-slide');
        const secondPageSection = document.querySelector('#second-page');

        if (!slider || !prevBtn || !nextBtn || !secondPageSection) {
            console.warn('Slider elements not found:', { slider, prevBtn, nextBtn, secondPageSection });
            return;
        }

        let currentIndex = 0;
        const autoSlideInterval = 10000; // 10 seconds
        const restartDelay = 1000; // 1 second
        let autoSlideTimer = null;
        let isAutoSliding = false;
        let touchStartX = 0;
        let touchCurrentX = 0;
        let isSwiping = false;
        const swipeThreshold = 50; // Minimum swipe distance in pixels

        // Slide data
        const slidesData = [
            {
                image: '/electron_page/Frame.svg',
                title: 'What Is Electron?',
                description: 'Atomo Innovation’s Electron is a powerful edge computing platform for industries, offering real-time intelligence, faster processing, and seamless automation at the edge.'
            },
            {
                image: '/electron_page/Frame.svg',
                title: 'Why It Exists?',
                description: 'With Electron, industries can run AI locally - no cloud needed. This means faster, secure, and reliable operations, even offline or in remote locations.'
            },
            {
                image: '/electron_page/Frame.svg',
                title: "Who It's For?",
                description: 'Ideal for system integrators and IoT providers, enabling intelligent edge systems with enhanced performance, reliability, and scalability for industrial applications.'
            },
            {
                image: '/electron_page/Frame.svg',
                title: 'Built for Harsh Realities!',
                description: 'Electron excels in real-world environments - from remote farms to factory floors and power stations - delivering reliable edge intelligence wherever its needed most.'
            },
            {
                image: '/electron_page/Frame.svg',
                title: 'Beyond a Device.',
                description: 'Electron is built to perform in the toughest environments-be it remote farms, factory floors, or power stations-ensuring dependable edge computing wherever its deployed.'
            },
            {
                image: '/electron_page/Frame.svg',
                title: 'Drives Smarter Ops.',
                description: 'It empowers machines to communicate, predict potential issues, and optimize performance autonomously-directly at the edge, without relying on the cloud.'
            },
            {
                image: '/electron_page/Frame.svg',
                title: 'Step into Industry 4.0.',
                description: 'Electron serves as a gateway to modern industrial practices, seamlessly bridging legacy systems with future-ready, intelligent infrastructure.'
            },
            {
                image: '/electron_page/Frame.svg',
                title: 'Easy In, Irreplaceable Out.', 
                description: 'Electron integrates effortlessly into existing systems-and once its there, it becomes an indispensable part of operations, redefining efficiency and control.'
            },
            {
                image: '/electron_page/Frame.svg',
                title: 'Part of a Bigger Family.',
                description: 'Electron integrates seamlessly with Neutron and Proton, creating a unified ecosystem for smart environments across both residential and industrial settings.'
            },
            {
                image: '/electron_page/Frame.svg',
                title: 'India-Born, World-Ready.',
                description: 'A proudly Indian innovation, Electron is designed to empower industries both locally and globally, combining robust engineering with a vision for worldwide impact.'
            }
        ];

        // Create slides
        slidesData.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'slide';
            slideElement.innerHTML = `
                <img src="${slide.image}" alt="${slide.title}" class="slide-img">
                <div class="slide-content">
                    <h3 class="text-xl font-bold mb-2">${slide.title}</h3>
                    <p class="text-sm">${slide.description}</p>
                </div>
            `;
            slider.appendChild(slideElement);
        });

        const slides = document.querySelectorAll('#second-page .slide');

        if (slides.length === 0) {
            console.warn('No slides found in #slidesContainer');
            return;
        }

        function updateSlidesToShow() {
            if (window.innerWidth <= 480) return 1;
            if (window.innerWidth <= 768) return 2;
            if (window.innerWidth <= 1024) return 3;
            return 4;
        }

        function updateSlider() {
            const slidesToShow = updateSlidesToShow();
            const slideWidth = slides[0].offsetWidth + 10; // Include margin (5px each side)
            const containerWidth = slider.parentElement.offsetWidth;
            let translateX = -currentIndex * slideWidth;

            // Center single slide on mobile
            if (slidesToShow === 1) {
                const offset = (containerWidth - slideWidth) / 2;
                translateX += offset;
            }

            slider.style.transition = isSwiping ? 'none' : 'transform 0.3s ease';
            slider.style.transform = `translateX(${translateX}px)`;

            // Update button states
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= slides.length - slidesToShow;
        }

        function goToNextSlide() {
            clearTimeout(autoSlideTimer);
            const slidesToShow = updateSlidesToShow();
            if (currentIndex < slides.length - slidesToShow) {
                currentIndex++;
                updateSlider();
            } else {
                setTimeout(() => {
                    currentIndex = 0;
                    updateSlider();
                    if (isAutoSliding) {
                        autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                    }
                }, restartDelay);
            }
        }

        function goToPrevSlide() {
            clearTimeout(autoSlideTimer);
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
            if (isAutoSliding) {
                autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
            }
        }

        function autoSlide() {
            const slidesToShow = updateSlidesToShow();
            if (currentIndex >= slides.length - slidesToShow) {
                setTimeout(() => {
                    currentIndex = 0;
                    updateSlider();
                    if (isAutoSliding) {
                        autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                    }
                }, restartDelay);
            } else {
                currentIndex++;
                updateSlider();
                if (isAutoSliding) {
                    autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                }
            }
        }

        // Touch event handlers
        function handleTouchStart(e) {
            touchStartX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            touchCurrentX = touchStartX;
            isSwiping = true;
            clearTimeout(autoSlideTimer); // Pause auto-slide during touch
        }

        function handleTouchMove(e) {
            if (!isSwiping) return;
            touchCurrentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const deltaX = touchCurrentX - touchStartX;
            const slideWidth = slides[0].offsetWidth + 10;
            const slidesToShow = updateSlidesToShow();
            let translateX = -currentIndex * slideWidth + deltaX;

            // Center single slide on mobile
            if (slidesToShow === 1) {
                const containerWidth = slider.parentElement.offsetWidth;
                const offset = (containerWidth - slideWidth) / 2;
                translateX += offset;
            }

            // Bound the swipe to prevent sliding too far
            const maxTranslate = 0;
            const minTranslate = -((slides.length - slidesToShow) * slideWidth);
            translateX = Math.max(minTranslate, Math.min(maxTranslate, translateX));

            slider.style.transition = 'none';
            slider.style.transform = `translateX(${translateX}px)`;
        }

        function handleTouchEnd() {
            if (!isSwiping) return;
            isSwiping = false;
            const deltaX = touchCurrentX - touchStartX;

            if (Math.abs(deltaX) > swipeThreshold) {
                if (deltaX < 0) {
                    // Swipe left - next slide
                    goToNextSlide();
                } else {
                    // Swipe right - previous slide
                    goToPrevSlide();
                }
            } else {
                // Snap back to current slide
                updateSlider();
            }

            // Resume auto-slide if enabled
            if (isAutoSliding) {
                autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
            }
        }

        // Add touch and mouse event listeners for both mobile and desktop
        slider.addEventListener('touchstart', handleTouchStart, { passive: false });
        slider.addEventListener('touchmove', handleTouchMove, { passive: false });
        slider.addEventListener('touchend', handleTouchEnd, { passive: false });
        slider.addEventListener('mousedown', handleTouchStart);
        slider.addEventListener('mousemove', handleTouchMove);
        slider.addEventListener('mouseup', handleTouchEnd);
        slider.addEventListener('mouseleave', handleTouchEnd); // Handle case when mouse leaves slider

        // Prevent default drag behavior
        slider.addEventListener('dragstart', (e) => e.preventDefault());

        // IntersectionObserver for auto-sliding
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (!isAutoSliding) {
                            isAutoSliding = true;
                            autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                        }
                    } else {
                        if (isAutoSliding) {
                            isAutoSliding = false;
                            clearTimeout(autoSlideTimer);
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(secondPageSection);

        // Button event listeners
        prevBtn.addEventListener('click', goToPrevSlide);
        nextBtn.addEventListener('click', goToNextSlide);

        // Handle window resize
        window.addEventListener('resize', () => {
            const slidesToShow = updateSlidesToShow();
            currentIndex = Math.min(currentIndex, slides.length - slidesToShow);
            updateSlider();
        });

        // Initial update
        updateSlider();
    }

    // Fourth Page Slider
    function initializeFourthPageSlider() {
        const featureSlider = document.querySelector('.features-slider');
        const featureSlides = document.querySelectorAll('.feature-slide');
        const prevFeatureBtn = document.querySelector('#fourth-page .prev-feature');
        const nextFeatureBtn = document.querySelector('#fourth-page .next-feature');
        const fourthPageSection = document.querySelector('#fourth-page');

        let currentFeatureIndex = 0;
        const autoSlideinterval = 10000; // 10 seconds
        const restartDelay = 1000; // 1 second
        let autoSlideTimer = null;
        let isAutoSliding = false;

        function updateSlidesToShow() {
            if (window.innerWidth <= 480) return 1;
            if (window.innerWidth <= 768) return 2;
            if (window.innerWidth <= 1024) return 3;
            return 4;
        }

        function updateFeatureSlider() {
            const slidesToShow = updateSlidesToShow();
            const slideWidth = featureSlides[0].offsetWidth + 10; // Width + margin (5px on each side)
            const containerWidth = featureSlider.parentElement.offsetWidth;
            const totalWidthPerSlide = slideWidth;
            const translateX = -currentFeatureIndex * totalWidthPerSlide;

            // Center the slides on mobile
            if (slidesToShow === 1) {
                const offset = (containerWidth - slideWidth) / 2;
                featureSlider.style.transform = `translateX(calc(${translateX}px + ${offset}px))`;
            } else {
                featureSlider.style.transform = `translateX(${translateX}px)`;
            }

            // Disable buttons at boundaries
            prevFeatureBtn.disabled = currentFeatureIndex === 0;
            nextFeatureBtn.disabled = currentFeatureIndex >= featureSlides.length - slidesToShow;
        }

        function autoSlide() {
            const slidesToShow = updateSlidesToShow();
            if (currentFeatureIndex >= featureSlides.length - slidesToShow) {
                setTimeout(() => {
                    currentFeatureIndex = 0;
                    updateFeatureSlider();
                    if (isAutoSliding) {
                        autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                    }
                }, restartDelay);
            } else {
                currentFeatureIndex++;
                updateFeatureSlider();
                if (isAutoSliding) {
                    autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                }
            }
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (!isAutoSliding) {
                            isAutoSliding = true;
                            autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                        }
                    } else {
                        if (isAutoSliding) {
                            isAutoSliding = false;
                            clearTimeout(autoSlideTimer);
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(fourthPageSection);

        prevFeatureBtn.addEventListener('click', () => {
            clearTimeout(autoSlideTimer);
            if (currentFeatureIndex > 0) {
                currentFeatureIndex--;
                updateFeatureSlider();
            }
            if (isAutoSliding) {
                autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
            }
        });

        nextFeatureBtn.addEventListener('click', () => {
            clearTimeout(autoSlideTimer);
            const slidesToShow = updateSlidesToShow();
            if (currentFeatureIndex < featureSlides.length - slidesToShow) {
                currentFeatureIndex++;
                updateFeatureSlider();
            } else {
                setTimeout(() => {
                    currentFeatureIndex = 0;
                    updateFeatureSlider();
                    if (isAutoSliding) {
                        autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                    }
                }, restartDelay);
            }
        });

        window.addEventListener('resize', () => {
            const slidesToShow = updateSlidesToShow();
            currentFeatureIndex = Math.min(currentFeatureIndex, featureSlides.length - slidesToShow);
            updateFeatureSlider();
        });

        updateFeatureSlider();
    }

    // Initialize all components
    initializeHamburgerMenu();
    initializeVideo();
    initializePopup();
    initializeFourthPageSlider();
    initializeSecondPageSlider();
});
