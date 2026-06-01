@php
    $statePath = $getStatePath();
    $imageField = $field->getSitePlanImageField();
    $imageUrl = $field->resolveImageUrl($get, $record);
    $statusOptions = $field->getStatusOptions();
@endphp

<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    <div
        class="fi-site-plan-editor"
        x-data="sitePlanBlockEditor({
            state: $wire.{{ $applyStateBindingModifiers("\$entangle('{$statePath}')") }},
            imageUrl: @js($imageUrl),
            imageField: @js($imageField),
            statusOptions: @js($statusOptions),
        })"
    >
        <p class="fi-site-plan-editor__hint">
            {{ __('Seret kotak untuk memindahkan. Tarik sudut kanan bawah untuk mengubah ukuran. Klik dan tarik di area kosong untuk menambah blok baru.') }}
        </p>

        <template x-if="! imageUrl">
            <p class="fi-site-plan-editor__empty">
                {{ __('Upload gambar site plan di atas, lalu atur blok di sini.') }}
            </p>
        </template>

        <template x-if="imageUrl">
            <div class="fi-site-plan-editor__layout">
                <div class="fi-site-plan-editor__canvas-wrap">
                    <div
                        class="fi-site-plan-editor__canvas"
                        x-ref="canvas"
                        x-bind:class="{
                            'fi-site-plan-editor__canvas--drawing': mode === 'draw',
                            'fi-site-plan-editor__canvas--dragging': mode === 'drag' || mode === 'resize',
                        }"
                        x-on:pointerdown="onCanvasPointerDown($event)"
                        x-on:pointermove.window="onPointerMove($event)"
                        x-on:pointerup.window="onPointerUp($event)"
                        x-on:pointercancel.window="onPointerUp($event)"
                    >
                        <img
                            class="fi-site-plan-editor__image"
                            x-bind:src="imageUrl"
                            alt="{{ __('Site plan') }}"
                            draggable="false"
                        />

                        <template x-for="(block, index) in blocks" :key="blockKey(block, index)">
                            <div
                                class="fi-site-plan-editor__block"
                                x-bind:class="[
                                    'fi-site-plan-editor__block--' + (block.status || 'available'),
                                    selectedIndex === index ? 'fi-site-plan-editor__block--selected' : '',
                                ]"
                                x-bind:style="blockStyle(block)"
                                x-on:pointerdown.stop="onBlockPointerDown($event, index)"
                            >
                                <span class="fi-site-plan-editor__block-label" x-text="block.label || block.id"></span>
                                <div
                                    class="fi-site-plan-editor__resize"
                                    x-show="selectedIndex === index"
                                    x-on:pointerdown.stop="startResize($event, index)"
                                ></div>
                            </div>
                        </template>

                        <div
                            x-show="mode === 'draw' && drawPreview"
                            class="fi-site-plan-editor__draw-preview"
                            x-bind:style="drawPreviewStyle()"
                        ></div>
                    </div>
                </div>

                <aside class="fi-site-plan-editor__sidebar">
                    <div class="fi-site-plan-editor__toolbar">
                        <button type="button" class="fi-site-plan-editor__btn fi-site-plan-editor__btn--primary" x-on:click="addBlock()">
                            {{ __('Tambah blok') }}
                        </button>
                        <button
                            type="button"
                            class="fi-site-plan-editor__btn fi-site-plan-editor__btn--danger"
                            x-show="selectedIndex !== null"
                            x-on:click="removeSelected()"
                        >
                            {{ __('Hapus') }}
                        </button>
                    </div>

                    <ul class="fi-site-plan-editor__list" role="list">
                        <template x-for="(block, index) in blocks" :key="blockKey(block, index)">
                            <li>
                                <button
                                    type="button"
                                    class="fi-site-plan-editor__list-item"
                                    x-bind:class="selectedIndex === index ? 'fi-site-plan-editor__list-item--active' : ''"
                                    x-on:click="selectIndex(index)"
                                >
                                    <span class="fi-site-plan-editor__dot" x-bind:class="'fi-site-plan-editor__dot--' + (block.status || 'available')"></span>
                                    <span x-text="block.label || block.id || ('Blok ' + (index + 1))"></span>
                                </button>
                            </li>
                        </template>
                    </ul>

                    <template x-if="selectedIndex !== null && state[selectedIndex]">
                        <div class="fi-site-plan-editor__fields">
                            <div class="fi-site-plan-editor__field">
                                <label>{{ __('ID blok') }}</label>
                                <input type="text" x-model="state[selectedIndex].id" required />
                            </div>
                            <div class="fi-site-plan-editor__field">
                                <label>{{ __('Nama blok') }}</label>
                                <input type="text" x-model="state[selectedIndex].label" required />
                            </div>
                            <div class="fi-site-plan-editor__field">
                                <label>{{ __('Status') }}</label>
                                <select x-model="state[selectedIndex].status">
                                    <template x-for="opt in statusOptions" :key="opt.value">
                                        <option x-bind:value="opt.value" x-text="opt.label"></option>
                                    </template>
                                </select>
                            </div>
                            <p class="fi-site-plan-editor__coords" x-text="coordsLabel(state[selectedIndex])"></p>
                        </div>
                    </template>

                    <template x-if="selectedIndex === null && blocks.length > 0">
                        <p class="fi-site-plan-editor__hint">{{ __('Pilih blok di denah atau daftar untuk mengedit detail.') }}</p>
                    </template>
                </aside>
            </div>
        </template>
    </div>

    @script
    <script>
        Alpine.data('sitePlanBlockEditor', (config) => ({
            state: config.state,
            imageUrl: config.imageUrl,
            imageField: config.imageField,
            statusOptions: config.statusOptions,

            selectedIndex: null,
            mode: 'idle',
            activeIndex: null,
            startX: 0,
            startY: 0,
            startBlock: null,
            drawStart: null,
            drawPreview: null,

            get blocks() {
                return Array.isArray(this.state) ? this.state : [];
            },

            init() {
                if (! Array.isArray(this.state)) {
                    this.state = [];
                }
            },

            blockKey(block, index) {
                return (block.id || 'block') + '-' + index;
            },

            clamp(value, min, max) {
                return Math.min(max, Math.max(min, value));
            },

            round(value) {
                return Math.round(value * 10) / 10;
            },

            canvasRect() {
                return this.$refs.canvas?.getBoundingClientRect() ?? { width: 1, height: 1, left: 0, top: 0 };
            },

            pointerToPercent(clientX, clientY) {
                const rect = this.canvasRect();

                return {
                    x: this.clamp(((clientX - rect.left) / rect.width) * 100, 0, 100),
                    y: this.clamp(((clientY - rect.top) / rect.height) * 100, 0, 100),
                };
            },

            blockStyle(block) {
                return {
                    left: `${block.x ?? 0}%`,
                    top: `${block.y ?? 0}%`,
                    width: `${block.width ?? 10}%`,
                    height: `${block.height ?? 10}%`,
                };
            },

            drawPreviewStyle() {
                if (! this.drawPreview) {
                    return {};
                }

                const { x, y, width, height } = this.drawPreview;

                return {
                    left: `${x}%`,
                    top: `${y}%`,
                    width: `${width}%`,
                    height: `${height}%`,
                };
            },

            coordsLabel(block) {
                return `X ${block.x}% · Y ${block.y}% · ${block.width}% × ${block.height}%`;
            },

            selectIndex(index) {
                this.selectedIndex = index;
            },

            addBlock() {
                const n = this.blocks.length + 1;
                const block = {
                    id: `blok-${n}`,
                    label: `Blok ${n}`,
                    status: 'available',
                    x: 10,
                    y: 10,
                    width: 20,
                    height: 15,
                };

                this.state = [...this.blocks, block];
                this.selectedIndex = this.blocks.length - 1;
            },

            removeSelected() {
                if (this.selectedIndex === null) {
                    return;
                }

                const next = this.blocks.filter((_, i) => i !== this.selectedIndex);
                this.state = next;
                this.selectedIndex = next.length ? Math.min(this.selectedIndex, next.length - 1) : null;
            },

            onCanvasPointerDown(event) {
                if (event.target.closest('.fi-site-plan-editor__block')) {
                    return;
                }

                const point = this.pointerToPercent(event.clientX, event.clientY);
                this.mode = 'draw';
                this.drawStart = point;
                this.drawPreview = { x: point.x, y: point.y, width: 0, height: 0 };
                this.selectedIndex = null;
                event.target.setPointerCapture?.(event.pointerId);
            },

            onBlockPointerDown(event, index) {
                if (event.target.classList.contains('fi-site-plan-editor__resize')) {
                    return;
                }

                this.selectedIndex = index;
                this.mode = 'drag';
                this.activeIndex = index;
                this.startX = event.clientX;
                this.startY = event.clientY;
                this.startBlock = { ...this.blocks[index] };
            },

            startResize(event, index) {
                this.selectedIndex = index;
                this.mode = 'resize';
                this.activeIndex = index;
                this.startX = event.clientX;
                this.startY = event.clientY;
                this.startBlock = { ...this.blocks[index] };
            },

            onPointerMove(event) {
                if (this.mode === 'draw' && this.drawStart) {
                    const point = this.pointerToPercent(event.clientX, event.clientY);
                    const x = Math.min(this.drawStart.x, point.x);
                    const y = Math.min(this.drawStart.y, point.y);
                    const width = Math.abs(point.x - this.drawStart.x);
                    const height = Math.abs(point.y - this.drawStart.y);
                    this.drawPreview = { x, y, width, height };

                    return;
                }

                if (this.mode === 'idle' || this.activeIndex === null || ! this.startBlock) {
                    return;
                }

                const rect = this.canvasRect();
                const dx = ((event.clientX - this.startX) / rect.width) * 100;
                const dy = ((event.clientY - this.startY) / rect.height) * 100;
                const blocks = [...this.blocks];
                const block = { ...blocks[this.activeIndex] };

                if (this.mode === 'drag') {
                    block.x = this.round(this.clamp(this.startBlock.x + dx, 0, 100 - (block.width ?? 1)));
                    block.y = this.round(this.clamp(this.startBlock.y + dy, 0, 100 - (block.height ?? 1)));
                }

                if (this.mode === 'resize') {
                    block.width = this.round(this.clamp(this.startBlock.width + dx, 1, 100 - block.x));
                    block.height = this.round(this.clamp(this.startBlock.height + dy, 1, 100 - block.y));
                }

                blocks[this.activeIndex] = block;
                this.state = blocks;
            },

            onPointerUp() {
                if (this.mode === 'draw' && this.drawPreview) {
                    const { width, height } = this.drawPreview;

                    if (width >= 2 && height >= 2) {
                        const n = this.blocks.length + 1;
                        const block = {
                            id: `blok-${n}`,
                            label: `Blok ${n}`,
                            status: 'available',
                            x: this.round(this.drawPreview.x),
                            y: this.round(this.drawPreview.y),
                            width: this.round(width),
                            height: this.round(height),
                        };

                        this.state = [...this.blocks, block];
                        this.selectedIndex = this.blocks.length - 1;
                    }
                }

                this.mode = 'idle';
                this.activeIndex = null;
                this.startBlock = null;
                this.drawStart = null;
                this.drawPreview = null;
            },
        }));
    </script>
    @endscript
</x-dynamic-component>
