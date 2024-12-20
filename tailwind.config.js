/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  safelist: ['bg-img-1', 'bg-img-2', 'bg-img-3', 'bg-img-4', 'bg-img-5', 'bg-img-6', 'bg-img-7', 'bg-img-8', 'bg-img-9', 'bg-img-10', 'line', 'bar'],
  theme: {
    extend: {
      backgroundImage: {
        "img-1": "url('../images/back/pic-1.webp')",
        "img-2": "url('../images/back/pic-2.jpg')",
        "img-3": "url('../images/back/pic-3.jpg')",
        "img-4": "url('../images/back/pic-4.jpg')",
        "img-5": "url('../images/back/pic-5.jpg')",
        "img-6": "url('../images/back/pic-6.jpg')",
        "img-7": "url('../images/back/pic-7.jpg')",
        "img-8": "url('../images/back/pic-8.png')",
        "img-9": "url('../images/back/pic-9.png')",
        "img-10": "url('../images/back/pic-10.jpg')",
        "pipe": "url('../images/icon/pipe-green.png')",
      }
    },
  },
  plugins: [],
}

