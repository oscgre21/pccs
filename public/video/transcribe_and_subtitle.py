#!/usr/bin/env python3
"""
Script para transcribir video y agregar subtítulos con Whisper
========================================================
INSTRUCCIONES:
1. Instalar dependencias:
   pip install openai-whisper ffmpeg-python

2. Ejecutar:
   python transcribe_and_subtitle.py

El script:
- Transcribirá el audio del video Testimonio-2PCCS_2.mp4
- Generará un archivo SRT con los subtítulos
- Creará el video con subtítulos incrustados (mismo estilo que Testimonio-1PCCS_1.mp4)
"""

import subprocess
import os
import sys

# Configuración
INPUT_VIDEO = "Testimonio-2PCCS_2.mp4"
OUTPUT_VIDEO = "Testimonio-2PCCS_2_subtitulado.mp4"
SRT_FILE = "Testimonio-2PCCS_2.srt"
LANGUAGE = "en"  # Inglés

def check_dependencies():
    """Verifica que las dependencias estén instaladas"""
    try:
        import whisper
        print("✓ Whisper instalado")
    except ImportError:
        print("✗ Whisper no instalado. Ejecuta: pip install openai-whisper")
        return False

    # Check ffmpeg
    try:
        subprocess.run(["ffmpeg", "-version"], capture_output=True, check=True)
        print("✓ FFmpeg instalado")
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("✗ FFmpeg no instalado. Instálalo desde https://ffmpeg.org/")
        return False

    return True

def format_srt_time(seconds):
    """Convierte segundos a formato SRT (HH:MM:SS,mmm)"""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds % 1) * 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"

def transcribe_video(video_path, language="en"):
    """Transcribe el audio del video usando Whisper"""
    import whisper

    print(f"\n📝 Cargando modelo Whisper (base)...")
    model = whisper.load_model("base")  # 'base' ofrece buen balance calidad/velocidad

    print(f"🎤 Transcribiendo {video_path}...")
    result = model.transcribe(video_path, language=language, verbose=False)

    print("\n=== TRANSCRIPCIÓN COMPLETA ===")
    print(result["text"])

    return result["segments"]

def create_srt(segments, output_path):
    """Crea archivo SRT a partir de los segmentos"""
    with open(output_path, 'w', encoding='utf-8') as f:
        for i, seg in enumerate(segments, 1):
            start = format_srt_time(seg["start"])
            end = format_srt_time(seg["end"])
            text = seg["text"].strip()

            f.write(f"{i}\n")
            f.write(f"{start} --> {end}\n")
            f.write(f"{text}\n\n")

    print(f"\n✅ Archivo SRT creado: {output_path}")

def add_subtitles_to_video(input_video, srt_file, output_video):
    """
    Agrega subtítulos al video con el mismo estilo que Testimonio-1PCCS_1.mp4
    Estilo: texto blanco centrado, fuente sans-serif, sin fondo
    """
    print(f"\n🎬 Agregando subtítulos al video...")

    # Estilo de subtítulos (igual al video de referencia)
    # - Fuente blanca
    # - Centrado
    # - Tamaño apropiado para video vertical (608x1080)
    subtitle_style = (
        "FontName=Arial,"
        "FontSize=24,"
        "PrimaryColour=&HFFFFFF,"   # Blanco
        "OutlineColour=&H000000,"   # Borde negro
        "BackColour=&H00000000,"    # Sin fondo
        "Bold=0,"
        "Outline=2,"                # Borde para legibilidad
        "Shadow=1,"
        "Alignment=2,"              # Centrado abajo
        "MarginV=50"                # Margen inferior
    )

    # Comando FFmpeg para incrustar subtítulos
    cmd = [
        "ffmpeg", "-y",
        "-i", input_video,
        "-vf", f"subtitles={srt_file}:force_style='{subtitle_style}'",
        "-c:a", "copy",
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "23",
        output_video
    ]

    print(f"Ejecutando: {' '.join(cmd)}")

    try:
        subprocess.run(cmd, check=True)
        print(f"\n✅ Video con subtítulos creado: {output_video}")
    except subprocess.CalledProcessError as e:
        print(f"\n❌ Error al crear video: {e}")
        # Intento alternativo con escape diferente
        print("Intentando método alternativo...")
        cmd_alt = [
            "ffmpeg", "-y",
            "-i", input_video,
            "-vf", f"subtitles='{srt_file}'",
            "-c:a", "copy",
            output_video
        ]
        subprocess.run(cmd_alt, check=True)
        print(f"\n✅ Video con subtítulos creado: {output_video}")

def main():
    print("=" * 60)
    print("TRANSCRIPTOR Y SUBTITULADOR DE VIDEO")
    print("=" * 60)

    # Verificar que el archivo de entrada existe
    if not os.path.exists(INPUT_VIDEO):
        print(f"❌ No se encontró el archivo: {INPUT_VIDEO}")
        print("   Asegúrate de ejecutar este script en el mismo directorio del video")
        sys.exit(1)

    # Verificar dependencias
    if not check_dependencies():
        sys.exit(1)

    # Paso 1: Transcribir
    segments = transcribe_video(INPUT_VIDEO, LANGUAGE)

    # Paso 2: Crear SRT
    create_srt(segments, SRT_FILE)

    # Paso 3: Agregar subtítulos al video
    add_subtitles_to_video(INPUT_VIDEO, SRT_FILE, OUTPUT_VIDEO)

    print("\n" + "=" * 60)
    print("✅ PROCESO COMPLETADO")
    print("=" * 60)
    print(f"📄 Archivo SRT: {SRT_FILE}")
    print(f"🎬 Video con subtítulos: {OUTPUT_VIDEO}")
    print("\nSi necesitas ajustar los subtítulos, edita el archivo SRT")
    print("y luego ejecuta solo el paso de agregar subtítulos.")

if __name__ == "__main__":
    main()
