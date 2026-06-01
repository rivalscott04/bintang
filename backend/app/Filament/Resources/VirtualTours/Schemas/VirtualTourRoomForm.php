<?php

declare(strict_types=1);

namespace App\Filament\Resources\VirtualTours\Schemas;

use App\Enums\DoorSide;
use App\Enums\FurnitureType;
use App\Models\VirtualTourRoom;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class VirtualTourRoomForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi ruangan')
                    ->description('Nama dan deskripsi yang tampil di panel tur 3D.')
                    ->columns(2)
                    ->schema([
                        TextInput::make('name')
                            ->label('Nama ruangan')
                            ->required()
                            ->columnSpanFull()
                            ->lazy()
                            ->afterStateUpdated(function (Set $set, Get $get, ?string $state): void {
                                if (blank($get('slug'))) {
                                    $set('slug', Str::slug($state ?? ''));
                                }
                            }),
                        TextInput::make('slug')
                            ->label('ID ruangan')
                            ->helperText('Otomatis dari nama. Jangan ubah jika hotspot sudah terhubung.')
                            ->required()
                            ->maxLength(255),
                        Select::make('icon')
                            ->label('Ikon menu')
                            ->options([
                                'fa-couch' => 'Ruang tamu (sofa)',
                                'fa-utensils' => 'Dapur',
                                'fa-bed' => 'Kamar tidur',
                                'fa-bath' => 'Kamar mandi',
                                'fa-door-open' => 'Pintu / lorong',
                                'fa-tv' => 'Hiburan',
                            ])
                            ->required()
                            ->native(false),
                        TextInput::make('spec_area')
                            ->label('Luas tampilan')
                            ->placeholder('28 m²'),
                        TextInput::make('spec_highlight')
                            ->label('Sorotan')
                            ->placeholder('Bay Window 3.6m')
                            ->columnSpanFull(),
                        Textarea::make('description')
                            ->label('Deskripsi')
                            ->rows(2)
                            ->columnSpanFull(),
                    ]),
                Section::make('Model 3D (GLB)')
                    ->description('Upload satu file GLB per ruangan dari Blender/SketchUp. Jika diisi, tampilan 3D memakai model ini (bukan kotak primitif).')
                    ->schema([
                        FileUpload::make('model_glb')
                            ->label('File model (.glb / .gltf)')
                            ->acceptedFileTypes([
                                'model/gltf-binary',
                                'model/gltf+json',
                                'application/octet-stream',
                            ])
                            ->disk('public')
                            ->directory('virtual-tours/models')
                            ->visibility('public')
                            ->maxSize(20480)
                            ->helperText('Maks. 20 MB. Ekspor dari Blender: File → Export → glTF 2.0 (.glb). Posisikan model sesuai denah ruangan.')
                            ->columnSpanFull(),
                        TextInput::make('model_scale')
                            ->label('Skala model')
                            ->numeric()
                            ->default(1)
                            ->helperText('1 = ukuran asli. Naikkan/turunkan jika model terlalu kecil/besar.'),
                        TextInput::make('model_pos_x')
                            ->label('Geser X')
                            ->numeric()
                            ->default(0),
                        TextInput::make('model_pos_y')
                            ->label('Geser Y')
                            ->numeric()
                            ->default(0),
                        TextInput::make('model_pos_z')
                            ->label('Geser Z')
                            ->numeric()
                            ->default(0),
                    ])
                    ->columns(3),
                Section::make('Warna ruangan (mode primitif)')
                    ->description('Hanya dipakai jika belum ada model GLB di atas.')
                    ->visible(fn (Get $get, ?VirtualTourRoom $record): bool => blank($get('model_glb')) && ! $record?->hasGlbModel())
                    ->columns(3)
                    ->schema([
                        ColorPicker::make('floor_color')
                            ->label('Lantai'),
                        ColorPicker::make('wall_color')
                            ->label('Dinding'),
                        ColorPicker::make('accent_color')
                            ->label('Aksen / kusen'),
                    ]),
                Section::make('Objek furnitur (mode primitif)')
                    ->description('Tambahkan sofa, meja, lampu, dll. Abaikan jika ruangan sudah memakai model GLB.')
                    ->visible(fn (Get $get, ?VirtualTourRoom $record): bool => blank($get('model_glb')) && ! $record?->hasGlbModel())
                    ->schema([
                        Repeater::make('furniture_items')
                            ->label('Daftar objek')
                            ->addActionLabel('Tambah objek')
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => filled($state['label'] ?? null)
                                ? $state['label']
                                : (filled($state['type'] ?? null)
                                    ? FurnitureType::tryFrom($state['type'])?->getLabel()
                                    : 'Objek baru'))
                            ->schema([
                                TextInput::make('label')
                                    ->label('Nama objek (untuk admin)')
                                    ->placeholder('Sofa L-shape')
                                    ->columnSpanFull(),
                                Select::make('preset')
                                    ->label('Preset cepat')
                                    ->options([
                                        'sofa' => 'Sofa besar',
                                        'table' => 'Meja rendah',
                                        'tv' => 'TV + panel',
                                        'lamp' => 'Lampu bulat',
                                        'plant' => 'Tanaman',
                                        'window' => 'Jendela kaca',
                                    ])
                                    ->native(false)
                                    ->live()
                                    ->dehydrated(false)
                                    ->afterStateUpdated(function (Set $set, ?string $state): void {
                                        match ($state) {
                                            'sofa' => self::applyPreset($set, [
                                                'type' => 'box', 'label' => 'Sofa', 'color' => '#2a3a52',
                                                'size_w' => 4, 'size_h' => 0.9, 'size_d' => 1.2, 'pos_y' => 0.45,
                                            ]),
                                            'table' => self::applyPreset($set, [
                                                'type' => 'box', 'label' => 'Meja', 'color' => '#c5a880',
                                                'size_w' => 2.2, 'size_h' => 0.5, 'size_d' => 1.2, 'pos_y' => 0.25,
                                            ]),
                                            'tv' => self::applyPreset($set, [
                                                'type' => 'box', 'label' => 'TV', 'color' => '#0a0a0a',
                                                'size_w' => 2.4, 'size_h' => 1.4, 'size_d' => 0.08, 'pos_y' => 1.4,
                                            ]),
                                            'lamp' => self::applyPreset($set, [
                                                'type' => 'sphere', 'label' => 'Lampu', 'color' => '#fff4d6',
                                                'emissive' => '#ffd28a', 'emissive_intensity' => 0.5,
                                                'radius' => 0.25, 'pos_y' => 1.4,
                                            ]),
                                            'plant' => self::applyPreset($set, [
                                                'type' => 'cone', 'label' => 'Tanaman', 'color' => '#3d6b2f',
                                                'radius' => 0.6, 'cone_h' => 1.4, 'pos_y' => 1.1,
                                            ]),
                                            'window' => self::applyPreset($set, [
                                                'type' => 'box', 'label' => 'Jendela', 'color' => '#a8c8e0',
                                                'emissive' => '#c8def0', 'emissive_intensity' => 0.4,
                                                'size_w' => 3.6, 'size_h' => 1.8, 'size_d' => 0.04, 'pos_y' => 1.7,
                                            ]),
                                            default => null,
                                        };
                                    })
                                    ->columnSpanFull(),
                                Select::make('type')
                                    ->label('Bentuk objek')
                                    ->options(FurnitureType::class)
                                    ->required()
                                    ->native(false)
                                    ->live(),
                                TextInput::make('pos_x')->label('Posisi kiri/kanan')->numeric()->default(0),
                                TextInput::make('pos_y')->label('Posisi tinggi')->numeric()->default(0.5),
                                TextInput::make('pos_z')->label('Posisi depan/belakang')->numeric()->default(0),
                                ColorPicker::make('color')->label('Warna')->default('#ffffff'),
                                TextInput::make('size_w')
                                    ->label('Lebar')
                                    ->numeric()
                                    ->visible(fn (Get $get): bool => $get('type') === 'box'),
                                TextInput::make('size_h')
                                    ->label('Tinggi')
                                    ->numeric()
                                    ->visible(fn (Get $get): bool => $get('type') === 'box'),
                                TextInput::make('size_d')
                                    ->label('Kedalaman')
                                    ->numeric()
                                    ->visible(fn (Get $get): bool => $get('type') === 'box'),
                                TextInput::make('radius')
                                    ->label('Radius')
                                    ->numeric()
                                    ->visible(fn (Get $get): bool => in_array($get('type'), ['sphere', 'cone'], true)),
                                TextInput::make('cyl_r')
                                    ->label('Radius')
                                    ->numeric()
                                    ->visible(fn (Get $get): bool => $get('type') === 'cylinder'),
                                TextInput::make('cyl_h')
                                    ->label('Tinggi')
                                    ->numeric()
                                    ->visible(fn (Get $get): bool => $get('type') === 'cylinder'),
                                TextInput::make('cone_h')
                                    ->label('Tinggi tanaman')
                                    ->numeric()
                                    ->visible(fn (Get $get): bool => $get('type') === 'cone'),
                                ColorPicker::make('emissive')
                                    ->label('Cahaya (opsional)')
                                    ->helperText('Untuk lampu atau jendela terang'),
                                TextInput::make('emissive_intensity')
                                    ->label('Kekuatan cahaya')
                                    ->numeric()
                                    ->default(0.4)
                                    ->visible(fn (Get $get): bool => filled($get('emissive'))),
                                Toggle::make('transparent')
                                    ->label('Material kaca / transparan'),
                                TextInput::make('opacity')
                                    ->label('Transparansi (0–1)')
                                    ->numeric()
                                    ->default(0.3)
                                    ->visible(fn (Get $get): bool => (bool) $get('transparent')),
                            ])
                            ->columns(3)
                            ->columnSpanFull(),
                    ]),
                Section::make('Pintu antar ruangan')
                    ->description('Bukaan di dinding agar pengunjung bisa pindah ruangan lewat titik emas.')
                    ->schema([
                        Repeater::make('door_openings_items')
                            ->label('Daftar pintu')
                            ->addActionLabel('Tambah pintu')
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => isset($state['side'])
                                ? DoorSide::tryFrom($state['side'])?->getLabel()
                                : 'Pintu baru')
                            ->schema([
                                Select::make('side')
                                    ->label('Dinding')
                                    ->options(DoorSide::class)
                                    ->required()
                                    ->native(false),
                                TextInput::make('center')
                                    ->label('Posisi di dinding')
                                    ->helperText('Angka koordinat. Pakai nilai tur bawaan jika ragu.')
                                    ->numeric()
                                    ->required(),
                            ])
                            ->columns(2)
                            ->columnSpanFull(),
                    ]),
                Section::make('Pengaturan lanjutan')
                    ->description('Biasanya tidak perlu diubah. Hanya untuk tim teknis / 3D.')
                    ->collapsed()
                    ->schema([
                        TextInput::make('camera_pos_x')->label('Kamera X')->numeric()->default(-3.5),
                        TextInput::make('camera_pos_y')->label('Kamera Y')->numeric()->default(1.7),
                        TextInput::make('camera_pos_z')->label('Kamera Z')->numeric()->default(-2.5),
                        TextInput::make('camera_tgt_x')->label('Lihat ke X')->numeric()->default(-5),
                        TextInput::make('camera_tgt_y')->label('Lihat ke Y')->numeric()->default(1.6),
                        TextInput::make('camera_tgt_z')->label('Lihat ke Z')->numeric()->default(-4),
                        TextInput::make('bounds_x_min')->label('Batas X min')->numeric()->default(-10),
                        TextInput::make('bounds_x_max')->label('Batas X max')->numeric()->default(0),
                        TextInput::make('bounds_z_min')->label('Batas Z min')->numeric()->default(-8),
                        TextInput::make('bounds_z_max')->label('Batas Z max')->numeric()->default(0),
                    ])
                    ->columns(3),
            ]);
    }

    /**
     * @param  array<string, mixed>  $values
     */
    private static function applyPreset(Set $set, array $values): void
    {
        foreach ($values as $key => $value) {
            $set($key, $value);
        }
    }
}
