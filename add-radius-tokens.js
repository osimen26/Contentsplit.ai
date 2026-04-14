const fs = require('fs');
const path = require('path');

const tokensPath = path.join(__dirname, 'design-tokens.tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

// Define radius tokens according to MD3 and radius.md
const radiusTokens = {
  "radius-xs": {
    "type": "dimension",
    "value": 2,
    "extensions": {
      "org.lukasoppermann.figmaDesignTokens": {
        "collection": "Primitive color Collection",
        "scopes": ["ALL_SCOPES"],
        "variableId": "VariableID:RADIUS:1",
        "exportKey": "variables"
      }
    }
  },
  "radius-sm": {
    "type": "dimension",
    "value": 4,
    "extensions": {
      "org.lukasoppermann.figmaDesignTokens": {
        "collection": "Primitive color Collection",
        "scopes": ["ALL_SCOPES"],
        "variableId": "VariableID:RADIUS:2",
        "exportKey": "variables"
      }
    }
  },
  "radius-md": {
    "type": "dimension",
    "value": 8,
    "extensions": {
      "org.lukasoppermann.figmaDesignTokens": {
        "collection": "Primitive color Collection",
        "scopes": ["ALL_SCOPES"],
        "variableId": "VariableID:RADIUS:3",
        "exportKey": "variables"
      }
    }
  },
  "radius-lg": {
    "type": "dimension",
    "value": 12,
    "extensions": {
      "org.lukasoppermann.figmaDesignTokens": {
        "collection": "Primitive color Collection",
        "scopes": ["ALL_SCOPES"],
        "variableId": "VariableID:RADIUS:4",
        "exportKey": "variables"
      }
    }
  },
  "radius-xl": {
    "type": "dimension",
    "value": 16,
    "extensions": {
      "org.lukasoppermann.figmaDesignTokens": {
        "collection": "Primitive color Collection",
        "scopes": ["ALL_SCOPES"],
        "variableId": "VariableID:RADIUS:5",
        "exportKey": "variables"
      }
    }
  },
  "radius-full": {
    "type": "dimension",
    "value": 9999,
    "extensions": {
      "org.lukasoppermann.figmaDesignTokens": {
        "collection": "Primitive color Collection",
        "scopes": ["ALL_SCOPES"],
        "variableId": "VariableID:RADIUS:6",
        "exportKey": "variables"
      }
    }
  }
};

// Insert radius tokens into primitive color collection
if (tokens['primitive color collection']) {
  tokens['primitive color collection']['radius'] = radiusTokens;
  console.log('Added radius tokens to primitive color collection');
} else {
  console.error('Could not find primitive color collection in tokens');
  process.exit(1);
}

// Write back with proper formatting (2 spaces indentation)
fs.writeFileSync(
  tokensPath,
  JSON.stringify(tokens, null, 2)
);
console.log('Updated design-tokens.tokens.json');

// Run the conversion script to generate CSS variables
const convertScript = require('./convert-tokens-ultimate.js');
console.log('Note: Run node convert-tokens-ultimate.js to generate CSS variables');