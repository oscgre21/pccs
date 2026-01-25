#!/usr/bin/env python3
"""
=============================================================================
TRANSCRIPTOR Y SUBTITULADOR DE VIDEO AUTOMATICO
=============================================================================

Este script transcribe el audio de un video y genera subtítulos palabra por
palabra con estilo personalizado.

USO:
    python transcribe_video.py <video> [opciones]

EJEMPLOS:
    # Transcribir en el idioma original del video
    python transcribe_video.py mi_video.mp4

    # Transcribir y traducir al inglés
    python transcribe_video.py mi_video.mp4 --translate en

    # Transcribir y traducir al español
    python transcribe_video.py mi_video.mp4 --translate es

    # Usar modelo más preciso (medium o large)
    python transcribe_video.py mi_video.mp4 --model medium

    # Personalizar tamaño de fuente
    python transcribe_video.py mi_video.mp4 --font-size 12

REQUISITOS:
    - Docker instalado y funcionando
    - FFmpeg instalado

MODELOS DISPONIBLES:
    - tiny   : Más rápido, menos preciso (~1GB RAM)
    - base   : Balance básico (~1GB RAM)
    - small  : Mejor precisión (~2GB RAM)
    - medium : Alta precisión (~5GB RAM) [RECOMENDADO]
    - large  : Máxima precisión (~10GB RAM)

=============================================================================
"""

import subprocess
import os
import sys
import argparse
import re
import json

# Traducciones básicas español <-> inglés
TRANSLATIONS = {
    'es_to_en': {
        # Frases comunes que pueden necesitar ajuste
    },
    'en_to_es': {
        # Frases comunes que pueden necesitar ajuste
    }
}

def print_banner():
    """Muestra el banner del script"""
    print("=" * 70)
    print("   TRANSCRIPTOR Y SUBTITULADOR DE VIDEO AUTOMATICO")
    print("=" * 70)

def check_dependencies():
    """Verifica que Docker y FFmpeg estén instalados"""
    print("\n[1/6] Verificando dependencias...")

    # Check Docker
    try:
        result = subprocess.run(["docker", "--version"], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"  ✓ Docker: {result.stdout.strip()}")
        else:
            raise Exception("Docker no disponible")
    except FileNotFoundError:
        print("  ✗ Docker no está instalado")
        print("    Instala Docker desde: https://docker.com")
        return False

    # Check if Docker is running
    try:
        result = subprocess.run(["docker", "ps"], capture_output=True, text=True)
        if result.returncode != 0:
            print("  ✗ Docker no está corriendo. Inicia Docker Desktop.")
            return False
    except:
        print("  ✗ No se puede conectar a Docker")
        return False

    # Check FFmpeg
    try:
        result = subprocess.run(["ffmpeg", "-version"], capture_output=True, text=True)
        if result.returncode == 0:
            version = result.stdout.split('\n')[0]
            print(f"  ✓ FFmpeg: {version}")
        else:
            raise Exception("FFmpeg no disponible")
    except FileNotFoundError:
        print("  ✗ FFmpeg no está instalado")
        print("    Instala con: brew install ffmpeg")
        return False

    return True

def transcribe_with_docker(video_path, model="medium", language=None):
    """Transcribe el video usando Whisper en Docker"""
    print(f"\n[2/6] Transcribiendo video con Whisper (modelo: {model})...")
    print("      Esto puede tomar varios minutos...")

    video_dir = os.path.dirname(os.path.abspath(video_path))
    video_name = os.path.basename(video_path)

    # Construir comando de whisper
    whisper_cmd = f"whisper /data/{video_name} --model {model} --output_format json --output_dir /data"
    if language:
        whisper_cmd += f" --language {language}"

    # Comando Docker completo
    docker_cmd = [
        "docker", "run", "--rm",
        "-v", f"{video_dir}:/data",
        "--entrypoint", "/bin/bash",
        "python:3.10",
        "-c",
        f"apt-get update -qq && apt-get install -y -qq ffmpeg > /dev/null 2>&1 && pip install -q openai-whisper && {whisper_cmd}"
    ]

    try:
        result = subprocess.run(docker_cmd, capture_output=True, text=True, timeout=1800)

        if result.returncode == 0:
            print("  ✓ Transcripción completada")

            # Buscar el archivo JSON generado
            base_name = os.path.splitext(video_name)[0]
            json_path = os.path.join(video_dir, f"{base_name}.json")

            if os.path.exists(json_path):
                with open(json_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                return data
            else:
                # Buscar archivo SRT como alternativa
                srt_path = os.path.join(video_dir, f"{base_name}.srt")
                if os.path.exists(srt_path):
                    return parse_srt_file(srt_path)

            print("  ✗ No se encontró el archivo de transcripción")
            return None
        else:
            print(f"  ✗ Error en transcripción: {result.stderr[-500:]}")
            return None

    except subprocess.TimeoutExpired:
        print("  ✗ Timeout: La transcripción tardó demasiado")
        return None
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return None

def parse_srt_file(srt_path):
    """Parsea un archivo SRT y devuelve estructura similar a Whisper JSON"""
    with open(srt_path, 'r', encoding='utf-8') as f:
        content = f.read()

    segments = []
    blocks = content.strip().split('\n\n')

    for block in blocks:
        lines = block.strip().split('\n')
        if len(lines) >= 3:
            time_line = lines[1]
            text = ' '.join(lines[2:])

            match = re.match(r'(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})', time_line)
            if match:
                start = int(match.group(1))*3600 + int(match.group(2))*60 + int(match.group(3)) + int(match.group(4))/1000
                end = int(match.group(5))*3600 + int(match.group(6))*60 + int(match.group(7)) + int(match.group(8))/1000
                segments.append({
                    'start': start,
                    'end': end,
                    'text': text
                })

    return {'segments': segments}

def translate_text(text, target_lang):
    """Traduce texto usando la API de traducción de Google (sin clave)"""
    # Implementación simple usando googletrans o similar
    # Por ahora usamos una traducción básica
    try:
        from deep_translator import GoogleTranslator
        translator = GoogleTranslator(source='auto', target=target_lang)
        return translator.translate(text)
    except ImportError:
        # Si no está instalado deep_translator, intentar con requests
        try:
            import urllib.request
            import urllib.parse

            # Usar la API gratuita de LibreTranslate o similar
            url = "https://translate.googleapis.com/translate_a/single"
            params = {
                'client': 'gtx',
                'sl': 'auto',
                'tl': target_lang,
                'dt': 't',
                'q': text
            }

            full_url = f"{url}?{urllib.parse.urlencode(params)}"
            req = urllib.request.Request(full_url, headers={'User-Agent': 'Mozilla/5.0'})

            with urllib.request.urlopen(req, timeout=10) as response:
                result = json.loads(response.read().decode('utf-8'))
                translated = ''.join([item[0] for item in result[0] if item[0]])
                return translated
        except Exception as e:
            print(f"    Advertencia: No se pudo traducir automáticamente: {e}")
            return text

def translate_segments(segments, target_lang):
    """Traduce todos los segmentos a un idioma destino"""
    print(f"\n[3/6] Traduciendo al {target_lang}...")

    translated_segments = []
    total = len(segments)

    for i, seg in enumerate(segments):
        translated_text = translate_text(seg['text'], target_lang)
        translated_segments.append({
            'start': seg['start'],
            'end': seg['end'],
            'text': translated_text
        })

        # Mostrar progreso
        progress = int((i + 1) / total * 100)
        print(f"\r  Traduciendo: {progress}% ({i+1}/{total})", end='', flush=True)

    print("\n  ✓ Traducción completada")
    return translated_segments

def format_srt_time(seconds):
    """Convierte segundos a formato SRT (HH:MM:SS,mmm)"""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds % 1) * 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"

def create_word_by_word_srt(segments, output_path):
    """Crea archivo SRT con subtítulos palabra por palabra"""
    print("\n[4/6] Generando subtítulos palabra por palabra...")

    srt_lines = []
    counter = 1

    for seg in segments:
        words = seg['text'].strip().split()
        if not words:
            continue

        duration = seg['end'] - seg['start']
        word_duration = duration / len(words)

        for i, word in enumerate(words):
            word_start = seg['start'] + (i * word_duration)
            word_end = word_start + word_duration

            srt_lines.append(f"{counter}")
            srt_lines.append(f"{format_srt_time(word_start)} --> {format_srt_time(word_end)}")
            srt_lines.append(word)
            srt_lines.append("")
            counter += 1

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(srt_lines))

    print(f"  ✓ Archivo SRT creado: {output_path}")
    print(f"    Total de subtítulos: {counter - 1} palabras")

    return output_path

def create_full_srt(segments, output_path):
    """Crea archivo SRT con subtítulos completos (frases)"""
    srt_lines = []

    for i, seg in enumerate(segments, 1):
        srt_lines.append(f"{i}")
        srt_lines.append(f"{format_srt_time(seg['start'])} --> {format_srt_time(seg['end'])}")
        srt_lines.append(seg['text'].strip())
        srt_lines.append("")

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(srt_lines))

    return output_path

def add_subtitles_to_video(input_video, srt_file, output_video, font_size=8):
    """Agrega subtítulos al video con estilo personalizado"""
    print(f"\n[5/6] Incrustando subtítulos en el video...")

    # Estilo de subtítulos
    subtitle_style = (
        f"FontName=Arial,"
        f"FontSize={font_size},"
        "PrimaryColour=&HFFFFFF,"
        "OutlineColour=&H000000,"
        "BackColour=&H00000000,"
        "Bold=1,"
        "Outline=1,"
        "Shadow=1,"
        "Alignment=2,"
        "MarginV=50"
    )

    # Obtener el nombre del archivo SRT relativo
    srt_name = os.path.basename(srt_file)
    video_dir = os.path.dirname(os.path.abspath(input_video))

    # Comando FFmpeg
    cmd = [
        "ffmpeg", "-y",
        "-i", input_video,
        "-vf", f"subtitles={srt_name}:force_style='{subtitle_style}'",
        "-c:a", "copy",
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "23",
        output_video
    ]

    try:
        # Cambiar al directorio del video para que FFmpeg encuentre el SRT
        original_dir = os.getcwd()
        os.chdir(video_dir)

        result = subprocess.run(cmd, capture_output=True, text=True)

        os.chdir(original_dir)

        if result.returncode == 0:
            print(f"  ✓ Video creado: {output_video}")
            return True
        else:
            print(f"  ✗ Error FFmpeg: {result.stderr[-300:]}")
            return False

    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False

def cleanup_temp_files(video_dir, base_name):
    """Limpia archivos temporales generados por Whisper"""
    extensions = ['.json', '.tsv', '.txt', '.vtt']
    for ext in extensions:
        temp_file = os.path.join(video_dir, f"{base_name}{ext}")
        if os.path.exists(temp_file):
            os.remove(temp_file)

def main():
    print_banner()

    # Configurar argumentos
    parser = argparse.ArgumentParser(
        description='Transcribe y subtitula videos automáticamente',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Ejemplos:
  %(prog)s video.mp4                    # Transcribir en idioma original
  %(prog)s video.mp4 --translate en     # Traducir al inglés
  %(prog)s video.mp4 --translate es     # Traducir al español
  %(prog)s video.mp4 --model large      # Usar modelo más preciso
  %(prog)s video.mp4 --font-size 12     # Fuente más grande
        """
    )

    parser.add_argument('video', help='Ruta al archivo de video')
    parser.add_argument('--translate', '-t',
                        help='Idioma destino para traducir (ej: en, es, fr, de, pt)')
    parser.add_argument('--model', '-m', default='medium',
                        choices=['tiny', 'base', 'small', 'medium', 'large'],
                        help='Modelo de Whisper a usar (default: medium)')
    parser.add_argument('--font-size', '-f', type=int, default=8,
                        help='Tamaño de fuente para subtítulos (default: 8)')
    parser.add_argument('--language', '-l',
                        help='Idioma del audio original (auto-detectado si no se especifica)')
    parser.add_argument('--keep-temp', action='store_true',
                        help='Mantener archivos temporales')
    parser.add_argument('--full-sentences', action='store_true',
                        help='Usar frases completas en vez de palabra por palabra')

    args = parser.parse_args()

    # Verificar que el video existe
    if not os.path.exists(args.video):
        print(f"\n✗ Error: No se encontró el archivo: {args.video}")
        sys.exit(1)

    video_path = os.path.abspath(args.video)
    video_dir = os.path.dirname(video_path)
    video_name = os.path.basename(video_path)
    base_name = os.path.splitext(video_name)[0]

    print(f"\nVideo: {video_name}")
    print(f"Modelo: {args.model}")
    print(f"Traducir a: {args.translate if args.translate else 'No (idioma original)'}")
    print(f"Tamaño fuente: {args.font_size}")

    # Verificar dependencias
    if not check_dependencies():
        sys.exit(1)

    # Transcribir
    transcription = transcribe_with_docker(
        video_path,
        model=args.model,
        language=args.language
    )

    if not transcription or 'segments' not in transcription:
        print("\n✗ Error: No se pudo transcribir el video")
        sys.exit(1)

    segments = transcription['segments']
    print(f"    Segmentos encontrados: {len(segments)}")

    # Traducir si se especificó
    if args.translate:
        segments = translate_segments(segments, args.translate)
        suffix = f"_{args.translate}"
    else:
        suffix = ""
        print("\n[3/6] Traducción: Omitida (usando idioma original)")

    # Crear archivo SRT completo
    full_srt_path = os.path.join(video_dir, f"{base_name}{suffix}_full.srt")
    create_full_srt(segments, full_srt_path)

    # Crear SRT palabra por palabra o frases completas
    if args.full_sentences:
        srt_path = full_srt_path
    else:
        srt_path = os.path.join(video_dir, f"{base_name}{suffix}_palabras.srt")
        create_word_by_word_srt(segments, srt_path)

    # Crear video con subtítulos
    output_video = os.path.join(video_dir, f"{base_name}{suffix}_subtitulado.mp4")
    success = add_subtitles_to_video(
        video_path,
        srt_path,
        output_video,
        font_size=args.font_size
    )

    # Limpiar archivos temporales
    if not args.keep_temp:
        print("\n[6/6] Limpiando archivos temporales...")
        cleanup_temp_files(video_dir, base_name)
        print("  ✓ Limpieza completada")
    else:
        print("\n[6/6] Manteniendo archivos temporales")

    # Resumen final
    print("\n" + "=" * 70)
    if success:
        print("✅ PROCESO COMPLETADO EXITOSAMENTE")
        print("=" * 70)
        print(f"\nArchivos generados:")
        print(f"  📄 SRT completo:    {os.path.basename(full_srt_path)}")
        if not args.full_sentences:
            print(f"  📄 SRT palabras:    {os.path.basename(srt_path)}")
        print(f"  🎬 Video final:     {os.path.basename(output_video)}")

        # Mostrar tamaño del video
        if os.path.exists(output_video):
            size_mb = os.path.getsize(output_video) / (1024 * 1024)
            print(f"\n  Tamaño del video: {size_mb:.1f} MB")
    else:
        print("❌ ERROR: No se pudo completar el proceso")
        print("=" * 70)
        sys.exit(1)

if __name__ == "__main__":
    main()
