#!/usr/bin/env python3
"""
Script completo para transcribir y subtitular video usando Docker + Whisper
==========================================================================
Este script:
1. Usa Docker para ejecutar Whisper y transcribir el audio
2. Genera un archivo SRT con los subtítulos
3. Crea el video con subtítulos incrustados (mismo estilo que Testimonio-1PCCS_1.mp4)

REQUISITOS:
- Docker instalado y funcionando
- ffmpeg instalado (para agregar subtítulos al video)

USO:
python run_whisper_docker.py
"""

import subprocess
import os
import sys
import shutil

# Configuración
INPUT_VIDEO = "Testimonio-2PCCS_2.mp4"
OUTPUT_VIDEO = "Testimonio-2PCCS_2_subtitulado.mp4"
SRT_FILE = "Testimonio-2PCCS_2.srt"
LANGUAGE = "en"
MODEL = "base"  # Opciones: tiny, base, small, medium, large

def check_docker():
    """Verifica que Docker esté disponible"""
    try:
        result = subprocess.run(["docker", "--version"], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✓ Docker: {result.stdout.strip()}")
            return True
    except FileNotFoundError:
        pass
    print("✗ Docker no está instalado o no está en PATH")
    return False

def check_ffmpeg():
    """Verifica que FFmpeg esté disponible"""
    try:
        result = subprocess.run(["ffmpeg", "-version"], capture_output=True, text=True)
        if result.returncode == 0:
            version = result.stdout.split('\n')[0]
            print(f"✓ FFmpeg: {version}")
            return True
    except FileNotFoundError:
        pass
    print("✗ FFmpeg no está instalado")
    return False

def transcribe_with_docker(video_path, language="en", model="base"):
    """Transcribe video usando Whisper en Docker"""
    current_dir = os.path.abspath(os.path.dirname(video_path))
    video_name = os.path.basename(video_path)

    print(f"\n🎤 Transcribiendo {video_name} con Whisper ({model})...")
    print("   (La primera ejecución descarga la imagen Docker, puede tardar unos minutos)")

    # Comando Docker para ejecutar Whisper
    docker_cmd = [
        "docker", "run", "--rm",
        "-v", f"{current_dir}:/data",
        "ghcr.io/openai/whisper:latest",
        "whisper", f"/data/{video_name}",
        "--model", model,
        "--language", language,
        "--output_format", "srt",
        "--output_dir", "/data",
        "--verbose", "False"
    ]

    try:
        # Primero intentamos con la imagen oficial
        result = subprocess.run(docker_cmd, capture_output=True, text=True, timeout=600)

        if result.returncode != 0:
            print("   Imagen oficial no disponible, usando alternativa...")
            # Imagen alternativa
            docker_cmd_alt = [
                "docker", "run", "--rm",
                "-v", f"{current_dir}:/data",
                "onerahmet/openai-whisper-asr-webservice:latest",
                "whisper", f"/data/{video_name}",
                "--model", model,
                "--language", language,
                "--output_format", "srt",
                "--output_dir", "/data"
            ]
            result = subprocess.run(docker_cmd_alt, capture_output=True, text=True, timeout=600)

        if result.returncode == 0:
            print("✓ Transcripción completada")
            return True
        else:
            print(f"✗ Error: {result.stderr}")

            # Último intento: usar Python directamente en Docker
            print("   Intentando con Python en Docker...")
            python_cmd = f"""
pip install -q openai-whisper && \\
whisper /data/{video_name} --model {model} --language {language} --output_format srt --output_dir /data
"""
            docker_cmd_python = [
                "docker", "run", "--rm",
                "-v", f"{current_dir}:/data",
                "python:3.10-slim",
                "/bin/bash", "-c", python_cmd
            ]
            result = subprocess.run(docker_cmd_python, capture_output=True, text=True, timeout=900)

            if result.returncode == 0:
                print("✓ Transcripción completada")
                return True
            else:
                print(f"✗ Error: {result.stderr}")
                return False

    except subprocess.TimeoutExpired:
        print("✗ Timeout: La transcripción tardó demasiado")
        return False
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

def add_subtitles(input_video, srt_file, output_video):
    """Agrega subtítulos al video con el mismo estilo que Testimonio-1PCCS_1.mp4"""
    print(f"\n🎬 Agregando subtítulos al video...")

    # Estilo de subtítulos (basado en Testimonio-1PCCS_1.mp4)
    # - Texto blanco centrado
    # - Fuente Arial/sans-serif
    # - Borde negro para legibilidad
    # - Posición: centro-abajo
    subtitle_style = (
        "FontName=Arial,"
        "FontSize=24,"
        "PrimaryColour=&HFFFFFF,"
        "OutlineColour=&H000000,"
        "BackColour=&H00000000,"
        "Bold=0,"
        "Outline=2,"
        "Shadow=1,"
        "Alignment=2,"
        "MarginV=50"
    )

    # Comando FFmpeg
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

    try:
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✓ Video con subtítulos creado: {output_video}")
            return True
        else:
            # Intento alternativo sin force_style
            print("   Intentando método alternativo...")
            cmd_simple = [
                "ffmpeg", "-y",
                "-i", input_video,
                "-vf", f"subtitles={srt_file}",
                "-c:a", "copy",
                output_video
            ]
            result = subprocess.run(cmd_simple, capture_output=True, text=True)
            if result.returncode == 0:
                print(f"✓ Video con subtítulos creado: {output_video}")
                return True
            else:
                print(f"✗ Error: {result.stderr}")
                return False
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

def main():
    print("=" * 60)
    print("TRANSCRIPTOR Y SUBTITULADOR DE VIDEO")
    print("Usando Docker + Whisper + FFmpeg")
    print("=" * 60)

    # Cambiar al directorio del script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    print(f"\n📁 Directorio de trabajo: {script_dir}")

    # Verificar que el video existe
    if not os.path.exists(INPUT_VIDEO):
        print(f"\n❌ No se encontró el archivo: {INPUT_VIDEO}")
        sys.exit(1)
    print(f"✓ Video encontrado: {INPUT_VIDEO}")

    # Verificar dependencias
    print("\n--- Verificando dependencias ---")
    docker_ok = check_docker()
    ffmpeg_ok = check_ffmpeg()

    if not docker_ok:
        print("\n❌ Docker es necesario para la transcripción")
        sys.exit(1)

    if not ffmpeg_ok:
        print("\n⚠️  FFmpeg no está disponible, solo se generará el archivo SRT")

    # Paso 1: Transcribir con Docker
    transcribe_ok = transcribe_with_docker(INPUT_VIDEO, LANGUAGE, MODEL)

    if not transcribe_ok:
        print("\n❌ Error en la transcripción")
        sys.exit(1)

    # Buscar el archivo SRT generado
    base_name = os.path.splitext(INPUT_VIDEO)[0]
    generated_srt = f"{base_name}.srt"

    if os.path.exists(generated_srt):
        if generated_srt != SRT_FILE:
            shutil.move(generated_srt, SRT_FILE)
        print(f"✓ Archivo SRT: {SRT_FILE}")
    else:
        print(f"❌ No se encontró el archivo SRT generado")
        sys.exit(1)

    # Paso 2: Agregar subtítulos (si FFmpeg está disponible)
    if ffmpeg_ok:
        add_subtitles(INPUT_VIDEO, SRT_FILE, OUTPUT_VIDEO)

    # Resumen final
    print("\n" + "=" * 60)
    print("✅ PROCESO COMPLETADO")
    print("=" * 60)
    print(f"📄 Archivo SRT: {SRT_FILE}")
    if ffmpeg_ok and os.path.exists(OUTPUT_VIDEO):
        print(f"🎬 Video con subtítulos: {OUTPUT_VIDEO}")
    print("\nSi necesitas ajustar los subtítulos, edita el archivo SRT")
    print("y ejecuta el comando FFmpeg manualmente.")

if __name__ == "__main__":
    main()
