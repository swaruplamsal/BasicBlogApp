# BasicBlogApp

A full-stack blog application built with Django REST Framework (backend) and Next.js (frontend). This project demonstrates modern web development practices including RESTful API design, authentication, and server-side rendering.

## Features

### Backend (Django REST Framework)

- 🔐 User authentication (login/signup with Token auth)
- 📝 CRUD operations for blog posts
- 💬 Comment system for posts
- 🏷️ Categories and tags for posts
- 👤 User profiles with avatars and social links
- 📊 User statistics (post count, comment count)
- 🔒 Permission-based access control

### Frontend (Next.js + React)

- ⚡ Server-side rendering with Next.js 16
- 🎨 Responsive UI with Tailwind CSS
- 🔐 Protected routes and authentication context
- 👥 User profile pages with stats and activity
- ✏️ Profile editing with avatar upload
- 📱 Mobile-friendly design
- ⏳ Loading states and error handling
- 📊 Reading progress indicator

## Project Structure

```
basic-blog-app/
├── blog-frontend/          # Next.js frontend application
│   ├── app/                # Next.js app directory
│   │   ├── components/     # Reusable React components
│   │   ├── context/        # React context (AuthContext)
│   │   ├── posts/          # Post-related pages
│   │   └── login/          # Authentication pages
│   └── lib/                # Utility functions and API client
├── newproject/             # Django backend application
│   ├── blog/               # Main blog app
│   │   ├── models.py       # Database models
│   │   ├── serializers.py  # DRF serializers
│   │   ├── views.py        # API views
│   │   ├── auth_views.py   # Authentication views
│   │   └── api_urls.py     # API routes
│   └── newproject/         # Django project settings
└── README.md
```

## Tech Stack

### Backend

- **Django 6.0.1** - Web framework
- **Django REST Framework** - API development
- **SQLite** - Database (development)
- **Python 3.x** - Programming language

### Frontend

- **Next.js 16** - React framework
- **React 19** - UI library
- **Tailwind CSS 4** - Styling
- **JavaScript** - Programming language

## Prerequisites

- Python 3.8 or higher
- Node.js 18 or higher
- npm or yarn package manager

## Installation & Setup

### Backend Setup

1. **Navigate to the backend directory:**

   ```bash
   cd newproject
   ```

2. **Create and activate a virtual environment:**

   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations:**

   ```bash
   python manage.py migrate
   ```

5. **Create a superuser (optional):**

   ```bash
   python manage.py createsuperuser
   ```

6. **Start the development server:**

   ```bash
   python manage.py runserver
   ```

   The backend API will be available at `http://localhost:8000/`

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd blog-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment file:**

   ```bash
   # Create .env.local file with:
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000/`

## API Endpoints

### Authentication

- `POST /api/v1/auth/signup/` - User registration
- `POST /api/v1/auth/login/` - User login
- `POST /api/v1/auth/logout/` - User logout
- `GET /api/v1/auth/user/` - Get current user

### Posts

- `GET /api/v1/posts/` - List all posts
- `GET /api/v1/posts/{id}/` - Get single post
- `POST /api/v1/posts/` - Create new post (authenticated)
- `PUT /api/v1/posts/{id}/` - Update post (owner only)
- `DELETE /api/v1/posts/{id}/` - Delete post (owner only)

### Comments

- `GET /api/v1/comments/?post={id}` - Get post comments
- `POST /api/v1/comments/` - Add comment (authenticated)

### Categories & Tags

- `GET /api/v1/categories/` - List all categories
- `GET /api/v1/tags/` - List all tags

### User Profiles

- `GET /api/v1/profile/` - Get current user's profile (authenticated)
- `PATCH /api/v1/profile/` - Update current user's profile (authenticated)
- `POST /api/v1/profile/avatar/` - Upload avatar (authenticated)
- `DELETE /api/v1/profile/avatar/delete/` - Delete avatar (authenticated)
- `GET /api/v1/users/{id}/` - Get user profile by ID
- `GET /api/v1/users/{id}/posts/` - Get user's posts
- `GET /api/v1/users/{id}/comments/` - Get user's recent comments
- `GET /api/v1/users/username/{username}/` - Get user profile by username

## Database Models

### Post

- Title, content, author
- Category and tags
- Published status
- Featured image
- Timestamps (created_at, updated_at)

### Comment

- Content, author, post reference
- Timestamp (created_at)

### Category

- Name, slug, description

### Tag

- Name, slug

### UserProfile

- User (one-to-one with Django User)
- Avatar, bio, location
- Social links (website, Twitter, GitHub, LinkedIn)
- Timestamps (created_at, updated_at)

## Usage

1. Start both backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Create an account or login
4. Create, edit, and view blog posts
5. Add comments to posts
6. Browse posts by categories and tags

## Development Notes

- The backend uses Django's built-in User model for authentication
- Frontend uses React Context API for state management
- API responses include related data (author username, category name, etc.)
- See `blog-frontend/API_STRUCTURE.md` for detailed API response structure

## Future Enhancements

- [✔] Image upload for posts (featured images)
- [✔] Rich text editor with inline image uploads
- [✔] User profiles
- [ ] Post search functionality
- [ ] Post likes/reactions
- [ ] Email notifications
- [ ] Social media sharing
- [ ] Draft posts functionality
- [ ] Code syntax highlighting
- [ ] Table of contents for long posts

## License

This project is created for learning purposes.

## Author

Built while learning Django framework and Next.js
