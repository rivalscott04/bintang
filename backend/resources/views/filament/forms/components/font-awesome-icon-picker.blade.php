@php
    $statePath = $getStatePath();
    $icons = $getIcons();
@endphp

<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    <div
        class="fi-fa-picker"
        x-data="{
            state: $wire.{{ $applyStateBindingModifiers("\$entangle('{$statePath}')") }},
            search: '',
            open: false,
            icons: @js($icons),
            get filtered() {
                const q = this.search.trim().toLowerCase();
                if (! q) {
                    return this.icons;
                }
                return this.icons.filter((icon) => {
                    if (icon.label.toLowerCase().includes(q)) {
                        return true;
                    }
                    if (icon.value.toLowerCase().includes(q)) {
                        return true;
                    }
                    return icon.keywords.some((keyword) => keyword.toLowerCase().includes(q));
                });
            },
            get selected() {
                return this.icons.find((icon) => icon.value === this.state) ?? null;
            },
            select(value) {
                this.state = value;
                this.close();
            },
            clear() {
                this.state = null;
                this.close();
            },
            openPicker() {
                this.open = true;
                document.body.classList.add('fi-fa-picker-open');
                this.$nextTick(() => this.$refs.search?.focus());
            },
            close() {
                this.open = false;
                this.search = '';
                document.body.classList.remove('fi-fa-picker-open');
            },
        }"
        x-on:keydown.escape.window="close()"
    >
        <button
            type="button"
            class="fi-fa-picker__trigger"
            x-on:click="openPicker()"
        >
            <span class="fi-fa-picker__trigger-icon">
                <template x-if="state">
                    <i x-bind:class="state" aria-hidden="true"></i>
                </template>
                <template x-if="! state">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:1.125rem;height:1.125rem" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                    </svg>
                </template>
            </span>
            <span class="fi-fa-picker__trigger-text">
                <span
                    class="fi-fa-picker__trigger-label"
                    x-text="selected ? selected.label : @js(__('Pilih ikon'))"
                ></span>
                <span
                    class="fi-fa-picker__trigger-hint"
                    x-text="selected ? @js(__('Klik untuk ganti')) : @js(__('Klik untuk pilih ikon'))"
                ></span>
            </span>
        </button>

        <template x-teleport="body">
            <div
                x-show="open"
                x-cloak
                class="fi-fa-picker__overlay"
                style="position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem"
                role="dialog"
                aria-modal="true"
                aria-label="{{ __('Pilih ikon') }}"
            >
                <button
                    type="button"
                    class="fi-fa-picker__backdrop"
                    style="position:absolute;inset:0;border:0;cursor:pointer"
                    x-on:click="close()"
                    aria-label="{{ __('Tutup') }}"
                ></button>

                <div
                    class="fi-fa-picker__dialog"
                    style="position:relative;z-index:1;width:100%;max-width:26rem;max-height:min(32rem,85vh);display:flex;flex-direction:column;overflow:hidden"
                    x-on:click.stop
                    x-trap.noscroll="open"
                >
                    <div class="fi-fa-picker__header">
                        <h3 class="fi-fa-picker__title">{{ __('Pilih ikon') }}</h3>
                        <button
                            type="button"
                            class="fi-fa-picker__close"
                            x-on:click="close()"
                            aria-label="{{ __('Tutup') }}"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="width:1.25rem;height:1.25rem" aria-hidden="true">
                                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                            </svg>
                        </button>
                    </div>

                    <div class="fi-fa-picker__search-wrap">
                        <input
                            type="search"
                            x-ref="search"
                            x-model="search"
                            class="fi-fa-picker__search"
                            placeholder="{{ __('Cari… kamar, parkir, vr') }}"
                            x-on:keydown.stop
                        />
                    </div>

                    <div class="fi-fa-picker__meta">
                        <span x-text="`${filtered.length} ikon`"></span>
                        <button
                            type="button"
                            class="fi-fa-picker__clear-link"
                            x-show="state"
                            x-on:click="clear()"
                        >
                            {{ __('Hapus pilihan') }}
                        </button>
                    </div>

                    <div class="fi-fa-picker__grid-wrap">
                        <p
                            x-show="filtered.length === 0"
                            class="fi-fa-picker__empty"
                        >
                            {{ __('Tidak ada ikon yang cocok.') }}
                        </p>

                        <div
                            x-show="filtered.length > 0"
                            class="fi-fa-picker__grid"
                            style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0.5rem"
                            role="listbox"
                        >
                            <template x-for="icon in filtered" :key="icon.value">
                                <button
                                    type="button"
                                    class="fi-fa-picker__item"
                                    role="option"
                                    x-bind:class="state === icon.value ? 'fi-fa-picker__item--selected' : ''"
                                    x-bind:aria-selected="state === icon.value"
                                    x-on:click="select(icon.value)"
                                >
                                    <i x-bind:class="icon.value" aria-hidden="true"></i>
                                    <span class="fi-fa-picker__item-label" x-text="icon.label"></span>
                                </button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</x-dynamic-component>
