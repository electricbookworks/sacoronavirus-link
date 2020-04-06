SHELL := /bin/bash
DEST=build/sacoronavirus-link
DESTPARENT=$(shell dirname $(DEST))

dist/coronavirus-link.js: index.js
	gulp

.PHONY: wordpress
wordpress:
	rm -rf $(DEST) || true
	mkdir -p $(DEST) || true
	mkdir -p $(DEST)/img || true
	mkdir -p $(DEST)/dist || true
	for f in 'sacoronavirus-link.php' \
		'dist/sacoronavirus-link.min.js' \
		 'img/icon.svg'; do \
		cp $$f $(DEST)/$$f; \
	done
	cp README-plugin.md $(DEST)/README.md
	cp README-plugin.txt $(DEST)/readme.txt
	pushd $(DESTPARENT); \
	zip -r ../sacoronavirus-link.zip sacoronavirus-link; \
	popd


