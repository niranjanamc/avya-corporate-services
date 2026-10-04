/**
 * ==============================================================================
 * AVYA CORPORATE SERVICES — GEMINI IMAGEN 3 FHD IMAGE GENERATION SCRIPT
 * ==============================================================================
 * 
 * Generates photorealistic, Full HD (1920x1080, 16:9) cinematic hero images
 * for all 6 dedicated service pages using Google's official Imagen 3 API.
 * 
 * Usage:
 *   node scripts/generate_ai_images.js <YOUR_GEMINI_API_KEY>
 * Or set environment variable:
 *   GEMINI_API_KEY="AIzaSy..." node scripts/generate_ai_images.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const apiKey = process.argv[2] || process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("\n❌ Error: Gemini API Key is required.");
  console.error("Usage: node scripts/generate_ai_images.js <YOUR_GEMINI_API_KEY>\n");
  process.exit(1);
}

const IMAGES_DIR = path.join(__dirname, '..', 'assets', 'images');
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Master Production Prompts for Full HD Photorealistic Imagery
const heroPrompts = [
  {
    service: 'home',
    outputFile: 'hero-home.jpg',
    prompt: "A cinematic, photorealistic Full HD commercial photograph of an elite, contemporary corporate enterprise headquarters campus at sunset in Bengaluru. Modern glass-and-steel architectural pavilion with warm champagne-gold ambient interior lighting glowing through floor-to-ceiling windows. In the foreground, sleek landscaped executive walkways with subtle water reflection features and warm pathway illumination. In the distance, silhouettes of high-tech corporate business towers against a twilight sky with subtle golden and deep navy atmospheric tones. 8k resolution, ultra-detailed architectural photography, prestigious multinational corporate atmosphere, no cartoon elements."
  },
  {
    service: 'corporate-gifting',
    outputFile: 'hero-corporate-gifting.jpg',
    prompt: "A hyperrealistic, cinematic commercial photograph of an ultra-luxurious corporate gifting collection for an elite IT MNC in Bengaluru. A large matte-black rigid gift box with a subtle gold foil embossed logo and champagne gold satin ribbon. Inside and beside the box: a sleek black stainless steel vacuum tumbler with brushed gold trim, premium leatherette notebook with pen, high-end noise-cancelling wireless earbuds in a matte case, and gourmet glass jars of saffron and artisanal chocolates. Set on a dark slate executive table with dramatic warm golden rim lighting, soft depth of field, 8k resolution, FHD photorealistic corporate commercial photography."
  },
  {
    service: 'print-media',
    outputFile: 'hero-print-media.jpg',
    prompt: "A hyperrealistic, high-end industrial commercial photograph of a modern corporate commercial print manufacturing facility. In the foreground, freshly printed luxury corporate brochures and annual reports with raised gold foil stamping and spot UV varnish stacked on an executive inspection table. In the background, gleaming Heidelberg offset printing presses in soft focus with ambient warm gold and cool industrial studio lighting, sharp focal depth, 8k resolution, FHD photorealistic commercial photography."
  },
  {
    service: 'corporate-travel',
    outputFile: 'hero-corporate-travel.jpg',
    prompt: "A stunning, photorealistic photograph of an exclusive corporate retreat villa in Coorg, Karnataka, India. A modern luxury timber-and-glass executive homestay pavilion surrounded by lush green coffee estates and misty Western Ghats mountains at sunset. On the expansive wooden outdoor deck with infinity pool reflection, a corporate leadership team in smart-casual business attire holds a sunset strategy offsite. Warm amber interior lighting, soft golden hour glow, cinematic 8k resolution, FHD photorealistic photography."
  },
  {
    service: 'rewards-recognition',
    outputFile: 'hero-rewards-recognition.jpg',
    prompt: "A dramatic, cinematic photograph of luxury corporate awards displayed on a stage podium. A magnificent sculptured optical K9 crystal trophy with sharp diamond-beveled facets reflecting warm golden spotlights, alongside a heavy cast-metal gold medal with a royal satin neck ribbon, and a laser-engraved teakwood and brass plaque. Deep dark background with subtle stage bokeh and golden light rays, pristine glass reflections, 8k resolution, FHD photorealistic award gala photography."
  },
  {
    service: 'brand-design',
    outputFile: 'hero-brand-design.jpg',
    prompt: "A photorealistic perspective photograph of an executive brand design studio workspace. On a dark oak desk: open Pantone Formula Guides (PMS) showing gold and charcoal swatches, realistic 3D packaging prototypes with embossed logos, an Apple Studio Display showcasing precise vector brand guidelines, a titanium digital stylus, and branded stationery samples. Elegant soft studio lighting, crisp textures, 8k resolution, FHD photorealistic design agency photography."
  },
  {
    service: 'event-branding',
    outputFile: 'hero-event-branding.jpg',
    prompt: "A breathtaking wide-angle photorealistic photograph of a premier corporate tech summit in a major Bengaluru convention hall. A massive, towering stage featuring a high-definition curved LED video wall displaying elegant gold particle motion graphics, sophisticated aluminum truss lighting rigging, illuminated branded registration kiosks, and roll-up exhibition standees in the distance. Theatrical blue and warm gold stage lighting, professional conference atmosphere, 8k resolution, FHD photorealistic event production photography."
  }
];

function generateImage(item) {
  return new Promise((resolve, reject) => {
    console.log(`\n⏳ Generating FHD AI image for [${item.service}]...`);
    
    // Google Gemini Imagen 3 endpoint
    const postData = JSON.stringify({
      instances: [
        { prompt: item.prompt }
      ],
      parameters: {
        sampleCount: 1,
        aspectRatio: "16:9",
        outputOptions: {
          mimeType: "image/jpeg"
        }
      }
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      port: 443,
      path: `/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const data = JSON.parse(body);
            const base64Bytes = data.predictions?.[0]?.bytesBase64Encoded;
            if (base64Bytes) {
              const buffer = Buffer.from(base64Bytes, 'base64');
              const dest = path.join(IMAGES_DIR, item.outputFile);
              fs.writeFileSync(dest, buffer);
              console.log(`✅ Saved Full HD Image (${buffer.length} bytes): ${dest}`);
              resolve(dest);
            } else {
              reject(new Error("No base64 bytes found in response"));
            }
          } catch (e) {
            reject(e);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(postData);
    req.end();
  });
}

async function runAll() {
  console.log("==================================================================");
  console.log("  Avya Corporate Services — Gemini Imagen 3 FHD Image Generator   ");
  console.log("==================================================================");

  for (const item of heroPrompts) {
    try {
      await generateImage(item);
    } catch (err) {
      console.error(`❌ Failed generating ${item.service}:`, err.message);
    }
  }

  console.log("\n🎉 Generation process complete! Check assets/images/ for results.\n");
}

runAll();
