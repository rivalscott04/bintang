<?php

declare(strict_types=1);

namespace App\Filament\Resources\VirtualTours\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class VirtualTourForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Pengaturan tur')
                    ->columns(2)
                    ->schema([
                        TextInput::make('name')
                            ->label('Nama internal')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull()
                            ->lazy()
                            ->afterStateUpdated(function (Set $set, Get $get, ?string $state): void {
                                if (blank($get('slug'))) {
                                    $set('slug', Str::slug($state ?? ''));
                                }
                            }),
                        Select::make('cluster_id')
                            ->label('Klaster terkait')
                            ->relationship('cluster', 'title')
                            ->searchable()
                            ->preload(),
                        Toggle::make('is_published')
                            ->label('Publikasikan')
                            ->default(true),
                        Toggle::make('is_default')
                            ->label('Tur utama (default)')
                            ->helperText('Hanya satu tur yang sebaiknya dijadikan default untuk beranda.')
                            ->default(false),
                        TextInput::make('room_height')
                            ->label('Tinggi ruangan (m)')
                            ->numeric()
                            ->default(3.2)
                            ->required(),
                        TextInput::make('eye_height')
                            ->label('Tinggi kamera (m)')
                            ->numeric()
                            ->default(1.7)
                            ->required(),
                    ]),
                Section::make('Section beranda (#virtual-tour)')
                    ->schema([
                        TextInput::make('section_label')
                            ->default('PENGALAMAN INTERAKTIF')
                            ->required(),
                        TextInput::make('section_title')
                            ->default('3D Virtual Space Explorer')
                            ->required()
                            ->columnSpanFull(),
                        Textarea::make('section_description')
                            ->rows(2)
                            ->columnSpanFull(),
                        FileUpload::make('preview_image')
                            ->label('Gambar preview kartu')
                            ->image()
                            ->disk('public')
                            ->directory('virtual-tours')
                            ->visibility('public')
                            ->columnSpanFull(),
                        TextInput::make('preview_image_alt')
                            ->maxLength(255)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
                Section::make('Teks kartu & tombol')
                    ->schema([
                        TextInput::make('card_headline')
                            ->label('Judul utama')
                            ->required()
                            ->columnSpanFull(),
                        TextInput::make('card_headline_accent')
                            ->label('Judul aksen (warna emas)')
                            ->columnSpanFull(),
                        Textarea::make('card_description')
                            ->rows(3)
                            ->columnSpanFull(),
                        TextInput::make('button_label')
                            ->default('Mulai Tur Virtual 3D')
                            ->required(),
                        TextInput::make('modal_subtitle')
                            ->label('Subjudul di modal 3D')
                            ->placeholder('Cluster Marocco · Tipe 78/120'),
                    ])
                    ->columns(2),
                Section::make('Pengaturan lanjutan')
                    ->collapsed()
                    ->schema([
                        TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
