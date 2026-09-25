import os
import subprocess

# SVG definitions based on the exact user-uploaded poster
svg_full_color = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 290" width="1200" height="290">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Teko:wght@700&amp;family=Montserrat:wght@800;900&amp;display=swap');
      .navy-fill { fill: #1D3560; }
      .orange-fill { fill: #EC5B13; }
      .white-fill { fill: #FFFFFF; }
      .brand-title {
        font-family: 'Montserrat', 'Arial Black', Impact, sans-serif;
        font-size: 132px;
        font-weight: 900;
        letter-spacing: -2px;
        fill: #1D3560;
      }
      .brand-sub {
        font-family: 'Montserrat', 'Arial Black', sans-serif;
        font-size: 32px;
        font-weight: 900;
        letter-spacing: 7px;
        fill: #1D3560;
      }
      .brand-tm {
        font-family: 'Montserrat', 'Arial Black', sans-serif;
        font-size: 26px;
        font-weight: 900;
        fill: #1D3560;
      }
    </style>
  </defs>

  <!-- 1. HEXAGON ICON ON LEFT -->
  <g transform="translate(10, 0)">
    <!-- Outer Hexagon Border -->
    <polygon points="135,10 255,80 255,210 135,280 15,210 15,80" fill="#1D3560" />
    
    <!-- White Inner Margin Frame -->
    <polygon points="135,26 239,87 239,203 135,264 31,203 31,87" fill="#FFFFFF" />

    <!-- Top Navy Monogram (S Upper Portion) -->
    <!-- Outer Navy Shape -->
    <polygon points="135,38 227,92 227,150 178,121 178,92 135,66 92,92 92,126 135,152 43,205 43,92" fill="#1D3560" />
    
    <!-- Navy inner facet / accent strip -->
    <polygon points="135,66 178,92 147,110 104,84" fill="#FFFFFF" opacity="0.1" />
    <polygon points="145,95 190,121 178,128 135,102" fill="#1D3560" />

    <!-- Bottom Orange Monogram (S Lower Portion) -->
    <polygon points="135,252 43,198 43,140 92,169 92,198 135,224 178,198 178,164 135,138 227,85 227,198" fill="#EC5B13" />
    
    <!-- White Dividing Slits & Clean Negative Spaces -->
    <!-- Top inner slit -->
    <polygon points="135,97 185,126 170,135 120,106" fill="#FFFFFF" />
    <!-- Center diagonal dividing line -->
    <polygon points="41,194 135,139 140,148 46,203" fill="#FFFFFF" />
    <polygon points="130,142 229,85 224,76 125,133" fill="#FFFFFF" />
    <!-- Bottom inner slit -->
    <polygon points="85,154 135,183 150,174 100,145" fill="#FFFFFF" />
    
    <!-- Central interlocking bars -->
    <polygon points="135,105 170,125 135,145 100,125" fill="#1D3560" />
    <polygon points="135,145 170,165 135,185 100,165" fill="#EC5B13" />
    
    <!-- Sharp crisp overlay polygons ensuring exact geometry -->
    <path d="M 43,92 L 135,38 L 227,92 L 227,125 L 178,96 L 135,70 L 92,96 L 92,140 L 43,111 Z" fill="#1D3560" />
    <path d="M 92,120 L 135,146 L 178,120 L 227,149 L 135,202 L 92,176 Z" fill="#1D3560" opacity="0.95" />
    
    <path d="M 227,198 L 135,252 L 43,198 L 43,165 L 92,194 L 135,220 L 178,194 L 178,150 L 227,179 Z" fill="#EC5B13" />
    <path d="M 178,170 L 135,144 L 92,170 L 43,141 L 135,88 L 178,114 Z" fill="#EC5B13" opacity="0.95" />
    
    <!-- Final white cutlines matching poster -->
    <path d="M 135,90 L 182,118 L 170,125 L 123,97 Z" fill="#FFFFFF" />
    <path d="M 88,172 L 135,200 L 147,193 L 100,165 Z" fill="#FFFFFF" />
    <path d="M 41,138 L 135,84 L 140,93 L 46,147 Z" fill="#FFFFFF" />
    <path d="M 229,152 L 135,206 L 130,197 L 224,143 Z" fill="#FFFFFF" />
  </g>

  <!-- 2. RIGHT SIDE TYPOGRAPHY & OVERLINES -->
  <!-- Top horizontal bar over "SURGE SHORE" -->
  <rect x="315" y="52" width="395" height="14" rx="2" fill="#1D3560" />

  <!-- SURGE SHORE Text -->
  <text x="310" y="180" class="brand-title">SURGE SHORE</text>

  <!-- TM Symbol -->
  <text x="1145" y="65" class="brand-tm">TM</text>

  <!-- Bottom horizontal bar underline under "SHORE" -->
  <rect x="748" y="196" width="395" height="14" rx="2" fill="#1D3560" />

  <!-- POWERTECH LLP Text -->
  <text x="886" y="246" class="brand-sub">POWERTECH LLP</text>
</svg>
'''

# Dark mode / White version
svg_white_logo = svg_full_color.replace('#1D3560', '#FFFFFF')

with open('/tmp/surge-shore-logo.svg', 'w') as f:
    f.write(svg_full_color)

with open('/tmp/surge-shore-logo-white.svg', 'w') as f:
    f.write(svg_white_logo)

print("SVG files generated successfully")
