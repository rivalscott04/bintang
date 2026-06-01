<?php

declare(strict_types=1);

namespace App\Filament\Resources\VirtualTours\RelationManagers;

use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class HotspotsRelationManager extends RelationManager
{
    protected static string $relationship = 'hotspots';

    protected static ?string $title = 'Titik pindah ruangan';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Navigasi antar ruangan')
                    ->description('Titik emas di tur 3D. Pengunjung klik untuk pindah ruangan.')
                    ->schema([
                        Select::make('from_room_id')
                            ->label('Dari ruangan')
                            ->relationship(
                                'fromRoom',
                                'name',
                                fn ($query) => $query->where('virtual_tour_id', $this->getOwnerRecord()->getKey()),
                            )
                            ->required()
                            ->searchable()
                            ->preload(),
                        Select::make('to_room_id')
                            ->label('Ke ruangan')
                            ->relationship(
                                'toRoom',
                                'name',
                                fn ($query) => $query->where('virtual_tour_id', $this->getOwnerRecord()->getKey()),
                            )
                            ->required()
                            ->searchable()
                            ->preload(),
                        TextInput::make('label')
                            ->label('Teks tooltip')
                            ->placeholder('ke Dapur')
                            ->required()
                            ->columnSpanFull(),
                        TextInput::make('position_x')
                            ->label('Posisi kiri/kanan')
                            ->helperText('Koordinat 3D. Salin dari tur bawaan jika perlu penyesuaian.')
                            ->numeric()
                            ->required(),
                        TextInput::make('position_y')
                            ->label('Posisi tinggi')
                            ->numeric()
                            ->default(1.5)
                            ->required(),
                        TextInput::make('position_z')
                            ->label('Posisi depan/belakang')
                            ->numeric()
                            ->required(),
                    ])
                    ->columns(2),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(fn (Builder $query): Builder => $query->with(['fromRoom', 'toRoom']))
            ->reorderable('sort_order')
            ->columns([
                TextColumn::make('fromRoom.name')->label('Dari'),
                TextColumn::make('toRoom.name')->label('Ke'),
                TextColumn::make('label')->label('Teks'),
            ])
            ->headerActions([
                CreateAction::make()->label('Tambah titik pindah'),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ]);
    }
}
