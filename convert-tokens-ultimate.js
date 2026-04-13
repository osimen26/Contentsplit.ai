const fs = require('fs');
const path = require('path');

const tokensPath = path.join(__dirname, 'design-tokens.tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

// Function to convert a string to kebab-case
function toKebabCase(str) {
  // First, handle camelCase: insert hyphen before uppercase letters (except first)
  let result = str.replace(/([A-Z])/g, '-$1').toLowerCase();
  // Replace spaces with hyphens
  result = result.replace(/\s+/g, '-');
  // Remove any non-word characters except hyphens
  result = result.replace(/[^\w-]+/g, '');
  // Replace multiple hyphens with single hyphen
  result = result.replace(/--+/g, '-');
  // Trim leading/trailing hyphens
  result = result.replace(/^-+/, '').replace(/-+$/, '');
  return result;
}

// Clean variant name: extract weight variant from parentheses or text
function cleanVariant(name) {
  // First, look for parentheses content
  const parenMatch = name.match(/\(([^)]+)\)/);
  if (parenMatch) {
    const parenContent = parenMatch[1].toLowerCase().trim();
    // Map common abbreviations
    if (parenContent === 'r' || parenContent === '(r)') return 'regular';
    if (parenContent === 'm' || parenContent === '(m)') return 'medium';
    if (parenContent === 'sm' || parenContent === '(sm)') return 'semi-bold';
    if (parenContent === 'b' || parenContent === '(b)') return 'bold';
    // If parentheses contain full weight name
    if (parenContent.includes('regular')) return 'regular';
    if (parenContent.includes('medium')) return 'medium';
    if (parenContent.includes('semi') || parenContent.includes('sm')) return 'semi-bold';
    if (parenContent.includes('bold')) return 'bold';
  }
  // No parentheses or not matched, check whole string
  const lower = name.toLowerCase();
  if (lower.includes('regular')) return 'regular';
  if (lower.includes('medium')) return 'medium';
  if (lower.includes('semi') || lower.includes('sm')) return 'semi-bold';
  if (lower.includes('bold')) return 'bold';
  // Default fallback
  return 'regular';
}

// Clean color role name: just convert to kebab-case, don't extract weight
function cleanColorRole(name) {
  // Remove parentheses and content inside them
  let cleaned = name.replace(/\([^)]*\)/g, '').trim();
  // Replace multiple spaces with single space
  cleaned = cleaned.replace(/\s+/g, ' ');
  return cleaned;
}

// Extract shade number from shade string (e.g., "primary 0", "neutralvariant 80")
function extractShade(shadeStr) {
  // Split by spaces and get the last part
  const parts = shadeStr.trim().split(/\s+/);
  return parts[parts.length - 1];
}

// Transform path segments based on section
function transformPath(parts) {
  if (parts.length === 0) return parts;
  
  const first = parts[0];
  
  // Handle color tokens
  if (first === 'primitive color collection') {
    if (parts.length >= 2 && parts[1] === 'key color group') {
      // e.g., "primitive color collection.key color group.primary key color"
      const colorName = parts[2].replace(' key color', '');
      return ['sys', 'color', colorName];
    }
    
    if (parts.length >= 2 && parts[1] === 'color palette') {
      // e.g., "primitive color collection.color palette.primary.primary 0"
      // parts: ["primitive color collection", "color palette", "primary", "primary 0"]
      const colorName = parts[2]; // "primary", "secondary", "neutral variant", etc.
      const shade = extractShade(parts[3]);
      return ['sys', 'color', colorName, shade];
    }
    
    if (parts.length >= 2 && parts[1] === 'disable color') {
      return ['sys', 'color', 'disable'];
    }
    
    // Handle spacing tokens
    if (parts.length >= 2 && parts[1] === 'spacing') {
      // Handle spacing parent object (no value) - skip
      if (parts.length === 2) {
        return [];
      }
      // e.g., "primitive color collection.spacing.spacing-xs"
      const tokenName = parts[2]; // "spacing-xs", "spacing-s", etc.
      let suffix = tokenName;
      if (suffix.startsWith('spacing-')) {
        suffix = suffix.substring('spacing-'.length);
      } else if (suffix.startsWith('sapcing-')) {
        suffix = suffix.substring('sapcing-'.length);
      }
      return ['sys', 'spacing', suffix];
    }
    
    // Handle radius tokens (if they exist in the future)
    if (parts.length >= 2 && parts[1] === 'radius') {
      // Handle radius parent object (no value) - skip
      if (parts.length === 2) {
        return [];
      }
      // e.g., "primitive color collection.radius.radius-sm"
      const tokenName = parts[2]; // "radius-sm", "radius-md", etc.
      let suffix = tokenName;
      if (suffix.startsWith('radius-')) {
        suffix = suffix.substring('radius-'.length);
      }
      return ['sys', 'radius', suffix];
    }
    
    // Skip other primitive color collection items (other future tokens)
    return [];
  }
  
  // Handle color roles
  if (first === 'color roles') {
    // Transform color role paths
    const remaining = parts.slice(1);
    const newParts = ['sys', 'color', 'roles'];
    for (let i = 0; i < remaining.length; i++) {
      const cleaned = cleanColorRole(remaining[i]);
      newParts.push(toKebabCase(cleaned));
    }
    return newParts;
  }
  
  // Handle font section (skip typography section - we'll generate composites)
  if (first === 'font') {
    // Remove the section name
    const remaining = parts.slice(1);
    if (remaining.length === 0) return ['sys-font'];
    
    // Process category (e.g., "display large")
    const category = remaining[0];
    const categoryKebab = toKebabCase(category);
    
    if (remaining.length === 1) return ['sys-font', categoryKebab];
    
    // Process variant (e.g., "display (l) regular")
    const variant = remaining[1];
    const variantClean = cleanVariant(variant); // returns weight variant only
    
    if (remaining.length === 2) return ['sys-font', categoryKebab, variantClean];
    
    // Process property (e.g., "fontSize")
    const property = remaining[2];
    const propertyKebab = toKebabCase(property);
    
    return ['sys-font', categoryKebab, variantClean, propertyKebab];
  }
  
  // Skip typography section (we'll generate composite references)
  if (first === 'typography') {
    // Return empty array to skip
    return [];
  }
  
  // Default: return all parts (will be kebab-cased later)
  return parts;
}

// Generate CSS variable name from transformed parts
function generateVarName(parts) {
  const transformed = transformPath(parts);
  if (transformed.length === 0) return null; // Skip this token
  const kebabParts = transformed.map(part => toKebabCase(part));
  return `--${kebabParts.join('-')}`;
}

// Resolve reference string to CSS var() reference
function resolveReference(refStr, varName) {
  // Check if value is a reference (starts with { and ends with })
  if (typeof refStr === 'string' && refStr.startsWith('{') && refStr.endsWith('}')) {
    // Extract path inside braces
    const inner = refStr.slice(1, -1).trim();
    // Split by dots to get path parts
    const pathParts = inner.split('.').map(part => part.trim());
    // Generate variable name from path parts
    const targetVarName = generateVarName(pathParts);
    if (targetVarName) {
      return `var(${targetVarName})`;
    }
    // Fallback: return the reference as-is (will be invalid CSS but visible)
    return refStr;
  }
  return refStr;
}

// Format value with appropriate units
function formatValue(value, type, property) {
  if (typeof value === 'number') {
    // Add px for dimension tokens (spacing, border width, etc.)
    if (type === 'dimension') {
      return `${value}px`;
    }
    // Check if property requires 'px' units
    if (property && (property.includes('fontSize') || property.includes('lineHeight') || property.includes('letterSpacing') || property.includes('paragraphIndent') || property.includes('paragraphSpacing'))) {
      return `${value}px`;
    }
    // fontWeight is unitless
    return value.toString();
  }
  return value;
}

// Collect CSS variable declarations
const declarations = [];
// Map to store font variable bases per category and variant
const fontVarMap = {}; // key: category, value: base variable name for regular weight

// Recursive function to traverse token object
function traverse(obj, parts = []) {
  if (obj && typeof obj === 'object') {
    // Skip typography section
    if (parts.length > 0 && parts[0] === 'typography') {
      return;
    }
    
    // If object has a 'value' property, treat as leaf node
    if ('value' in obj) {
      const varName = generateVarName(parts);
      if (!varName) return; // Skip typography tokens
      
      let value = obj.value;
      
      // Handle different token types
      if (obj.type === 'color') {
        // Resolve references for color values
        value = resolveReference(value, varName);
        declarations.push(`${varName}: ${value};`);
      } else if (obj.type === 'custom-fontStyle') {
        // For font styles, create individual properties for each font attribute
        const fontValue = obj.value;
        // Determine category and variant for mapping
        const category = parts.length > 1 ? parts[1] : '';
        const variant = parts.length > 2 ? parts[2] : '';
        const categoryKebab = toKebabCase(category);
        const variantClean = cleanVariant(variant);
        
        Object.keys(fontValue).forEach(attr => {
          const attrParts = [...parts, attr];
          const attrVarName = generateVarName(attrParts);
          let attrValue = fontValue[attr];
          attrValue = formatValue(attrValue, obj.type, attr);
          declarations.push(`${attrVarName}: ${attrValue};`);
          
          // Store the base variable name for regular weight variants
          if (variantClean === 'regular' && attr === 'fontSize') {
            const propKebab = toKebabCase(attr); // 'font-size'
            const baseVarName = attrVarName.replace(`-${propKebab}`, '');
            fontVarMap[categoryKebab] = baseVarName;
          }
        });
      } else {
        // For other tokens (dimension, number, string)
        value = formatValue(value, obj.type, parts[parts.length - 1]);
        // Check if value is a reference
        value = resolveReference(value, varName);
        declarations.push(`${varName}: ${value};`);
      }
      return;
    }
    
    // Otherwise, traverse each property
    Object.keys(obj).forEach(key => {
      traverse(obj[key], [...parts, key]);
    });
  }
}

// Start traversal from root
traverse(tokens);

// Generate composite typography variables (--sys-typography-* that reference --sys-font-* regular weight)
const compositeDeclarations = [];
Object.keys(fontVarMap).forEach(category => {
  const baseFontVar = fontVarMap[category];
  // Create references for each property
  const properties = [
    'fontsize', 'fontfamily', 'fontweight', 'fontstyle', 'fontstretch',
    'letterspacing', 'lineheight', 'paragraphindent', 'paragraphspacing',
    'textcase', 'textdecoration'
  ];
  properties.forEach(prop => {
    const fontVar = `${baseFontVar}-${prop}`;
    const typographyVar = `--sys-typography-${category}-${prop}`;
    compositeDeclarations.push(`${typographyVar}: var(${fontVar});`);
  });
});

// Combine all declarations
const allDeclarations = [...declarations, ...compositeDeclarations];

// Generate CSS content
const cssContent = `:root {
  /* Design Tokens - Generated from design-tokens.tokens.json */
  ${allDeclarations.join('\n  ')}
}
`;

// Write to CSS file
const outputPath = path.join(__dirname, 'design-tokens-ultimate.css');
fs.writeFileSync(outputPath, cssContent, 'utf8');

console.log(`Generated ${allDeclarations.length} CSS variables to ${outputPath}`);
console.log(`Font categories with regular weight: ${Object.keys(fontVarMap).length}`);
console.log(`Composite typography variables: ${compositeDeclarations.length}`);