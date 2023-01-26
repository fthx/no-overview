NAME = no-overview
UUID = $(NAME)@fthx
UNDERLINE = \033[4m
NUNDERLINE = \033[24m
NORMAL = \033[0m
GREEN = \033[0;32m



.PHONY: build instal remove clean enable

build: clean
	mkdir -p build/
	gnome-extensions pack -f \
		--extra-source=metadata.json \
		--extra-source=extension.js \
		-o ./build/


clean:
	rm -rf build/*


install: build remove
	gnome-extensions install -f build/$(UUID).shell-extension.zip
	echo -en "$(GREEN)Extension installed \nPlease reboot GNOME and enable his by using $(UNDERLINE)gnome-settings$(NUNDERLINE) or $(UNDERLINE)make enable$(NUNDERLINE) commands$(NORMAL)\n"

remove: 
	rm -rf $(HOME)/.local/share/gnome-shell/extensions/$(UUID)

enable: 
	gnome-extensions enable $(UUID)
