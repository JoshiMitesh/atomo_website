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
    display: none; /* Hide by default */
  `;
  document.body.appendChild(debugContainer);

  function debugLog(message) {
    debugContainer.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
    console.log(message);
  }

  try {
    debugLog('Starting blog loading...');
    
    // Try Node server first, then fallback to local JSON
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

    // ===== 1. FEATURED BLOGS (Top Section) =====
    // Uncomment and adjust if you want to enable featured blogs
    // debugLog('Rendering featured blogs...');
    // const featuredBlogs = allBlogs.filter(blog => blog.featured);
    // const featuredContainer = document.querySelector('.content .cards');

    // if (featuredBlogs.length > 0) {
    //   featuredContainer.innerHTML = `
    //     <div class="card highlight">
    //       <div class="highlight-content">
    //         <h2>${featuredBlogs[0].title}</h2>
    //         <p>${featuredBlogs[0].subtitle || ''}</p>
    //         <a href="blog-detail.html?slug=${featuredBlogs[0].slug}">Read more →</a>
    //       </div>
    //     </div>
    //     <div class="card info">
    //       <p>${featuredBlogs[1]?.category || 'Featured'} · ${featuredBlogs[1]?.date || ''}</p>
    //       <h2>${featuredBlogs[1]?.title || 'Featured Blog'}</h2>
    //       <p>${featuredBlogs[1]?.subtitle || ''}</p>
    //       <a href="blog-detail.html?slug=${featuredBlogs[1]?.slug || ''}">Read more →</a>
    //     </div>
    //   `;
    // }

    // ===== 2. FEATURE INSIGHTS (Main Grid) =====
    debugLog('Rendering main blog grid...');
    const insightsContainer = document.querySelector('#second-page .cards');
    const showMoreBtn = document.querySelector('.show-more-btn');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    let visibleCount = 6;
    let currentCategory = 'All Insight';
    let searchQuery = '';
    let currentDisplayedBlogs = allBlogs;

    function getFilteredBlogs() {
      let blogs = allBlogs;
      
      // Apply category filter if not All
      if (currentCategory !== 'All Insight') {
        blogs = blogs.filter(blog => blog.category === currentCategory);
      }
      
      // Apply search filter if query exists
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
                    <h2>${blog.title}</h2>
                </div>
                <div class="card-body">
                    <p class="category">${blog.category}</p>
                    <h3>${blog.subtitle || ''}</h3>
                    <p>${blog.content?.substring(0, 100) || ''}...</p>
                    <div class="author">
                        <img src="${imagePath}" 
                             alt="${blog.author || 'Author'}"
                             onerror="this.src='./assets/default-author.jpg'; console.error('Failed to load image: ${imagePath}');">
                        <span>${blog.author || 'Anonymous'}<br>${blog.position || 'Writer'}</span>
                    </div>
                    <p class="date">${blog.date || new Date().toLocaleDateString()}</p>
                    <a href="#" class="read-more" data-blog-id="${blog.id || blog.slug}">Read more →</a>
                </div>
            </div>
        `;
    }).join('');

    // Add click handlers to all "Read more" buttons
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const blogId = button.getAttribute('data-blog-id');
            const blog = allBlogs.find(b => b.id === blogId || b.slug === blogId);
            if (blog) {
                showBlogPopup(blog);
            }
        });
    });

    showMoreBtn.style.display = visibleCount >= blogs.length ? 'none' : 'block';
}

// Function to show the blog popup
function showBlogPopup(blog) {
    const popup = document.getElementById('blog-popup');
    const imageFile = blog.image || 'default-author.jpg';
    const imagePath = `${dataSource === 'server' ? 'http://localhost:3001/uploads/' : './assets/'}${imageFile}`;
    
    // Set the blog content
    document.getElementById('blog-title').textContent = blog.title;
    document.getElementById('blog-subtitle').textContent = blog.subtitle || '';
    document.getElementById('blog-author-img').src = imagePath;
    document.getElementById('blog-author').textContent = `${blog.author || 'Anonymous'}, ${blog.position || 'Writer'}`;
    document.getElementById('blog-date').textContent = blog.date || new Date().toLocaleDateString();
    
    // Format the content with proper paragraphs and dashes
    const contentElement = document.getElementById('blog-content');
    contentElement.innerHTML = formatBlogContent(blog.content || '');
    
    // Show the popup
    popup.style.display = 'block';
    
    // Close button handler
    document.querySelector('.close-btn').onclick = () => {
        popup.style.display = 'none';
    };
    
    // Close when clicking outside content
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            popup.style.display = 'none';
        }
    });
}

// New function to format blog content
function formatBlogContent(content) {
    // Add dashes to the start if they're not already there
    if (!content.startsWith('')) {
        content = '- ' + content;
    }
    
    // Replace line breaks with paragraph breaks
    content = content.replace(/\n/g, '</p><p>');
    
    // Ensure each dash starts a new paragraph
    content = content.replace(/- /g, '</p><p>- ');
    
    // Wrap in paragraphs and add proper spacing
    return `<p>${content}</p>`;
}

    // Initial render
    currentDisplayedBlogs = getFilteredBlogs();
    renderInsights(currentDisplayedBlogs);

    // Show More button
    showMoreBtn.addEventListener('click', () => {
      visibleCount += 3;
      renderInsights(currentDisplayedBlogs);
    });

    // ===== 3. CATEGORY FILTERS =====
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

    // ===== 4. SEARCH FUNCTIONALITY =====
    function performSearch() {
      searchQuery = searchInput.value.trim().toLowerCase();
      currentDisplayedBlogs = getFilteredBlogs();
      visibleCount = 6;
      renderInsights(currentDisplayedBlogs);
    }

    // Search on button click
    searchButton.addEventListener('click', performSearch);

    // Search on Enter key
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });

    debugLog('Blog rendering complete!');

  } catch (error) {
    debugLog(`Fatal error: ${error.message}`);
    console.error("Error loading blogs:", error);
    
    // Show error message in the UI
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

  // Toggle debug view with Ctrl+Shift+D
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      debugContainer.style.display = debugContainer.style.display === 'none' ? 'block' : 'none';
    }
  });
});


