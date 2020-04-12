SHELL := /bin/bash
DEST=svnrepo/sacoronavirus-link
DESTPARENT=svnrepo

.PHONY: js
js: dist/sacoronavirus-link.js

dist/sacoronavirus-link.js: src/index.js
	set -e
	npm run build
	cp dist/index.js dist/sacoronavirus-link.js
	gulp

.PHONY: watchman
# Auto-build with watchman - not necessary, but useful
watchman:
	lateral watchman-add --dir src --name sacoronavirus-link-js --re "\.js$$" -- make js

.PHONY: wordpress
wordpress: js
	if [[ ! -d $(DESTPARENT) ]]; then mkdir $(DESTPARENT); fi
	if [[ ! -d $(DEST)/trunk ]]; then \
		pushd $(DESTPARENT); \
		svn checkout \
			https://plugins.svn.wordpress.org/sacoronavirus-link; \
		popd; \
	else \
		pushd $(DEST); svn update; popd; \
	fi
	mkdir -p $(DEST)/trunk || true
	mkdir -p $(DEST)/trunk/img || true
	mkdir -p $(DEST)/trunk/dist || true
	cp -R assets $(DEST)
	for f in 'sacoronavirus-link.php' \
		'dist/sacoronavirus-link.min.js' \
		 'img/icon.svg'; do \
		cp $$f $(DEST)/trunk/$$f; \
		echo cp $$f $(DEST)/trunk/$$f; \
	done
	cp README-plugin.md $(DEST)/trunk/README.md
	cp README-plugin.txt $(DEST)/trunk/readme.txt
	# Copy the trunk to here
	mkdir tmp || true
	rm -rf tmp/sacoronavirus-link || true
	cp -R $(DEST)/trunk tmp/sacoronavirus-link
	rm ../sacoronavirus-link.zip || true
	pushd tmp; \
	zip -r ../sacoronavirus-link.zip sacoronavirus-link; \
	popd
