// document.addEventListener('DOMContentLoaded', async () => {
//     const debugContainer = document.createElement('div');
//     debugContainer.style.cssText = `
//         position: fixed; bottom: 10px; right: 10px; background: rgba(0,0,0,0.8);
//         color: white; padding: 15px; z-index: 9999; font-family: monospace;
//         max-width: 400px; max-height: 200px; overflow: auto; display: none;
//     `;
//     document.body.appendChild(debugContainer);

//     function debugLog(message) {
//         debugContainer.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
//         console.log(message);
//     }

//     try {
//         debugLog('Starting blog detail loading...');
//         const urlParams = new URLSearchParams(window.location.search);
//         const blogId = urlParams.get('id');
//         if (!blogId) throw new Error('No blog ID provided in URL');
//         debugLog(`Loading blog with ID: ${blogId}`);

//         let allBlogs = [];
//         let dataSource = 'server';
//         try {
//             debugLog('Attempting to fetch from server...');
//             const response = await fetch('http://localhost:3001/api/blogs?_=' + Date.now());
//             if (!response.ok) throw new Error(`Server error: ${response.status}`);
//             allBlogs = await response.json();
//             debugLog(`Loaded ${allBlogs.length} blogs from server`);
//         } catch (serverError) {
//             debugLog(`Server fetch failed: ${serverError.message}`);
//             dataSource = 'fallback';
//             try {
//                 debugLog('Attempting fallback to local JSON...');
//                 const fallbackResponse = await fetch('../data/blogs.json');
//                 allBlogs = await fallbackResponse.json();
//                 debugLog(`Loaded ${allBlogs.length} blogs from fallback`);
//             } catch (fallbackError) {
//                 throw new Error(`Both server and fallback failed: ${fallbackError.message}`);
//             }
//         }

//         const blog = allBlogs.find(b => b.id === blogId || b.slug === blogId);
//         if (!blog) throw new Error(`Blog not found with ID: ${blogId}`);
//         debugLog(`Found blog: ${blog.title}`);

//         const imageFile = blog.image || 'default-author.jpg';
//         const imagePath = `${dataSource === 'server' ? 'http://localhost:3001/uploads/' : './assets/'}${imageFile}`;
//         document.getElementById('blog-title').textContent = blog.title;
//         document.getElementById('blog-author-img').src = imagePath;
//         document.getElementById('blog-author').textContent = blog.author || 'Anonymous';
//         document.getElementById('blog-date').textContent = blog.date || new Date().toLocaleDateString();
//         document.getElementById('blog-content').innerHTML = blog.content || '<p>No content available.</p>';
//         document.title = `${blog.title} | Blogs`;
//         debugLog('Blog detail rendering complete!');
//     } catch (error) {
//         debugLog(`Fatal error: ${error.message}`);
//         console.error("Error loading blog detail:", error);
//         const errorContainer = document.createElement('div');
//         errorContainer.style.cssText = `background: #ffebee; color: #c62828; padding: 20px; margin: 20px; border-radius: 8px;`;
//         errorContainer.innerHTML = `
//             <h3>⚠️ Blog Loading Error</h3>
//             <p>${error.message}</p>
//             <button onclick="window.history.back()" style="background: #c62828; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Go Back</button>
//         `;
//         document.querySelector('.container')?.prepend(errorContainer) || document.body.prepend(errorContainer);
//     }

//     document.addEventListener('keydown', (e) => {
//         if (e.ctrlKey && e.shiftKey && e.key === 'D') {
//             debugContainer.style.display = debugContainer.style.display === 'none' ? 'block' : 'none';
//         }
//     });
// }); main code sep 2

document.addEventListener('DOMContentLoaded', async () => {
    const debugContainer = document.createElement('div');
    debugContainer.style.cssText = `
        position: fixed; bottom: 10px; right: 10px; background: rgba(0,0,0,0.8);
        color: white; padding: 15px; z-index: 9999; font-family: monospace;
        max-width: 400px; max-height: 200px; overflow: auto; display: none;
    `;
    document.body.appendChild(debugContainer);

    function debugLog(message) {
        debugContainer.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
        console.log(message);
    }

    try {
        debugLog('Starting blog detail loading...');
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = urlParams.get('id');
        if (!blogId) throw new Error('No blog ID provided in URL');
        debugLog(`Loading blog with ID: ${blogId}`);

        let allBlogs = [];
        let dataSource = 'server';
        let serverBaseUrl = 'http://192.168.1.27:3001'; // Use the same IP as in blogs.js

        // Optionally fetch server info to get the correct IP dynamically
        try {
            debugLog('Fetching server info...');
            const infoResponse = await fetch(`${serverBaseUrl}/api/info`);
            if (infoResponse.ok) {
                const info = await infoResponse.json();
                serverBaseUrl = `http://${info.localIp}:${info.port}`;
                debugLog(`Using server URL: ${serverBaseUrl}`);
            } else {
                debugLog('Failed to fetch server info, using default URL');
            }
        } catch (infoError) {
            debugLog(`Server info fetch failed: ${infoError.message}`);
        }

        try {
            debugLog('Attempting to fetch from server...');
            const response = await fetch(`${serverBaseUrl}/api/blogs?_=${Date.now()}`);
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

        const blog = allBlogs.find(b => b.id === blogId || b.slug === blogId);
        if (!blog) throw new Error(`Blog not found with ID: ${blogId}`);
        debugLog(`Found blog: ${blog.title}`);

        // Update image path logic to use dynamic serverBaseUrl
        function getImagePath(imageFile) {
            return `${dataSource === 'server' ? serverBaseUrl + '/uploads/' : './assets/'}${imageFile}`;
        }

        const imageFile = blog.image || 'default-author.jpg';
        const imagePath = getImagePath(imageFile);
        
        document.getElementById('blog-title').textContent = blog.title;
        document.getElementById('blog-author-img').src = imagePath;
        document.getElementById('blog-author').textContent = blog.author || 'Anonymous';
        document.getElementById('blog-date').textContent = blog.date || new Date().toLocaleDateString();
        document.getElementById('blog-content').innerHTML = blog.content || '<p>No content available.</p>';
        document.title = `${blog.title} | Blogs`;
        debugLog('Blog detail rendering complete!');
    } catch (error) {
        debugLog(`Fatal error: ${error.message}`);
        console.error("Error loading blog detail:", error);
        const errorContainer = document.createElement('div');
        errorContainer.style.cssText = `background: #ffebee; color: #c62828; padding: 20px; margin: 20px; border-radius: 8px;`;
        errorContainer.innerHTML = `
            <h3>⚠️ Blog Loading Error</h3>
            <p>${error.message}</p>
            <button onclick="window.history.back()" style="background: #c62828; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Go Back</button>
        `;
        document.querySelector('.container')?.prepend(errorContainer) || document.body.prepend(errorContainer);
    }

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            debugContainer.style.display = debugContainer.style.display === 'none' ? 'block' : 'none';
        }
    });
});