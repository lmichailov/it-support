"""Render caption-led product demos from fictional data, locally, without external services."""
from pathlib import Path
import math
import subprocess
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[1]
ASSETS=ROOT/'assets'
FONT=Path('C:/Windows/Fonts')
FPS=24
DURATION=30
BG='#102324'
PAPER='#f4f2e9'
LIME='#d5ef95'
MUTED='#b4c2bd'
CACHE={}

def font(size,bold=False,serif=False):
    key=(size,bold,serif)
    if key not in CACHE:
        name='georgia.ttf' if serif else ('segoeuib.ttf' if bold else 'segoeui.ttf')
        CACHE[key]=ImageFont.truetype(str(FONT/name),int(size))
    return CACHE[key]

def wrap(draw,text,f,width):
    lines=[]
    for paragraph in text.split('\n'):
        line=''
        for word in paragraph.split():
            candidate=(line+' '+word).strip()
            if line and draw.textlength(candidate,font=f)>width:
                lines.append(line);line=word
            else:line=candidate
        lines.append(line)
    return lines

def text(draw,xy,value,size,color,width,bold=False,serif=False,spacing=1.25):
    x,y=xy;f=font(size,bold,serif)
    for line in wrap(draw,value,f,width):
        draw.text((x,y),line,font=f,fill=color)
        y+=int(size*spacing)
    return y

SCENES=[
 ('WENIGER TIPPARBEIT','Deine Antwort.\nNur leichter.','Ein kleiner E-Mail-Helfer aus Lilias digitaler Werkstatt.', 'intro'),
 ('01 / E-MAIL EINLESEN','Die Nachricht\nist schon da.','Liest den geöffneten Nachrichtenbereich im neuen Outlook unter Windows.', 'mail'),
 ('02 / ANTWORT DIKTIEREN','Sag, was du\nsagen möchtest.','Ansprache, Ton und Aufbau auswählen. Deinen Entwurf selbst bestimmen.', 'voice'),
 ('03 / DATEN SELBST PRÜFEN','Du entscheidest,\nwas rausgeht.','Vertrauliche Stellen markieren. Die lokale Zuordnung bleibt auf deinem Rechner.', 'privacy'),
 ('04 / ENTWURF KONTROLLIEREN','Deine Worte.\nEin fertiger Entwurf.','Bekannte Platzhalter werden lokal zurückgesetzt. Du prüfst und kopierst die Antwort.', 'draft'),
 ('PERSÖNLICHE IT-UNTERSTÜTZUNG','Neugierig?\nLass es dir zeigen.','Vorführung anfragen. Lilia hilft dir beim Einstieg.', 'cta'),
]

def scene_image(index,w,h):
    portrait=h>w
    im=Image.new('RGB',(w,h),BG);d=ImageDraw.Draw(im)
    pad=78 if portrait else 100
    d.ellipse((w-270,-130,w+190,330),fill='#173a38')
    text(d,(pad,92 if portrait else 60),'LILIA / IT & DIGITALE HELFER',26 if portrait else 24,LIME,w-2*pad,bold=True)
    tag,title,sub,kind=SCENES[index]
    title_y=210 if portrait else 200
    text(d,(pad,title_y),tag,24 if portrait else 22,LIME,w-2*pad,bold=True)
    title_size=82 if portrait else 88
    title_width=w-2*pad if portrait else 820
    end=text(d,(pad,title_y+58),title,title_size,PAPER,title_width,bold=True,spacing=1.12)
    text(d,(pad,end+30),sub,33 if portrait else 31,MUTED,title_width)
    if portrait: x,y,cw,ch=pad,710,w-2*pad,800
    else: x,y,cw,ch=1010,180,800,660
    d.rounded_rectangle((x,y,x+cw,y+ch),radius=30,fill=PAPER)
    d.rounded_rectangle((x+24,y+24,x+cw-24,y+75),radius=15,fill='#e3e9dd')
    text(d,(x+45,y+34),'OUTLOOK AI ASSISTANT',21,'#234441',cw-90,bold=True)
    ix=x+45;iy=y+110;iw=cw-90
    if kind in ('intro','mail'):
        iy=text(d,(ix,iy),'Eine Nachricht. Eine klare Antwort.',39,'#173332',iw,bold=True)
        iy=text(d,(ix,iy+24),'Hallo Lilia,\npasst dir unser Termin am Freitag um 10 Uhr?\nViele Grüße\nErika Beispiel',30,'#304e49',iw,spacing=1.5)
        d.rounded_rectangle((ix,y+ch-120,x+cw-45,y+ch-50),radius=15,fill='#195e53')
        text(d,(ix+24,y+ch-106),'Geöffnete E-Mail einlesen',27,'white',iw-48,bold=True)
    elif kind=='voice':
        iy=text(d,(ix,iy),'Deine Anweisung',35,'#173332',iw,bold=True)
        iy=text(d,(ix,iy+28),'„Bitte freundlich zusagen und mich für die Einladung bedanken.“',37,'#234441',iw,serif=True,spacing=1.35)
        iy+=48
        for label,value in [('Ansprache','Sie'),('Ton','Freundlich'),('Aufbau','Vollständige E-Mail')]:
            text(d,(ix,iy),label,25,'#566a61',iw)
            d.rounded_rectangle((ix+200,iy-4,x+cw-45,iy+45),radius=10,fill='#d5ef95')
            text(d,(ix+218,iy+1),value,24,'#173332',iw-218,bold=True)
            iy+=75
    elif kind=='privacy':
        iy=text(d,(ix,iy),'Lokale Datenvorschau',35,'#173332',iw,bold=True)
        iy=text(d,(ix,iy+25),'Original bleibt lokal:',25,'#566a61',iw)
        iy=text(d,(ix,iy+10),'Erika Beispiel',36,'#173332',iw,bold=True)
        d.rounded_rectangle((ix,iy+15,x+cw-45,iy+84),radius=12,fill='#d5ef95')
        text(d,(ix+18,iy+32),'→ UNKENNTLICH1 …',31,'#173332',iw-36,bold=True)
        iy=text(d,(ix,iy+120),'An OpenAI geht erst nach deiner Freigabe der geprüfte Text mit Platzhaltern.',29,'#304e49',iw)
        text(d,(ix,iy+28),'Die Erkennung ist unvollständig. Deshalb selbst prüfen.',24,'#8b4d21',iw)
    elif kind=='draft':
        text(d,(ix,iy),'Guten Tag Erika Beispiel,\n\nvielen Dank für die Einladung. Den Termin am Freitag um 10 Uhr nehme ich gerne wahr.\n\nMit freundlichen Grüßen\nLilia',31 if portrait else 28,'#234441',iw,spacing=1.4)
    else:
        iy=text(d,(ix,iy),'IT darf sich einfach anfühlen.',48,'#173332',iw,bold=True)
        iy=text(d,(ix,iy+35),'Persönliche Unterstützung.\nKleine digitale Helfer.\nVerständlich erklärt.',34,'#304e49',iw,spacing=1.55)
        d.rounded_rectangle((ix,y+ch-130,x+cw-45,y+ch-50),radius=16,fill='#195e53')
        text(d,(ix+25,y+ch-112),'Vorführung anfragen',32,'white',iw-50,bold=True)
    footer_y=1650 if portrait else 900
    text(d,(pad,footer_y),'Illustrative Produktdemo · ausschließlich Testdaten',23 if portrait else 21,MUTED,w-2*pad)
    text(d,(pad,footer_y+45),'KI-Formulierung über OpenAI nach Freigabe.\nEntwicklungsprojekt · keine vollständige Anonymisierung.',22 if portrait else 21,MUTED,w-2*pad)
    return im

def render(name,w,h):
    images=[scene_image(i,w,h) for i in range(len(SCENES))]
    images[3].save(ASSETS/('poster-hochkant.jpg' if h>w else 'poster-web.jpg'),quality=90)
    target=ASSETS/name
    command=['ffmpeg','-hide_banner','-loglevel','error','-y','-f','rawvideo','-vcodec','rawvideo','-pix_fmt','rgb24','-s',f'{w}x{h}','-r',str(FPS),'-i','-',
             '-f','lavfi','-i','anullsrc=r=48000:cl=stereo','-c:v','libx264','-preset','fast','-crf','22','-pix_fmt','yuv420p',
             '-c:a','aac','-b:a','96k','-t',str(DURATION),'-movflags','+faststart',str(target)]
    process=subprocess.Popen(command,stdin=subprocess.PIPE)
    try:
        for frame in range(FPS*DURATION):
            moment=frame/FPS;index=min(5,int(moment/5));phase=moment%5
            im=images[index].copy()
            if phase<0.3 and index:
                im=Image.blend(images[index-1],im,phase/0.3)
            draw=ImageDraw.Draw(im)
            pad=78 if h>w else 100
            draw.rounded_rectangle((pad,h-75,w-pad,h-67),radius=4,fill='#35524b')
            progress=(w-2*pad)*(frame+1)/(FPS*DURATION)
            draw.rounded_rectangle((pad,h-75,pad+max(8,progress),h-67),radius=4,fill=LIME)
            process.stdin.write(im.tobytes())
            if frame%(FPS*5)==0:print(name,'scene',index+1,'/6',flush=True)
    finally:
        process.stdin.close()
    if process.wait()!=0:raise RuntimeError('ffmpeg rendering failed')
    print('DONE',target.name,target.stat().st_size,flush=True)

if __name__=='__main__':
    ASSETS.mkdir(exist_ok=True)
    render('demo-instagram.mp4',1080,1920)
    render('demo-web.mp4',1920,1080)
