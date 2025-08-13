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
//       insightsContainer.innerHTML = blogs.slice(0, visibleCount).map(blog => {
//         const imageFile = blog.image || 'default-author.jpg';
//         const imagePath = `${dataSource === 'server' ? 'http://localhost:3001/uploads/' : './assets/'}${imageFile}`;
//         console.log(`Loading image: ${imagePath}`); // Debug log
//         return `
//           <div class="card">
//             <div class="card-header" style="background-color: #19529a;">
//               <h2>${blog.title}</h2>
//             </div>
//             <div class="card-body">
//               <p class="category">${blog.category}</p>
//               <h3>${blog.subtitle || ''}</h3>
//               <p>${blog.content?.substring(0, 100) || ''}...</p>
//               <div class="author">
//                 <img src="${imagePath}" 
//                      alt="${blog.author || 'Author'}"
//                      onerror="this.src='./assets/default-author.jpg'; console.error('Failed to load image: ${imagePath}');">
//                 <span>${blog.author || 'Anonymous'}<br>${blog.position || 'Writer'}</span>
//               </div>
//               <p class="date">${blog.date || new Date().toLocaleDateString()}</p>
//               <a href="blog-detail.html?slug=${blog.slug}" class="read-more">Read more →</a>
//             </div>
//           </div>
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
// }); working code


document.addEventListener('DOMContentLoaded', async () => {
  // Debugging setup
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

  // Sanitize non-HTML content to prevent XSS
  function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  // Convert plain text to structured HTML
  function formatContent(content) {
    if (!content) return '<p>No content available.</p>';
    if (content.trim().startsWith('<') && content.trim().includes('>')) {
      return content; // Already HTML
    }
    // Split plain text by newlines and wrap in paragraphs
    return content.split('\n').map(line => `<p>${sanitizeHTML(line.trim())}</p>`).join('');
  }

  try {
    debugLog('Starting blog loading...');
    
    // Fetch blogs
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

    // Initialize elements
    const insightsContainer = document.querySelector('#second-page .cards');
    const showMoreBtn = document.querySelector('.show-more-btn');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const blogPopup = document.getElementById('blog-popup');
    const blogTitle = document.getElementById('blog-title');
    const blogSubtitle = document.getElementById('blog-subtitle');
    const blogAuthorImg = document.getElementById('blog-author-img');
    const blogAuthor = document.getElementById('blog-author');
    const blogDate = document.getElementById('blog-date');
    const blogContent = document.getElementById('blog-content');
    const closeBtn = document.querySelector('.blog-popup-content .close-btn');
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

    function renderInsights(blogs) {
      insightsContainer.innerHTML = blogs.slice(0, visibleCount).map(blog => {
        const imageFile = blog.image || 'default-author.jpg';
        const imagePath = `${dataSource === 'server' ? 'http://localhost:3001/uploads/' : './assets/'}${imageFile}`;
        return `
          <div class="card">
            <div class="card-header" style="background-color: #19529a;">
              <h2>${sanitizeHTML(blog.title)}</h2>
            </div>
            <div class="card-body">
              <p class="category">${sanitizeHTML(blog.category)}</p>
              <h3>${sanitizeHTML(blog.subtitle || '')}</h3>
              <p>${sanitizeHTML(blog.content?.substring(0, 100).replace(/<[^>]+>/g, '') || '')}...</p>
              <div class="author">
                <img src="${imagePath}" 
                     alt="${sanitizeHTML(blog.author || 'Author')}"
                     onerror="this.src='./assets/default-author.jpg';">
                <span>${sanitizeHTML(blog.author || 'Anonymous')}<br>${sanitizeHTML(blog.position || 'Writer')}</span>
              </div>
              <p class="date">${sanitizeHTML(blog.date || new Date('2025-08-13T12:00:00+05:30').toLocaleDateString())}</p>
              <a href="#" class="read-more" data-slug="${sanitizeHTML(blog.slug)}">Read more →</a>
            </div>
          </div>
        `;
      }).join('');
      showMoreBtn.style.display = visibleCount >= blogs.length ? 'none' : 'block';

      document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const slug = link.getAttribute('data-slug');
          const blog = allBlogs.find(b => b.slug === slug);
          if (blog) {
            blogTitle.textContent = blog.title || 'Untitled';
            blogSubtitle.textContent = blog.subtitle || '';
            blogAuthorImg.src = `${dataSource === 'server' ? 'http://localhost:3001/uploads/' : './assets/'}${blog.image || 'default-author.jpg'}`;
            blogAuthorImg.onerror = () => { blogAuthorImg.src = './assets/default-author.jpg'; };
            blogAuthor.innerHTML = `${sanitizeHTML(blog.author || 'Anonymous')}<br>${sanitizeHTML(blog.position || 'Writer')}`;
            blogDate.textContent = blog.date || new Date('2025-08-13T12:00:00+05:30').toLocaleDateString();
            blogContent.innerHTML = formatContent(blog.content);
            blogPopup.classList.add('active');
            debugLog(`Opened popup for blog: ${blog.title}`);
          }
        });
      });
    }

    function closePopup() {
      const popupContent = blogPopup.querySelector('.blog-popup-content');
      popupContent.style.opacity = '0';
      popupContent.style.transform = 'translateY(20px)';
      setTimeout(() => {
        blogPopup.classList.remove('active');
        popupContent.style.opacity = '0';
        popupContent.style.transform = 'translateY(20px)';
      }, 400);
      debugLog('Popup closed');
    }

    closeBtn.addEventListener('click', closePopup);
    blogPopup.addEventListener('click', (e) => {
      if (e.target === blogPopup) closePopup();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && blogPopup.classList.contains('active')) closePopup();
    });

    currentDisplayedBlogs = getFilteredBlogs();
    renderInsights(currentDisplayedBlogs);

    showMoreBtn.addEventListener('click', () => {
      visibleCount += 3;
      renderInsights(currentDisplayedBlogs);
    });

    document.querySelectorAll('.category-buttons button').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.category-buttons button').forEach(btn => btn.classList.remove('active'));
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
      if (e.key === 'Enter') performSearch();
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
        background: #c62828;
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