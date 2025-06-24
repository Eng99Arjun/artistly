# Artistly

Artistly is a modern web platform for discovering, booking, and managing performing artists for events. Whether you're an event planner or an artist, Artistly streamlines the process of connecting talent with opportunities.

## Features

- **Browse Artists:** Search and filter a diverse catalog of performers by category, location, and price range.
- **Artist Onboarding:** Artists can create profiles, showcase their talents, and set their availability and rates.
- **Booking Requests:** Event planners can send booking inquiries directly to artists or their managers.
- **Responsive Design:** Fully responsive UI built with React, Next.js, and Tailwind CSS.
- **Testimonials & Categories:** Highlighted client testimonials and popular artist categories.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) (for form validation)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/artistly.git
   cd artistly
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

### Project Structure

```
src/
  app/                # Next.js app directory (pages, layouts)
  components/         # Reusable UI components
  data/               # Static JSON data (artists, etc.)
  styles/             # Global styles (Tailwind)
```

## Customization

- **Add Artists:** Update `src/data/artists.json` to add or modify artist profiles.
- **Categories:** Edit the categories array in `src/app/page.jsx` to change available categories.
- **Styling:** Modify Tailwind classes or add custom styles in `src/styles/globals.css`.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

[MIT](LICENSE)

---

**Artistly** – Book top performing artists for your next event!
