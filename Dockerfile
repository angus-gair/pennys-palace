# Use nginx alpine for a lightweight image
FROM nginx:alpine

# Copy static files to nginx html directory
COPY app-modern.js /usr/share/nginx/html/
COPY style-modern.css /usr/share/nginx/html/
COPY index-modern.html /usr/share/nginx/html/
COPY monthly-calendar.html /usr/share/nginx/html/
COPY penny_app_content.json /usr/share/nginx/html/
COPY test-navigation.html /usr/share/nginx/html/
COPY *.png /usr/share/nginx/html/
COPY games/ /usr/share/nginx/html/games/

# Copy nginx configuration for better caching and security
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]