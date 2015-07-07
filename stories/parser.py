#!/usr/bin/env python3
#
from pdfminer.pdfinterp import PDFResourceManager, process_pdf
from pdfminer.converter import TextConverter, XMLConverter
from pdfminer.layout import LAParams
from io import StringIO
import json

def convert_pdf_to_txt(path):
    rsrcmgr = PDFResourceManager()
    retstr = StringIO()
    codec = 'utf-8'
    laparams = LAParams()
    device = TextConverter(rsrcmgr, retstr, laparams=laparams)
    fp = open(path, 'rb')
    password = ""
    maxpages = 0
    caching = True
    pagenos=set()

    process_pdf(rsrcmgr, device, fp, pagenos, maxpages=maxpages, password=password,
                    caching=caching, check_extractable=True)

    text = retstr.getvalue()

    fp.close()
    device.close()
    retstr.close()
    return text


def extractToile():
	file = 'toile.pdf'

	title = ""
	author = ""

	story = {}

	txt = convert_pdf_to_txt(file)

	l = 0
	pos = ""
	for line in txt.split('\n\n'):
		line = line.replace('\n', ' ')
		print(line)

		if l == 0:
			title = line
		elif l == 1:
			author = line[4:]
		elif line.isdigit() or l == 2:
			pos = line
			story[pos] = []
		elif l > 2:
			story[pos].append(line)


		l += 1

	print("Title : %s" % title)
	print("Author : %s" % author)


	print(json.dumps(story, sort_keys=True, indent=4))

extractToile()