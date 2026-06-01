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

class WaypointsRelationManager extends RelationManager
{
    protected static string $relationship = 'waypoints';

    protected static ?string $title = 'Jalur tur sinematik';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Langkah kamera otomatis')
                    ->description('Urutan gerakan saat pengunjung memilih mode Preview Otomatis.')
                    ->schema([
                        Select::make('room_id')
                            ->label('Ruangan yang ditampilkan (opsional)')
                            ->relationship(
                                'room',
                                'name',
                                fn ($query) => $query->where('virtual_tour_id', $this->getOwnerRecord()->getKey()),
                            )
                            ->searchable()
                            ->preload()
                            ->columnSpanFull(),
                        TextInput::make('pos_x')->label('Kamera X')->numeric()->required(),
                        TextInput::make('pos_y')->label('Kamera Y')->numeric()->required(),
                        TextInput::make('pos_z')->label('Kamera Z')->numeric()->required(),
                        TextInput::make('tgt_x')->label('Lihat ke X')->numeric()->required(),
                        TextInput::make('tgt_y')->label('Lihat ke Y')->numeric()->required(),
                        TextInput::make('tgt_z')->label('Lihat ke Z')->numeric()->required(),
                        TextInput::make('duration')
                            ->label('Durasi gerak (detik)')
                            ->numeric()
                            ->default(0)
                            ->helperText('0 = mulai langsung di posisi ini'),
                        TextInput::make('hold')
                            ->label('Tahan di posisi (detik)')
                            ->numeric()
                            ->default(1.5),
                    ])
                    ->columns(3),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(fn (Builder $query): Builder => $query->with('room'))
            ->reorderable('sort_order')
            ->columns([
                TextColumn::make('sort_order')->label('#'),
                TextColumn::make('room.name')->label('Ruangan'),
                TextColumn::make('duration')->label('Gerak (d)'),
                TextColumn::make('hold')->label('Tahan (d)'),
            ])
            ->headerActions([
                CreateAction::make()
                    ->label('Tambah langkah')
                    ->mutateFormDataUsing(fn (array $data): array => self::mapWaypointForm($data)),
            ])
            ->recordActions([
                EditAction::make()
                    ->mutateRecordDataUsing(fn (array $data): array => self::mapWaypointToForm($data))
                    ->mutateFormDataUsing(fn (array $data): array => self::mapWaypointForm($data)),
                DeleteAction::make(),
            ]);
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private static function mapWaypointForm(array $data): array
    {
        $data['position'] = [(float) $data['pos_x'], (float) $data['pos_y'], (float) $data['pos_z']];
        $data['target'] = [(float) $data['tgt_x'], (float) $data['tgt_y'], (float) $data['tgt_z']];
        unset($data['pos_x'], $data['pos_y'], $data['pos_z'], $data['tgt_x'], $data['tgt_y'], $data['tgt_z']);

        return $data;
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private static function mapWaypointToForm(array $data): array
    {
        $pos = $data['position'] ?? [0, 2, 0];
        $tgt = $data['target'] ?? [0, 0, 0];
        $data['pos_x'] = $pos[0] ?? 0;
        $data['pos_y'] = $pos[1] ?? 2;
        $data['pos_z'] = $pos[2] ?? 0;
        $data['tgt_x'] = $tgt[0] ?? 0;
        $data['tgt_y'] = $tgt[1] ?? 0;
        $data['tgt_z'] = $tgt[2] ?? 0;

        return $data;
    }
}
