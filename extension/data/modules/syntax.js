function syntax() {
// syntax highlighter with ACE, by creesch

    var self = new TB.Module('Syntax Highlighter');
    self.shortname = 'Syntax';

    self.settings['enabled']['default'] = true;

    self.register_setting('enableWordWrap', {
        'type': 'boolean',
        'default': true,
        'title': 'Enable word wrap in editor'
    });
    self.register_setting('selectedTheme', {
        'type': 'syntaxTheme',
        'default': 'monokai',
        'title': 'Syntax highlight theme selection'
    });

    self.settings['enabled']['default'] = true; // on by default

// we reference this from tbobject for settings generation
    self.themeSelect = '\
<select id="theme_selector">\
    <option value="3024-day">3024-day</option>\
    <option value="3024-night">3024-night</option>\
    <option value="abcdef">abcdef</option>\
    <option value="ambiance">ambiance</option>\
    <option value="base16-dark">base16-dark</option>\
    <option value="base16-light">base16-light</option>\
    <option value="bespin">bespin</option>\
    <option value="blackboard">blackboard</option>\
    <option value="cobalt">cobalt</option>\
    <option value="colorforth">colorforth</option>\
    <option value="dracula">dracula</option>\
    <option value="eclipse">eclipse</option>\
    <option value="elegant">elegant</option>\
    <option value="erlang-dark">erlang-dark</option>\
    <option value="hopscotch">hopscotch</option>\
    <option value="icecoder">icecoder</option>\
    <option value="isotope">isotope</option>\
    <option value="lesser-dark">lesser-dark</option>\
    <option value="liquibyte">liquibyte</option>\
    <option value="material">material</option>\
    <option value="mbo">mbo</option>\
    <option value="mdn-like">mdn-like</option>\
    <option value="midnight">midnight</option>\
    <option value="monokai">monokai</option>\
    <option value="neat">neat</option>\
    <option value="neo">neo</option>\
    <option value="night">night</option>\
    <option value="panda-syntax">panda-syntax</option>\
    <option value="paraiso-dark">paraiso-dark</option>\
    <option value="paraiso-light">paraiso-light</option>\
    <option value="pastel-on-dark">pastel-on-dark</option>\
    <option value="railscasts">railscasts</option>\
    <option value="rubyblue">rubyblue</option>\
    <option value="seti">seti</option>\
    <option value="solarized dark">solarized dark</option>\
    <option value="solarized light">solarized light</option>\
    <option value="the-matrix">the-matrix</option>\
    <option value="tomorrow-night-bright">tomorrow-night-bright</option>\
    <option value="tomorrow-night-eighties">tomorrow-night-eighties</option>\
    <option value="ttcn">ttcn</option>\
    <option value="twilight">twilight</option>\
    <option value="vibrant-ink">vibrant-ink</option>\
    <option value="xq-dark">xq-dark</option>\
    <option value="xq-light">xq-light</option>\
    <option value="yeti">yeti</option>\
    <option value="zenburn">zenburn</option>\
</select>\
';

    self.init = function () {
        var $body = $('body'),
            selectedTheme = this.setting('selectedTheme'),
            enableWordWrap = this.setting('enableWordWrap'),
            editor, session, textarea;

        //  Editor for css.
        if (location.pathname.match(/\/about\/stylesheet\/?/)) {
            var stylesheetEditor;

            // Class added to apply some specific css.
            $body.addClass('mod-syntax');
            // Theme selector, doesn't really belong here but gives people the opportunity to see how it looks with the css they want to edit.
            $('.sheets .col').before(this.themeSelect);

            $('#theme_selector').val(selectedTheme);

            // Here apply codeMirror to the text area, the each itteration allows us to use the javascript object as codemirror works with those.
            $('#stylesheet_contents').each(function(index, elem){

                // Editor setup.
                stylesheetEditor = CodeMirror.fromTextArea(elem, {
                    mode: 'text/css',
                    autoCloseBrackets: true,
                    lineNumbers: true,
                    theme: selectedTheme,
                    extraKeys: {
                        "Ctrl-Space": 'autocomplete',
                        "Alt-F": "findPersistent",
                        "F11": function(cm) {
                            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                        },
                        "Esc": function(cm) {
                            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                        }
                    },
                    lineWrapping: enableWordWrap
                });
            });

            // In order to make save buttons work we need to hijack  and replace them.
            var tbSyntaxButtonsHTML = '<div id="tb-syntax-buttons">{{save}} - {{preview}}</div>';

            var tbSyntaxButtons = TB.utils.template(tbSyntaxButtonsHTML, {
                'save': TB.ui.actionButton('save', 'tb-syntax-button-save'),
                'preview': TB.ui.actionButton('preview', 'tb-syntax-button-preview')
            });

            $body.find('.sheets .buttons').before(tbSyntaxButtons);

            // When the toolbox buttons are clicked we put back the content in the text area and click the now hidden original buttons.
            $body.delegate('.tb-syntax-button-save', 'click', function() {
                stylesheetEditor.save();
                $('.sheets .buttons .btn[name="save"]').click();
            });

            $body.delegate('.tb-syntax-button-preview', 'click', function() {
                stylesheetEditor.save();
                $('.sheets .buttons .btn[name="preview"]').click();
            });

            // Actually dealing with the theme dropdown is done here.
            $body.on('change keydown', '#theme_selector', function () {
                var thingy = $(this);
                setTimeout(function () {
                    stylesheetEditor.setOption("theme", thingy.val());
                }, 0);
            });
        }

        // Here we deal with automod and toolbox pages containing json.
        if (location.pathname.match(/\/wiki\/(edit|create)\/(config\/)?automoderator(-schedule)?\/?$/)
            || location.pathname.match(/\/wiki\/edit\/toolbox\/?$/)) {
            var miscEditor;
            var $editform = $('#editform');
            var defaultMode = 'default';

            if (location.pathname.match(/\/wiki\/(edit|create)\/(config\/)?automoderator(-schedule)?\/?$/)) {
                defaultMode = "text/x-yaml";
            }
            if (location.pathname.match(/\/wiki\/edit\/toolbox\/?$/)) {
                defaultMode = "application/json";
            }
            // Class added to apply some specific css.
            $body.addClass('mod-syntax');

            // We also need to remove some stuff RES likes to add.
            $body.find('.markdownEditor-wrapper, .RESBigEditorPop, .help-toggle').remove();

            // Theme selector, doesn't really belong here but gives people the opportunity to see how it looks with the css they want to edit.
            $editform.prepend(this.themeSelect);

            $('#theme_selector').val(selectedTheme);

            // Here apply codeMirror to the text area, the each itteration allows us to use the javascript object as codemirror works with those.
            $('#wiki_page_content').each(function(index, elem){

                // Editor setup.
                miscEditor = CodeMirror.fromTextArea(elem, {
                    mode: defaultMode,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                    theme: selectedTheme,
                    extraKeys: {
                        "Alt-F": "findPersistent",
                        "F11": function(cm) {
                            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                        },
                        "Esc": function(cm) {
                            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                        }
                    },
                    lineWrapping: enableWordWrap
                });
            });

            // In order to make save button work we need to hijack and replace it.
            $('#wiki_save_button').after(TB.ui.actionButton('save page', 'tb-ace-button-save-wiki'));


            // When the toolbox buttons is clicked we put back the content in the text area and click the now hidden original button.
            $body.delegate('.tb-ace-button-save-wiki', 'click', function() {
                textarea.val(session.getValue());
                $('#wiki_save_button').click();
            });

            $body.delegate('.tb-syntax-button-save', 'click', function() {
                miscEditor.save();
                $('.sheets .buttons .btn[name="save"]').click();
            });

            $body.delegate('.tb-syntax-button-preview', 'click', function() {
                miscEditor.save();
                $('.sheets .buttons .btn[name="preview"]').click();
            });

            // Actually dealing with the theme dropdown is done here.
            $body.on('change keydown', '#theme_selector', function () {
                var thingy = $(this);
                setTimeout(function () {
                    miscEditor.setOption("theme", thingy.val());
                }, 0);
            });

        }
    };

    TB.register_module(self);
}

(function() {
    window.addEventListener("TBModuleLoaded", function () {
        syntax();
    });
})();
