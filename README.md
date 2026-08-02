# Rogue Robotics Website
#### Video Demo: <URL HERE>
#### Description:

This project is a Flask-based website I built for Rogue Robotics, a student-led VEX V5 team focused on engineering, competition, and STEM outreach. Instead of just being a basic portfolio, the site works as a real hub for the team—it shares our story, highlights what we do, and also includes features like a contact form and an admin dashboard to manage messages.

The whole site runs from a single Flask app in app.py, where I defined all the routes (home, about, community, sponsors, contact, and admin). I also set up session handling and connected a SQLite database using the CS50 SQL library. The database stores messages submitted through the contact form, which makes the site interactive instead of just informational.

For the front end, I used Jinja templates stored in the templates folder. All pages extend a shared base.html, which keeps the layout consistent with a navigation bar and responsive design. Each page focuses on a different part of the team—for example, the home page introduces VEX and our team, while the about and community pages go deeper into our work and outreach.

The contact page is one of the main functional parts of the site. Users can submit their name, email, and a message, and Flask checks that all fields are filled before saving it to the database. After submitting, users get a confirmation message so they know it worked.

I also built a simple admin system with a login page and dashboard. If the correct password is entered, a session is created and the admin can view all submitted messages in order. It’s a lightweight system, but it works well without needing a full account setup.

Styling is handled in a single CSS file, which controls layout, colors, and responsiveness. I kept the design clean and modern without making it overly complex. There’s also a bit of JavaScript for things like the mobile menu and an image carousel on the community page.

Images are stored separately in a static folder and served through Flask, which keeps things organized and makes it easy to update visuals without changing the main code.

Overall, I designed this project to be simple, functional, and easy to expand. Using Flask and SQLite kept the backend manageable, while still allowing me to build something that feels like a complete, real-world web app. It not only presents our team but also actually supports communication and outreach.