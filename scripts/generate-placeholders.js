const fs = require('fs');
const path = require('path');

const templatesDirPath = path.join(__dirname, '..', 'public', 'templates');

if (!fs.existsSync(templatesDirPath)) {
    fs.mkdirSync(templatesDirPath, { recursive: true });
}

const templates = [
    { id: "minimal", color: "#64748b" },
    { id: "modern", color: "#f472b6" },
    { id: "professional", color: "#60a5fa" },
    { id: "creative", color: "#818cf8" },
    { id: "executive", color: "#eab308" },
    { id: "elegant", color: "#14b8a6" },
    { id: "compact", color: "#a8a29e" },
    { id: "tech", color: "#2dd4bf" }
];

templates.forEach(t => {
    // Generate an SVG placeholder
    const svg = `<svg width="800" height="1035" viewBox="0 0 800 1035" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="1035" fill="white"/>
  <rect x="50" y="50" width="700" height="150" fill="${t.color}" fill-opacity="0.1" rx="10"/>
  <rect x="80" y="80" width="400" height="40" fill="${t.color}" rx="5"/>
  <rect x="80" y="140" width="200" height="20" fill="${t.color}" fill-opacity="0.6" rx="5"/>
  <rect x="50" y="250" width="200" height="30" fill="${t.color}" rx="5"/>
  <rect x="50" y="300" width="700" height="1" fill="#E2E8F0"/>
  <rect x="50" y="320" width="600" height="15" fill="#CBD5E1" rx="5"/>
  <rect x="50" y="350" width="650" height="15" fill="#CBD5E1" rx="5"/>
  <rect x="50" y="380" width="500" height="15" fill="#CBD5E1" rx="5"/>
  <rect x="50" y="450" width="200" height="30" fill="${t.color}" rx="5"/>
  <rect x="50" y="500" width="700" height="1" fill="#E2E8F0"/>
  <rect x="50" y="530" width="400" height="20" fill="#94A3B8" rx="5"/>
  <rect x="50" y="560" width="650" height="15" fill="#CBD5E1" rx="5"/>
  <rect x="50" y="590" width="600" height="15" fill="#CBD5E1" rx="5"/>
  <rect x="50" y="620" width="550" height="15" fill="#CBD5E1" rx="5"/>
  <rect x="50" y="670" width="400" height="20" fill="#94A3B8" rx="5"/>
  <rect x="250" y="90" width="300" height="60" fill="white" fill-opacity="0.01"/>
</svg>`;

    fs.writeFileSync(path.join(templatesDirPath, `${t.id}.svg`), svg);
    // Write an invisible png file too just in case standard next/image is strict, but svg should work.
});
console.log("SVGs generated.");
