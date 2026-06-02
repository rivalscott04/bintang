@php
    $statePath = $getStatePath();
    $lockedTokens = $getLockedPlaceholders();
@endphp

<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    <div
        wire:ignore
        class="fi-wa-template-editor-wrap"
        x-data="{
            state: $wire.{{ $applyStateBindingModifiers("\$entangle('{$statePath}')") }},
            lockedTokens: @js($lockedTokens),
            lastValidTemplate: '',
            syncing: false,

            init() {
                const template = this.normalizeTemplate(this.state || '');
                this.lastValidTemplate = template;
                this.renderTemplate(template);
                this.commit(template, false);

                this.$watch('state', (value) => {
                    if (this.syncing) {
                        return;
                    }

                    const next = this.normalizeTemplate(value || '');

                    if (next === this.serialize()) {
                        return;
                    }

                    this.lastValidTemplate = next;
                    this.renderTemplate(next);
                });
            },

            normalizeTemplate(template) {
                return String(template ?? '').replace(/\r\n/g, '\n');
            },

            renderTemplate(template) {
                const editor = this.$refs.editor;
                editor.innerHTML = '';

                template.split(/(\{nama\}|\{sales\}|\{proyek\}|\{klaster_line\})/).forEach((part) => {
                    if (part === '') {
                        return;
                    }

                    if (this.lockedTokens.includes(part)) {
                        const token = document.createElement('span');
                        token.className = 'fi-wa-token';
                        token.contentEditable = 'false';
                        token.dataset.token = part;
                        token.setAttribute('aria-hidden', 'true');
                        token.textContent = part;
                        editor.appendChild(token);

                        return;
                    }

                    editor.appendChild(document.createTextNode(part));
                });
            },

            serialize() {
                let output = '';
                const editor = this.$refs.editor;

                const walk = (nodes) => {
                    nodes.forEach((node) => {
                        if (node.nodeType === Node.TEXT_NODE) {
                            output += node.textContent ?? '';

                            return;
                        }

                        if (node.nodeType !== Node.ELEMENT_NODE) {
                            return;
                        }

                        if (node.classList?.contains('fi-wa-token')) {
                            output += node.dataset.token ?? '';

                            return;
                        }

                        if (node.nodeName === 'BR') {
                            output += '\n';

                            return;
                        }

                        if (node.nodeName === 'DIV' || node.nodeName === 'P') {
                            walk(node.childNodes);
                            output += '\n';
                        }
                    });
                };

                walk(editor.childNodes);

                return output.replace(/\n+$/, '');
            },

            hasAllTokens(template) {
                return this.lockedTokens.every((token) => template.includes(token));
            },

            commit(template, markSync = true) {
                if (markSync) {
                    this.syncing = true;
                }

                this.state = template;

                if (markSync) {
                    this.$nextTick(() => {
                        this.syncing = false;
                    });
                }
            },

            onInput() {
                const template = this.serialize();

                if (! this.hasAllTokens(template)) {
                    this.renderTemplate(this.lastValidTemplate);

                    return;
                }

                this.lastValidTemplate = template;
                this.commit(template);
            },

            onBeforeInput(event) {
                const deleteTypes = [
                    'deleteContentBackward',
                    'deleteContentForward',
                    'deleteByCut',
                    'deleteByDrag',
                    'deleteContent',
                ];

                if (! deleteTypes.includes(event.inputType)) {
                    return;
                }

                const selection = window.getSelection();

                if (! selection || selection.rangeCount === 0) {
                    return;
                }

                const tokens = this.$refs.editor.querySelectorAll('.fi-wa-token');

                for (const token of tokens) {
                    if (selection.containsNode(token, true)) {
                        event.preventDefault();

                        return;
                    }
                }
            },

            onPaste(event) {
                event.preventDefault();
                const text = event.clipboardData?.getData('text/plain') ?? '';
                document.execCommand('insertText', false, text);
            },

            onKeydown(event) {
                if (event.key !== 'Enter' || event.shiftKey) {
                    return;
                }

                event.preventDefault();
                document.execCommand('insertLineBreak');
            },
        }"
        x-init="init()"
    >
        <div
            x-ref="editor"
            class="fi-wa-template-editor"
            contenteditable="true"
            role="textbox"
            aria-multiline="true"
            spellcheck="false"
            @beforeinput="onBeforeInput($event)"
            @input="onInput()"
            @paste="onPaste($event)"
            @keydown="onKeydown($event)"
        ></div>
    </div>
</x-dynamic-component>
