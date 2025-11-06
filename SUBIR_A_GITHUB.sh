#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║  🚀 SUBIENDO PROYECTO A GITHUB                                    ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo ""

# Agregar todos los archivos
echo "📦 Agregando archivos..."
git add .

# Hacer commit
echo "💾 Creando commit..."
git commit -m "Sistema de evaluación técnica - GitHub Codespaces y Pages configurados

- 21 preguntas técnicas (React, Node.js, Git, CSS, AWS)
- Sistema de timer inteligente
- Layout optimizado de dos columnas
- Sistema de resultados detallados
- GitHub Codespaces configurado
- GitHub Pages deployment configurado
- Documentación completa"

# Push a GitHub
echo "⬆️  Subiendo a GitHub..."
git push origin master

echo ""
echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║  ✅ ¡PROYECTO SUBIDO EXITOSAMENTE!                                ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo ""
echo "🎯 PRÓXIMOS PASOS:"
echo ""
echo "1️⃣  GITHUB CODESPACES (Para desarrollar):"
echo "   - Ve a tu repositorio en GitHub"
echo "   - Click en 'Code' → 'Codespaces' → 'Create codespace'"
echo "   - ¡Se ejecutará automáticamente!"
echo ""
echo "2️⃣  GITHUB PAGES (Para compartir):"
echo "   - Ve a tu repo → Settings → Pages"
echo "   - Source: 'GitHub Actions'"
echo "   - Tu sitio estará en: https://TU_USUARIO.github.io/fullstack-interview/"
echo ""
echo "📚 Lee GITHUB_SETUP.md para más detalles"
echo ""

