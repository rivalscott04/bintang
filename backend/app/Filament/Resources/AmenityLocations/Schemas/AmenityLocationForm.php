<?php

declare(strict_types=1);

namespace App\Filament\Resources\AmenityLocations\Schemas;

use App\Enums\AmenityCategory;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

final class AmenityLocationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Lokasi di peta')
                ->description('Koordinat dipakai di halaman /lokasi dan section amenitas beranda.')
                ->columns(2)
                ->schema([
                    TextInput::make('name')
                        ->label('Nama lokasi')
                        ->required()
                        ->maxLength(255)
                        ->columnSpanFull(),
                    TextInput::make('lat')
                        ->label('Latitude')
                        ->numeric()
                        ->required()
                        ->step(0.0000001),
                    TextInput::make('lng')
                        ->label('Longitude')
                        ->numeric()
                        ->required()
                        ->step(0.0000001),
                    Select::make('category')
                        ->label('Kategori')
                        ->options(AmenityCategory::class)
                        ->required()
                        ->native(false),
                    TextInput::make('time_label')
                        ->label('Estimasi jarak / waktu')
                        ->placeholder('Jarak tempuh 5 menit')
                        ->required()
                        ->maxLength(255)
                        ->columnSpanFull(),
                    Textarea::make('description')
                        ->label('Deskripsi popup')
                        ->rows(4)
                        ->required()
                        ->columnSpanFull(),
                    Toggle::make('is_published')
                        ->label('Publikasikan')
                        ->default(true),
                ]),
        ]);
    }
}
