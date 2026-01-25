#!/bin/bash
# ============================================================
# Script para transcribir video usando Whisper en Docker
# ============================================================
# INSTRUCCIONES:
# 1. Asegúrate de estar en el directorio donde está el video
# 2. Ejecuta: chmod +x transcribe_docker.sh
# 3. Ejecuta: ./transcribe_docker.sh
# ============================================================

INPUT_VIDEO="Testimonio-2PCCS_2.mp4"
OUTPUT_SRT="Testimonio-2PCCS_2.srt"

echo "=============================================="
echo "TRANSCRIPTOR DE VIDEO CON WHISPER (Docker)"
echo "=============================================="

# Verificar que el video existe
if [ ! -f "$INPUT_VIDEO" ]; then
    echo "❌ Error: No se encontró el archivo $INPUT_VIDEO"
    echo "   Asegúrate de ejecutar este script en el directorio correcto"
    exit 1
fi

echo "📁 Video encontrado: $INPUT_VIDEO"

# Verificar Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker no está instalado"
    exit 1
fi

echo "🐳 Docker disponible"

# Ejecutar Whisper en Docker
echo ""
echo "🎤 Iniciando transcripción con Whisper..."
echo "   (Esto puede tomar unos minutos la primera vez mientras descarga la imagen)"
echo ""

# Usar la imagen oficial de Whisper
docker run --rm \
    -v "$(pwd):/data" \
    onerahmet/openai-whisper-asr-webservice:latest \
    whisper "/data/$INPUT_VIDEO" \
    --model base \
    --language en \
    --output_format srt \
    --output_dir /data

# Verificar si se creó el archivo
EXPECTED_OUTPUT="${INPUT_VIDEO%.*}.srt"
if [ -f "$EXPECTED_OUTPUT" ]; then
    mv "$EXPECTED_OUTPUT" "$OUTPUT_SRT" 2>/dev/null || true
    echo ""
    echo "✅ Transcripción completada!"
    echo "📄 Archivo SRT: $OUTPUT_SRT"
else
    echo ""
    echo "⚠️  Intentando método alternativo..."

    # Método alternativo usando una imagen más simple
    docker run --rm \
        -v "$(pwd):/app" \
        python:3.10-slim \
        /bin/bash -c "
            pip install -q openai-whisper &&
            whisper /app/$INPUT_VIDEO --model base --language en --output_format srt --output_dir /app
        "

    if [ -f "$EXPECTED_OUTPUT" ]; then
        mv "$EXPECTED_OUTPUT" "$OUTPUT_SRT" 2>/dev/null || true
        echo ""
        echo "✅ Transcripción completada!"
        echo "📄 Archivo SRT: $OUTPUT_SRT"
    else
        echo "❌ Error en la transcripción"
        exit 1
    fi
fi

echo ""
echo "=============================================="
echo "SIGUIENTE PASO: Agregar subtítulos al video"
echo "=============================================="
echo "Ejecuta el siguiente comando para crear el video con subtítulos:"
echo ""
echo "ffmpeg -i $INPUT_VIDEO -vf \"subtitles=$OUTPUT_SRT:force_style='FontName=Arial,FontSize=24,PrimaryColour=&HFFFFFF,OutlineColour=&H000000,Outline=2,Shadow=1,Alignment=2,MarginV=50'\" -c:a copy Testimonio-2PCCS_2_subtitulado.mp4"
echo ""
